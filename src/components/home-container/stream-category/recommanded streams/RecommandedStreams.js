import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./style.css";

// import required modules
import { Pagination } from "swiper";
const RecommandedStreams = () => {
  return (
    <div className="recomm-slider">
      <Swiper
        slidesPerView={2}
        spaceBetween={30}
        modules={[Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="https://wallpaperaccess.com/full/1133687.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://whatifgaming.com/wp-content/uploads/2021/10/Dominic-Barrios.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://vidooly.com/blog/wp-content/uploads/2019/06/mixer-costream.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://www.redappletech.com/wp-content/uploads/2020/09/Blog_post_02-min.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://cdn.pocket-lint.com/r/s/970x/assets/images/135620-apps-news-youtube-gaming-now-supports-android-live-streaming-and-paid-subscriptions-image1-nyfvwquxgm-png.webp" alt="" />
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://s.yimg.com/ny/api/res/1.2/2VMzj_.OzCHYJccbjZAoLA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU5OTtjZj13ZWJw/https://media.zenfs.com/en-US/quartz.com/af4e7f8dfa83f643b8a00393f3ad8441" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default RecommandedStreams
