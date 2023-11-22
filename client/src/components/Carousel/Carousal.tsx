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

export const CarouselComponent: React.FC<{
  Slides: { SlideJSX: React.ComponentType<any>; props?: Record<string, any> }[];
  enableNavButton?: boolean;
  options?: Partial<SwiperOptions>;
  className?: string;
  swiperSliderClassName?: string;
}> = ({
  Slides,
  enableNavButton,
  options,
  className,
  swiperSliderClassName,
}) => {
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
      className="h-[75vh]"
    >
      <div className="pb-1100">
        {Slides?.map(({ SlideJSX, props }, index) => (
          <SwiperSlide
            key={`${Date.now() + Math.random()}${index}`}
            virtualIndex={index}
            className="relative bg-cover bg-center"
            style={{
              backgroundImage: "url(/assets/carousel/slide3.jpg)",
              marginBottom: "80%",
            }}
          >
            <SlideJSX {...props} />
          </SwiperSlide>
        ))}
      </div>
      {/* Repeat SwiperSlide for as many slides as you have */}
    </Swiper>
  );
};
