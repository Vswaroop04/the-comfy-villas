"use client";
import Slide from "@/components/Carousel/Slide";
import { NextSeo } from "next-seo";
import { CarouselComponent } from "./Carousal";

export default function Carousel() {
  const slides = [{ SlideJSX: Slide }];
  return (
    <div>
      <CarouselComponent Slides={slides} />
    </div>
  );
}
