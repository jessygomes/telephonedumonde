import { auth } from "@/auth";

/**
 *
 * @returns Cette fonction permet de récupérer l'utilisateur connecté et nous évite d'appeler le champs "data" à chaque fois. Utile pour les pages server
 */

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};

export const currentRole = async () => {
  const session = await auth();

  return session?.user?.role;
};
