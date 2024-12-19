"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Gallery({ imageUrl }: { imageUrl: string[] }) {
  const defaultImage = "/Carrousel/iphone.webp";

  const images = imageUrl && imageUrl.length > 0 ? imageUrl : [defaultImage];

  const [mainImage, setMainImage] = useState(images[0]);

  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      setMainImage(imageUrl[0]);
    } else {
      setMainImage(defaultImage);
    }
  }, [imageUrl]);

  return (
    <div className="flex flex-col justify-center items-center gap-2 w-full lg:max-w-fit">
      <Image
        src={mainImage}
        alt="produit"
        width={800}
        height={800}
        className="w-48 lg:w-80 lg:h-80 object-cover"
      />
      <div className="flex gap-2 justify-center md:justify-normal overflow-auto tailwind-scrollbar-hide">
        {images.map((image, index) => (
          <Image
            key={index}
            src={image}
            alt="produit"
            width={200}
            height={200}
            className={`w-16 lg:w-20 lg:h-20 object-cover cursor-pointer filter grayscale transition-all ease-in-out ${
              mainImage === image ? "filter-none" : ""
            }`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
    </div>
  );
}
