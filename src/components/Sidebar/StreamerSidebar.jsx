import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Switch, Space } from "antd";
import { useContext } from "react";
import Auth from "../../context/Auth";
import logo from "../../assets/newlogo2.png";
import { Link } from "react-router-dom";

const StreamerSidebar = () => {
  const { changeMode, address, getChannelData, channelData } = useContext(Auth);

  return (
    <>
      <div style={{"display": "flex"}}>
        <img src={logo} alt="" className="logo" />
      </div>

      <div className="menu-bar">
        <div className="menu">

          <ul className="menu-links">
            <li className="nav-link">
                <a>
                  <Link to="/">
                    <i className="bx bx-home-alt icon"></i>
                    <span className="text nav-text">
                      Home
                    </span>
                  </Link>
                </a>
            </li>
            {
              channelData.length === 0 && 
              <li className="nav-link">
              <a>
                <Link to="/create-channel">
                    <i class='bx bx-bell icon'></i>
                    <span className="text nav-text">Create channel</span>
                </Link>
              </a>
            </li>
            }
            <li className="nav-link">
              <a>
                <Link to="create-stream">
                    <i class='bx bx-video-plus icon'></i>
                    <span className="text nav-text">Create stream</span>
                </Link>
              </a>
            </li>
            <li className="nav-link">
              <a>
                <Link to="mint-streams">
                <i class='bx bxs-videos icon'></i>
                    <span className="text nav-text">Mint Streams</span>
                </Link>
              </a>
            </li>

            <li className="nav-link">
              <a>
                <Link to="/subscribers">
                  <i class='bx bx-bullseye icon'></i>
                  <span className="text nav-text">Subscribers</span>
                </Link>
              </a>
            </li>

            <li className="nav-link">
              <a>
                <Link to="/giveaway">
                  <i class='bx bx-gift icon'></i>
                  <span className="text nav-text">Giveaway</span>
                </Link>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-bell icon"></i>
                <span className="text nav-text">Notifications</span>
              </a>
            </li>

            <li className="nav-link">
              <a href="#">
                <i className="bx bx-pie-chart-alt icon"></i>
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
                            <Link to="/streamer-profile">&nbsp;&nbsp;&nbsp;<i class='bx bx-user-circle text-3xl' ></i></Link>
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
            <Space
              direction="horizontal"
              style={{ backgroundColor: "#1b1b1b", borderRadius: "100px" }}
            >
              <Switch
                checkedChildren="Watch"
                unCheckedChildren="Streamer"
                onChange={changeMode}
              />
            </Space>
          </li>
        </div>
      </div>
    </>
  );
};

export default StreamerSidebar;
