import React from 'react'
import logo from '../../../assets/newlogo2.png'
import liveimg from '../../../assets/Podcast.png'
import liveimg2 from '../../../assets/Bull.png'
import './style.css'

const StreamerHome = () => {
  return (
    <div className='home-container'>      
      <div className='main-cont-s'>
          <div className='cont1-s'>
              <img src={logo} alt="" className='home-logo' />
              <div className='written'>
                  <h1>We're better live streaming platform</h1><br />
                  <h6>Peer stream is a revolutionary streaming platform on blockchain that enables content creators to earn more and viewers to get better quality without subscription.</h6>
              </div>
          </div>
          <img src={liveimg} alt="" />
      </div>
      <div className='main-cont-s'>
          <img src={liveimg2} alt="" />
          <div className='cont1-s'>
              <div className='written'>
                <h6>Peer Stream is a decentralized, scalable, and low-latency live streaming platform for content creators who depend on live viewers to sustain their business.</h6>
              </div>
              <div className='written -ml-12'>
                <h6>You can set your own cost that user has been charged per second</h6>
              </div>
          </div>
      </div>
    </div>
  )
}

export default StreamerHome