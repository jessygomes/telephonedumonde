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

    //! VOIR POUR STOKCER L'iMAGE DU PAYS ET L'URL DE L'IMAGE DANS LA BASE DE DONNEES (table Country)

    try {
      console.log(values);
      // await addCountry(values);
      // setSuccess("Pays ajouté avec succès");
      // form.reset();
      // setIsModalOpen(false);
      // router.refresh();
    } catch (error) {
      console.log(error);
      setError("Erreur lors de l'ajout du modèle");
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

        {/* MODIFER !!!! - INPUT POUR CHARGER UNE IMAGE */}
        <div className="flex flex-col gap-1">
          <label className="text-white text-sm" htmlFor="name">
            Ajouter le drapeau
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
          Ajouter le pays &rarr;
          <BottomGradient />
        </button>
      </form>
    </div>
  );
}
