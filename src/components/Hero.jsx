// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,Autoplay , Pagination, Scrollbar, A11y } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';


function Hero() {
  return (
    <>
     <Swiper
     modules={[ Pagination , Autoplay]}
     slidesPerView={1}
     loop={true}
     autoplay={{ delay: 5000, disableOnInteraction: true,  }}
     pagination={{ clickable: true }}
 
    >
      <SwiperSlide ><img src="/images/banner.png" className='h-[15rem] md:h-[40rem] w-full' alt="" /></SwiperSlide>
      <SwiperSlide ><img src="/images/banner1.jpg" className='h-[15rem] md:h-[40rem] w-full' alt="" /></SwiperSlide>
      <SwiperSlide ><img src="/images/banner2.jpg" className='h-[15rem] md:h-[40rem] w-full' alt="" /></SwiperSlide>
      <SwiperSlide ><img src="/images/banner7.jpg" className='h-[15rem] md:h-[40rem] w-full' alt="" /></SwiperSlide>
      <SwiperSlide ><img src="/images/banner8.jpg" className='h-[15rem] md:h-[40rem] w-full' alt="" /></SwiperSlide>
  
  
    </Swiper>
    </>
  );
}

export default Hero;
