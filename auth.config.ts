/* 
  ? Création du fichier auth.config.ts pour pallier le problème de Prisma qui ne fonctionne pas avec les Edges de NextAuth (on n'aurait pas accès a certaines choses)

  ? C'est ce fichier qui va trigger le middleware.ts tandis que auth.ts utilisera le PrismaAdapter

  1. Créer un fichier auth.config.ts à la racine du dossier api/auth
  3. Ajouter les providers nécessaires dans le tableau providers (Google, Credentials, etc.)
  4. Importer le fichier auth.config.ts dans le fichier auth.ts
*/

import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

import { getUserByEmail } from "./lib/actions/user.actions";
import { userLoginSchema } from "./lib/validator";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
    Credentials({
      async authorize(credentials) {
        const validatedFields = userLoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;

          const user = await getUserByEmail(email);

          // Si le user n'a pas de password : c'est qu'il s'est inscrit avec Google
          if (!user || !user.password) return null;

          // Comparer le password entré avec le password hashé en base de données
          const passwordMatch = await bcrypt.compare(password, user.password);

          // Si c'est bon, on retourne le user
          if (passwordMatch) {
            return user;
          }
        }

        // Si c'est pas bon, on retourne null
        return null;
      },
    }),
  ],
} satisfies NextAuthConfig;
