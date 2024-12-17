"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils/utils";
import { showAllBrands } from "@/lib/actions/model.actions";

const FilterBrand = () => {
  const router = useRouter();
  const [brands, setBrands] = useState<any[]>([]);

  const searchParams = useSearchParams();

  useEffect(() => {
    const getAllBrands = async () => {
      const brandList = await showAllBrands();
      brandList && setBrands(brandList);
    };
    getAllBrands();
  }, [setBrands]);

  console.log(brands);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {}, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [brands, searchParams, router]);

  const onSelectCategory = (category: string) => {
    let newUrl = "";
    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "brand",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["brand"],
      });
    }

    router.push(newUrl, { scroll: false });
  };

  return (
    <select
      onChange={(event) => onSelectCategory(event.target.value)}
      className="p-1 px-4 rounded-md bg-noir-900 text-xs font-font1 text-white border border-white/70"
    >
      <option value="" className="text-xs font-font1 bg-noir-900">
        Toutes les marques
      </option>
      {brands.map((brand) => (
        <option key={brand} value={brand}>
          {brand}
        </option>
      ))}
    </select>
  );
};

export default FilterBrand;
