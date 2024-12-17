"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { countryFormSchema } from "@/lib/validator";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/Form/FormError";
import { FormSuccess } from "@/components/shared/Form/FormSucess";

import { BottomGradient } from "@/components/ui/BottomGradient";
import { addCountry } from "@/lib/actions/country.actions";
import { useUploadThing } from "@/lib/uploadthing";
import { db } from "@/lib/db";

type CountryFormProps = {
  userId: string | undefined;
  setIsModalOpen: (isOpen: boolean) => void;
};

export default function CountryForm({
  userId,
  setIsModalOpen,
}: CountryFormProps) {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [selectedPicture, setSelectedPicture] = useState<File[]>([]); // Fichiers sélectionnés
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof countryFormSchema>>({
    resolver: zodResolver(countryFormSchema),
    defaultValues: {
      name: "",
      imageUrl: "",
    },
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof countryFormSchema>) {
    setError("");
    setSuccess("");
  
    try {
      console.log("Données du formulaire :", values);
  
      // Étape 1 : Ajout du pays
      const newCountry = await addCountry(values, userId!) as {
        name: string;
        imageUrl: string | null;
        id: string;
      };
  
      if (!newCountry) {
        throw new Error("Erreur lors de l'ajout du pays");
      }
  
      console.log("Nouveau pays ajouté :", newCountry);
  
      // Étape 2 : Upload de l'image
      if (selectedPicture.length > 0) {
        const upload = await startUpload(selectedPicture, { countryId: newCountry.id });
  
        if (!upload || upload.length === 0) {
          throw new Error("Erreur lors de l'upload de l'image");
        }
  
        const imageUrl = upload[0].url;
  
        // Étape 3 : Mise à jour de l'URL de l'image dans la base de données
        await db.country.update({
          where: { id: newCountry.id },
          data: { imageUrl },
        });
  
        console.log("URL de l'image mise à jour :", imageUrl);
      }
  
      setSuccess("Pays ajouté avec succès");
      form.reset();
      setIsModalOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Erreur dans onSubmit :", error);
      setError("Erreur lors de l'ajout du pays");
    }
  }
  
  return (
    <div className="flex flex-col gap-8">
      {" "}
      <h3 className="text-white text-xl font-font1 tracking-widest">
        Ajouter un pays de provenance
      </h3>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm" htmlFor="name">
            Nom du pays
          </label>
          <Input
            id="name"
            type="text"
            placeholder="Japon"
            className="text-noir-900"
            {...form.register("name")}
          />
        </div>

        <div className="flex flex-col gap-1">
        <label className="text-white text-sm" htmlFor="images">
          Ajouter le drapeau
        </label>
        <input
          id="images"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]; // Prend uniquement le premier fichier
            if (file) {
              setSelectedPicture([file]); 
              console.log("Fichier sélectionné :", file);
            }
          }}
          className="text-noir-900"
        />
      </div>


        <FormError message={error} />
        <FormSuccess message={success} />

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Ajouter le pays &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}
