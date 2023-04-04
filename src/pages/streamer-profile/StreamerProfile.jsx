import React, { useState } from 'react'
import './style.css'
import { Link, Route, Routes } from 'react-router-dom'
import logo from '../../assets/logo.png'
import Card from '../../components/Card/Card'
import Posts from '../../components/Posts/Posts'
import { useContext } from 'react'
import Auth from '../../context/Auth'
import { useEffect } from 'react'
import { queryPub } from '../../lens'

const StreamerProfile = () => {

    const [btn, setBtn] = useState('posts');
    const {channelData, getChannelData, address, fetchNft, setPosts, posts } = useContext(Auth)

    const getposts = async() => {
      const data = await queryPub(address)
      setPosts(data)
      setBtn('posts')
    }

    useEffect(() => {
      fetchNft()
    }, [])

  return (
    <div className='streamer-profile'>
        <div className='streamer-acc3'>
            <img src={logo} alt="" />
            <div className='ch-data'>
              <h1> {channelData[0]}</h1>
            </div>

            <button className='sub-btn'>
              <i class='bx bx-bell'></i>&nbsp; Subscribe
            </button>
        </div>
        <div className='streamer-bio'>
          <p>{channelData[1]}</p>
        </div>
        <div className='streamer-detail'>
          <p>
            <a href={channelData[2]}><i class='bx bxl-twitter'></i></a>
             &nbsp;&nbsp;&nbsp;&nbsp;
            <a href={channelData[3]}><i class='bx bxl-discord-alt' ></i></a>
             &nbsp;&nbsp;&nbsp;&nbsp;
            <a href={channelData[4]} title='portfolio'><i class='bx bx-link'></i></a>
             &nbsp;
          </p>
          <p><i class='bx bx-wallet-alt' ></i>&nbsp; {address}</p>
        </div>
        <div className='streamer-more'>
            <div className='nav'>
                <button onClick={getposts}>Post</button>
                <button onClick={() => setBtn('nfts')}>Minted streams</button>
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