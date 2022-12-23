import React, {useContext, useState } from 'react'
import './style.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import logo from '../../../assets/Binge.png'
import {EyeOutlined} from '@ant-design/icons';
import {
  Player
} from "@livepeer/react";
import { useEffect } from 'react';
import Push from '../../../components/push/Push';


const Streaming = () => {

  const [videoObj, setVideoObj] = useState(JSON.parse(localStorage.getItem('videoInfo'))) 

  useEffect(() => {
    
    if(document.getElementsByTagName("video") !== undefined) {
      const vid = document.getElementsByTagName("video")[0]
      console.log(vid);
      vid.addEventListener("play", () => {
        console.log("chalu");
      })
      vid.addEventListener("pause", () => {
        console.log("band");
      })
    }

  })

  return (
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
          <div className='streamer-acc'>
            <img src={logo} alt="" />
            <div className='ch-data'>
              <h1>Dynamo Gaming</h1>
              <h2>10M subscribers</h2>
            </div>   
            <div className='key'>
              <CopyToClipboard text={videoObj.id}>
                <button>Stream ID &nbsp;&nbsp;<i class='bx bx-copy'></i></button>
              </CopyToClipboard>
              <CopyToClipboard text={videoObj.key}>
                <button>Stream key &nbsp;&nbsp;<i class='bx bx-copy'></i></button>
              </CopyToClipboard>
            </div>
            <button className='mint-nft'>Mint NFT & Delete Stream</button>
          </div>
        </div>
        <div className='data'>    
          <Push />
        </div>
    </div>
  )
}

export default Streaming