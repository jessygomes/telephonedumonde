import Image from "next/image";

import { BiWorld } from "react-icons/bi";

export default function Home() {
  return (
    <>
      <section className="">
        {/* <div className="flex flex-col gap-12"> */}
        {/* <h1 className="wrapper text-white font-font1 text-2xl text-center">
        TELEPHONE DU MONDE
      </h1> */}
        <div className="h-[90vh] relative ">
          <Image
            src="/Carrousel/canada.png"
            alt="Logo"
            width={1920}
            height={1080}
            className="relative rounded-md h-full object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32"></div>
          <div className="absolute bottom-0 bg-gradient-to-t from-noir-900 to-white h-28"></div>
        </div>
        {/* <div className="h-[1px] w-full bg-white neon-bg" /> */}
        {/* </div> */}
      </section>

      <section className="wrapper flex flex-col gap-8 mt-10">
        <div className="text-2xl font-font1 flex flex-col gap-2">
          <p className="gradient-text">
            Vous n&apos;arrivez pas à faire un choix de téléphone ?
          </p>
          <span className="text-5xl font-font1 text-white">
            Découvrez notre Module qui vous aidera à choisir !
          </span>
        </div>
        <div className="h-[1px] w-2/3 bg-gradient-to-r from-white to-noir-900" />
        <div className="h-[300px]"></div>
      </section>

      <section className="wrapper flex flex-col gap-8 mt-10">
        <h3 className="text-2xl font-font1 text-primary-500 flex items-center gap-8">
          <BiWorld size={45} />
          <span className="text-5xl font-font1 text-white">
            Téléphone du Monde, c&apos;est quoi ?
          </span>
        </h3>
        <div className="flex justify-end">
          <div className="h-[1px] w-2/3 bg-gradient-to-l from-white to-noir-900" />
        </div>
        <div className="h-[300px]"></div>
      </section>
    </>
  );
}
