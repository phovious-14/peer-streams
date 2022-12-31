import React,{ useEffect, useState,useContext} from 'react'
import './style.css'
import axios from 'axios'
import BUTTON from './BUTTON'
import Auth from '../../../context/Auth'
import { Contract, ethers } from 'ethers'
import { abi } from '../../../config2'

const MintStreams = () => {
    const [asset, setAsset] = useState([])
    const {address} = useContext(Auth) 

    async function mintNft(uri){

        var wa = address
        const contractAddress ='0x903a2684cEbf15A47F32FDB2F95004CaaA40da81';
        const contractABI = abi;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // const chainId = await window.ethereum.request({ method: "eth_chainId" });
        const signer = provider.getSigner();
        const peer = new Contract(
            contractAddress,
            contractABI,
            signer
        );
        console.log("Writing")
        const txn = await peer.safeMint(wa,uri);
        await txn.wait();
        console.log("mined", txn.hash);
    }

    useEffect(() => {
        const selfCall = async () => {

            //get asset id
            let baseURL = 'https://livepeer.studio/api/asset';
        
            const data = await axios.get(baseURL, {
                headers:{
                    Authorization : 'Bearer 934fb87d-04e8-49b4-8434-517da5cbf9d4'
                }
            })
            console.log(data);
            setAsset(data.data);
        }
        selfCall()
    }, [])
    
  return (
    <div className='mint_str'>
        <div className='str_list'>
        {
            asset instanceof Array && asset.map(data => (
                <div className='str_list_cont'>
                    <p className='w-1/2'>{data.id}</p>
                    <p>{(new Date(data.createdAt)).toLocaleString()}</p>
                    {
                        data.storage !== undefined
                        ? <button disabled>Uploaded</button>
                        : <BUTTON assetId={data.id} />
                    }
                    {/* {
                        data.storage !== undefined
                        ? <button disabled>Minted</button>
                        : <button onClick={() => mintNft(data.storage.ipfs.nftMetadata.url)}>Mint asset</button>
                    } */}
                    <button onClick={() => mintNft(data.storage.ipfs.nftMetadata.url)}>Mint asset</button>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default MintStreams