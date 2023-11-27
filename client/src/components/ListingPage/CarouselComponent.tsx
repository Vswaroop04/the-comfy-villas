"use client";
import {
  A11y,
  Autoplay,
  Keyboard,
  Mousewheel,
  Navigation,
  Pagination,
  Scrollbar,
  Virtual,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { SwiperOptions } from "swiper/types";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";
import Image from "next/image";

const SimpleCarousel = ({ images }: any) => {
  return (
    <Swiper
      modules={[
        A11y,
        Autoplay,
        Keyboard,
        Mousewheel,
        Pagination,
        Scrollbar,
        Virtual,
      ]}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      a11y={{
        enabled: true,
        prevSlideMessage: "Previous slide",
        nextSlideMessage: "Next slide",
      }}
      centeredSlides={true}
      mousewheel={{
        releaseOnEdges: true,
        forceToAxis: true,
      }}
      pagination={{ clickable: true }}
      speed={600}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      className="h-[60vh]"
    >
      {images.map((image: any, index: any) => (
        <SwiperSlide key={index}>
          <Image
            unoptimized 
            src={image.fullImageUrl}
            alt={`Slide ${index}`}
            width={1600}
            height={120}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SimpleCarousel;
