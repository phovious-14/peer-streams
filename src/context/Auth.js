import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ringer from "../assets/mixkit-water-sci-fi-bleep-902.wav";
import { useAccount, useSigner } from "wagmi";
import { fetchSigner } from "@wagmi/core";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { goerli } from "@wagmi/core/chains";
import { useEnsName } from 'wagmi'

const Auth = createContext({});
export const AuthProvider = ({ children }) => {
  const { address, isConnecting, isDisconnected } = useAccount();

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
      channel: 'eip155:5:0x2AEcb6DeE3652dA1dD6b54D5fd4f7D8F43DaEb78', // channel address in CAIP
      env: "staging",
    });

    subscribers.forEach(async (addr) => {
      const ens = await provider.lookupAddress(addr);
      console.log(ens);
    });
  }

  async function getChannelList() {
    const channelsData = await PushAPI.channels.search({
      query: "push", // a search query
      page: 1, // page index
      limit: 50, // no of items per page
      env: "staging",
    });
    console.log(Object.getOwnPropertyNames(channelsData))
    console.log(channelsData[0])
    channelsData.forEach(element => {
      //DO a IF 
      console.log(element.channel);
    });
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
        getChannelList
      }}
    >
      {children}
    </Auth.Provider>
  );
};

export default Auth;
