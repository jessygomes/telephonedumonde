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
export const addVariant = async (
  userId: string,
  modelId: string,
  variante: z.infer<typeof variantFormSchema>
) => {
  console.log(variante);

  const role = await currentRole();
  if (role !== "admin") {
    return new NextResponse(null, { status: 403 });
  }
  if (!userId) {
    return new NextResponse(null, { status: 401 });
  }

  const newVariant = await db.phoneVariant.create({
    data: {
      ...variante,
      modelId: modelId,
      country: variante.country,
    },
  });
};
