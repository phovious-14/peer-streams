import React, { useEffect, useState, useMemo, useContext } from "react";
import "./style.css";
import {
  ControlsContainer,
  PictureInPictureButton,
  PlayButton,
  Player,
  Poster,
  Progress,
  TimeDisplay,
  Title,
  Volume,
  useCreateStream,
} from "@livepeer/react";
import Auth from "../../context/Auth";
import ReactPlayer from 'react-player';

const WatchStream = () => {
  const [id, setId] = useState("");
  const [playbackId, setPlaybackId] = useState("");
  // const [state, setState] = useState('pause')
  const [videourl,setvideourl] = useState();
  const {deleteNetFlow, createNewFlow, isPlaying} = useContext(Auth)

  const handleChange = (event) => {
    setvideourl(event.target.value);
  };

  const videoStart = () => {
    console.log("VIDEO CHALU");
  }

  const videoStop = () =>  {
    console.log("VIDEO FINISH!");
  }

  // const streamPlay = () => {
  //     if(state === 'play'){
  //         setState('pause')
  //         setTimeout(()=> console.log(state), 2000)
  //     } else {
  //         setState('play')
  //         setTimeout(()=> console.log(state), 2000)
  //     }
  // }

  return (
    <>
      <div className="w-full h-full stream-screen text-black flex flex-row flex-wrap justify-around -mt-8">
        {videourl !== "" && (
          // <div className="stream-s">
          //     <Player title="anime" playbackId={playbackId}>
          //         <ControlsContainer
          //             middle={<Progress />}
          //             left={
          //                 <>
          //                     <PlayButton onClick={streamPlay} />
          //                     <Volume showSlider={false} />
          //                     <TimeDisplay />
          //                 </>
          //             }
          //             right={<PictureInPictureButton />}
          //         />
          //     </Player>
          // </div>
          <ReactPlayer
            controls
            onPlay={createNewFlow}
            onPause={deleteNetFlow}
            width="1080px"
            height="720px"
            url={videourl}
            playing={isPlaying}
          />
        )}
        <div className="stream-b h-full">
          <input
            type="text"
            placeholder="Add playbackId"
            // onChange={(e) => setId(e.target.value)}
            onChange={handleChange}
            className="inpu-s w-full h-24"
            required
          />
          <button className="set-noti" onClick={() => setPlaybackId(id)}>
            WATCH
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 ml-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </button>
        </div>
      </div>
    </>
  );
};

export default WatchStream;
