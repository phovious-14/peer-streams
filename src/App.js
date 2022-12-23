import "./App.css";
import Header from "./components/header/Header";
import HomeContainer from "./components/home-container/HomeContainer";
import { Route, Routes } from "react-router-dom";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Channels from "./components/channels/Channels";
import Subscribers from "./components/subscribers/Subscribers";
import WatchStream from "./components/watchSream/WatchStream";
import Sidebar from "./components/Sidebar/Sidebar";
import Home from "./pages/user/home/Home";
import { useContext } from 'react'
import Auth from './context/Auth'
import StreamerHome from "./pages/streamer/home/StreamerHome";
import CreateStream from "./pages/streamer/create-stream/CreateStream";
import Streaming from "./pages/streamer/streaming/Streaming";
import LiveStreaming from "./pages/user/streaming/LiveStreaming";
import StreamerProfile from "./pages/streamer-profile/StreamerProfile";
import StreamerSubs from "./pages/stream-subscribers/StreamerSubs";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum, chain.goerli],
  [alchemyProvider({ apiKey: process.env.ALCHEMY_ID }), publicProvider()]
);
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  chains,
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

function App() {

  const {mode} = useContext(Auth)
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
         {/* <div className="App overflow-x-hidden">
          <Header />
           <Routes>
             <Route exact path="/" element={<HomeContainer />} />
             <Route exact path="/channels" element={<Channels />} />
             <Route exact path="/subscribers" element={<Subscribers />} />
             <Route exact path="/watch-stream" element={<WatchStream />} />
             <Route exact path="/streaming" element={<Streaming />} />
           </Routes>
         </div> */}
          <Routes>
            {mode === 'user' || mode === '' 
              ? <>
                  <Route exact path="/" element={<Home />} />
                  <Route path="/watching-stream" element={<LiveStreaming />} />
                </>
              : <>
                  <Route exact path="/" element={<StreamerHome />} />
                  <Route path="/create-stream" element={<CreateStream />} />
                  <Route path="/streaming-mode" element={<Streaming />} />
                  <Route path="/subscribers" element={<StreamerSubs />} />
                </>
            }
            <Route path="/streamer-profile" element={<StreamerProfile />} />
          </Routes>
          <Sidebar />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
