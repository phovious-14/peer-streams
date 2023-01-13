import React from "react";
import Input from "./Input";
import { useCreateAsset } from '@livepeer/react';
import { useCallback, useState, useMemo, useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import './style.css'

import {CopyToClipboard} from 'react-copy-to-clipboard';

const MessageComposer = ({ msgTxt, setMsgTxt, sendNewMessage,sendMessage }) => {
  const [video, setVideo] = useState();
    const {
      mutate: createAsset,
      data: asset,
      status,
      progress,
      error,
    } = useCreateAsset( 
      video
        ? {
            sources: [{ name: video.name, file: video }]
          }
        : null,
    );
      
    const onDrop = useCallback(async (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles.length > 0 && acceptedFiles?.[0]) {
        setVideo(acceptedFiles[0]);
      }
    }, []);
  
    const { getRootProps, getInputProps } = useDropzone({
      accept: {
        'video/*': ['*.mp4'],
      },
      maxFiles: 1,
      onDrop,
    });
  
    const progressFormatted = useMemo(
      () =>
        progress?.[0].phase === 'failed'
          ? 'Failed to process video.'
          : progress?.[0].phase === 'waiting'
          ? 'Waiting'
          : progress?.[0].phase === 'uploading'
          ? `Uploading: ${Math.round(progress?.[0]?.progress * 100)}%`
          : progress?.[0].phase === 'processing'
          ? `Processing: ${Math.round(progress?.[0].progress * 100)}%`
          : null,
      [progress],
    );
  return (
    <div className="flex">
      <Input
          setNewValue={setMsgTxt}
          placeholder="Write a message"
          value={msgTxt}
        />
      
        <button className="btn" onClick={sendNewMessage}>
          Send
        </button><br />
        
      <div className="key">{asset?.[0]?.playbackId && 
        <CopyToClipboard text={'/b/b'+asset[0].playbackId}>
          <button>copy video key</button>
        </CopyToClipboard>}</div><br />
      <br />
        <div {...getRootProps()}>
          <input {...getInputProps()} />
          <p>Drag and drop or browse files</p>
        </div>
          {error?.message && <p>{error}</p>}

        <button
          onClick={() => {
            createAsset?.();
          }}
          disabled={!createAsset || status === 'loading'}
        >
          Upload
        </button>

    </div>
  );
};

export default MessageComposer;
