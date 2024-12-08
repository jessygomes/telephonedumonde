"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/Form/FormError";
import { FormSuccess } from "@/components/shared/Form/FormSucess";

import { BottomGradient } from "@/components/ui/BottomGradient";
import { variantFormSchema } from "@/lib/validator";

type VariantFormProps = {
  userId: string | undefined;
  type: "add" | "edit";
  modelId?: string;
  variant?: {
    id: string;
    price: number;
    memory: number;
    color: string;
    country: string;
    description: string;
    stock: number;
    imageUrl: string[];
    isActive: boolean;
  };
  setIsModalOpen: (isOpen: boolean) => void;
};

export default function VariantForm({
  userId,
  type,
  modelId,
  variant,
  setIsModalOpen,
}: VariantFormProps) {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const initialValues =
    variant && type === "edit"
      ? {
          price: variant?.price,
          memory: variant?.memory,
          color: variant?.color,
          country: variant?.country,
          description: variant?.description,
          imageUrl: variant?.imageUrl,
          stock: variant?.stock,
          isActive: variant?.isActive,
        }
      : {
          price: 0,
          memory: 0,
          color: "",
          country: "",
          description: "",
          imageUrl: [],
          stock: 0,
          isActive: true,
        };

  //! Schema de validation
  const form = useForm<z.infer<typeof variantFormSchema>>({
    resolver: zodResolver(variantFormSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  async function onSubmit(values: any) {
    setError("");
    setSuccess("");

    //! VOIR POUR STOKCER L'ES IMAGES ET STOCKER LES LIENS DANS LA BASE DE DONNEES (table PhoneImage)

    if (type === "add") {
      if (!userId) {
        setError("Connectez-vous pour ajouter un modèle");
        return;
      }

      try {
        console.log(values);
        // const newVariant = await addVariant(data, userId, modelId);

        // if (newVariant && "id" in newVariant) {
        //   setSuccess("Modèle ajouté avec succès");
        //   setIsModalOpen(false);
        //   router.refresh();
        // } else {
        //   setError(newVariant.error);
        // }
      } catch (error) {
        console.log(error);
        setError("Erreur lors de la création de la variante");
      }
    }

    if (type === "edit") {
      if (!variant?.id) {
        setError("Erreur los de la récpération de la variante");
        return;
      }

      try {
        console.log(values);
        // const updatedVariant = await updateVariant(data, variant.id);

        // if (updatedVariant && "id" in updatedVariant) {
        //   setSuccess("Modèle modifié avec succès");
        //   setIsModalOpen(false);
        //   router.refresh();
        // } else {
        //   setError(updatedVariant.error);
        // }
      } catch (error) {
        console.log(error);
        setError("Erreur lors de la modification de la variante");
      }
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-white text-xl font-font1 tracking-widest">
        {type === "add" ? "Ajouter un modèle" : "Modifier un modèle"}
      </h3>

      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <div className="flex gap-4">
          <div>
            <label className="text-white text-sm" htmlFor="price">
              Prix
            </label>
            <Input
              id="price"
              type="number"
              className="text-noir-900"
              {...form.register("price")}
            />
          </div>
          <div>
            <label className="text-white text-sm" htmlFor="memory">
              Stockage
            </label>
            <Input
              id="memory"
              type="number"
              className="text-noir-900"
              {...form.register("memory")}
            />
          </div>
          <div>
            <label className="text-white text-sm" htmlFor="color">
              Couleur
            </label>
            <Input
              id="color"
              placeholder="Blanc Neige"
              type="text"
              className="text-noir-900"
              {...form.register("color")}
            />
          </div>

          {/* CREER UN DROPDOWN MENU POUR CHOISIR UN PAYS - AFFICHER LA LISTE DES PAYS CREE  */}
          {/* Le pays doit être relié à la variante : voir schema.prisma */}

          {/* <div>
            <label className="text-white text-sm" htmlFor="color">
              Pays de provenance
            </label>
            <Input
              id="color"
              placeholder="Blanc Neige"
              type="text"
              className="text-noir-900"
              {...form.register("color")}
            />
          </div> */}
          <div>
            <label className="text-white text-sm" htmlFor="stock">
              Stock
            </label>
            <Input
              id="stock"
              placeholder="Blanc Neige"
              type="text"
              className="text-noir-900"
              {...form.register("stock")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm" htmlFor="color">
            Description
          </label>
          <textarea
            id="color"
            placeholder="Description du téléphone"
            className="text-noir-900 text-sm rounded-md p-2 h-32"
            {...form.register("color")}
          />
        </div>
        {/* MODIFER !!!! - INPUT POUR CHARGER LES IMAGES */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm" htmlFor="name">
            Ajouter les images
          </label>
          {/* <Input
            id="name"
            type="text"
            placeholder="Japon"
            className="text-noir-900"
            {...form.register("name")}
          /> */}
        </div>

        <FormError message={error} />
        <FormSuccess message={success} />

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          Ajouter la variante &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}
