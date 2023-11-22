"use client";
import Slide1 from "@/components/Carousel/Slide1";
import Slide2 from "@/components/Carousel/Slide2";
import Slide3 from "@/components/Carousel/Slide3";
import Slide4 from "@/components/Carousel/Slide4";

import { Carousal } from "./Carousal";
export default function Carousel() {
  const slides = [
    { SlideJSX: Slide1 },
    { SlideJSX: Slide2 },
    { SlideJSX: Slide3 },
    { SlideJSX: Slide4 },
  ];
  return (
    <div>
      <Carousal Slides={slides} />
    </div>
  );
}
