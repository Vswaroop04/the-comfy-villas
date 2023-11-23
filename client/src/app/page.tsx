import Image from "next/image";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import { NextSeo } from "next-seo";

export default function Home() {
  return (
    <>
      <>
        <head>
          <title>Home | Comfy Villas</title>
        </head>

        <Navbar />
        <Carousel />
        <Gallery />
      </>
    </>
  );
}
