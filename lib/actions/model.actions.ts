"use server";
import * as z from "zod";
import { db } from "../db";
import { NextResponse } from "next/server";

import { currentRole } from "../auth";

import { modelFormSchema } from "../validator";

//! Récupérer tous les modèles
export const showAllModels = async ({
  query,
  limit = 10,
  page,
  brand,
}: {
  query: string;
  limit?: number;
  page?: number;
  brand?: string;
}) => {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const models = await db.phoneModel.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        brand: brand
          ? {
              contains: brand,
              mode: "insensitive",
            }
          : undefined,
      },
      include: {
        variants: {
          select: {
            _count: true,
          },
        },
      },
      skip: skipAmount,
      take: limit,
    });

    const modelsCount = await db.phoneModel.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        brand: brand
          ? {
              contains: brand,
              mode: "insensitive",
            }
          : undefined,
      },
    });

    // Transform the models to include the count of variants
    const modelsWithVariantCount = models.map((model) => ({
      ...model,
      variantCount: model.variants.length,
    }));

    return {
      data: modelsWithVariantCount,
      totalPages: Math.ceil(modelsCount / limit),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la récupération des modèles.");
  }
};

//! Récupérer les modèles actifs
//! Récupérer tous les modèles
export const showAllActiveModels = async ({
  query,
  limit = 10,
  page,
  brand,
}: {
  query: string;
  limit?: number;
  page?: number;
  brand?: string;
}) => {
  try {
    const skipAmount = (Number(page) - 1) * limit;

    const models = await db.phoneModel.findMany({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
        isActive: true,
        brand: {
          contains: brand,
          mode: "insensitive",
        },
      },
      include: {
        variants: {
          select: {
            _count: true,
          },
        },
      },
      skip: skipAmount,
      take: limit,
    });

    const modelsCount = await db.phoneModel.count({
      where: {
        name: {
          contains: query,
          mode: "insensitive",
        },
      },
    });

    // Transform the models to include the count of variants
    const modelsWithVariantCount = models.map((model) => ({
      ...model,
      variantCount: model.variants.length,
    }));

    return {
      data: modelsWithVariantCount,
      totalPages: Math.ceil(modelsCount / limit),
    };
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la récupération des modèles.");
  }
};

//! Récupérer les marques
export const showAllBrands = async () => {
  try {
    const brands = await db.phoneModel.findMany({
      select: {
        brand: true,
      },
    });

    // Utiliser un Set pour obtenir des marques uniques
    const uniqueBrands = Array.from(
      new Set(brands.map((model) => model.brand))
    );

    return uniqueBrands;
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la récupération des marques.");
  }
};

//! Ajouter un modèle
export const addModel = async (
  values: z.infer<typeof modelFormSchema>,
  userId: string
) => {
  // Vérification du rôle de l'utilisateur
  try {
    const role = await currentRole();

    if (role !== "admin") {
      return new NextResponse(null, { status: 403 });
    }

    if (!userId) {
      return new NextResponse(null, { status: 401 });
    }

    // Revalidation des champs dans le back-end (où personne peut les manipuler)
    const validateFields = modelFormSchema.safeParse(values);

    if (!validateFields.success) {
      return { error: "Formulaire Invalide" };
    }

    const { name, brand, isActive } = validateFields.data;

    // Vérification si le modèle existe déjà
    const existingModel = await db.phoneModel.findFirst({
      where: {
        name,
      },
    });

    if (existingModel) {
      return { error: "Ce modèle existe déjà" };
    }

    // Ajout du modèle
    const newModel = await db.phoneModel.create({
      data: {
        name,
        brand,
        isActive,
      },
    });
    return newModel;
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la création du modèle.");
  }
};

//! Modifier un modèle
export const editModel = async (
  userId: string,
  model: { id: string; brand: string; name: string; isActive: boolean }
) => {
  try {
    console.log(model);
    // Récupération du modèle à modifier
    const modelToUpdate = await db.phoneModel.findUnique({
      where: {
        id: model.id,
      },
    });

    if (!modelToUpdate) {
      return { error: "Modèle introuvable" };
    }

    // Vérification du rôle de l'utilisateur
    const role = await currentRole();

    if (role !== "admin") {
      return new NextResponse(null, { status: 403 });
    }

    if (!userId) {
      return new NextResponse(null, { status: 401 });
    }

    // Vérifier si le modèle existe déjà
    // const existingModel = await db.phoneModel.findFirst({
    //   where: {
    //     name: model.name,
    //   },
    // });

    // if (existingModel) {
    //   return { error: "Ce modèle existe déjà" };
    // }

    // Modification du modèle
    const updatedModel = await db.phoneModel.update({
      where: {
        id: model.id,
      },
      data: {
        brand: model.brand,
        name: model.name,
        isActive: model.isActive,
      },
    });

    return updatedModel;
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la modification du modèle.");
  }
};

//! Supprimer un modèle
export const deleteModel = async (userId: string, modelId: string) => {
  try {
    // Vérification du rôle de l'utilisateur
    const role = await currentRole();

    if (role !== "admin") {
      return new NextResponse(null, { status: 403 });
    }

    if (!userId) {
      return new NextResponse(null, { status: 401 });
    }

    // Vérification si le modèle existe
    const existingModel = await db.phoneModel.findUnique({
      where: {
        id: modelId,
      },
    });

    if (!existingModel) {
      return { error: "Modèle introuvable" };
    }

    // Suppression du modèle
    const deletedModel = await db.phoneModel.delete({
      where: {
        id: modelId,
      },
    });

    return deletedModel;
  } catch (error) {
    console.log(error);
    throw new Error("Echec lors de la suppression du modèle.");
  }
};
