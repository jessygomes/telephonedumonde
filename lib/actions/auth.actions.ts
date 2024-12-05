"use server";
import * as z from "zod";
import { db } from "../db";
import bcrypt from "bcryptjs";
import {
  newPasswordSchema,
  ResetSchema,
  userLoginSchema,
  userRegisterSchema,
} from "../validator";
import { getUserByEmail } from "./user.actions";

import { signIn, signOut } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";

import {
  generatePasswordResetToken,
  generateTwoFactorToken,
  generateVerificationToken,
} from "../tokens";
import {
  sendPasswordResetEmail,
  sendTwoFactorTokenEmail,
  sendVerificationEmail,
} from "../mail";
import { getVerificationTokenByToken } from "./verification-token";
import { getPasswordResetTokenByToken } from "./password-reset";
import { getTwoFactorTokenbyEmail } from "./two-factors-token";
import { getTwoFactorConfirmationByUserId } from "./two-factor-confirmation";

//! LOGIN ACTION
export const login = async (values: z.infer<typeof userLoginSchema>) => {
  // Revalidation des champs dans le back-end (où personne peut les manipuler)
  const validateFields = userLoginSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Formulaire Invalide" };
  }

  const { email, password, code } = validateFields.data;

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

    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );

    return {
      success:
        "Votre compte n'est pas vérifié : un email de vérification a été envoyé à votre adresse email.",
    };
  }

  // Vérifier si l'utilisateur a activé l'authentification à deux facteurs
  if (existingUser.isTwofactorEnabled && existingUser.email) {
    if (code) {
      // Vérifier le code
      const twoFactorToken = await getTwoFactorTokenbyEmail(existingUser.email);

      if (!twoFactorToken) {
        return { error: "Code invalide." };
      }

      if (twoFactorToken.token !== code) {
        return { error: "Code invalide." };
      }

      const hasExpired = new Date(twoFactorToken.expires) < new Date();

      if (hasExpired) {
        return { error: "Code expiré." };
      }

      // Supprimer le code si tout va bien + Confirmer l'authentification à deux facteurs
      await db.twoFactorToken.delete({
        where: { id: twoFactorToken.id },
      });

      const existingConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );

      // S'il y a déja une confirmation, on la supprime
      if (existingConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: { id: existingConfirmation.id },
        });
      }

      // Confirmation de l'authentification à deux facteurs
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await generateTwoFactorToken(existingUser.email);

      await sendTwoFactorTokenEmail(existingUser.email, twoFactorToken.token);

      // Pour indiquer au front-end qu'on va changer l'affichage pour mettre l'input du code à 6 chiffres
      return { twoFactor: true };
    }
  }

  // La fonction signIn vient de NextAuth importé depuis "auth.ts"
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
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

  const {
    email,
    password,
    passwordConfirmation,
    firstName,
    lastName,
    role,
    organizationName,
    organizationType,
  } = validateFields.data;

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
      role,
      organizationName,
      organizationType,
    },
  });

  // Génération du token et Envoi d'un email de confirmation avec ce token :
  const verificationToken = await generateVerificationToken(email);
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return {
    success:
      "Votre compte a bien été créé. Un mail de confirmation a été envoyé.",
  };
};

//! LOGOUT ACTION
export const logout = async () => {
  // On peut dans cette fonction supprimer des cookies ou des tokens de session du User par exemple
  await signOut();
  revalidatePath("/");
};

//! VERIFICATION EMAIL ACTION
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

//! RESET PASSWORD ACTION
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
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Un email de réinitialisation a été envoyé." };
};

//! RESET PASSWORD ACTION
export const newPassword = async (
  values: z.infer<typeof newPasswordSchema>,
  token: string | null
) => {
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
