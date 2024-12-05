import { type ClassValue, clsx } from "clsx";

import { twMerge } from "tailwind-merge";
import qs from "query-string";

import { UrlQueryParams, RemoveUrlQueryParams } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDateTime = (dateString: Date) => {
  const dateTimeOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    day: "numeric", // numeric day of the month (e.g., '25')
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: "short", // abbreviated weekday name (e.g., 'Mon')
    month: "short", // abbreviated month name (e.g., 'Oct')
    year: "numeric", // numeric year (e.g., '2023')
    day: "numeric", // numeric day of the month (e.g., '25')
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric", // numeric hour (e.g., '8')
    minute: "numeric", // numeric minute (e.g., '30')
    hour12: false, // use 12-hour clock (true) or 24-hour clock (false)
  };

  const formattedDateTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateTimeOptions
  );

  const formattedDate: string = new Date(dateString).toLocaleString(
    "fr-FR",
    dateOptions
  );

  const formattedTime: string = new Date(dateString).toLocaleString(
    "fr-FR",
    timeOptions
  );

  return {
    dateTime: formattedDateTime,
    dateOnly: formattedDate,
    timeOnly: formattedTime,
  };
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

export const formatPrice = (price: string) => {
  const amount = parseFloat(price);
  const formattedPrice = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "USD",
  }).format(amount);

  return formattedPrice;
};

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

export const handleError = (error: unknown) => {
  console.error(error);
  throw new Error(typeof error === "string" ? error : JSON.stringify(error));
};
