import React from 'react'
import { useContext } from 'react'
import Auth from '../../context/Auth'
import StreamerSidebar from './StreamerSidebar'
import  './style.css'
import UserSidebar from './UserSidebar'

const Sidebar = () => {

  const {mode} = useContext(Auth)

  return (
    <div>
      <nav className="sidebar" >
        <div className='toggle text-white text-2xl fixed bottom-0 bottom-0 z-10 bg-blue p-2 rounded-xl'><i class='bx bx-menu-alt-left' ></i></div>
        {mode === 'user' || mode === '' 
         ? <UserSidebar />
         : <StreamerSidebar />
        }

      </nav>
    </div>
  )
}

export default Sidebar
