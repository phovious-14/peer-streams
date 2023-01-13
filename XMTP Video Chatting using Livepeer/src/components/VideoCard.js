import React from "react";
import { shortAddress } from "../utils/utils";
import { Player,LivepeerConfig,
  createReactClient,
  studioProvider,} from '@livepeer/react';


const livepeerClient = createReactClient({
  provider: studioProvider({
    apiKey: '2df1219b-52f9-43bb-b5cb-bd8d7b9998a8',
    }),
  });
const VideoCard = ({ msg }) => {
  return (
    <>
      <div className="msg-header flex justify-start">
        <div className="identicon" />
        <div className="convo-info align-start flex-dir-col flex justify-start">
          <div>
            <b>{shortAddress(msg.senderAddress)}</b>
          </div>
          <div>{msg.content && (
        <Player playbackId={msg.content.slice(4,msg.content.length)} />
      )}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
