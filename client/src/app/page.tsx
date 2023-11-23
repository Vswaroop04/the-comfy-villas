import Image from "next/image";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ListingComponent from "@/components/Home/ListingHeaderComponent";
import OffersGridComponent from "@/components/Home/OffersGridComponent";
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
        <ListingComponent />
        <OffersGridComponent />
        <Footer />
      </>
    </>
  );
}
