"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils/utils";

export const Search = () => {
  const router = useRouter();

  const [query, setQuery] = useState("");

  // Utliser le hook useSearchParams pour récupérer les paramètres de l'url pour la recherche
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="overflow-hidden rounded-md border-none">
      <Input
        type="text"
        placeholder="Rechercher un modèle"
        onChange={(e) => setQuery(e.target.value)}
        className="bg-noir-900 text-white h-fit text-xs placeholder:text-xs"
      />
    </div>
  );
};
