import React, {useContext, useEffect, useState} from 'react'
import Auth from '../../context/Auth'
import './style.css'

const Subscribers = () => {
    const {getSubscriberList} = useContext(Auth)
    const [subArr, setSubArr] = useState([])

    useEffect(() => {
      let arr = []
      //getChannelList().then((data) => console.log(data)).catch((e)=> console.log(e))
      getSubscriberList()


    })

  return (
    <div className='chn-con'>
    <p className='m-8 text-xl w-72 border-l-8 border-r-8 p-2 border-blue text-white'>Your Subscribers! 🎉</p>
    <div className="p-10 channel-cont">
        <div className="w-full text-lg flex flex-row justify-between align-middle mb-12">
            <p>Subscribers List</p>
            <p>Total subscribers 345,680</p>
        </div>
      {
        subArr.map(addr => {
          <div className="w-full text-lg flex flex-row justify-center align-middle">
            <p className=' border-b-2 border-gray-500 p-4 text-gray-500' >{addr}</p>
          </div>
        })
      }  
    </div>
    </div>
    
  )
}

export default Subscribers