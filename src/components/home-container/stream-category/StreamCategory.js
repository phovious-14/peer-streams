import React from 'react'
import RecommandedStreams from './recommanded streams/RecommandedStreams'
import './style.css'

const StreamCategory = () => {
  return (
    <div className='w-full h-full stream-cat'>
      <div className='w-96 h-10 mt-10 text-center text-white text-xl border-t-2 border-gray-100 rounded-tl-2xl rounded-tr-2xl p-2 '>
        Recommanded Live Streams
      </div>
      <RecommandedStreams />
    </div>
  )
}

export default StreamCategory
