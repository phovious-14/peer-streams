import React, { useContext, useEffect, useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import {EyeOutlined} from '@ant-design/icons';
import "./style.css";
import axios from "axios";
// import required modules
import { Navigation } from "swiper";
import Auth from "../../../../context/Auth";
import { Link } from "react-router-dom";
const RecommandedStreams = () => {

  const [width, setWidth] = useState(4)
  const {setStreamData, streamData, channelData} = useContext(Auth)

  useEffect(() => {
    let w = window.screen.width
    const selfCall = async () => {
      const baseURL = `${process.env.REACT_APP_BASE_URL}/api/live`;
      const data = await axios.get(baseURL)
      setStreamData(data.data)
    }
    selfCall()
    console.log(streamData);
    setWidth(w>768 ? 4 : 1)

  }, [])

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
        {
          streamData instanceof Array && streamData.map(data => (
          <SwiperSlide>
            <Link to="/watching-stream" onClick={() => setStreamData(data)}>
            <div className="slider-cont">
              <h1 className="flex">
                {data.streamName}
              </h1>
              <div className="slider-cont2">  
              </div>
            </div>
            </Link>
          </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default RecommandedStreams
