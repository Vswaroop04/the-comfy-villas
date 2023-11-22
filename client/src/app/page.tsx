import Image from "next/image";
import Carousel from "@/components/Carousel";
import Gallery from "@/components/Gallery";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Carousel />
      <Gallery />
    </>
  );
}
