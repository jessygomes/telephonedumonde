"use server";
import * as z from "zod";
import { countryFormSchema } from "../validator";
import { variantFormSchema } from "../validator";
import { db } from "../db";
import { currentRole } from "../auth";
import { NextResponse } from "next/server";


export const addCountry = async (
    country: z.infer<typeof countryFormSchema>, 
    userId: string
  ) => {
    try {
      // Utilisez le bon schéma pour valider les données
      const result = countryFormSchema.safeParse(country);
  
      if (!result.success) {
        console.error("Données invalides :", result.error.errors);
        throw new Error("Les données du pays sont invalides.");
      }
  
      // Vérification des permissions
      const role = await currentRole();
      if (role !== "admin") {
        return new NextResponse(null, { status: 403 });
      }
      if (!userId) {
        return new NextResponse(null, { status: 401 });
      }
  
      // Ajout du pays à la base de données
      const newCountry = await db.country.create({
        data: {
          name: country.name,
        },
      });
  
      console.log("Pays créé avec succès :", newCountry);
  
      return newCountry;
    } catch (error) {
      console.error("Erreur lors de l'ajout du pays", error);
      throw new Error("Erreur lors de l'ajout du pays");
    }
  };
  