import React, { useContext } from 'react'
import BannerCube from './banner-cube/BannerCube'
import ChannelList from './channel-list/ChannelList'
import StreamCategory from './stream-category/StreamCategory'
import './style.css'
import roar from '../../assets/roar.png'
import { Link } from 'react-router-dom'
import Auth from '../../context/Auth'
import thunder2 from '../../assets/thunder2.png'
import live from '../..//assets/live.gif.crdownload'

const HomeContainer = () => {
  const {audio} = useContext(Auth)
  return (
    <div className='home-container'>
      <div className='sub-container'>
        <div className='w-screen h-screen bg-poster'>

        </div>
      {/* <img src={live} alt="" className='w-20 mb-10' /> */}
        <BannerCube />
        <StreamCategory />
      </div>
    </div>
  )
}

export default HomeContainer
