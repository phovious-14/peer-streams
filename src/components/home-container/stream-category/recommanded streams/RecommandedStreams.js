import React, { useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import {EyeOutlined} from '@ant-design/icons';
import "./style.css";

// import required modules
import { Navigation } from "swiper";
const RecommandedStreams = () => {

  const [width, setWidth] = useState(4)

  useEffect(() => {
    let w = window.screen.width
    setWidth(w>768 ? 4 : 1)
    console.log(width);
  })

  return (
    <div className="recomm-slider">
      <h6 className="mr-4 text-rose-700 flex justify-items-center items-center bg-white w-48 p-2 rounded-lg"><div className="w-2 h-2 rounded-full bg-rose-700 mr-2 ml-2 pulser"></div> LIVE <div className="ml-2 text-[#1b1b1b]">Top Watching</div></h6> 
      <Swiper
        slidesPerView={width}
        spaceBetween={20}
        navigation={true}
        modules={[Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
            <img src="https://wallpaperaccess.com/full/1133687.jpg" alt="" />
            <div className="slider-cont">
              <h1 className="flex">
                Dynamo live streaming...
              </h1>
              <div className="slider-cont2">                
                <h1>Updated 17.12.2022</h1>
                <h1 className="flex items-center"><EyeOutlined /> &nbsp;2.5K</h1>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://whatifgaming.com/wp-content/uploads/2021/10/Dominic-Barrios.jpg" alt="" />
            <div className="slider-cont">
              <h1 className="flex">
                Dynamo live streaming...
              </h1>
              <div className="slider-cont2">                
                <h1>Updated 17.12.2022</h1>
                <h1 className="flex items-center"><EyeOutlined /> &nbsp;2.5K</h1>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://vidooly.com/blog/wp-content/uploads/2019/06/mixer-costream.jpg" alt="" />
            <div className="slider-cont">
              <h1 className="flex">
                Dynamo live streaming...
              </h1>
              <div className="slider-cont2">                
                <h1>Updated 17.12.2022</h1>
                <h1 className="flex items-center"><EyeOutlined /> &nbsp;2.5K</h1>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://www.redappletech.com/wp-content/uploads/2020/09/Blog_post_02-min.jpg" alt="" />
            <div className="slider-cont">
              <h1 className="flex">
                Dynamo live streaming...
              </h1>
              <div className="slider-cont2">                
                <h1>Updated 17.12.2022</h1>
                <h1 className="flex items-center"><EyeOutlined /> &nbsp;2.5K</h1>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://cdn.pocket-lint.com/r/s/970x/assets/images/135620-apps-news-youtube-gaming-now-supports-android-live-streaming-and-paid-subscriptions-image1-nyfvwquxgm-png.webp" alt="" />
          
            <div className="slider-cont">
              <h1 className="flex">
                Dynamo live streaming...
              </h1>
              <div className="slider-cont2">                
                <h1>Updated 17.12.2022</h1>
                <h1 className="flex items-center"><EyeOutlined /> &nbsp;2.5K</h1>
              </div>
            </div>
        </SwiperSlide>
        <SwiperSlide>
            <img src="https://s.yimg.com/ny/api/res/1.2/2VMzj_.OzCHYJccbjZAoLA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU5OTtjZj13ZWJw/https://media.zenfs.com/en-US/quartz.com/af4e7f8dfa83f643b8a00393f3ad8441" alt="" />
          
            <div className="slider-cont">
              <h1 className="flex">
                Dynamo live streaming...
              </h1>
              <div className="slider-cont2">                
                <h1>Updated 17.12.2022</h1>
                <h1 className="flex items-center"><EyeOutlined /> &nbsp;2.5K</h1>
              </div>
            </div>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default RecommandedStreams
