import React, { useEffect, useState, useMemo } from "react";
import "./style.css";
import thunder from "../../../assets/thunder.png";
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
import ReactPlayer from "react-player";
import ImageUploading from "react-images-uploading";

const StreamScreen = () => {
  const [streamName, setStreamName] = useState("");
  const [streamInfo, setStreamInfo] = useState("");
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);
  const [images, setImages] = React.useState([]);

  const isLoading = useMemo(() => status === "loading", [status]);

  // async function copyTextToClipboard(text) {
  //   if ('clipboard' in navigator) {
  //     return await navigator.clipboard.writeText(text);
  //   } else {
  //     return document.execCommand('copy', true, text);
  //   }
  // }

  const [videourl, setvideourl] = useState();

  const handleChange = (event) => {
    setvideourl(event.target.value);
  };

  function videoStart() {
    console.log("VIDEO CHALU");
  }

  function videoStop() {
    console.log("VIDEO FINISH!");
  }

  const maxNumber = 1;
  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList[0], addUpdateIndex);
    setImages(imageList);
  };

  const submitForm = (e) => {
    e.preventDefault();
    if(streamName !== null && streamInfo !== null && images !== [] ){
      createStream?.();
    } else {
      alert("Please fill out form")
    }
      
  }

  return (
    <div className="w-full h-full sm:-m-3 stream-screen text-black flex flex-row flex-wrap justify-center align-middle">
      {stream ? (
        <div className="stream-b">
          <div className="stream-key" title="Stream Key">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            {stream.streamKey}
          </div>
          <div className="stream-key" title="Stream Key">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            {stream.playbackUrl}
          </div>
          <button className="delete-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
            Exit Stream
          </button>
        </div>
      ) : (
        <form className="stream-form flex flex-col justify-center align-middle" onSubmit={submitForm}>
          <ImageUploading
            multiple
            value={images}
            onChange={onChange}
            maxNumber={maxNumber}
            dataURLKey="data_url"
            required
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper w-full border-2 rounded-lg border-white mt-2 mb-2">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                  className="bg-gray-100 border-2 border-gray-300 p-4 border-dashed m-4 w-72"
                >
                  Click or drag Stream banner
                </button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item flex flex-col justify-center align-middle">
                    <img src={image["data_url"]} alt="" width="100" className="m-auto" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageRemove(index)} className="border-2 pl-4 pr-4 pt-2 pb-2 m-4 bg-rose-600 rounded-lg text-white">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          <input
            type="text"
            placeholder="Stream name"
            onChange={(e) => setStreamName(e.target.value)}
            className="w-screen sm:w-96 h-10 inp-s"
            required
          />
          <input
            type="text"
            placeholder="Stream info"
            onChange={(e) => setStreamInfo(e.target.value)}
            className="w-screen sm:w-96 h-10 inp-s"
            required
          />
          <button type="submit"
            disabled={isLoading || !createStream}
            variant="primary"
            className="w-screen sm:w-48 h-10 create-s"
          >
            Go Live 🚀
          </button>
          <br />
          <br />
        </form>
      )}
      {stream?.playbackId && (
        <div className="stream-s">
          <Player title={stream?.name} playbackId={stream?.playbackId}>
            <ControlsContainer
              middle={<Progress />}
              left={
                <>
                  <PlayButton onClick={() => console.log("button clicked!")} />
                  <Volume showSlider={false} />
                  <TimeDisplay />
                </>
              }
              right={<PictureInPictureButton />}
            />
          </Player>
          {/* <ReactPlayer
            controls
            onStart={videoStart()}
            onPause={videoStop()}
            width="100%"
            height="90%"
            url={stream.playbackUrl}
          /> */}
        </div>
      )}
    </div>
  );
};

export default StreamScreen;
