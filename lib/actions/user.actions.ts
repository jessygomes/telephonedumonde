"use server";
import * as z from "zod";

import { db } from "../db";
import { userProfileSchema, userSettingSchema } from "../validator";

import { revalidatePath } from "next/cache";
import {
  CreateUserParams,
  DeleteUserParams,
  GetSuscriptionEvent,
  UpdateUserParams,
} from "@/types";
import { handleError } from "../utils";
import { generateVerificationToken } from "../token";

//! GET USER BY ID ----- PRISMA MODE
export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: { id },
      include: { tags: true },
    });
    return user;
  } catch {
    return null;
  }
}

//! GET USER BY EMAIL ----- PRISMA MODE
export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};

//! TOUS LES USERS
export async function getAllUsers() {
  try {
    const users = await db.user.findMany();
    return users;
  } catch {
    return null;
  }
}

//! GET USER BY ID POUR LE PROFIL
export async function getUserByIdForProfile(userId: string) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        email: true,
        image: true,

        role: true,

        isTwofactorEnabled: true,
      },
    });
    return user;
  } catch {
    return null;
  }
}

//! UPDATE USER FOR PROFILE
export async function updateProfileUser(
  values: z.infer<typeof userProfileSchema>
) {
  // Importation de currentUser ici : éviter les conflits d'importation qui génere une erreur
  const { currentUser } = await import("../auth");
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "User not found" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "User not found" };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Profil mis à jour !" };
}

//! UPDATE USER FOR SETTINGS
export async function updateSettingUser(
  values: z.infer<typeof userSettingSchema>
) {
  const { currentUser } = await import("../auth");
  const user = await currentUser();

  if (!user || !user.id) {
    return { error: "User not found" };
  }
  const dbUser = await getUserById(user.id);
  if (!dbUser) {
    return { error: "User not found" };
  }

  // Le user est connecté avec Google ou pas ? On ne peut pas changer son adresse mail ni avoir une authentification à deux facteurs : on les met à undefined pour que leur valeur ne change pas quoi qu'il arrive.
  if (user.isOAuth) {
    values.email = undefined;
    values.isTwofactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);

    if (existingUser) {
      return { error: "Email déjà utilisé" };
    }

    // Envoyer un email de vérification
    const verificationToken = await generateVerificationToken(values.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "Un email de vérification a été envoyé à votre adresse mail. Veuillez vérifier votre boîte de réception.",
    };
  }

  await db.user.update({
    where: { id: dbUser.id },
    data: {
      ...values,
    },
  });

  return { success: "Paramètres mis à jour !" };
}

//! DELETE USER
export const deleteUser = async ({ userId, path }: DeleteUserParams) => {
  try {
    const deletedUser = await db.user.delete({
      where: { id: userId },
    });

    if (deletedUser) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
};

//! AJOUTER AUX FAVORIS
export async function addFavoriteEvent({
  userId,
  eventId,
}: {
  userId: string;
  eventId: string;
}) {
  try {
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { wishlist: true },
    });
    if (!user) throw new Error("User not found");

    // Véririfier si l'événement est déjà dans la wishlist de l'utilisateur
    const isLiked = await db.userWishlist.findFirst({
      where: {
        userId: userId,
        eventId: eventId,
      },
    });

    console.log("isLiked", isLiked);

    const event = await db.event.findUnique({
      where: { id: eventId },
      select: { nbFav: true },
    });

    // event.nbFav = Number(event.nbFav) || 0;

    if (isLiked) {
      // Si l'event est déja dans les FAV, on le retire et on décrémente le nbFav
      await db.userWishlist.delete({
        where: {
          userId_eventId: {
            userId: userId,
            eventId: eventId,
          },
        },
      });

      if (event && event.nbFav > 0) {
        await db.event.update({
          where: { id: eventId },
          data: {
            nbFav: {
              decrement: 1,
            },
          },
        });
      }
    } else {
      // Si l'event n'est pas dans les FAV, on l'ajoute dans la wishlist et on incrémente le nbFav
      await db.userWishlist.create({
        data: {
          userId: userId,
          eventId: eventId,
        },
      });
      await db.event.update({
        where: { id: eventId },
        data: {
          nbFav: {
            increment: 1,
          },
        },
      });
    }

    // Récupérer l'événement mis à jour pour obtenir le nbFav mis à jour
    const updatedEvent = await db.event.findUnique({
      where: { id: eventId },
      select: { nbFav: true }, // Sélectionner uniquement le nbFav si c'est tout ce dont vous avez besoin
    });

    // Return the updated user and the updated nbFav of the event
    return {
      nbFav: updatedEvent?.nbFav, // Ajouter le nbFav mis à jour à l'objet retourné
    };
  } catch (error: string | any) {
    console.log(error);
    throw new Error(`Erreur lors de l'ajout aux favoris : ${error.message}`);
  }
}

//! GET LA WISHLIST
export async function getWishlist({
  userId,
  page = 1,
}: {
  userId: string;
  page: number;
}) {
  try {
    const skipAmount = (Number(page) - 1) * 6;

    const userWithWishlist = await db.user.findUnique({
      where: { id: userId },
      select: {
        wishlist: {
          orderBy: {
            createdAt: "desc", // Trier par createdAt en ordre décroissant
          },
          take: 6,
          skip: skipAmount,
        },
      },
    });

    if (!userWithWishlist) throw new Error("User not found");

    return userWithWishlist.wishlist;
  } catch (error) {
    console.log(error);
  }
}
