"use client ";

import Image from "next/image";

export default function Home() {
  return (
    <section className="">
      <div className="flex flex-col gap-12">
        {/* <h1 className="wrapper text-xl font-bold font-font1 uppercase text-white text-center tracking-widest">
          téléphone du monde
        </h1> */}

        <div></div>

        <div className="">
          <Image
            src="/Carrousel/canada.png"
            alt="Logo"
            width={2000}
            height={2000}
            className="w-full"
          />
        </div>
      </div>
    </section>
  );
}
