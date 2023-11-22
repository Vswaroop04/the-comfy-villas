"use client";

import Image from "next/image";
import React from "react";

const Slide4 = () => {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#99D8EA] to-[#2485A6]">
      <div className="imgCover absolute bottom-0 right-[15%] h-4/5 w-auto select-none z-10">
        <Image
          src="/assets/carousel/slide4.jpg"
          alt=""
          width={1600}
          height={500}
          priority
          className="h-full w-full -scale-x-100 object-cover"
        />
     
      </div>
    </div>
  );
};

export default Slide4;
