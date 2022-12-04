import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

import "./style.css";
import { Autoplay, EffectCube, Pagination } from "swiper";
import livestream from '../../../assets/live stream.png'
import {Link} from 'react-router-dom'

const BannerCube = () => {
  return (
    <div className="p-10 swipe">
      <Swiper
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={true}
        modules={[Autoplay, Pagination]}
        className="mySwiper swipe"
      >
        <SwiperSlide>
          <img src="https://www.teahub.io/photos/full/28-288661_naruto-fire-and-ice-hd-anime-wallpaper-desktop.jpg" />
          <button className="fixed z-10 text-red-700 btn-style bottom-10 left-10 uppercase space-x-1"><Link to="/watch-stream">watch now</Link></button>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://m.media-amazon.com/images/I/81lkcwrNsmL._SX450_.jpg" />
          <button className="fixed z-10 text-red-700 btn-style bottom-10 left-10 uppercase space-x-1">watch now</button>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://anime-poster.com/wp-content/uploads/2021/12/Anime-Posters-Web-Banner-1920x730px.jpg" />
          <button className="fixed z-10 text-red-700 btn-style bottom-10 left-10 uppercase space-x-1">watch now</button>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://cdn.shopify.com/s/files/1/0747/3829/products/mZ0200_1024x1024.jpeg?v=1571443957" />
          <button className="fixed z-10 text-red-700 btn-style bottom-10 left-10 uppercase space-x-1">watch now</button>
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://i.etsystatic.com/28301644/r/il/b8abbb/4022772719/il_fullxfull.4022772719_jfmb.jpg" />
          <button className="fixed z-10 text-red-700 btn-style bottom-12 left-12 uppercase space-x-1">watch now</button>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default BannerCube
