import { createContext, useState } from "react";
import { useAccount } from "wagmi";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { Framework } from "@superfluid-finance/sdk-core";

const Auth = createContext({});
export const AuthProvider = ({ children }) => {
  const { address, isConnecting, isDisconnected } = useAccount();
  const [playbackId, setPlaybackId] = useState("");
  const [subs, setSubs] = useState("");

  const provider = new ethers.providers.Web3Provider(window.ethereum);

  const { ethereum } = window;
  if (!ethereum) {
    alert("Get MetaMask!");
    return;
  }

  const signer = provider.getSigner();

  async function sendNotification(title, body) {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    try {
      const apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 1, // broadcast
        identityType: 2, // direct payload
        notification: {
          title, //Notification pops just for some time
          body, //Nptification pops for
        },
        payload: {
          title: `yu are pro`, // Main Notification on page
          body: `Hey babes bang bang`, // Main Test shown on the page
          cta: "",
          img: "",
        },
        channel: `eip155:5:${accounts[0]}`,
        env: "staging",
      });

      // apiResponse?.status === 204, if sent successfully!
      console.log("Send Notifications ", apiResponse);
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
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const channelData = await PushAPI.channels.getChannel({
      channel: `eip155:5:${accounts[0]}`, // channel address in CAIP
      env: "staging",
    });
    console.log(channelData);
  }

  async function getSubscriberList() {
    const subscribers = await PushAPI.channels._getSubscribers({
      channel: "eip155:5:0x2AEcb6DeE3652dA1dD6b54D5fd4f7D8F43DaEb78", // channel address in CAIP
      env: "staging",
    });
    // let arr;
    var arr = [];
    subscribers.forEach(async (addr) => {
      const ens = await provider.lookupAddress(addr);
      arr.push(ens);
      // console.log(ens);
    });
    setSubs(arr);
  }

  async function getChannelList() {
    const channelsData = await PushAPI.channels.search({
      query: "push", // a search query
      page: 1, // page index
      limit: 50, // no of items per page
      env: "staging",
    });
    console.log(Object.getOwnPropertyNames(channelsData));
    let arr = [];
    channelsData.forEach((element) => {
      arr.push(element.channel);
      console.log(element.channel);
    });
    console.log(arr);
    // return arr;
  }

  async function optIntoAChannel(joinChannel) {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    await PushAPI.channels.subscribe({
      signer: signer,
      channelAddress: `eip155:5:${joinChannel}`, // channel address in CAIP
      userAddress: `eip155:5:${accounts[0]}`, // user address in CAIP
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
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log("Connected", accounts[0]);

    let recipient = '0xc0EcAd34362E05169DBB4AcBbC6818D2Fe0DCdeF'

    const signer = provider.getSigner();

    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const sf = await Framework.create({
      chainId: Number(chainId),
      provider: provider,
    });

    const DAIxContract = await sf.loadSuperToken("fDAIx");
    const DAIx = DAIxContract.address;

    try {
      const createFlowOperation = sf.cfaV1.createFlow({
        sender: accounts[0],
        receiver: recipient,
        flowRate: flowRate,
        superToken: DAIx,
        // userData?: string
      });

      console.log("Creating your stream...");

      const result = await createFlowOperation.exec(signer);
      console.log(result);

      console.log(
        `Congrats - you've just created a money stream!
    View Your Stream At: https://app.superfluid.finance/dashboard/${recipient}
    Network: Kovan
    Super Token: DAIx
    Sender: ${accounts[0]}
    Receiver: ${recipient},
    FlowRate: ${flowRate}
    `
      );
      // should have same address as sender
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }

  async function deleteNetFlow() {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;
    if (!ethereum) {
      alert("Get MetaMask!");
      return;
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    let currentAccount = accounts[0]
    let recipient = '0xc0EcAd34362E05169DBB4AcBbC6818D2Fe0DCdeF'

    console.log("In stream delete");
    console.log(
      "Current Account is : " + currentAccount + "Recipient is :" + recipient
    );
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const signer = provider.getSigner();

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
      await flowOp.exec(signer);
    } catch (e) {
      console.log(e);
    }
    console.log("Stream Ended ");
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
        playbackId,
        setPlaybackId,

        createNewFlow,
        deleteNetFlow
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default Auth;
