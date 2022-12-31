import React, {useState, useEffect, useContext} from 'react'
import './style.css'
import Auth from '../../../context/Auth'

const StreamChannels = () => {

    const {getChannelList} = useContext(Auth)
    const [ch, setCh] = useState([])
  
    useEffect(() => {
        getChannelList().then(data => setCh(data))
    }, [])
    
  return (
    <div className='streamer-channels'>
        <div className='ch-list'>
            {
              ch.length !== 0 && ch.map((item) => (
                <div className='ch-list-cont'>
                    <p>hergfheiruhgfuefi</p>
                    <button className='sub-btn'>
                        <i class='bx bx-bell'></i>&nbsp; Subscribe
                    </button>
                </div>
              ))
            }
        </div>
    </div>
  )
}

export default StreamChannels
