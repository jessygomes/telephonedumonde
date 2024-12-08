"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/Form/FormError";
import { FormSuccess } from "@/components/shared/Form/FormSucess";

import { cn } from "@/lib/utils/utils";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { modelFormSchema } from "@/lib/validator";
import { addModel, editModel } from "@/lib/actions/model.actions";

type PhoneFormProps = {
  userId: string | undefined;
  type: "add" | "edit";
  modelId?: string;
  model?: {
    id: string;
    brand: string;
    name: string;
    isActive: boolean;
  };
  setIsModalOpen: (isOpen: boolean) => void;
};

export default function ModelForm({
  userId,
  type,
  modelId,
  model,
  setIsModalOpen,
}: PhoneFormProps) {
  const router = useRouter();

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const initialValues =
    model && type === "edit"
      ? {
          brand: model?.brand,
          name: model?.name,
          isActive: model?.isActive,
        }
      : {
          brand: "",
          name: "",
          isActive: true,
        };

  //! Schema de validation
  const form = useForm<z.infer<typeof modelFormSchema>>({
    resolver: zodResolver(modelFormSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  //! Fonction de soumission du formulaire
  async function onSubmit(values: z.infer<typeof modelFormSchema>) {
    setError("");
    setSuccess("");

    if (type === "add") {
      try {
        if (!userId) {
          setError("Connectez-vous pour ajouter un modèle");
          return;
        }

        const newModel = await addModel(values, userId);

        if (newModel && "id" in newModel) {
          setSuccess("Modèle ajouté avec succès");
          // Fermer la modale
          setIsModalOpen(false);
          // rafraichir la liste des modèles
          router.refresh();
        }
      } catch (error) {
        console.log(error);
        setError("Erreur lors de l'ajout du modèle");
      }
    }

    if (type === "edit") {
      if (!modelId) {
        setError("Erreur lors de la récupération du modèle");
        return;
      }

      console.log(values);

      try {
        const updateModel = await editModel(userId as string, {
          id: modelId,
          brand: values.brand,
          name: values.name,
          isActive: values.isActive,
        });

        if (updateModel) {
          form.reset();
          setSuccess("Modèle modifié avec succès");
          // Fermer la modale
          setIsModalOpen(false);
          // rafraichir la liste des modèles
          router.refresh();
        }
      } catch (error) {
        console.log(error);
        setError("Erreur lors de la modification du modèle");
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
        <div className="flex gap-2">
          <div className="w-full">
            <label className="text-white text-sm" htmlFor="brand">
              Marque
            </label>
            <Input
              id="brand"
              placeholder="Apple"
              type="text"
              className="text-noir-900"
              {...form.register("brand")}
            />
          </div>
          <div className="w-full">
            <label className="text-white text-sm" htmlFor="name">
              Nom du modèle
            </label>
            <Input
              id="name"
              placeholder="iPhone 13 Pro Max"
              type="text"
              className="text-noir-900"
              {...form.register("name")}
            />
          </div>
        </div>

        <div className="flex items-center">
          <label className="text-white text-sm w-full" htmlFor="isActive">
            Afficher le modèle et ses variantes sur le site
          </label>
          <Input
            id="isActive"
            placeholder="iPhone 13 Pro Max"
            type="checkbox"
            className="h-5 w-5"
            defaultChecked={initialValues.isActive}
            {...form.register("isActive")}
          />
          <BottomGradient />
        </div>

        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          type="submit"
        >
          {type === "add" ? "Ajouter ce modèle" : "Modifier ce modèle"}
          <BottomGradient />
        </button>

        <FormError message={error} />
        <FormSuccess message={success} />
      </form>
    </div>
  );
}

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-1 w-full", className)}>
      {children}
    </div>
  );
};
