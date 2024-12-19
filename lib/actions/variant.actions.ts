"use server";
import * as z from "zod";
import { db } from "../db";
import { NextResponse } from "next/server";

import { currentRole } from "../auth";
import { variantFormSchema } from "../validator";

// Afficher les variantes d'un model
export const showVariantsByModel = async (modelId: string) => {
  try {
    const variants = await db.phoneVariant.findMany({
      where: {
        modelId,
      },
      include: {
        model: {
          select: {
            name: true, 
          },
        },
        images: {
          select: {
            url: true, 
          },
        },
        country: {
          select: {
            id: true,
            name: true, 
          },
        },
      },
    });

    return variants.map((variant) => ({
      ...variant,
      imageUrl: variant.images.length > 0 ? variant.images[0].url : null, 
    }));
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la récupération des variantes.");
  }
};

// Ajouter une variante du model
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
  // Créer la variante
    const newVariant = await db.phoneVariant.create({
      data: {
        modelId,
        price: variante.price,
        memory: variante.memory,
        color: variante.color,
        description: variante.description,
        stock: variante.stock ?? 0,
        isActive: variante.isActive,
      },
    });

    if (!modelId) {
      throw new Error("modelId est requis pour créer une variante.");
    }

    // Associer le pays
    if (variante.country) {
      await db.phoneVariant.update({
        where: { id: newVariant.id },
        data: {
          country: { connect: { id: variante.country } },
        },
      });
    }

    // Associer les images
    if (variante.imageUrl && variante.imageUrl.length > 0) {
      await db.phoneImage.createMany({
        data: variante.imageUrl.map((url) => ({
          url,
          description: null,
          variantId: newVariant.id,
        })),
      });
    }

    console.log("Variante créée avec succès :", newVariant);
    return newVariant;
  } catch (error) {
    console.error("Erreur dans addVariant :", error);
    throw new Error("Échec lors de l'ajout de la variante.");
  }
};

// Modifier une variante
export const updateVariant = async (variantId: string, variante: z.infer<typeof variantFormSchema>) => {
  const role = await currentRole();
  if (role !== "admin") {
    return new NextResponse(null, { status: 403 });
  }

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

  try {
    await db.phoneVariant.update({
      where: {
        id: variantId,
      },
      data: {
        price: variante.price,
        memory: variante.memory,
        color: variante.color,
        description: variante.description,
        stock: variante.stock ?? 0,
        isActive: variante.isActive,
      },
    });

    // Associer le pays
    if (variante.country) {
      await db.phoneVariant.update({
        where: { id: variantId },
        data: {
          country: { connect: { id: variante.country } },
        },
      });
    }

    // Associer les images
    if (variante.imageUrl && variante.imageUrl.length > 0) {
      await db.phoneImage.createMany({
        data: variante.imageUrl.map((url) => ({
          url,
          description: null,
          variantId,
        })),
      });
    }

    console.log("Variante modifiée avec succès :", variantId);
  } catch (error) {
    console.error("Erreur dans updateVariant :", error);
    throw new Error("Échec lors de la modification de la variante.");
  }
};

// Supprimer une variante
export const deleteVariant = async (variantId: string) => {
  const role = await currentRole();
  if (role !== "admin") {
    return new NextResponse(null, { status: 403 });
  }

  try {
    await db.phoneVariant.delete({
      where: {
        id: variantId,
      },
    });
  } catch (error) {
    console.error("Erreur dans deleteVariant :", error);
    throw new Error("Échec lors de la suppression de la variante.");
  }
};

