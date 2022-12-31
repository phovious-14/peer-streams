import React, { useEffect, useState } from 'react'
import './style.css'
import { useContext } from 'react'
import Auth from '../../context/Auth'

const StreamerSubs = () => {

  const {getSubscriberList} = useContext(Auth)
  const [subs, setSubs] = useState([])

  useEffect(() => {
    getSubscriberList().then(data => setSubs(data))
  }, [])

  return (
    <div className='streamer-subs'>
        <div className='subs-list'>
            {
              subs.length !== 0 && subs.map((item) => (
                <p>{item}</p>
              ))
            }
        </div>
    </div>
  )
}

export default StreamerSubs