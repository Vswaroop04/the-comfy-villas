"use client";

import Image from "next/image";
import React from "react";

const Slide1 = () => {
  return (
    <div className="relative h-full w-full">
      <div className="imgCover absolute bottom-0  right-[15%] h-4/5  w-auto select-none">
        <Image
          src="/assets/carousel/slide1.jpg"
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

export default Slide1;
