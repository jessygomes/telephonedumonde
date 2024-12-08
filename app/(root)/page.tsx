"use client ";

import Image from "next/image";

export default function Home() {
  return (
    <section className="">
      {/* <div className="flex flex-col gap-12"> */}
      {/* <h1 className="wrapper text-white font-font1 text-2xl text-center">
          TELEPHONE DU MONDE
        </h1> */}
      <div className="relative h-screen">
        <Image
          src="/Carrousel/canada.png"
          alt="Logo"
          width={1920}
          height={1080}
          className="relative rounded-md h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-28"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-28"></div>
        <div className="absolute bottom-0 bg-gradient-to-t from-noir-900 to-white h-28"></div>
      </div>
      {/* </div> */}
    </section>
  );
}
