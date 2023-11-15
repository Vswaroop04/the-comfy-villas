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
import { cn } from "../../utils";
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/autoplay";
import "swiper/css/keyboard";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/virtual";
import useResponsive from "@/hooks/useResponsive";


export const Carousal: React.FC<{
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
    const isLg = useResponsive('lg');
  console.log(isLg)
  return (
    <Swiper
      modules={[
        A11y,
        Autoplay,
        Keyboard,
        Mousewheel,
        Navigation,
        Pagination,
        Scrollbar,
        Virtual,
      ]}
      keyboard={{
        enabled: true,
        onlyInViewport: true,
      }}
      navigation={{
        nextEl: ".swiper-nxt",
        prevEl: ".swiper-pre",
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
      speed={600}
      autoplay={{
        delay: 10000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      {...options}
      className={cn("relative h-full w-full", className)}
    >
      {Slides?.map(({ SlideJSX, props }, index) => (
        <SwiperSlide
          key={`${Date.now() + Math.random()}${index}`}
          virtualIndex={index}
          className={cn(swiperSliderClassName)}
        >
          <SlideJSX {...props} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

