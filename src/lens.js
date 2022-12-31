import logo from './logo.svg';
import './App.css';
import {abi} from './config';
import { Contract } from 'ethers';
import { ethers } from 'ethers';

import { queryExample, queryPub,profile } from './lens';
async function mintNft(){
  var wa = document.getElementById("wallet_address").value;
  var uri = document.getElementById("uri").value;

  const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const signer = provider.getSigner();
    const contractAddress ='0x903a2684cEbf15A47F32FDB2F95004CaaA40da81';
    const contractABI = abi;
    const peer =new Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log("Writing")
    const txn = await peer.safeMint(wa,uri);
    await txn.wait();
    console.log("mined", txn.hash);
}
function App() {
  return (
    <div className="App">
      <button onClick={queryExample}>Click Me</button>
      <button onClick={queryPub}>Publications</button>
      <button onClick={profile}>Proflie</button>
      <input type='text' id="wallet_address" placeholder='Wallet Address'></input>
      <input type='text' id="uri" placeholder='uri'></input>
      <button onClick={mintNft}>Mint Nft</button>

      
    </div>
  );
}

export default App;
