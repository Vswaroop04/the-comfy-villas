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
          {" "}
          <div className="absolute text-white text-5xl font-bold p-8 bottom-14 left-5">
            Discover Extraordinary
          </div>
          <div
            className="absolute text-white text-5xl font-bold p-8 bottom-2 left-5
          "
          >
            Comfort Villas{" "}
          </div>{" "}
        </>
      ) : (
        <>  {" "}
          <div className="absolute text-white text-2xl font-bold p-8 bottom-14 left-5">
            Discover Extraordinary
          </div>
          <div
            className="absolute text-white text-2xl font-bold p-8 bottom-2 left-5
          "
          >
            Comfort Villas{" "}
          </div>{" "}</>
      )}
    </>
  );
};

export default Slide1;
