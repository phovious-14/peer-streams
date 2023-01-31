import React, { useState } from "react";
import { customHttpProvider, daiABI } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Form, FormGroup, FormControl, Spinner } from "react-bootstrap";
import "./batchCall.css";
import { ethers, Contract } from "ethers";
import { abi } from "./config2";
import { useContext } from "react";
import Auth from "../../../context/Auth";
import { sendNotification } from '@pushprotocol/restapi/src/lib/payloads';
import * as Push from "@pushprotocol/restapi";
import { ToastContainer, toast } from 'react-toastify';
const Giveaway = () => {

    const {address} = useContext(Auth)
    const [recipient, setRecipient] = useState("");
    const [isBatchCallButtonLoading, setIsBatchCallButtonLoading] = useState(
      false
    );
    const [upgradeAmount, setUpgradeAmount] = useState("");
    const [flowRate, setFlowRate] = useState("");
    const [flowRateDisplay, setFlowRateDisplay] = useState("");
    const [approveAmount, setApproveAmount] = useState("");
    const [receiversAddress, setRA] = useState("");
    const [StartDate, setSD] = useState("");
    const [Amountt, setAmountt] = useState("");
    const [EndDate, setED] = useState("");
    const [isApproveButtonLoading, setIsApproveButtonLoading] = useState(false);
    const [subs,setSubs] = useState("");
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const { ethereum } = window;
    const signer = provider.getSigner()
    async function _sendNotification(_receiver,amt) {
  
      let sender = address;
      let reciver =_receiver ;
      console.log("Rev:",reciver);
      console.log("amt:", amt, "Receiver:", reciver, "sender:", sender);
      const apiResponse = sendNotification({
        signer,
        type: 1, // target
        identityType: 2, // direct payload
        notification: {
          title: 'Giveaway',
          body: `Giveaway by ${sender}`
        },
        payload: {                                                                                                                             
          title: `Giveaway Winner is `,
          body: `Congrats ${reciver} , You have received ${amt}$`,
          cta: '',
          img: ''
        },
        channel: `eip155:5:${sender}`, // your channel address
        env: 'staging'
      });
  
      console.log(apiResponse);
    }
  //where the Superfluid logic takes place
   async function executeBatchCall(_msg,upgradeAmt) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var accounts;
var flowRate = 500000000000000;
 console.log("Subs is :",await _msg);
 var Receiver = await _msg;
 console.log("Message:",Receiver,"Upgrade Amt",upgradeAmt);
    if(window.ethereum){
      try {
           accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
          console.log(accounts)           
      } catch (error) {
          console.log(error)
      }
  }
    const sf = await Framework.create({
      chainId: 5,
      provider: provider
    });
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const _signer = provider.getSigner();
    const DAIx = await sf.loadSuperToken(
      "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00"
    );
  
    try {
      const amtToUpgrade = ethers.utils.parseEther(upgradeAmt.toString());
      const upgradeOperation = DAIx.upgrade({
        amount: amtToUpgrade.toString()
      });
      //upgrade and create stream at once
      const createFlowOperation = DAIx.createFlow({
        sender: accounts[0],
        receiver: Receiver,
        flowRate: flowRate
      });
  
      console.log("Upgrading tokens and creating stream...");
  
      await sf
        .batchCall([upgradeOperation, createFlowOperation])
        .exec(_signer)
        .then(function (tx) {
          console.log(
            `Congrats - you've just successfully executed a batch call!
            You have completed 2 operations in a single tx 🤯
            View the tx here:  https://goerli.etherscan.io/tx/${tx.hash}
            View Your Stream At: https://app.superfluid.finance/dashboard/${Receiver}
            Network: Goerli
            Super Token: DAIx
            Sender: 0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721
            Receiver: ${Receiver},
            FlowRate: ${flowRate}
            `
          );
          //Add a push Notification here
          _sendNotification(Receiver,upgradeAmt);
          toast.success(`Giveaway Successful,check your push channel for winner`, {
            position: toast.POSITION.TOP_CENTER
          });

        });
  
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  } 
  
    function calculateFlowRate(amount) {
      if (typeof Number(amount) !== "number" || isNaN(Number(amount)) === true) {
        alert("You can only calculate a flowRate based on a number");
        return;
      } else if (typeof Number(amount) === "number") {
        if (Number(amount) === 0) {
          return 0;
        }
        const amountInWei = ethers.BigNumber.from(amount);
        const monthlyAmount = ethers.utils.formatEther(amountInWei.toString());
        const calculatedFlowRate = monthlyAmount * 3600 * 24 * 30;
        return calculatedFlowRate;
      }
    }
  
    function BatchCallButton({ isLoading, children, ...props }) {
      return (
        <Button variant="success" className="batchCallButton" {...props}>
          {isBatchCallButtonLoading ? <Spinner animation="border" /> : children}
        </Button>
      );
    }
    function ApproveButton({ isLoading, children, ...props }) {
      return (
        <Button variant="success" className="approveButton" {...props}>
          {isApproveButtonLoading ? <Spinner animation="border" /> : children}
        </Button>
      );
    }
    const handleRecipientChange = (e) => {
      setRecipient(() => ([e.target.name] = e.target.value));
    };

    async function getSubs(){

        let meraAccount = address;

        const channelData = await Push.channels._getSubscribers({
          channel: `eip155:5:${address}`, // channel address in CAIP
          env: 'staging'
        })
    
        let data;
        function findRand(){
          let index =  Math.floor(Math.random() * ((channelData.length) - 0) ) + 0;
          return (channelData[index]);
        }
        data = findRand();
        console.log(data);
        console.log(meraAccount);
    
        while(data === meraAccount){
          console.log("In While");
          data = findRand();
        }
        console.log("Random Subs are :",data);
        setSubs(data);

        return data;
      }
  
    const handelRA = async () => {
      setRA(await getSubs());
    }
    const handelSD = (e) => {
      setSD(() => ([e.target.name] = e.target.value));
    }
    const handelAmount = (e) => {
      setAmountt(() => ([e.target.name] = e.target.value));
    }
    const handelED = (e) => {
      setED(() => ([e.target.name] = e.target.value));
    }
    const handleApproveAmountChange = (e) => {
      setApproveAmount(() => ([e.target.name] = e.target.value));
    };
  
    const handleUpgradeAmountChange = (e) => {
      setUpgradeAmount(() => ([e.target.name] = e.target.value));
    };
  
    const handleFlowRateChange = (e) => {
      setFlowRate(() => ([e.target.name] = e.target.value));
      let newFlowRateDisplay = calculateFlowRate(e.target.value);
      setFlowRateDisplay(newFlowRateDisplay.toString());
    };


  return (
    
      <div className="cont">
      <form className="form">
        <h2 className="text-white">Select a Random subscriber from your PUSH Channel and send him Love in form of Donations</h2><br /><br />
        <input type="text" placeholder="Amount" name="Amount" onChange={handelAmount} value={Amountt}></input><br /><br />
        <button
          type="submit"
          className="btn-style btn"
          onClick={(e) => {
            e.preventDefault();
     executeBatchCall(getSubs(),Amountt);
//_sendNotification("0xDCB45e4f6762C3D7C61a00e96Fb94ADb7Cf27721",5)
          }}
        >
         Giveaway 🚀
        </button>
      </form>
      <ToastContainer autoClose={10000} />
    </div>
  
  )
}

export default Giveaway
