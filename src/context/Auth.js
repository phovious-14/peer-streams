import { createContext, useState } from "react";
import { useAccount, useProvider } from "wagmi";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { Framework } from "@superfluid-finance/sdk-core";
import { useNavigate } from "react-router-dom";
import { abi } from "../config";
import { Contract } from "ethers";
import axios from "axios";

const Auth = createContext({});
export const AuthProvider = ({ children }) => {
 
  const { address, isConnecting, isDisconnected } = useAccount();

  const [video, setVideo] = useState({});
  const [playbackId, setPlaybackId] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mode, setMode] = useState('user')
  const [channelData, setChannelData] = useState([])
  const [posts, setPosts] = useState([])
  const [streamData, setStreamData] = useState('')
  const [nftsList, setNftsList] = useState([])
  var nftList = []

  const navigate = useNavigate()

  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const signer = provider.getSigner()

  const contractAddress ='0x9f8f41c498fa7eEAfA0D2Bb116bB30e95cf12457';
  const contractABI = abi;
  const contract = new Contract(
    contractAddress,
    contractABI,
    signer
  );
  localStorage.setItem('isPlaying', false)

  let etherscan_api = '3UF719PB4C3NZ8RQCBHKSWQ4P5BJE1JCH6'

  async function sendNotification(title, body) {

    try {
      
      await PushAPI.payloads.sendNotification({
        signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title, //Notification pops just for some time
          body, //Nptification pops for
        },
        payload: {
          title, // Main Notification on page
          body, // Main Test shown on the page
          cta: "",
          img: "",
        },
        channel: `eip155:5:${address}`,
        env: "staging",
      });

      alert("Notified Successfully!! 🚀")

    } catch (err) {
      console.error("Error: ", err);
    }
  }

  async function getNotifications() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const notifications = await PushAPI.user.getFeeds({
      user: `eip155:5:${accounts[0]}`, // user address in CAIP
      env: "staging",
    });
    console.log(notifications);
  }

  async function getSubscribedChannels() {
    const channelData = await PushAPI.channels.getChannel({
      channel: `eip155:5:${address}`, // channel address in CAIP
      env: "staging",
    });
    console.log(channelData);
  }

  // deprecated

  async function getSubscriberList() {
    const subscribers = await PushAPI.channels._getSubscribers({
      channel: `eip155:5:${address}`, // channel address in CAIP
      env: "staging",
    });
    // let arr;
    var arr = [];
    subscribers.forEach(async (addr) => {
      const ens = await provider.lookupAddress(addr);
      ens === null ? arr.push(addr) : arr.push(ens)
    });
    return arr;
  }

  async function getChannelList() {
    const channelsData = await PushAPI.channels.search({
      query: "push", // a search query
      page: 1, // page index
      limit: 50, // no of items per page
      env: "staging",
    });
    let arr = [];
    channelsData.forEach((element) => {
      arr.push(element.channel);
      console.log(element.channel);
    });
    console.log(arr);
    // return arr;
  }

  async function optIntoAChannel(joinChannel) {
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: `eip155:5:${joinChannel}`, // channel address in CAIP
      userAddress: `eip155:5:${address}`, // user address in CAIP
      onSuccess: () => {
        console.log("opt in success");
      },
      onError: () => {
        console.error("opt in error");
      },
      env: "staging",
    });
  }

  async function optOutOfChannel(outChannel) {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    await PushAPI.channels.unsubscribe({
      signer: signer,
      channelAddress: `eip155:5:${outChannel}`, // channel address in CAIP
      userAddress: `eip155:5:${accounts[0]}`, // user address in CAIP
      onSuccess: () => {
        console.log("opt Out success");
      },
      onError: () => {
        console.error("opt Out error");
      },
      env: "staging",
    });
  }

  //where the Superfluid logic takes place
  async function createNewFlow() {
    let flowRate = 10000000;
    console.log("Connected", address);

    let recipient = streamData.walletAddress

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        sender: address,
        receiver: recipient,
        flowRate: flowRate,
        superToken: DAIx
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);

      console.log(
        `Congrats - you've just created a money stream!
          View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
          Network: Kovan
          Super Token: DAIx
          Sender: ${address}
          Receiver: ${recipient},
          FlowRate: ${flowRate}
          `
      );
      let data;
      const interval = setInterval(async () => {
  
        data = await axios.get(`https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${result.hash}&apikey=${etherscan_api}`)
        
        if(data.data.status === '1') {
          localStorage.setItem('isPlaying', true)
          clearInterval(interval) 
        } 


      }, 1000) 
      // console.log(data.data.status);
      // should have same address as sender
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  async function deleteNetFlow() {

    let currentAccount = address
    let recipient = streamData.walletAddress

    console.log("In stream delete");
    console.log(
      "Current Account is : " + currentAccount + "Recipient is :" + recipient
    );
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    // const signer = provider.getSigner();

    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;
    try {
      let flowOp = sf.cfaV1.deleteFlow({
        superToken: DAIx,
        sender: currentAccount,
        receiver: recipient,
        //userData: 'I am Enting the Stream'
      });
      const result = await flowOp.exec(signer);
      let data;
      const interval = setInterval(async () => {
  
        data = await axios.get(`https://api.etherscan.io/api?module=transaction&action=getstatus&txhash=${result.hash}&apikey=${etherscan_api}`)
        
        if(data.data.status === '1') {
          localStorage.setItem('isPlaying', false)
          clearInterval(interval) 
        } 

      }, 1000)
    } catch (e) {
      console.log(e);
    }
    console.log("Stream Ended ");
  }

  async function checkFDAI(){
    setLoading(true)
      if(address === undefined){
        alert("Please, connect Your Wallet First !");
        navigate("/");
      }
      const currentAccount = address;
      const APIKEY = process.env.REACT_APP_COVALENT_API;
      const baseURL = process.env.REACT_APP_COVALENT_URL;
      const stk = process.env.REACT_APP_FDAI_ADD;
  
      const url = new URL(`${baseURL}/5/address/${currentAccount}/balances_v2/?key=${APIKEY}`);
      const response = await fetch(url);
      const result = await response.json();
      const data = result.data.items;
      console.log(APIKEY);
      var flag = 0;  
      for (var i = 0; i < data.length; i++) {
        if(data[i]["contract_address"] === stk){//5$
          flag = 1;
          if(Number(data[i]["balance"]) > Number("5000000000000000000")){
            console.log("Welcome to Peer Streams")
            break;
          }
          console.log("You are less on Super Tokens");
          break;
        }
      }
      if(flag === 0){
        alert("You don't have Super Tokens to watch stream");
        navigate("/");
      }
      setLoading(false)
  }

  const CreateChannel = async (cname, bio, twitter, discord, website) => {

    const channelData = await contract.createChannel(cname, bio, twitter, discord, website);
    await channelData.wait();
    console.log("channelData - ", channelData.hash);

  }

  const getChannelData = async () => {
    const data = await contract.getChannelInfo(address);

    const result = data.filter(d => {return d !== ''})
    console.log(result);
    setChannelData(result)
  }
 
  const fetchNft = async () => {
    const APIKEY = '-6HI52W0oAMki2mFCFQVdCuCBT7I924N';
    const baseURL = `https://eth-goerli.g.alchemy.com/nft/v2/${APIKEY}/getNFTs?owner=${address}`;
       
    const response = await axios.get(baseURL);
    const res_data = response.data.ownedNfts;
    
    for(let i=0;i<res_data.length;i++){
      if(res_data[i].contractMetadata.name == "Livepeer Video Nfts"){
        let image_l = res_data[i].metadata.external_url;
        nftList.push({ id: i+1, image_l })
      }
    }
    setNftsList(nftList)
  }

  const changeMode = () => {
 
    if(mode === 'user') {
      setMode('streamer')
    } else {
      setMode('user')
    }

  }

  return (
    <Auth.Provider
      value={{
        address,

        sendNotification,
        getNotifications,
        getSubscribedChannels,
        getSubscriberList,
        optIntoAChannel,
        optOutOfChannel,
        getChannelList,

        video,
        setVideo,

        createNewFlow, deleteNetFlow,

        changeMode,
        mode,

        setPlaybackId,
        playbackId,

        checkFDAI, loading,

        CreateChannel, getChannelData, channelData,

        streamData, setStreamData,

        fetchNft, nftsList, setNftsList,

        setPosts, posts
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default Auth;
