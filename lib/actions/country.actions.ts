"use server";
import * as z from "zod";
import { countryFormSchema } from "../validator";
import { variantFormSchema } from "../validator";
import { db } from "../db";
import { currentRole } from "../auth";
import { NextResponse } from "next/server";


export const addCountry = async (country: z.infer<typeof countryFormSchema>, userId: string) => {
  try {
    const result = countryFormSchema.safeParse(country);

    if (!result.success) {
      console.error("Données invalides :", result.error.errors);
      throw new Error("Les données du pays sont invalides.");
    }

    // Vérification des permissions
    const role = await currentRole();
    if (role !== "admin") {
      throw new Error("Vous n'avez pas les permissions nécessaires pour effectuer cette action.");
    }

    if (!userId) {
      throw new Error("Utilisateur non authentifié.");
    }

    // Ajout du pays avec imageUrl directement
    const newCountry = await db.country.create({
      data: {
        name: country.name,
        imageUrl: country.imageUrl || null, // Ajout de l'URL
      },
    });

    console.log("Pays créé avec succès :", newCountry);

    return newCountry;
  } catch (error) {
    console.error("Erreur lors de l'ajout du pays", error);
    throw new Error("Erreur lors de l'ajout du pays");
  }
};

export const getCountries = async () => {
  try {
    const countries = await db.country.findMany();
    
    return countries;
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la récupération des pays.");
  }
}