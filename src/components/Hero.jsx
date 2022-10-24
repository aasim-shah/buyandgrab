// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Hero() {
  return (
    <>
     <Swiper
     modules={[ Pagination]}
     slidesPerView={1}
     pagination={{ clickable: true }}
 
    >
      <SwiperSlide className='slider flex flex-row justify-center items-center font-bold text-xl md:text-5xl'>Products Coming Soon !</SwiperSlide>
      <SwiperSlide className='slider flex flex-row justify-center items-center font-bold text-xl md:text-5xl'>Please Stay Tunned  !</SwiperSlide>
      <SwiperSlide className='slider flex flex-row justify-center items-center font-bold text-xl md:text-5xl'>We Are Planning Something New !</SwiperSlide>
  
    </Swiper>
    </>
  );
}

export default Hero;
