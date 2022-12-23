import React from 'react'
import './style.css'
import liveimg from '../../../assets/Binge.png'
import liveimg2 from '../../../assets/Upload.png'
import logo from '../../../assets/newlogo2.png'
import BannerCube from '../../../components/home-container/banner-cube/BannerCube'
import StreamCategory from '../../../components/home-container/stream-category/StreamCategory'

const Home = () => {
  return (
    <div className='home2-container'>
      <div className='main-cont'>
          <div className='cont1'>
              <img src={logo} alt="" className='home-logo' />
              <div className='written'>
                  <h1>We believe in Pay as You Watch</h1><br />
                  <h6>For every second you watch stream, money is being deducted from your account.</h6>
              </div>
          </div>
          <img src={liveimg} alt="" />
      </div>
      <div className='extra-cont'>
        <BannerCube />
        <StreamCategory />
      </div>
      
      <div className='main-cont'>
          <img src={liveimg2} alt="" />
          <div className='cont1'>
              <div className='written'>
                <h6>Peer stream is a Pay as You Watch model that supports content creators who want to monetize their live streams.</h6>
              </div>
              <div className='written -ml-12'>
                <h6>Our unique approach to streaming ensures that content creators are not limited by the audience size of their channel and viewers have the ability to enjoy high quality streams for a low cost.</h6>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Home
