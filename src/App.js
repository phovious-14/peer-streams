import "./App.css";
import Header from "./components/header/Header";
import HomeContainer from "./components/home-container/HomeContainer";
import Bg from "./components/bg/Bg";
import { Route, Routes } from "react-router-dom";
import Streaming from "./components/Streaming/Streaming";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import Channels from "./components/channels/Channels";
import Subscribers from "./components/subscribers/Subscribers";

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
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App overflow-x-hidden">
          <Bg />
          <Header />
          <Routes>
            <Route exact path="/" element={<HomeContainer />} />
            <Route exact path="/channels" element={<Channels />} />
            <Route exact path="/subscribers" element={<Subscribers />} />
            <Route exact path="/streaming" element={<Streaming />} />
          </Routes>
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
