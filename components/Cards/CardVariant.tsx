import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardVariant() {
  return (
    <Link
      href="/"
      className="relative group w-[45%] sm:w-2/5 lg:w-1/6 pt-4 hover:shadow-2xl transition-all ease-in-out duration-300 rounded-md"
    >
      {/* DRAPEAU */}
      <div className="absolute top-0 right-0 w-8 h-8 rounded-md group-hover:w-full group-hover:h-10 transition-all ease-in-out duration-300">
        <Image
          src="/Carrousel/flagcanada.webp"
          height={1000}
          width={1000}
          alt="iPhone 14 Pro"
          className="rounded-md object-cover h-full"
        />
      </div>

      {/* IMAGE TEL */}
      <div className="w-full z-20 flex flex-center flex-col">
        <Image
          src="/Carrousel/iphone.webp"
          height={1000}
          width={1000}
          alt="iPhone 14 Pro"
          className="rounded-md w-3/5 group-hover:scale-110 transition-all ease-in-out duration-300"
        />
      </div>

      {/* INFOS */}
      <div className="bg-gradient-to-b from-noir-900 to-noir-800 h-[160px] lg:h-[150px] -mt-10 rounded-md transition-all ease-in-out duration-300 z-10">
        <div className="wrapper ">
          <p className="pt-8 pb-1 text-xs text-noir-100 text-center">Apple</p>
          <h3 className="text-white font-font1 text-base lg:text-lg sm:text-center pb-2">
            iPhone 16 <span className="text-xs">128 Go, Titane Noir</span>
          </h3>
          <p className="text-white font-font1 font-bold text-base lg:text-xl text-center">
            899,90 €
          </p>
        </div>
      </div>
    </Link>
  );
}
