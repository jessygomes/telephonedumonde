import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import qs from "query-string";
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//! Construction d'une chaine de requête URL à partir d'un ensemble de paramètres données :
export function formUrlQuery({ params, key, value }: UrlQueryParams) {
  // On analyse la chaine de requête URL (params) avec qs.parse qui transforme la chaine de requête en objet
  const currentUrl = qs.parse(params);

  // On met à jour la valeur du paramètre (key) avec la valeur (value) donnée en argument
  currentUrl[key] = value;

  // On utilise qs.stringifyUrl pour transformer l'objet en chaine de requête URL
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true } // On ignore les valeurs null
  );
}

//! Suppression des paramètres d'une chaine de requête URL
export function removeKeysFromQuery({
  params,
  keysToRemove,
}: RemoveUrlQueryParams) {
  // On analyse la chaine de requête URL (params) avec qs.parse qui transforme la chaine de requête en objet
  const currentUrl = qs.parse(params);

  // Pour chaque clé dans le tableau keysToRemove, on supprime les clés de l'objet
  keysToRemove.forEach((key) => {
    delete currentUrl[key];
  });

  // On reconstruit l'url après avoir supprimé les clés
  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
}
