import React, {useEffect, useState, useMemo} from 'react'
import './style.css'
import thunder from '../../../assets/thunder.png'
import { useCreateStream, Player } from '@livepeer/react';

const StreamScreen = () => {
  const [streamName, setStreamName] = useState('');
  const {
    mutate: createStream,
    data: stream,
    status,
  } = useCreateStream(streamName ? { name: streamName } : null);
 
  const isLoading = useMemo(() => status === 'loading', [status]);

  return (
    <div className='w-full h-full sm:-m-3 stream-screen text-white'>
        <img className='absolute top-10 left-0 w-48 sm:w-96' src={thunder} alt="" />
        {/* {stream.streamKey} */}
        
      {stream && <div>Stream Key: {stream.playbackUrl}</div>}
        <input
          type="text"
          placeholder="Stream name"
          onChange={(e) => setStreamName(e.target.value)}
        />
        {stream?.playbackId && (
          <Player
            title={stream?.name}
            playbackId={stream?.playbackId}
            autoPlay
            muted
          />
        )}
        <br />
        <br />
        {!stream && (
          <button
            onClick={() => {
              createStream?.();
            }}
            disabled={isLoading || !createStream}
            variant="primary"
          >
            Create Stream
          </button>
        )}
    </div>
  )
}

export default StreamScreen
