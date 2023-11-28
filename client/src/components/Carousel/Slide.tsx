// First, ensure the chosen font is imported in your global CSS or in the relevant component.

"use client";

import useResponsive from "@/hooks/useResponsive";
import Image from "next/image";
import React from "react";
import { SwiperSlide } from "swiper/react";

const Slide1 = () => {
  const isLg = useResponsive("lg");

  return (
    <>
      <div className="absolute bg-white top-5 rounded-lg"></div>
      {isLg ? (
        <>
          <div className="absolute text-white font-[Your-Font-Name] text-[48px] lg:text-[64px] font-semibold p-8 bottom-14 left-5 leading-tight">
            Discover Extraordinary
          </div>
          <div className="absolute text-white font-[Your-Font-Name] text-[48px] lg:text-[64px] font-semibold p-8 bottom-2 left-5 leading-tight">
            Comfort Villas
          </div>
        </>
      ) : (
        <>
          <div className="absolute text-white font-[Your-Font-Name] text-[36px] sm:text-[48px] font-semibold p-10 top-60 left-5 leading-normal">
            Discover Extraordinary
          </div>
          <div className="absolute text-white font-[Your-Font-Name] text-[36px] sm:text-[48px] font-semibold p-8 top-80 left-10 leading-normal">
            Comfort Villas
          </div>
        </>
      )}
    </>
  );
};

export default Slide1;
