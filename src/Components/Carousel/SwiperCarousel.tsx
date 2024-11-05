import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import "swiper/swiper-bundle.css";
import "./SwiperCarousel.css";


interface CustomSwiperCarouselPropsType {
  slides: JSX.Element[],
  slidesPerView: number | "auto" | undefined,
  autoplayDelay: number | null
}

export default function CustomSwiperCarousel(
    { 
        slides,
        slidesPerView="auto",
        autoplayDelay=null
     }: CustomSwiperCarouselPropsType
  ){
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      navigation={{
        prevEl: ".custom-prev",
        nextEl: ".custom-next",
      }}
      spaceBetween={50}
      slidesPerView={slidesPerView} // Only one slide in view
      autoplay={typeof autoplayDelay == "number" && {
        delay: autoplayDelay, // 5 seconds
        disableOnInteraction: false, // Continue autoplay after user interactions
        pauseOnMouseEnter: true,
      }
    }
      loop={Boolean(autoplayDelay)}
    //   onSlideChange={(swiper) =>
    //     console.log("Slide index changed to: ", swiper.activeIndex)
    //   }
      // onMouseEnter={handleMouseEnter} // Stop autoplay on hover
      // onMouseLeave={handleMouseLeave} // Restart autoplay on mouse leave
    >
      {slides.map((elem: any, idx: number) => (
        <SwiperSlide key={idx}>
            {elem}
        </SwiperSlide>
      ))}
      <ArrowBackIosIcon className="custom-prev" />
      <ArrowForwardIosIcon className="custom-next" />
    </Swiper>
  );
};
