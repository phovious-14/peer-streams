import React, { useState } from 'react'
import './style.css'
import { Player } from "@livepeer/react";
import { useEffect } from 'react';
import { useContext } from 'react';
import Auth from '../../../context/Auth';
import logo from '../../../assets/logo.png'
import Card from '../../../components/Card/Card'
import {EyeOutlined} from '@ant-design/icons';
 
const LiveStreaming = () => {

  const { createNewFlow, deleteNetFlow, checkFDAI, streamData, optIntoAChannel } = useContext(Auth)

  var flag = true;
  
  useEffect(() => { 
  
    //check extra property, 
    checkFDAI() 

      setTimeout(() => {

        const vid = document.getElementsByTagName("video")[0]        
        
        console.log(vid.getAttribute('data-metrics-initialized'));
        if(vid.getAttribute('data-metrics-initialized') && flag ) {
          console.log(vid);
          vid.addEventListener("play", async() => {
            if(localStorage.getItem('isPlaying') === 'false') {        
              console.log('play');
              vid.pause();   
              await createNewFlow()    
              setTimeout(() => { vid.play() }, 5000)    
            }   
          })       
                
          vid.addEventListener("pause", async () => {
            if(localStorage.getItem('isPlaying') === 'true') {
              deleteNetFlow()   
            }  
          })    
          flag = false; 
        }
        
    }, 2000) 
 
  }, [])

  return (
    <>
      <div className='streaming-cont2'>
            <div className='screen2'>
              <Player 
                playbackId={streamData.playbackId}
                title={streamData.streamName} 
                showLoadingSpinner
                showTitle
                showPipButton
              />
              <h1 className='flex w-full justify-between items-center'>{streamData.streamName}  <span className="flex items-center mr-4"><EyeOutlined /> &nbsp;2.5K</span></h1>
              <h1>{streamData.streamInfo}</h1>
              <div className='streamer-acc2'>
                <img src={logo} alt="" />
                <div className='ch-data'>
                  <h1>Dynamo Gaming</h1>
                  <h2>10M subscribers</h2>
                </div>
                <button className='sub-btn' onClick={() => optIntoAChannel(streamData.walletAddress)}>
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