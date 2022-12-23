import React from 'react'
import './style.css'
import { Player } from "@livepeer/react";
import { useEffect } from 'react';
import { useContext } from 'react';
import Auth from '../../../context/Auth';
import { useState } from 'react';
import logo from '../../../assets/logo.png'
import Card from '../../../components/Card/Card'
import {EyeOutlined} from '@ant-design/icons';
 
const LiveStreaming = () => {

  const {createNewFlow, deleteNetFlow, checkFDAI, loading} = useContext(Auth)
  const [videoObj, setVideoObj] = useState(JSON.parse(localStorage.getItem('videoInfo')))
  
  useEffect(() => {

    checkFDAI()
    const vid = document.getElementsByTagName("video")[0]
    console.log(vid); 
    vid.addEventListener("play", () => {
      // console.log();
      createNewFlow()
    })
    vid.addEventListener("pause", () => {
      deleteNetFlow()
    }) 
  }, [])

  return (
    <>
      <div className='streaming-cont2'>
            <div className='screen2'>
              <Player 
                playbackId='4099iz760e53ebe2' 
                title={videoObj.name} 
                showLoadingSpinner
                showTitle
                showPipButton
              />
              <h1 className='flex w-full justify-between items-center'>{videoObj.name}  <span className="flex items-center mr-4"><EyeOutlined /> &nbsp;2.5K</span></h1>
              <h1>{videoObj.info}</h1>
              <div className='streamer-acc2'>
                <img src={logo} alt="" />
                <div className='ch-data'>
                  <h1>Dynamo Gaming</h1>
                  <h2>10M subscribers</h2>
                </div>
                <button className='sub-btn'>
                  <i class='bx bx-bell'></i>&nbsp; Subscribe
                </button>
              </div>
            </div>
            <div className='data2'>
              <p className='title'><i class='bx bx-data'></i> &nbsp;Recorded NFT Videos</p>
              <Card />
            </div>
        </div>
    </>
  )
}

export default LiveStreaming