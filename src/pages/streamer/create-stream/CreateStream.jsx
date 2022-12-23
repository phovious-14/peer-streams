import React, {useState, useContext} from "react";
import "./style.scss";
import Auth from "../../../context/Auth";
import {
  useCreateStream,
} from "@livepeer/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import bg from '../../../assets/Launch.png'

const CreateStream = () => {

  const [streamName, setStreamName] = useState("");
  const [streamInfo, setStreamInfo] = useState("");
  const navigate = useNavigate()

  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName, record: true } : null);

  const { setVideo } = useContext(Auth);
  const submitForm = async (e) => {
    e.preventDefault();
    createStream?.();
  };

  useEffect(() => {
    if(localStorage.getItem('videoInfo') !== null){
      navigate('/streaming-mode')
    }
    if(stream !== undefined){
      if(stream.streamKey!==undefined){
        let obj = {name: streamName, info: streamInfo, key: stream.streamKey, id: stream.playbackId, url: stream.playbackUrl};
        localStorage.setItem('videoInfo', JSON.stringify(obj))
        setVideo(obj)
        navigate("/streaming-mode")
      }
    }
  })
  

  return (
    <div className="container">
      <img src={bg} alt="" className="fixed w-[500px] ml-[500px]" />
      <form
          className="flex flex-col items-center justify-center"
          onSubmit={submitForm}
        >
          <input
            type="text"
            placeholder="Stream name"
            onChange={(e) => setStreamName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Stream info"
            onChange={(e) => setStreamInfo(e.target.value)}
          />
          <input type="file" name="image-banner" />
          <button
            type="submit"
            variant="primary"
            className="w-screen sm:w-48 btn-style"
          >
            Go Live
          </button>
        </form>
    </div>
  );
};

export default CreateStream;
