import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function CardModel() {
  return (
    <Link
      href="/"
      className="relative group w-full pt-4 hover:shadow-2xl transition-all ease-in-out duration-300 rounded-md"
    >
      {/* IMAGE TEL */}
      <div className="w-full z-20 flex flex-center flex-col">
        <Image
          src="/Carrousel/iphone.webp"
          height={1000}
          width={1000}
          alt="iPhone 14 Pro"
          className="rounded-md w-2/5 group-hover:scale-110 transition-all ease-in-out duration-300"
        />
      </div>

      {/* INFOS */}
      <div className="bg-gradient-to-b from-noir-900 to-noir-800 h-[150px] sm:h-[150px] -mt-10 rounded-md transition-all ease-in-out duration-300 z-10">
        <div className="lg:wrapper">
          <p className="pt-12 pb-1 text-xs text-noir-100 text-center lg:pt-8">
            Apple
          </p>
          <h3 className="text-white font-font1 text-base sm:text-lg text-center pb-2">
            iPhone 16
          </h3>
          <p className="text-white font-font1 font-bold text-sm sm:text-xl text-center">
            <span className="text-xs font-normal">
              {"À".toUpperCase()} partir de{" "}
            </span>
            899,90 €
          </p>
        </div>
      </div>
    </Link>
  );
}
