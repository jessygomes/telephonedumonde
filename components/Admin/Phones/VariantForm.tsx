"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { Input } from "@/components/ui/input";
import { FormError } from "@/components/shared/Form/FormError";
import { FormSuccess } from "@/components/shared/Form/FormSucess";
import { BottomGradient } from "@/components/ui/BottomGradient";
import { variantFormSchema } from "@/lib/validator";
import { addVariant, updateVariant} from "@/lib/actions/variant.actions";
import { getCountries } from "@/lib/actions/country.actions";
import { useUploadThing } from "@/lib/uploadthing";

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

export default function VariantForm({ userId, type, modelId, variant, setIsModalOpen }: VariantFormProps) {
  const router = useRouter();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Fichiers sélectionnés
  const { startUpload, isUploading } = useUploadThing("imageUploader");

  const variantId = variant?.id;


  useEffect(() => {
    async function fetchCountries() {
      try {
        const fetchedCountries = await getCountries();
        setCountries(fetchedCountries);
      } catch (error) {
        console.error("Erreur lors de la récupération des pays :", error);
      }
    }

    fetchCountries();
  }, []);

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
          modelId: modelId,
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
          modelId: modelId || "",
        };

  const form = useForm<z.infer<typeof variantFormSchema>>({
    resolver: zodResolver(variantFormSchema),
    defaultValues: initialValues,
    mode: "onSubmit",
  });

  async function onSubmit(values: z.infer<typeof variantFormSchema>) {
    setError("");
    setSuccess("");
  
    if (type === "add") {
      try {
        if (!modelId) {
          setError("modelId est requis pour ajouter une variante.");
          return;
        }
  
        // Upload des fichiers
        let imageUrls: string[] = [];
        if (selectedFiles.length > 0) {
          const uploadedImages = await startUpload(selectedFiles, { variantId: modelId });
  
          if (!uploadedImages || uploadedImages.length === 0) {
            throw new Error("Échec de l'upload des images.");
          }
  
          imageUrls = uploadedImages.map((file) => file.url);
          console.log("URLs des images uploadées :", imageUrls);
        }
  
        if (imageUrls.length === 0) {
          setError("Aucune image n'a été uploadée.");
          return;
        }
  
        // Ajoute les URLs au formulaire
        values.imageUrl = imageUrls;
  
        // Crée la variante
        const newVariant = await addVariant(values, userId!, modelId);
  
        if (!newVariant || !("id" in newVariant)) {
          setError("Échec lors de la création de la variante");
          return;
        }
  
        setSelectedFiles([]);
        setSuccess("Variante et images ajoutées avec succès !");
        setIsModalOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Erreur dans onSubmit :", error);
        setError("Erreur lors de l'ajout de la variante.");
      }
    }

    if (type === "edit") {
      try {

        if (!modelId) {
          setError("modelId est requis pour ajouter une variante.");
          return;
        }

        let imageUrls = values.imageUrl || [];

        if (selectedFiles.length > 0) {
          const uploadedImages = await startUpload(selectedFiles, { variantId: modelId });
    
          if (!uploadedImages || uploadedImages.length === 0) {
            throw new Error("Échec de l'upload des images.");
          }
    
          const newImageUrls = uploadedImages.map((file) => file.url);
          imageUrls = [...newImageUrls]; 
          console.log("URLs des images après upload :", imageUrls);
        }

        values.imageUrl = imageUrls;

        if (!variantId) {
          setError("variantId est requis pour éditer une variante.");
          return;
        }

        const updatedVariant = await updateVariant(variantId, values);

        if (!updatedVariant || !("id" in updatedVariant)) {
          setError("Échec lors de l'édition de la variante.");
          return;
        }

        console.log("Variante mise à jour :", updatedVariant);

        setSelectedFiles([]);
        setSuccess("Variante modifiée avec succès !");
        setIsModalOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Erreur dans onSubmit :", error);
        setError("Erreur lors de l'édition de la variante.");
      }
    }
  }
  

  return (
    <div className="flex flex-col gap-8">
      <h3 className="text-white text-xl font-font1 tracking-widest">
        {type === "add" ? "Ajouter un modèle" : "Modifier un modèle"}
      </h3>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div className="flex gap-4">

          <div>
            <label className="text-white text-sm" htmlFor="price">Prix</label>
            <Input id="price" type="number" className="text-noir-900" defaultValue={initialValues.price} {...form.register("price", { valueAsNumber: true })}/>
          </div>

          <div>
            <label className="text-white text-sm" htmlFor="memory">Stockage</label>
            <Input id="memory" type="number" className="text-noir-900"  defaultValue={initialValues.memory} {...form.register("memory", { valueAsNumber: true })}/>
          </div>

          <div>
            <label className="text-white text-sm" htmlFor="color">Couleur</label>
            <Input id="color" placeholder="Blanc Neige" type="text" className="text-noir-900"  defaultValue={initialValues.color} {...form.register("color")}/>
          </div>

          <div>
            <label className="text-white text-sm" htmlFor="country">Pays de provenance</label>
            <select id="country" {...form.register("country")} className="text-noir-900" defaultValue={initialValues.country}>
              <option value="">-- Sélectionnez un pays --</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-white text-sm" htmlFor="stock">
              Stock
            </label>
            <Input
              id="stock"
              type="number"
              className="text-noir-900"
              defaultValue={initialValues.stock}
              {...form.register("stock", { valueAsNumber: true })}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-white text-sm" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Description du téléphone"
            className="text-noir-900 text-sm rounded-md p-2 h-32"
            defaultValue={initialValues.description}
            {...form.register("description")}
          />
        </div>

        {/* Upload des Images */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm" htmlFor="images">
            {type === "add" ? "Ajouter les images" : "Rajouter des images"}
            
          </label>
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => {
              const files = e.target.files;
              if (files) {
                setSelectedFiles(Array.from(files));
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
           {type === "add" ? "Ajouter la variante →" : "Modifier la variante →"}
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}
