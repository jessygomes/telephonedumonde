import { db } from "@/lib/db";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";
import { z } from "zod";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: "4MB",
      maxFileCount: 5,
    },
  })
    .input(
      z.union([
        z.object({ variantId: z.string() }), // Cas pour les variantes
        z.object({ countryId: z.string() }), // Cas pour les pays
      ])
    )
    .middleware(async ({ input }) => {
      console.log("Middleware appelé");

      // Vérification des données d'entrée
      if ("variantId" in input) {
        console.log("variantId reçu :", input.variantId);

        if (!input.variantId) {
          console.error("variantId manquant");
          throw new UploadThingError("Missing Variant ID");
        }

        return { variantId: input.variantId };
      }
      
      if ("countryId" in input) {
        console.log("countryId reçu :", input.countryId);

        if (!input.countryId) {
          console.error("countryId manquant");
          throw new UploadThingError("Missing Country ID");
        }

        return { countryId: input.countryId };
      }

      throw new UploadThingError("Invalid input");
    })
    .onUploadComplete(async ({ metadata, file }) => {
      try {
        console.log("Métadonnées de l'upload :", metadata);
        console.log("Fichier uploadé :", file);

        if ("variantId" in metadata) {
          // Enregistrer dans phoneImage
          // await db.phoneImage.create({
          //   data: {
          //     url: file.url, // L'URL du fichier UploadThing
          //     description: null,
          //     variantId: metadata.variantId,
          //   },
          // });

          console.log("Image sauvegardée dans phoneImage !");
        } else if ("countryId" in metadata) {
          // Enregistrer directement dans country
          // await db.country.update({
          //   where: { id: metadata.countryId },
          //   data: {
          //     imageUrl: file.url, 
          //   },
          // });

          console.log("Image sauvegardée dans country !");
        } else {
          console.error("Aucune métadonnée valide pour l'enregistrement !");
        }
      } catch (error) {
        console.error("Erreur lors de la sauvegarde de l'image :", {
          metadata,
          file,
          error,
        });
      }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
