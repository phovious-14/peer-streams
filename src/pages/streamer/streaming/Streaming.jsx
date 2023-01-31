import React, {useContext, useState } from 'react'
import './style.css'
import {CopyToClipboard} from 'react-copy-to-clipboard';
import logo from '../../../assets/Binge.png'
import {
  Player
} from "@livepeer/react";
import { useEffect } from 'react';
import Push from '../../../components/push/Push';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Auth from '../../../context/Auth';

const Streaming = () => {

  const [videoObj, setVideoObj] = useState(JSON.parse(localStorage.getItem('videoInfo'))) 
  const navigate = useNavigate()
  const {address, channelData} = useContext(Auth)
  const mintNft = async () => {

    // suspend stream
    let baseURL;
    baseURL = `https://livepeer.studio/api/stream/${videoObj.id}`;
    await axios.patch(baseURL, {
      suspended : true
    },{
      headers : {
        Authorization : `Bearer ${process.env.REACT_APP_BEARE_TOKEN_2}`,
        'Content-type' : 'application/json'
      }
    })

    //update status
    baseURL = `${process.env.REACT_APP_BASE_URL}/api/u_streamer`;
    await axios.post(baseURL, {
      walletAddress: address,
      isStreaming: false
    })

    //remove localStorage
    localStorage.removeItem('videoInfo');
    setVideoObj('')
  }


  useEffect(() => {
    if(localStorage.getItem('videoInfo') === null) {
      navigate('/')
    } 
    
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
            playbackId={videoObj.plabackId} 
            title={videoObj.name} 
            showLoadingSpinner
            showTitle
            showPipButton
            controls={false}
          />
          <h1 className='flex w-full justify-between items-center'>{videoObj.name} </h1>
          <h1>{videoObj.info}</h1>
          <div className='streamer-acc'>
            <img src={logo} alt="" />
            <div className='ch-data'>
              <h1>{channelData[0]}</h1>
            </div>   
            <div className='key'>
              <CopyToClipboard text={videoObj.key}>
                <button>Stream key &nbsp;&nbsp;<i class='bx bx-copy'></i></button>
              </CopyToClipboard>
            </div>
            <button className='mint-nft' onClick={mintNft}>End stream</button>
          </div>
        </div>
        <div className='data'>    
          <Push />
        </div>
    </div>
  )
}

export default Streaming