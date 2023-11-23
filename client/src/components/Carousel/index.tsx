"use client";
import Slide from "@/components/Carousel/Slide";
import { NextSeo } from "next-seo";
import { CarouselComponent } from "./Carousal";

export default function Carousel() {
  const slides = [{ SlideJSX: Slide }];
  return (
    <div>
      <NextSeo
        title="Home | Comfy Villas"
        description="Comfy Villas landing page"
      />
      <CarouselComponent Slides={slides} />
    </div>
  );
}
