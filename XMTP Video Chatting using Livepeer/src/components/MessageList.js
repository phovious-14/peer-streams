import React from "react";
import useStreamMessages from "../hooks/useStreamMessages";
import MessageCard from "./MessageCard";
import VideoCard from "./VideoCard";
const MessageList = ({ isNewMsg, convoMessages, selectedConvo }) => {
  useStreamMessages(selectedConvo);
  
  return (
    <div className="msgs-container flex flex-dir-col">
      <div className="mt-auto">
        {!isNewMsg &&
          convoMessages.map((msg) => {
            if((msg.content).slice(0,4) === '/b/b'){
              return <VideoCard key={msg.id} msg={msg} />;
            }
            return <MessageCard key={msg.id} msg={msg} />;
          })}
      </div>
    </div>
  );
};

export default MessageList;
