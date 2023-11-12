"use client";

import Image from "next/image";
import React from "react";

const Slide1 = () => {
  return (
    <div className="relative h-full w-full bg-gradient-to-b from-[#99D8EA] to-[#2485A6]">
      <div className="imgCover absolute bottom-0  right-[15%] h-4/5  w-auto select-none">
        <Image
          src="/assets/carousel/s1.png"
          alt=""
          width={1400}
          height={500}
          priority
          className="h-full w-full -scale-x-100 object-cover"
        />
      </div>

    </div>
  );
};

export default Slide1;
