
import {abi} from './config';
import { Contract } from 'ethers';

export const writeContract = () => {
async function damn(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const chainId = await window.ethereum.request({ method: "eth_chainId" });
    const signer = provider.getSigner();
    const contractAddress ='0x8A6f0FC9Fe2c13565a9db3bBE0953C334B4D4bFF';
    const contractABI = abi;
    const peer =new Contract(
      contractAddress,
      contractABI,
      signer
    );
    console.log("Writing")
    const _name = "Shubham";
    const coffeeTxn = await peer.createUser(name?_name:"Shubham");
    await coffeeTxn.wait();
    console.log("mined", coffeeTxn.hash);
  
          console.log("Written");
  }
  
  return(
    <CreateButton
    onClick={() => damn()}>Create User
  </CreateButton>
  
  )
}
