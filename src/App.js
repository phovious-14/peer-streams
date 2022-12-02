import "./App.css";
import Header from "./components/header/Header";
import HomeContainer from "./components/home-container/HomeContainer";
import Bg from "./components/bg/Bg";
import AnimatedCursor from "react-animated-cursor";
import ringer from "./assets/mixkit-water-sci-fi-bleep-902.wav";
import { Route, Routes } from "react-router-dom";
import Streaming from "./components/Streaming/Streaming";
import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig, useAccount } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
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
  const { address, isConnecting, isDisconnected } = useAccount()
  console.log(isConnecting);
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div className="App overflow-x-hidden">
          <Bg />
          <Header />
          <Routes>
            <Route exact path="/" element={<HomeContainer />} />
            {/* <Route exact path="/monetization" element={<NftCollection />} />
        <Route exact path="/account" element={<Account />} /> */}
            <Route exact path="/streaming" element={<Streaming />} />
          </Routes>
          <AnimatedCursor
            innerSize={40}
            outerSize={40}
            color="253, 175, 57"
            outerAlpha={0.1}
            innerScale={0.7}
            outerScale={3}
            clickables={[
              "a",
              'input[type="text"]',
              'input[type="email"]',
              'input[type="number"]',
              'input[type="submit"]',
              'input[type="image"]',
              "label[for]",
              "select",
              "textarea",
              "button",
              ".link",
            ]}
            trailingSpeed={2}
            hasBlendMode={true}
            innerStyle={{
              mixBlendMode: "exclusion",
            }}
          />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default App;
