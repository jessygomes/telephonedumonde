"use client";

import React, { useState } from "react";
import AddVariantBtn from "@/components/Admin/Phones/addVariantBtn";
import EditVariantBtn from "./EditVariantBtn";
import DeleteVariantBtn from "./DeleteVariantBtn";

export default function ShowVariant({userId,modelId,variants,} : {
  userId: string | undefined;
  modelId: string;
  variants: Array<{
    id: string;
    memory: number;
    color: string;
    price: number;
    description: string;
    model: { name: string };
    images: Array<{ url: string }>;
    country: string;
  }>;
}) {
  const [isModalImageOpen, setIsModalImageOpen] = useState(false);
  const [selectedVariantImages, setSelectedVariantImages] = useState<string[]>([]);

  const openImageModal = (images: string[]) => {
    setSelectedVariantImages(images);
    setIsModalImageOpen(true);
  };

  const closeModal = () => {
    setSelectedVariantImages([]);
    setIsModalImageOpen(false);
  };;

  if (!variants || variants.length === 0) {
    return (
      <section className="wrapper flex flex-col gap-10">
        <div className="flex gap-12 items-center">
          <h2 className="font-font1 text-white">Variantes du modèle</h2>
          <AddVariantBtn userId={userId} modelId={modelId} />
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
        <AddVariantBtn userId={userId} modelId={modelId} />
      </div>

      <div className="flex flex-col gap-2">
        {variants.map((variant) => (
          <div key={variant.id} className="grid grid-cols-8 items-center gap-12 px-5 bg-noir-800 text-white font-font1 p-2 rounded-md">

            <p className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>
                {variant.model.name}
            </p>

            <p className="flex gap-2"> 
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 14.25h13.5m-13.5 0a3 3 0 0 1-3-3m3 3a3 3 0 1 0 0 6h13.5a3 3 0 1 0 0-6m-16.5-3a3 3 0 0 1 3-3h13.5a3 3 0 0 1 3 3m-19.5 0a4.5 4.5 0 0 1 .9-2.7L5.737 5.1a3.375 3.375 0 0 1 2.7-1.35h7.126c1.062 0 2.062.5 2.7 1.35l2.587 3.45a4.5 4.5 0 0 1 .9 2.7m0 0a3 3 0 0 1-3 3m0 3h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Zm-3 6h.008v.008h-.008v-.008Zm0-6h.008v.008h-.008v-.008Z" />
                </svg>
                {variant.memory} GB
            </p>

            <p className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.4 2.245 4.5 4.5 0 0 0 8.4-2.245c0-.399-.078-.78-.22-1.128Zm0 0a15.998 15.998 0 0 0 3.388-1.62m-5.043-.025a15.994 15.994 0 0 1 1.622-3.395m3.42 3.42a15.995 15.995 0 0 0 4.764-4.648l3.876-5.814a1.151 1.151 0 0 0-1.597-1.597L14.146 6.32a15.996 15.996 0 0 0-4.649 4.763m3.42 3.42a6.776 6.776 0 0 0-3.42-3.42" />
                </svg>
                {variant.color}
            </p>

            <p className="flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mt-1">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 7.756a4.5 4.5 0 1 0 0 8.488M7.5 10.5h5.25m-5.25 3h5.25M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                </svg>
                {variant.price} euros
            </p>

            <p className="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
                {variant.country}
            </p>

            <p className="flex gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 mt-1">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
              {variant.description.slice(0, 20)}
            </p>

            <div className="flex gap-2">
              <EditVariantBtn userId={userId || ''} modelId={variant.id} variant={{
                ...variant,
                stock: 0,
                isActive: true, 
                imageUrl: variant.images.map(image => image.url),
                //country: variant.country
              }} />
                
              <DeleteVariantBtn 
                variantId={variant.id} 
                setIsModalOpen={setIsModalImageOpen} 
                userId={userId || ''} 
                modelId={modelId} 
              />
            </div>
            <button type="button" className="bg-noir-600 px-10 rounded-md text-xs"  onClick={() => openImageModal(variant.images.map((image) => image.url))}>
              Voir les images
            </button>
          </div>


        ))}

      {isModalImageOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black bg-opacity-50">
          <div className="relative flex flex-col bg-noir-800 max-w-4xl w-full p-5 rounded-lg shadow-lg">
            <div className="grid grid-cols-3 gap-2 justify-center items-center">
              {selectedVariantImages.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="rounded-md object-cover h-56 w-56 mx-auto"
                />
              ))}
            </div>
            <button
              onClick={closeModal}
              className="bg-white text-noir-800 rounded-md tracking-widest font-semibold mt-5 py-2 px-4 mx-auto"
            >
              Fermer
            </button>
          </div>
        </div>
      )}

      </div>
     
    </section>
  );
}
