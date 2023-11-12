"use client";
import Slide1 from "@/components/Carousel/Slide1";
import Slide2 from "@/components/Carousel/Slide2";
import  {Carousal}  from "./Carousal";
export default  function Carousel() {
    const slides = [
        { SlideJSX: Slide1 },
        // { SlideJSX: Slide0 },
        { SlideJSX: Slide2 },
        // { SlideJSX: Slide3 },
      ];
  return (
    <div>
        <Carousal Slides={slides} />
        
    </div>
  )
}
