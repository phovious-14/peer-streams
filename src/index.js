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
import Push from './components/push/Push'

const livepeerClient = createReactClient({
  provider: studioProvider({    
    apiKey: '2df1219b-52f9-43bb-b5cb-bd8d7b9998a8',    
  }),
});
 
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LivepeerConfig client={livepeerClient}>
      <Router>
        <AuthProvider>
          <App />
          {/* <Push /> */}
        </AuthProvider>
      </Router>
    </LivepeerConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
