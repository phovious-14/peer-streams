import React, { useState } from 'react'
import './style.css'
import { Link, Route, Routes } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Card from '../../components/Card/Card'
import Posts from '../../components/Posts/Posts'

const StreamerProfile = () => {

    const [btn, setBtn] = useState('posts');

  return (
    <div className='streamer-profile'>
        <div className='streamer-acc3'>
            <img src={logo} alt="" />
            <div className='ch-data'>
              <h1>Dynamo Gaming</h1>
              <h2>10M subscribers</h2>
            </div>
            <button className='sub-btn'>
              <i class='bx bx-bell'></i>&nbsp; Subscribe
            </button>
        </div>
        <div className='streamer-detail'>
          <p><i class='bx bx-user'></i> &nbsp; romanreigns.lens</p>
          <p><i class='bx bx-wallet-alt' ></i>&nbsp; 0x6f144c0628D2039f27F13604c583fAb72BEF197e</p>
        </div>
        <div className='streamer-more'>
            <div className='nav'>
                <button onClick={() => setBtn('posts')}>Post</button>
                <button onClick={() => setBtn('nfts')}>Recorded streams</button>
            </div>
            {btn === 'posts'
                ? <Posts />
                : <Card />
            }
        </div>
    </div>
  )
}

export default StreamerProfile