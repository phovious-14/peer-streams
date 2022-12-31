import React from 'react'
import { useUpdateAsset } from '@livepeer/react';

const BUTTON = ({assetId}) => {

    const { mutate: updateAsset, status: updateStatus } = useUpdateAsset({
        assetId,
        storage: {
        ipfs: true,
        // metadata overrides can be added here
        // see the source code behind this example
        },
    });
    
    const upload = () => {
        updateAsset?.()
        alert('Uploaded stream')
    }
    
  return (
    <button onClick={upload}>upload stream</button>
  )
}

export default BUTTON