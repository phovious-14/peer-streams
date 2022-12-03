import React, {useContext, useEffect} from 'react'
import Auth from '../../context/Auth'
import './style.css'

const Channels = () => {
    const {getChannelList} = useContext(Auth)

    useEffect(() => {
      //getChannelList().then((data) => console.log(data)).catch((e)=> console.log(e))
      getChannelList()
    }, [])

  return (
    <div className='chn-con'>
    <p className='m-8 text-xl w-72 border-l-8 border-r-8 p-2 border-blue '>Channels around the world</p>
    <div className="p-10 channel-cont">
        <div className="w-full text-lg flex flex-row justify-between align-middle mb-12">
            <p>Channel List</p>
            <p>Total channels 345,680</p>
        </div>
        
        <div className="w-full text-lg flex flex-row justify-center align-middle">
            <p className=' border-b-2 border-gray-500 p-4 text-gray-500' >0x03j4h53748f734grh7734rg</p>
        </div>
    </div>
    </div>
    
  )
}

export default Channels