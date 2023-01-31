import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthProvider } from "./context/Auth";
import {
  LivepeerConfig,
  createReactClient,
  studioProvider,
} from "@livepeer/react";
import Web3Modal from "web3modal";
const livepeerClient = createReactClient({
  provider: studioProvider({    
    apiKey: process.env.REACT_APP_LIVEPEER_API,    
  }),
});

const web3Modal = new Web3Modal({
  network: "goerli",
  cacheProvider: true,
})

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <web3Modal>
      <LivepeerConfig client={livepeerClient}>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </LivepeerConfig>
    </web3Modal>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
