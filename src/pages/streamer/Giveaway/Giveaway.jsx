import React, { useState } from "react";
import { customHttpProvider, daiABI } from "./config";
import { Framework } from "@superfluid-finance/sdk-core";
import { Button, Form, FormGroup, FormControl, Spinner } from "react-bootstrap";
import "./batchCall.css";
import { ethers, Contract } from "ethers";
import { abi } from "./config2";
import * as Push from "@pushprotocol/restapi";
import { useContext } from "react";
import Auth from "../../../context/Auth";

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

    //will be used to approve super token contract to spend DAI
async function daiApprove(approveAmount) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
  
    const sf = await Framework.create({
      chainId: 5,
      provider: provider
    });
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const signer = provider.getSigner();
  
  
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
  
  //where the Superfluid logic takes place
  async function executeBatchCall(upgradeAmt, recipient, flowRate) {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    var accounts;
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
    const signer = provider.getSigner();
  
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
          //Add a push Notification here
        });
  
    } catch (error) {
      console.log(
        "Hmmm, your transaction threw an error. Make sure that this stream does not already exist, and that you've entered a valid Ethereum address!"
      );
      console.error(error);
    }
  }
  
  async function scheduleStream(_RA, _startDate, _Amt, _EndDate) {
    handelRA()
    console.log("Helllo");
    var accounts;
    if(window.ethereum){
      try {
           accounts = await window.ethereum.request({
              method: "eth_requestAccounts",
          });
         // console.log(accounts)           
      } catch (error) {
          console.log(error)
      }
  }
  
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    var d1 = new Date(_startDate);
    var d2 = new Date(_EndDate);
    const d11 = parseInt(d1.getTime())/1000;
    const d22 = parseInt(d2.getTime())/1000;
    const _Amtt = parseInt(_Amt);
    /* console.log("Start Date = "+d1.getTime());
    console.log("End Date = "+d2.getTime()); */
    const signer = provider.getSigner();
    const contractAddress = "0xA6134E107FCAEAab6140CB8fb92Dbf5bd9EF6C86";
    const contractABI = abi;
    try{
    const peer = new Contract(
      contractAddress,
      contractABI,
      signer
    );
    const superToken = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";
  /*   console.log(typeof(accounts),typeof(_RA), typeof(d11), typeof(d11),typeof(315777553760070), typeof(_Amtt), typeof(d22),"0x", "0x");
    console.log((accounts),(_RA), (d11), (d11),(315777553760070), (_Amtt), (d22),"0x", "0x");
   */
    console.log("Writing");
    const coffeeTxn = await peer.createFlowSchedule(superToken, _RA, d11, d11,315777553760070, _Amtt, d22, "0x", "0x");
    console.log("Writing2");
  
    await coffeeTxn.wait();
    console.log("mined", coffeeTxn.hash);
    }catch{
      console.log("Error");
    }
    console.log("Written");
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

        let meraAccount = address
    
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
    <div>
      {/* <h2>Batch Calls</h2>
      <h5>
        Upgrade and create a flow in a single tx <span role="img">🤯</span>
      </h5>
      <div>
        <Form>
          <FormGroup className="mb-3">
            <FormControl
              name="upgradeAmount"
              value={upgradeAmount}
              onChange={handleUpgradeAmountChange}
              placeholder="Enter the dollar amount you'd like to upgrade"
            ></FormControl>
          </FormGroup>
        </Form>
      </div>
      <div>
        <Form>
          <FormGroup className="mb-3">
            <FormControl
              name="recipient"
              value={recipient}
              onChange={handleRecipientChange}
              placeholder="Enter your Ethereum address"
            ></FormControl>
          </FormGroup>
          <FormGroup className="mb-3">
            <FormControl
              name="flowRate"
              value={flowRate}
              onChange={handleFlowRateChange}
              placeholder="Enter a flowRate in wei/second"
            ></FormControl>
          </FormGroup>
          <BatchCallButton
            onClick={() => {
              setIsBatchCallButtonLoading(true);
              executeBatchCall(upgradeAmount, recipient, flowRate);
              setTimeout(() => {
                setIsBatchCallButtonLoading(false);
              }, 1000);
            }}
          >
            Click to Upgrade Tokens and Create Your Stream
          </BatchCallButton>
        </Form>
      </div> */}
      <div>
        <br>
        </br>
        <form>
          <h2>Schedule Money stream starts here,A stream will be scheduled at 12 AM GMT timezone</h2>
          <input type="date" placeholder="Start Date" onChange={handelSD} name="StartDate" value={StartDate}></input>
          <input type="Number" placeholder="Amount" name="Amount" onChange={handelAmount} value={Amountt}></input>
          <input type="date" placeholder="End Date" name="EndDate" onChange={handelED} value={EndDate}></input>
          <button
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              scheduleStream(receiversAddress, StartDate, Amountt, EndDate);
            }}
          >
            Click to schedule a stream
          </button>
        </form>
      </div>


    </div>
  )
}

export default Giveaway
