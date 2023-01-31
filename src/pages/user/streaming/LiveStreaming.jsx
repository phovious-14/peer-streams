import React, { useState } from 'react'
import './style.css'
import { Player } from "@livepeer/react";
import { useEffect } from 'react';
import { useContext } from 'react';
import Auth from '../../../context/Auth';
import logo from '../../../assets/logo.png'
import Card from '../../../components/Card/Card'
import { EyeOutlined } from '@ant-design/icons';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { ethers } from 'ethers';
import { Framework } from '@superfluid-finance/sdk-core';
import { daiABI } from './config';
import { sendNotification } from '@pushprotocol/restapi/src/lib/payloads';
const LiveStreaming = () => {
  
  const { createNewFlow, deleteNetFlow, checkFDAI, streamData, optIntoAChannel,address } = useContext(Auth)
  const [amt, setAmt] = useState('')

  //PRoviders and signer      
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const { ethereum } = window;
  const signer = provider.getSigner()

  var flag = true;

  useEffect(() => {

    //check extra property, 
    checkFDAI()

    setTimeout(() => {

      const vid = document.getElementsByTagName("video")[0]

      console.log(vid.getAttribute('data-metrics-initialized'));
      if (vid.getAttribute('data-metrics-initialized') && flag) {
        console.log(vid);
        vid.addEventListener("play", async () => {
          if (localStorage.getItem('isPlaying') === 'false') {
            console.log('play');
            vid.pause();
            await createNewFlow()
            setTimeout(() => { vid.play() }, 5000)
          }
        })

        vid.addEventListener("pause", async () => {
          if (localStorage.getItem('isPlaying') === 'true') {
            deleteNetFlow()
          }
        })
        flag = false;
      }

    }, 2000)

  }, [])

  // Send Notification to user for donation
  async function _sendNotification() {
    let sender = address;
    let reciver = streamData.walletAddress;
   /*  const PK = 'a839b2ad8ceea957c78e2111c5c1498c69bd74cdd34a7b94aab0e1ef8361b405'; // channel private key
    const Pkey = `0x${PK}`;
    const signer_2 = new ethers.Wallet(Pkey); */
    console.log("amt:", amt, "Receiver:", reciver, "sender:", sender);
    const apiResponse = sendNotification({
      signer,
      type: 3, // target
      identityType: 2, // direct payload
      notification: {
        title: 'Donation',
        body: `Donated by ${sender}`
      },
      payload: {
        title: `Donation`,
        body: `${amt}$ is Donated by ${sender}`,
        cta: '',
        img: ''
      },
      recipients: `eip155:5:${reciver}`, // recipient address
      channel: `eip155:5:${sender}`, // your channel address
      env: 'staging'
    });

    console.log(apiResponse);
  }

  async function executeBatchCall(upgradeAmt, recipient, flowRate) {
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log(await superSigner.getAddress());
    const DAIx = await sf.loadSuperToken("fDAIx");

    console.log(DAIx);

    try {
      const amtToUpgrade = ethers.utils.parseEther(upgradeAmt.toString());
      const upgradeOperation = DAIx.upgrade({
        amount: amtToUpgrade.toString()
      });
      //upgrade and create stream at once
      const createFlowOperation = DAIx.createFlow({
        sender: await superSigner.getAddress(),
        receiver: recipient,
        flowRate: flowRate
      });

      console.log("Upgrading tokens and creating stream...");

      await sf
        .batchCall([upgradeOperation, createFlowOperation])
        .exec(signer)
        .then(function (tx) {
          console.log(
            `Congrats - you've just successfully executed a batch call!
            You have completed 2 operations in a single tx 🤯
            View the tx here:  https://goerli.etherscan.io/tx/${tx.hash}
            View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
            Network: Goerli
            Super Token: DAIx
            Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
            Receiver: ${recipient},
            FlowRate: ${flowRate}
            `
          );
          _sendNotification();
        });
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  async function daiApprove(approveAmount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider
    });

    const superSigner = sf.createSigner({ signer: signer });

    console.log(signer);
    console.log(await superSigner.getAddress());
    const daix = await sf.loadSuperToken("fDAIx");

    console.log(daiABI);

    const DAI = new ethers.Contract(
      "0x88271d333C72e51516B67f5567c728E702b3eeE8",
      daiABI,
      signer
    );

    console.log(DAI);
    try {
      console.log("approving DAI spend");
      await DAI.approve(
        "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00",
        ethers.utils.parseEther(approveAmount.toString())
      ).then(function (tx) {
        console.log(
          `Congrats, you just approved your DAI spend. You can see this tx at https://goerli.etherscan.io/tx/${tx.hash}`
        );
      });
    } catch (error) {
      console.error(error);
    }
  }

  const notify = (e) => {

    e.preventDefault()

    // daiApprove(100000000000000000000)
    //executeBatchCall(amt, streamData.walletAddress, 500000000000000)
    _sendNotification();
    toast.success(`Donated successfully`, {
      position: toast.POSITION.TOP_CENTER
    });

  }

  return (
    <>
      <div className='streaming-cont2'>
        <div className='screen2'>
          <Player
            playbackId={streamData.playbackId}
            title={streamData.streamName}
            showLoadingSpinner
            showTitle
            showPipButton
          />
          <h1 className='flex w-full justify-between items-center'>{streamData.streamName}  <span className="flex items-center mr-4"><EyeOutlined /> &nbsp;2.5K</span></h1>
          <h1>{streamData.streamInfo}</h1>
          <div className='streamer-acc2'>
            <img src={logo} alt="" />
            <div className='ch-data'>
              <h1>Dynamo Gaming</h1>
              <h2>10M subscribers</h2>
            </div>
            <button className='sub-btn' onClick={() => optIntoAChannel(streamData.walletAddress)}>
              <i class='bx bx-bell'></i>&nbsp; Subscribe
            </button>
          </div>

          <div className='donation'>
            <form>
              <input type='text' placeholder='Amount' onChange={(e) => setAmt(e.target.value)} />
              <button className='btn-style' onClick={notify}>Donate</button>
            </form>
          </div>
        </div>
        <div className='data2'>
          <p className='title'><i class='bx bx-data'></i> &nbsp;Recorded NFT Videos</p>
          <Card />
        </div>
      </div>
      <ToastContainer autoClose={7000} />
    </>
  )
}

export default LiveStreaming