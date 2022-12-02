import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ringer from '../assets/mixkit-water-sci-fi-bleep-902.wav'
const Auth = createContext({});

export const AuthProvider = ({ children }) => {		

	const audio = new Audio(ringer);
	
	return (
		<Auth.Provider
			value={{
				audio
			}}
		>
		{children}
		</Auth.Provider>
	);
};

export default Auth;
