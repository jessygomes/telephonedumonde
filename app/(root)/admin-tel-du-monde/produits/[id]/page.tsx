import AddVariantBtn from "@/components/Admin/Phones/addVariantBtn";
import { showVariantsByModel } from "@/lib/actions/variant.actions";
import { currentUser } from "@/lib/auth";
import React from "react";

export default async function VariantsAdminPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { id } = params;

  const user = await currentUser();

  const variants = await showVariantsByModel(id);

  if (!variants || variants.length === 0) {
    return (
      <section className="wrapper flex flex-col gap-10">
        <div className="flex gap-12 items-center">
          <h2 className="font-font1 text-white">Variantes du modèle</h2>
          <AddVariantBtn userId={user?.id} modelId={id} />
        </div>
        <p className="text-white bg-noir-800 p-1 rounded-md text-center">
          Il n'y a pas de variantes pour ce modèle.
        </p>
      </section>
    );
  }

  return (
    <section className="wrapper">
        <div className="flex gap-9 mb-5 items-center">
          <h2 className="font-font1 text-white">Variantes du modèle</h2>
          <AddVariantBtn userId={user?.id} modelId={id} />
        </div>
      <div className="grid grid-cols-2 gap-2">
        {variants.map((variant) => (
          <div
            key={variant.id}
            className="bg-noir-800 text-white font-font1 p-2 rounded-md hover:bg-noir-700 transition-all ease-in-out duration-150 text-center"
          >
            <p>1 | {variant.id}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
