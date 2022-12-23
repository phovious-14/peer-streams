import React from 'react'
import RecommandedStreams from './recommanded streams/RecommandedStreams'
import './style.css'
import live from '../../../assets/live.gif.crdownload'

const StreamCategory = () => {
  return (
    <div className='stream-cat' id="topWatching">
      <RecommandedStreams />
    </div>
  )
}

export default StreamCategory
