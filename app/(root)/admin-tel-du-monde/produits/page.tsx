import AddCountryBtn from "@/components/Admin/Phones/AddCountryBtn";
import AddModelButton from "@/components/Admin/Phones/addModelBtn";
import DeleteModalButton from "@/components/Admin/Phones/DeleteModalBtn";
import EditModelButton from "@/components/Admin/Phones/EditModelBtn";
import FilterBrand from "@/components/Admin/Phones/FilterBrand";
import { Search } from "@/components/Admin/Phones/Search";

import { showAllModels } from "@/lib/actions/model.actions";
import { currentUser } from "@/lib/auth";
import Link from "next/link";

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const user = await currentUser();

  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const brand = (searchParams?.brand as string) || "";

  const models = await showAllModels({ query: searchText, brand, page });

  return (
    <section className="wrapper flex flex-col gap-8">
      <div className="flex gap-12 items-center justify-between">
        <h2 className="font-font1 text-white">
          Tous les modèles ({models.data.length})
        </h2>
        <div className="flex gap-4">
          <AddModelButton userId={user?.id} />
          <AddCountryBtn userId={user?.id} />
        </div>
      </div>

      <div className="flex gap-2">
        <Search />
        <FilterBrand />
      </div>

      {models.data.length === 0 && (
        <p className="text-white bg-noir-800 p-2 text-center rounded-md">
          Aucun modèle
        </p>
      )}

      <div className="grid grid-cols-1 gap-2">
        {models.data.map((model) => (
          <div
            key={model.id}
            className="bg-noir-800 grid grid-cols-6 items-center text-white font-font1 p-2 rounded-md "
          >
            <p>{model.brand}</p>
            <p>{model.name}</p>
            <p>{model.variantCount} variantes</p>
            <p>Actif : {model.isActive ? "Oui" : "Non"}</p>
            <div className="flex gap-2 justify-center items-center">
              <EditModelButton
                userId={user?.id}
                model={model}
                modelId={model.id}
              />
              <DeleteModalButton userId={user?.id} modelId={model.id} />
            </div>
            <Link
              href={`/admin-tel-du-monde/produits/${model.id}`}
              className="bg-noir-600 text-center rounded-md hover:bg-noir-200"
            >
              Voir les variantes
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
