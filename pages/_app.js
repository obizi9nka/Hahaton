import '../styles/globals.css'
import '@rainbow-me/rainbowkit/styles.css';

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import Head from 'next/head';

import {
  getDefaultWallets,
  RainbowKitProvider,
  darkTheme
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
  useNetwork,
  defaultChains,
  useAccount,
  useContractWrite,
  usePrepareContractWritde
} from 'wagmi';


import { alchemyProvider } from 'wagmi/providers/alchemy'
import { infuraProvider } from 'wagmi/providers/infura'
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import Wallet from '../components/Wallet';


const BNBChain = {
  id: 56,
  name: 'Binance',
  network: 'BNB',
  iconUrl: 'https://example.com/icon.svg',
  iconBackground: '#fff',
  nativeCurrency: {
    decimals: 18,
    name: 'Binance',
    symbol: 'BNB',
  },
  rpcUrls: {
    default: 'https://bsc-dataseed.binance.org/',
  },
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://bscscan.com' },
  },
  testnet: false,
};


const { chains, provider } = configureChains(
  [chain.goerli],
  [
    jsonRpcProvider({
      rpc: (chain) => {
        if (chain.id !== BNBChain.id) return null
        return { http: chain.rpcUrls.default }
      },
    }),
    publicProvider(),
  ]
);
const { connectors } = getDefaultWallets(
  {
    appName: 'e',
    chains
  },
);
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


function MyApp({ Component, pageProps }) {



  const [logo, setlogo] = useState('/Logos/purple.png')

  const [isSession, setIsSession] = useState(false)

  const [tymblerNaNetwork, settymblerNaNetwork] = useState(true)

  const [needWallet, setneedWallet] = useState(false)
  const [needCheckNFT, setneedCheckNFT] = useState(false)

  const [daloyNFTbutton, setdaloyNFTbutton] = useState(false)
  const [daloynavigationSmartfon, setdaloynavigationSmartfon] = useState(false)


  const [LOTTERY_ADDRESS, setlotteryAddress] = useState("")
  const [NFT_ADDRESS, setnftAddress] = useState("")

  const [isWalletAlert, setisWalletAlert] = useState(false)

  const { chain } = useNetwork()

  const [chainId, setchainId] = useState(0)









  return (

    <div className='main'>

      <Head>
        <meta name="viewport" content='width=device-width' />
        <link rel="icon" href={"/BLACK.ico"} />
      </Head>
      <WagmiConfig client={wagmiClient}>
        <div className="nav">
          <div>PSPRT.ID</div>
          <div></div>
          <Wallet chains={chains} />
        </div >
        <Component {...pageProps} />

        <footer>
        </footer>
      </WagmiConfig>
    </div>
  )
}

export default MyApp

