import ProductCardDetail from "@/components/Boutique/DetailProduit/ProductCardDetail";
import CardModel from "@/components/Cards/CardModel";
import Slider from "@/components/Home/Slider";
import { BottomGradient } from "@/components/ui/BottomGradient";
import Image from "next/image";

import Link from "next/link";

// import { BiWorld } from "react-icons/bi";
import { TbTruckDelivery } from "react-icons/tb";
import { ImPriceTags } from "react-icons/im";
// import { VelocityScroll } from "@/components/ui/Velocity";

export default function Home() {
  return (
    <>
      <section className="">
        <div className="h-[95vh] px-4 lg:px-0 sm:h-[60vh] lg:h-[60vh] 2xl:h-[75vh] bg-gradient-to-t from-noir-900 via-noir-900 to-noir-900">
          <div className="hidden sm:block relative h-full w-full">
            <div className="h-full">
              <Slider />
            </div>
            <h1 className="z-50 absolute top-3 left-1/2 transform -translate-x-1/2 text-xl font-font1 inline-block p-4 mb-5 border rounded-md text-white tracking-widest">
              Téléphone du Monde
            </h1>{" "}
            <Link
              href="/boutique"
              className="absolute -bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r px-2 group/btn from-primary-900  to-primary-500 w-1/3 text-white text-center flex items-center justify-center rounded-md h-10 uppercase font-font1 font-extrabold tracking-wide z-10"
            >
              Voir la boutique
              <BottomGradient />
            </Link>
          </div>

          <div className="sm:hidden px-4 relative h-4/5 justify-center rounded-md wrapper mt-8">
            <div className="h-full">
              <Slider />
            </div>
            <h1 className="z-50 absolute top-3 left-1/2 transform -translate-x-1/2 text-xs font-font1 inline-block p-4 mb-5 border rounded-md text-white tracking-widest">
              Téléphone du Monde
            </h1>{" "}
            <Link
              href="/boutique"
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 bg-gradient-to-r group/btn from-primary-900 to-primary-500 w-2/3 text-white text-center flex items-center justify-center rounded-md h-10 uppercase font-font1 font-extrabold tracking-wide z-10"
            >
              Voir la boutique
              <BottomGradient />
            </Link>
          </div>
        </div>
      </section>

      <section className="wrapper lg:mt-20">
        <div className="text-base md:text-2xl font-font1 flex flex-col gap-2">
          <p className="gradient-text">
            Vous n&apos;arrivez pas à faire un choix de téléphone ?
          </p>
          <span className="text-xl md:text-5xl font-font1 font-extrabold text-white">
            Nos modèles les plus populaires !
          </span>
          <div className="pb-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-12 w-full mt-10 rounded-md">
            <CardModel />
            <CardModel />
            <CardModel />
            <CardModel />
          </div>
        </div>
      </section>

      <section className="mt-10 bg-gradient-to-t from-noir-900 to-black">
        <div className="flex-center flex-col gap-10 lg:gap-20">
          <div className="bg-gradient-to-t from-primary-600 to-primary-900 w-full h-12 flex-center flex-wrap gap-4 lg:gap-20">
            <p className="flex gap-2 items-center text-white uppercase text-xs lg:text-base font-fontb font-bold tracking-widest">
              <TbTruckDelivery size={20} /> Livraison 5 à 7 jours
            </p>

            <p className="flex gap-2 items-center text-white uppercase text-xs lg:text-base font-fontb font-bold tracking-widest">
              <ImPriceTags size={20} /> Prix réduit
            </p>
          </div>

          <ProductCardDetail />
        </div>
      </section>

      {/* <BiWorld size={45} className="text-white text-center w-full mt-16" /> */}

      <section className="relative wrapper">
        <div className="flex flex-col lg:gap-2 mt-10">
          {/* <div className="">
            <h3 className="wrapper text-base md:text-2xl font-font1 text-white flex flex-col md:flex-row items-center gap-4 lg:gap-8 pt-8 pb-4 sm:pb-2 lg:pt-8">
              <BiWorld size={45} />
              <span className="text-2xl md:text-5xl font-font1 font-extrabold text-white">
                Téléphone du Monde, c&apos;est quoi ?
              </span>
            </h3>
          </div> */}

          <div className="lg:wrapper flex flex-col sm:flex-row items-start lg:gap-0 sm:h-[400px]">
            <div className="flex flex-col justify-center gap-2 lg:gap-10 sm:w-1/2 pl-8 pr-8 bg-gradient-to-t from-primary-900 to-primary-500 sm:h-[400px] rounded-t-md lg:rounded-l-md lg:rounded-tr-none">
              <p className="flex-center items-center pt-4 lg:pt-0 text-base md:text-xl font-font1 text-white ">
                <span className="text-lg lg:text-xl font-font1 inline-block p-4 border rounded-md text-white tracking-widest">
                  Téléphone du monde, c&apos;est quoi ?
                </span>{" "}
              </p>
              <p className="pb-4 lg:pb-0 text-white text-sm md:text-sm font-font1">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque
                iste quos quisquam autem neque aut illo assumenda doloremque
                quasi accusamus? Ipsa repellat, temporibus nemo nam cumque
                veniam consequatur animi voluptatibus! Lorem ipsum dolor sit
                amet consectetur adipisicing elit. Eaque iste quos quisquam
                autem neque aut illo assumenda doloremque quasi accusamus? Ipsa
                repellat, temporibus nemo nam cumque veniam consequatur animi
                voluptatibus!
              </p>
            </div>
            <div className="relative w-full h-52 lg:h-[400px] sm:w-1/2 rounded-b-md lg:rounded-r-md lg:rounded-bl-none overflow-hidden">
              <Image
                src="/Carrousel/canada.png"
                layout="fill"
                objectFit="cover"
                alt="flag"
              />
            </div>
          </div>
          <button className="mt-4 lg:mt-10 lg:mx-auto bg-gradient-to-r group/btn from-primary-900 to-primary-500 w-full lg:w-1/3 text-white text-center flex items-center justify-center rounded-md h-10 uppercase font-font1 font-extrabold tracking-wide z-10">
            <Link href="/concept">En savoir plus</Link>
          </button>
        </div>
      </section>
      {/* <div className="mt-10 flex-center gap-20 p-4">
        <VelocityScroll
          text="CANADA - JAPON - INDE - SINGAPORE - "
          default_velocity={1}
          className="text-white uppercase text-lg font-font1 font-bold tracking-widest"
        />
      </div> */}
    </>
  );
}
