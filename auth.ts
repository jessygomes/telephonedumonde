import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { db } from "./lib/db";

import { Role } from "@prisma/client";

import { getTwoFactorConfirmationByUserId } from "./lib/actions/two-factor-confirmation";
import { getUserById } from "./lib/actions/user.actions";
import { getAccountByUserId } from "./lib/actions/account";

//! Pour éviter les erreurs de type (erreur de type pour session.user.role : il ne reconnait pas "role")
type ExtentedUser = DefaultSession["user"] & {
  id: string;
  role: Role; // ou bien : role : "user" | "admin" | "organizer";
  isTwofactorEnabled: boolean;
  isOAuth: boolean;
};

declare module "next-auth" {
  interface Session {
    user: ExtentedUser;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/auth/connexion",
    error: "/auth/error", // Redirige vers NOTRE page d'erreur si il y a une erreur
  },
  events: {
    // Quand on se connecte avec Google, l'email est déjà vérifié donc on le met à jour directement dans la base de données
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // On autorise la connexion sans email Vérification pour Google
      if (account?.provider !== "credentials") return true;

      // Ici, si le user n'est pas vérifié, il ne peut pas se connecter
      const existingUser = user.id ? await getUserById(user.id) : null;
      // if (!existingUser || !existingUser?.emailVerified) return false;

      // Ici, si le user a activé l'auth à deux facteurs, on vérifie si il a bien confirmé le code
      // if (existingUser.isTwofactorEnabled) {
      //   const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
      //     existingUser.id
      //   );

      //   if (!twoFactorConfirmation) return false;

      //   // Supprimer la confirmation de l'auth à deux facteurs pour la prochaine connexion (il devra reconfirmer avec le nouveau code recu par email)
      //   await db.twoFactorConfirmation.delete({
      //     where: { id: twoFactorConfirmation.id },
      //   });
      // }

      return true;
    },

    async session({ token, session }) {
      // Ici, le but est de rajouter l'ID du User dans la session (car il n'y ai pas de base) :
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as ExtentedUser["role"];
      }
      if (session.user) {
        session.user.isTwofactorEnabled =
          token.isTwofactorEnabled as ExtentedUser["isTwofactorEnabled"];
      }
      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email as string;
        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      console.log("JWT CALLBACK", token); // : Quand on affiche le token, on voit que le "sub" correspond à l'id du user
      // Pour ajouter le rôle du user à la session, on passe par le token car c'est grâce à celui ci que le middleware va autoriser ou non l'accès à certaines routes
      // Le rôle va être ajouté au dessus dans la session
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;

      // Récupérer le compte d'un user connecté avec Google
      const existingAccount = await getAccountByUserId(existingUser.id);

      token.isOAuth = !!existingAccount;

      token.name = existingUser.name;
      token.email = existingUser.email;

      token.role = existingUser.role;
      token.isTwofactorEnabled = existingUser.isTwofactorEnabled;
      return token;
    },
  },
  // On passe la DB à PrismaAdapter
  adapter: PrismaAdapter(db),
  // On change la stratégie de session : avec prisma, on doit utiliser "jwt"
  session: { strategy: "jwt" },
  // On passe la config d'auth.config
  ...authConfig,
});
