"use client";

import Image from "next/image";
import React from "react";

const Slide2 = () => {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#99D8EA] to-[#2485A6]">
      <div className="imgCover absolute bottom-0 right-[15%] h-4/5 w-auto select-none z-10">
        <Image
          src="/assets/carousel/slide2.jpg"
          alt=""
          width={1600}
          height={550}
          priority
          className="h-full w-full -scale-x-100 object-cover"
        />
        <div className="absolute left-32 top-20 flex w-[50%] flex-col font-poppins text-4xl font-bold tracking-normal z-20">
          <span>
            Many <span className="text-white">5-star</span> Ratings
          </span>
          <span className="mb-8">Discover Luxury Rooms</span>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
