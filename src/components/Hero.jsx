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
      <SwiperSlide ><img src="/images/banner.png" className='h-[12rem] md:h-[34rem] w-full' alt="" /></SwiperSlide>
      <SwiperSlide ><img src="/images/banner1.jpg" className='h-[12rem] md:h-[34rem] w-full' alt="" /></SwiperSlide>
      <SwiperSlide ><img src="/images/banner4.jpg" className='h-[12rem] md:h-[34rem] w-full' alt="" /></SwiperSlide>
      <SwiperSlide ><img src="/images/banner2.jpg" className='h-[12rem] md:h-[34rem] w-full' alt="" /></SwiperSlide>
  
  
    </Swiper>
    </>
  );
}

export default Hero;
