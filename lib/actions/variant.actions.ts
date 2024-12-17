"use server";
import * as z from "zod";
import { db } from "../db";
import { NextResponse } from "next/server";

import { currentRole } from "../auth";
import { variantFormSchema } from "../validator";

//! Afficher les variantes d'un model
export const showVariantsByModel = async (modelId: string) => {
  try {
    const variants = await db.phoneVariant.findMany({
      where: {
        modelId,
      },
    });

    return variants;
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la récupération des variantes.");
  }
};

//! Ajouter une variante du model
export const addVariant = async (variante: z.infer<typeof variantFormSchema>, userId: string, modelId: string) => {

  try {
    const result = variantFormSchema.safeParse(variante);

    if (!result.success) {
      console.error("Données invalides :", result.error.errors);
      throw new Error("Les données de la variante sont invalides.");
    }

    console.log("Données validées :", variante);

  } catch (error) {
    console.error("Erreur lors de la validation des données :", error);
    throw new Error("Les données de la variante sont invalides.");
  }
  
  const role = await currentRole();
  if (role !== "admin") {
    return new NextResponse(null, { status: 403 });
  }
  if (!userId) {
    return new NextResponse(null, { status: 401 });
  }

  try {
    // Étape 1 : Créer la variante
    const newVariant = await db.phoneVariant.create({
      data: {
        modelId,
        price: variante.price,
        memory: variante.memory,
        color: variante.color,
        description: variante.description,
        stock: variante.stock,
        isActive: variante.isActive,
      },
    });
  
    let finalVariant = newVariant; // Stocke la variante finale pour le retour

    // Étape 2 : Associer un pays si présent
    if (variante.country) {
      finalVariant = await db.phoneVariant.update({
        where: { id: newVariant.id },
        data: {
          country: { connect: { id: variante.country } },
        },
      });
    }
  
    // Étape 3 : Associer des images si présentes
    if (variante.imageUrl && variante.imageUrl.length > 0) {
      await db.phoneImage.createMany({
        data: variante.imageUrl.map((url) => ({
          url,
          description: null,
          variantId: newVariant.id, // Relie à la variante créée
        })),
      });
    }
  
    console.log("Variante créée avec succès :", finalVariant);
    return finalVariant; 
  } catch (error) {
    console.error("Erreur lors de la création de la variante :", error);
    throw new Error("Échec lors de l'ajout de la variante.");
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