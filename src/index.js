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

const livepeerClient = createReactClient({
  provider: studioProvider({    
    apiKey: process.env.REACT_APP_LIVEPEER_API,    
  }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LivepeerConfig client={livepeerClient}>
      <Router>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </LivepeerConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
