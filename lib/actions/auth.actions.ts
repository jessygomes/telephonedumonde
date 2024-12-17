"use server";
import * as z from "zod";
import { db } from "../db";
import bcrypt from "bcryptjs";

import {
  newPasswordSchema,
  ResetSchema,
  // newPasswordSchema,
  // ResetSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../validator";

import { getUserByEmail } from "./user.actions";

import { AuthError } from "next-auth";
import { signIn, signOut } from "@/auth";

import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { revalidatePath } from "next/cache";

import {
  generatePasswordResetToken,
  generateVerificationToken,
} from "../token";
import { getVerificationTokenByToken } from "./verification-token";
import { getPasswordResetTokenByToken } from "./password-reset";

// import { getPasswordResetTokenByToken } from "./password-reset";

//! LOGIN ACTION
export const login = async (values: z.infer<typeof userLoginSchema>) => {
  // Revalidation des champs dans le back-end (où personne peut les manipuler)
  const validateFields = userLoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Formulaire Invalide" };
  }

  const { email, password } = validateFields.data;

  /**
   * Ici, si un user non vérifié veut se connecter, on lui bloque l'accès et on veut lui renvoyer un email de vérification :
   * On vérifie si l'utilisateur existe déjà dans la base de données
   * On regarde si son email est vérifié
   * Si l'email n'est pas vérifié, on lui envoie un email de vérification
   */
  const existingUser = await getUserByEmail(email);
  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Identifiants invalides." };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );

    await fetch(`${process.env.BASE_URL}/api/emails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: {
          name: "Téléphone du monde",
          address: "no-reply@telephonedumonde.com",
        },
        recipient: { name: "CJ", address: verificationToken.email },
        subject: "Vérifiez votre adresse email",
        message: `Cliquez sur le lien suivant pour vérifier votre adresse email : ${process.env.BASE_URL}/auth/new-verification?token=${verificationToken.token}`,
      }),
    });

    return {
      success:
        "Votre compte n'est pas vérifié : un email de vérification a été envoyé à votre adresse email.",
    };
  }

  // La fonction signIn vient de NextAuth importé depuis "auth.ts"
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    return { success: "Connexion réussie" };
  } catch (error) {
    // Ici, on récupère les erreurs envoyé par nextAuth en fonction du type d'erreur
    if (error instanceof AuthError) {
      switch (error.type) {
        // Si le type d'erreur est "Credentials"
        case "CredentialsSignin":
          return { error: "Identifiants incorrects." };
        default:
          return { error: "Identifiants incorrects." };
      }
    }
    // (A compléter)
    throw error;
  }
};

//! REGISTER ACTION
export const register = async (values: z.infer<typeof userRegisterSchema>) => {
  // Revalidation des champs dans le back-end (où personne peut les manipuler)
  const validateFields = userRegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Formulaire Invalide" };
  }

  const { email, password, passwordConfirmation, firstName, lastName } =
    validateFields.data;

  // Revérifier la correspondance des mots de passe
  if (password !== passwordConfirmation) {
    return { error: "Les mots de passe ne correspondent pas." };
  }

  // Hash du mot de passe
  const hashedPassword = await bcrypt.hash(password, 10);

  // Vérifier si l'utilisateur existe déjà
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Cet utilisateur existe déjà." };
  }

  // Création de l'utilisateur
  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
    },
  });

  // Génération du token et Envoi d'un email de confirmation avec ce token
  const verificationToken = await generateVerificationToken(email);
  await fetch(`${process.env.BASE_URL}/api/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Téléphone du monde",
        address: "no-reply@telephonedumonde.com",
      },
      recipient: { name: "CJ", address: verificationToken.email },
      subject: "Vérifiez votre adresse email",
      message: `Cliquez sur le lien suivant pour vérifier votre adresse email : ${process.env.BASE_URL}/auth/new-verification?token=${verificationToken.token}`,
    }),
  });

  return {
    success:
      "Votre compte a bien été créé. Un mail de confirmation a été envoyé.",
  };
};

// //! LOGOUT ACTION
export const logout = async () => {
  // On peut dans cette fonction supprimer des cookies ou des tokens de session du User par exemple
  await signOut();
  revalidatePath("/");
};

// //! VERIFICATION EMAIL ACTION
export const newVerification = async (token: string) => {
  const existingToken = await getVerificationTokenByToken(token);

  if (!existingToken) {
    return { error: "Le token n'existe pas." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Le token a expiré." };
  }

  // Mettre à jour l'email vérifié
  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "L'utilisateur n'existe pas." };
  }

  await db.user.update({
    where: { id: existingUser.id },
    // On met à jour la colonne emailVerified avec la date actuelle + l'email de l'utilisateur si le user a modifier son email (qui sera fait plus tard)
    data: { emailVerified: new Date(), email: existingToken.email },
  });

  // Supprimer le token de vérification
  await db.verificationToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Votre email a bien été vérifié." };
};

// //! RESET PASSWORD ACTION
export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Formulaire invalide." };
  }

  const { email } = validatedFields.data;

  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return { error: "Email introuvable." };
  }

  // Générer un token de réinitialisation et envoyer un email
  const passwordResetToken = await generatePasswordResetToken(email);

  await fetch(`${process.env.BASE_URL}/api/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Téléphone du monde",
        address: "no-reply@telephonedumonde.com",
      },
      recipient: { name: "CJ", address: passwordResetToken.email },
      subject: "Réinitialisation de votre mot de passe",
      message: `Cliquez sur le lien suivant afin de réinitialiser votre mot de passe :  ${process.env.BASE_URL}/auth/nouveau-mot-de-passe?token=${passwordResetToken.token}`,
    }),
  });

  return { success: "Un email de réinitialisation a été envoyé." };
};

//! RESET PASSWORD ACTION
export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
) => {
  console.log("values", values);
  if (!token) {
    return { error: "Token manquant." };
  }

  const validatedFields = newPasswordSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Formulaire invalide." };
  }

  const { password, passwordConfirmation } = validatedFields.data;
  if (password !== passwordConfirmation) {
    return { error: "Les mots de passe ne correspondent pas." };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return { error: "Token invalide." };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Le token a expiré." };
  }

  const existingUser = await getUserByEmail(existingToken.email);
  if (!existingUser) {
    return { error: "Utilisateur introuvable." };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashedPassword },
  });

  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Mot de passe mis à jour." };
};
