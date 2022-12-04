import React from 'react'
import StreamScreen from './Stream-screen/StreamScreen'

const Streaming = () => {
  return (
    <div className='w-screen h-96 sm:h-screen overflow-x-hidden p-5 sm:p-10 -mt-12' style={{background:"#1b1b1b"}}>
      <StreamScreen />
    </div>
  )
}

export default Streaming
