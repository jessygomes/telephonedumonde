import { useSession } from "next-auth/react";

/**
 *
 * @returns Cette fonction permet de récupérer l'utilisateur connecté et nous évite d'appeler le champs "data" à chaque fois.
 * Elle est utilisé pour les pages "use client"
 */
export const useCurrentUser = () => {
  const session = useSession();

  return session.data?.user;
};
