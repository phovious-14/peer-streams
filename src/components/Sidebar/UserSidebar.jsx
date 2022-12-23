import React from 'react'
import logo from "../../assets/newlogo2.png";
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { Switch, Space } from 'antd';
import { useContext } from 'react';
import Auth from '../../context/Auth';
import avatar from "../../assets/thunder.png";
import { Link } from 'react-router-dom';

const UserSidebar = () => {

    const {changeMode, address} = useContext(Auth)

  return (
    <>
      <div>
        <img src={logo} alt="" className="logo" />
      </div>

        <div className="menu-bar">
          <div className="menu">

            <li className="search-box">
              <i className='bx bx-search icon'></i>
              <input type="text" placeholder="Search Ganes..." />
            </li>

            <ul className="menu-links">
              <li className="nav-link">
                <a>
                  <Link to="/">
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">Home</span>
                  </Link>
                </a>
              </li>

              <li className="nav-link">
                <a href="#topWatching">
                  <i className='bx bx-bar-chart-alt-2 icon'></i>
                  <span className="text nav-text">Top Watching</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i class='bx bx-food-menu icon'></i>
                  <span className="text nav-text">Stream channels</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-bell icon'></i> 
                  <span className="text nav-text">Notifications</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#">
                  <i className='bx bx-pie-chart-alt icon'></i>
                  <span className="text nav-text">Analytics</span>
                </a>
              </li>

              <li className="nav-link">
                <a href="#" className='wallet'>
                  <i className='bx bx-wallet icon'></i>
                    <ConnectButton accountStatus="avatar" chainStatus="none" showBalance={false} /> 
                  <span className="text nav-text flex ">
                    {address !== undefined && <header>
                        <div className="image-text">
                          <span className="image">
                            <img src={avatar} alt="" />
                          </span>
                        </div>
                      </header>
                    }
                                      
                  </span>
                </a>
              </li>

            </ul>
          </div>

          <div className="bottom-content">

            <li className="mode">
              <Space direction='horizontal' >
                <Switch checkedChildren="Watch" unCheckedChildren="Streamer" defaultChecked onChange={changeMode} />
              </Space>
            </li>

          </div>
        </div>
    </>
  )
}

export default UserSidebar
