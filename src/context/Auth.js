import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ringer from '../assets/mixkit-water-sci-fi-bleep-902.wav'
import {useAccount} from "wagmi";
const Auth = createContext({});

export const AuthProvider = ({ children }) => {		

	const audio = new Audio(ringer);
	const { address, isConnecting, isDisconnected } = useAccount()
	
	return (
		<Auth.Provider
			value={{
				audio,
				address
			}}
		>
		{children}
		</Auth.Provider>
	);
};

export default Auth;
