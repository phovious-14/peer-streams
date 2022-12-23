
import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";
import { Web3Storage } from 'web3.storage';

async function sendNotification(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (!ethereum) {
    alert("Get MetaMask!");
    return;
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts"
  });
  console.log("Connected", accounts[0]);

  const signer = provider.getSigner();

    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 1, // broadcast
    identityType: 2, // direct payload
    notification: {
      title: `I am Start fucking`, //Notification pops just for some time 
      body: `Hey Folks Let's get Going,join the Stream Let's have some fun` //Nptification pops for 
    },
    payload: {
      title: `yu are noob`, // Main Notification on page
      body: `Hey bros bang`, // Main Test shown on the page 
      cta: '',
      img: ''
    },
    channel: `eip155:5:${accounts[0]}`,
    env: 'staging'
  });
      
      // apiResponse?.status === 204, if sent successfully!
      console.log('Send Notifications ', apiResponse);
    } catch (err) {
      console.error('Error: ', err);
    }
  }

  async function getNotifications(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts"
    });
    console.log("Connected", accounts[0]);
  
    const notifications = await PushAPI.user.getFeeds({
      user: `eip155:5:${accounts[0]}`, // user address in CAIP
      env: 'staging'
    });
    console.log(notifications)
  }

async function getSubscribedChannels(){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (!ethereum) {
    alert("Get MetaMask!");
    return;
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts"
  });
  console.log("Connected", accounts[0]);

  const channelData = await PushAPI.channels.getChannel({
    channel: `eip155:5:${accounts[0]}`, // channel address in CAIP
    env: 'staging'
  });
  console.log(channelData);
}

async function optIntoAChannel(joinChannel){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (!ethereum) {
    alert("Get MetaMask!");
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts"
  });
  console.log("Connected", accounts[0]);
  const signer = provider.getSigner();
  await PushAPI.channels.subscribe({
    signer: signer,
    channelAddress: `eip155:5:${joinChannel}`, // channel address in CAIP
    userAddress: `eip155:5:${accounts[0]}`, // user address in CAIP
    onSuccess: () => {
     console.log('opt in success');
    },
    onError: () => {
      console.error('opt in error');
    },
    env: 'staging'
  })

}
async function optOutOfChannel(outChannel){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (!ethereum) {
    alert("Get MetaMask!");
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts"
  });
  console.log("Connected", accounts[0]);
  const signer = provider.getSigner();

  await PushAPI.channels.unsubscribe({
    signer: signer,
    channelAddress: `eip155:5:${outChannel}`, // channel address in CAIP
    userAddress: `eip155:5:${accounts[0]}`, // user address in CAIP
    onSuccess: () => {
     console.log('opt Out success');
    },
    onError: () => {
      console.error('opt Out error');
    },
    env: 'staging'
  })
}


async function getSubscriberList(channel){
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  if (!ethereum) {
    alert("Get MetaMask!");
  }
  const accounts = await ethereum.request({
    method: "eth_requestAccounts"
  });
  console.log("Connected", accounts[0]);
  const signer = provider.getSigner();

  const subscribers = await PushAPI.channels._getSubscribers({
    channel: `eip155:5:${channel}`, // channel address in CAIP
    env: 'staging'
  });
  console.log("Subscribers Are "+subscribers)
}
async function uploadFile(title){
  const _token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU3OEQ2RkJBODhDNTIxZDc0QzU3MDQ4Yzg2MDY1YzQzMzRiQzI0NTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDI4Mzg2NzQ1OTcsIm5hbWUiOiJzaHViIn0.kF9ZGkhtdASLJqBuJuUOAQDXeDlUhPSKFGSBhSuQNrM';
  const client = new Web3Storage({ token: _token });
  const fileInput = document.querySelector('input[type="file"]');
  const rootCid = await client.put(fileInput.files, {
    name: `${title}`,
    maxRetries: 3
  });
  console.log(rootCid);
  retriveFile(rootCid);
}

async function retriveFile(cid){
  const _token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDU3OEQ2RkJBODhDNTIxZDc0QzU3MDQ4Yzg2MDY1YzQzMzRiQzI0NTkiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NDI4Mzg2NzQ1OTcsIm5hbWUiOiJzaHViIn0.kF9ZGkhtdASLJqBuJuUOAQDXeDlUhPSKFGSBhSuQNrM';
  const client = new Web3Storage({ token: _token });
  try{

  
  const res = await client.get(cid); // Web3Response
  var files = await res.files(); // Web3File[]
  console.log(files);
for (const file of files) {
  console.log(`${file.cid} ${file.name} ${file.size}`);
  const imageUrl =`https://w3s.link/ipfs/${cid}/${file.name}`;
  console.log(imageUrl);
}
}catch(e){
  console.log(e);
}

}


function Push() {

  return (
    <div className="Push">
      <button onClick={sendNotification}>Click Me</button>
      <button onClick={getNotifications}>Get Notifications</button>
      <button onClick={getSubscribedChannels}>Get Subscibed Channels</button>
      <button onClick={() => optIntoAChannel('0x94c3016ef3e503774630fC71F59B8Da9f7D470B7')}>Join Channel</button>
      <button onClick={() => optOutOfChannel('0x94c3016ef3e503774630fC71F59B8Da9f7D470B7')}>Opt From Channel</button>
      <button onClick={() => getSubscriberList('0x6f144c0628D2039f27F13604c583fAb72BEF197e')}>Get Subscribers</button>
        <input type='file'/>
          <input type='submit' onClick={() => uploadFile('Hello')}/>
      {/* <button onClick={() => getSubscriberList('0x6f144c0628D2039f27F13604c583fAb72BEF197e')}>Get Subscribers</button>
       */}    
    </div>
  );
}

export default Push;