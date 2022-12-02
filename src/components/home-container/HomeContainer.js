import React, { useContext } from 'react'
import BannerCube from './banner-cube/BannerCube'
import ChannelList from './channel-list/ChannelList'
import StreamCategory from './stream-category/StreamCategory'
import './style.css'
import roar from '../../assets/roar.png'
import { Link } from 'react-router-dom'
import Auth from '../../context/Auth'
import thunder2 from '../../assets/thunder2.png'

const HomeContainer = () => {
  const {audio} = useContext(Auth)
  return (
    <div className='home-container'>
      <img src={thunder2} alt="" className='fixed bottom-0 left-0 w-48 z-50' />
      <ChannelList />
      <div className='sub-container'>
        <BannerCube />
        <StreamCategory />
      </div>
      <Link to="/streaming"><img src={roar} alt="" className='fixed w-48 bottom-2 right-4 z-10' 
              onClick={() => {
                audio.play();
              }} /></Link>
    </div>
  )
}

export default HomeContainer
