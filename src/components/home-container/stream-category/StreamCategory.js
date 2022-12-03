import React from 'react'
import RecommandedStreams from './recommanded streams/RecommandedStreams'
import './style.css'
import live from '../../../assets/live.gif.crdownload'

const StreamCategory = () => {
  return (
    <div className='w-full h-full stream-cat'>
      <div className='w-80 h-10 text-white text-2xl pt-2 pb-2 mb-10 flex flex-row align-middle'>
        <img src={live} alt="" className='w-16 h-10 mr-4 -mt-1 rounded-2xl' />Recommended 
      </div>
      <RecommandedStreams />
    </div>
  )
}

export default StreamCategory
