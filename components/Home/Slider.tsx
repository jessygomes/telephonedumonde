"use client";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./style.css";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Slider() {
  return (
    <>
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        effect={"fade"}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper rounded-md"
      >
        <SwiperSlide>
          <div className="relative h-full w-full justify-center rounded-md lg:wrapper mt-8">
            <Image
              src="/Carrousel/canada.png"
              alt="Logo"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="rounded-md pt-10"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>

            <h2 className="w-full absolute sm:left-10 inset-0 mt-14 sm:mt-24 text-center z-10">
              <span className="sm:mt-2 font-fontb text-white uppercase text-base sm:text-4xl font-extrabold tracking-wide">
                Découvrez nos téléphones
              </span>
              <br />
              <span className="block sm:mt-2 font-fontb text-base sm:text-4xl text-white uppercase font-extrabold">
                Made in{" "}
                <span className="text-white font-extrabold">
                  Can<span className="text-primary-600">ada</span>
                </span>
              </span>
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full w-full justify-center rounded-md lg:wrapper mt-4 sm:mt-8">
            <Image
              src="/Carrousel/inde.png"
              alt="Logo"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="rounded-md pt-10"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>

            <h2 className="w-full absolute sm:left-10 inset-0 mt-14 sm:mt-24 text-center z-10">
              <span className="sm:mt-2 font-fontb text-white uppercase text-base sm:text-4xl font-extrabold tracking-wide">
                Découvrez nos téléphones
              </span>
              <br />
              <span className="block sm:mt-2 font-fontb text-base sm:text-4xl text-white uppercase font-extrabold">
                Made in{" "}
                <span className="text-white font-extrabold">
                  In<span className="text-second-600">dia</span>
                </span>
              </span>
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full w-full justify-center rounded-md lg:wrapper mt-4 sm:mt-8">
            <Image
              src="/Carrousel/Singapore.png"
              alt="Logo"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="rounded-md pt-10"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>

            <h2 className="w-full absolute sm:left-10 inset-0 mt-14 sm:mt-24 text-center z-10">
              <span className="sm:mt-2 font-fontb text-white uppercase text-base sm:text-4xl font-extrabold tracking-wide">
                Découvrez nos téléphones
              </span>
              <br />
              <span className="block sm:mt-2 font-fontb text-base sm:text-4xl text-white uppercase font-extrabold">
                Made in{" "}
                <span className="text-white font-extrabold">
                  Singa<span className="text-primary-600">pore</span>
                </span>
              </span>
            </h2>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative h-full w-full justify-center rounded-md lg:wrapper mt-4 sm:mt-8">
            <Image
              src="/Carrousel/japon.png"
              alt="Logo"
              layout="fill"
              objectFit="cover"
              objectPosition="top"
              className="rounded-md pt-10"
              quality={100}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-noir-900 to-transparent h-32 z-0"></div>

            <h2 className="w-full absolute sm:left-10 inset-0 mt-14 sm:mt-24 text-center z-10">
              <span className="sm:mt-2 font-fontb text-white uppercase text-base sm:text-4xl font-extrabold tracking-wide">
                Découvrez nos téléphones
              </span>
              <br />
              <span className="block sm:mt-2 font-fontb text-base sm:text-4xl text-white uppercase font-extrabold">
                Made in{" "}
                <span className="text-white font-extrabold">
                  Ja<span className="text-primary-600">pon</span>
                </span>
              </span>
            </h2>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
