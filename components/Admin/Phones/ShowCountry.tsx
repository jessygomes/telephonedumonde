 "use client";
import { useEffect, useState } from "react";
import { getCountries } from "@/lib/actions/country.actions";

export const ShowCountry = () => {
  const [countries, setCountries] = useState<{ id: string; name: string }[]>([]);

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

  return (
    <select
      className="p-1 px-4 rounded-md bg-noir-900 text-xs text-white border border-white/70"
      onChange={(e) => e.preventDefault()} 
      value="" 
    >
      <option value="" className="text-xs bg-noir-900">
        Voir tous les pays
      </option>
      {countries.map((country) => (
        <option key={country.id} value={country.name}>
          {country.name}
        </option>
      ))}
    </select>
  );
};
