import React, { useEffect } from 'react'
import './style.css'
import { useContext } from 'react'
import Auth from '../../context/Auth'

const StreamerSubs = () => {

  const {getSubscriberList} = useContext(Auth)

  useEffect(() => {
    getSubscriberList()
  })

  return (
    <div className='streamer-subs'>
        <div className='subs-list'>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
            <p>krishn.eth</p>
        </div>
    </div>
  )
}

export default StreamerSubs