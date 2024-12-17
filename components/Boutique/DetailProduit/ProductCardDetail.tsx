import React from "react";
import Gallery from "./Gallery";
import { BottomGradient } from "@/components/ui/BottomGradient";

export default function ProductCardDetail() {
  return (
    <div className="flex flex-col gap-2 md:flex-row md:gap-6">
      <Gallery />

      <div className="text-white flex flex-col justify-between gap-6 px-4">
        <span className="text-xs font-fontb text-white/20">Apple</span>
        <div className="flex justify-between items-center gap-10">
          <h3 className="font-font1 text-lg"> iPhone 14 Pro</h3>

          <p className="font-font1">899,90 €</p>
        </div>

        <button className="text-left text-xs font-font1 text-noir-100 hover:text-white/60">
          Voir les caractéristiques
        </button>

        <div className="flex flex-col gap-2">
          <p className="text-base">Couleur</p>
          <div className="flex flex-wrap gap-2 lg:gap-6 text-xs">
            <button className="font-font1 border rounded-md px-4 lg:py-1 w-24">
              Sable
            </button>
            <button className="font-font1 border rounded-md py-1 w-24">
              Titane Blanc
            </button>
            <button className="font-font1 border rounded-md py-1 w-24">
              Titane Naturel
            </button>
            <button className="font-font1 border rounded-md py-1 w-24">
              Titane Noir
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-base">Capacité</p>
          <div className="flex flex-wrap gap-2 lg:gap-6 text-xs">
            <button className="font-font1 border rounded-md py-1 w-24">
              126 GO
            </button>
            <button className="font-font1 border rounded-md py-1 w-24">
              256 GO
            </button>
            <button className="font-font1 border rounded-md py-1 w-24">
              356 GO
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-base">Pays</p>
          <div className="flex flex-wrap gap-2 lg:gap-6 text-xs">
            <button className="font-font1 border rounded-md py-1 w-24">
              Inde
            </button>
            <button className="font-font1 border rounded-md py-1 w-24">
              Canada
            </button>
            <button className="font-font1 border rounded-md py-1 w-24">
              Japon
            </button>
          </div>
        </div>

        <button className="font-font1 text-lg uppercase bg-gradient-to-t px-2 relative group/btn from-primary-900  to-primary-500 block w-full text-white rounded-md h-10 font-medium  ">
          Ajouter au panier
          <BottomGradient />
        </button>
      </div>
    </div>
  );
}
