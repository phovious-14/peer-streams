import React, { useEffect, useState, useMemo, useContext } from "react";
import "./style.css";
import thunder from "../../../assets/thunder.png";
import Axios from 'axios';
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
import Auth from "../../../context/Auth";

const StreamScreen = () => {
  const [streamName, setStreamName] = useState("");
  const [streamInfo, setStreamInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);
  const { sendNotification, playbackId, setPlaybackId } = useContext(Auth);
  const [images, setImages] = React.useState([]);
  const [state, setState] = useState(false);

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

  const submitForm = async (e) => {

    e.preventDefault();
      createStream?.();

  };

  return (
    <div className="w-full h-full stream-screen text-black flex flex-row flex-wrap justify-around -mt-8">
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
      {stream ? (
        <div className="stream-right">
          <div className="stream-b">
            <div className="stream-key" title="Server">
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
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
              rtmp://rtmp.livepeer.com/live/
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
              {stream.streamKey}
              {stream.streamKey && setPlaybackId(stream.playbackId)}
            </div>
            <div className="stream-key" title="Stream playbackId">
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

              {stream.playbackId}
            </div>
            <div className="stream-key" title="Stream playbackId">
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
          <div className="stream-b h-full">
            {/* <p title="Tooltip" className="ml-72"><svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
              />
            </svg></p> */}
            <p className="text-lg text-white">PUSH Notifications</p>
            <input
              type="text"
              placeholder="Title"
              onChange={(e) => setStreamName(e.target.value)}
              className="inpu-s w-full h-24"
              required
            />
            <input
              type="text"
              placeholder="Stream Info"
              onChange={(e) => setStreamInfo(e.target.value)}
              className="inpu-s w-full h-24 text-white"
              required
            />
            <button
              className="set-noti"
              onClick={() => sendNotification(streamName, streamInfo)}
            >
              Notify Your Subscribers!
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
      ) : (
        <form
          className="stream-form flex flex-col justify-center align-middle"
          onSubmit={submitForm}
        >
          <input
            type="text"
            placeholder="Stream name"
            onChange={(e) => setStreamName(e.target.value)}
            className="w-screen sm:w-96 h-10 inp-s"
          />
          <input
            type="text"
            placeholder="Stream info"
            onChange={(e) => setStreamInfo(e.target.value)}
            className="w-screen sm:w-96 h-10 inp-s"
          />
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
                  <div
                    key={index}
                    className="image-item flex flex-col justify-center align-middle"
                  >
                    <img
                      src={image["data_url"]}
                      alt=""
                      width="100"
                      className="m-auto"
                    />
                    <div className="image-item__btn-wrapper">
                      <button
                        onClick={() => onImageRemove(index)}
                        className="border-2 pl-4 pr-4 pt-2 pb-2 m-4 bg-rose-600 rounded-lg text-white"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
          {!loading ? (
            <button
              type="submit"
              disabled={isLoading || !createStream}
              variant="primary"
              className="w-screen sm:w-48 btn-style"
              onClick={() => setLoading(true)}
            >
              Go Live
            </button>
          ) : (
            <button
              type="submit"
              disabled={isLoading || !createStream}
              variant="primary"
              className="w-screen sm:w-48 btn-style"
            >
              Streaming mode
            </button>
          )}
          <br />
        </form>
      )}
    </div>
  );
};

export default StreamScreen;
