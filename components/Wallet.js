import Image from 'next/image'
import Link from 'next/link'
const { ethers } = require("ethers");
import { useState, useEffect } from 'react'


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
    defaultChains,
    useAccount,
    useContractWrite,
    usePrepareContractWritde,
    useConnect,
    useNetwork, useProvider, chainId
} from 'wagmi';


import { infuraProvider } from 'wagmi/providers/infura'
import { ConnectButton, connectorsForWallets, wallet } from '@rainbow-me/rainbowkit';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'

export default function Wallet({ chains }) {


    const [NftButton, setNftButton] = useState(false)
    const [isWalletConnect, setisWalletConnect] = useState(false)


    const { chain } = useNetwork()
    const provider = useProvider()

    const { address, isConnected, isConnecting } = useAccount()


    useEffect(() => {
        if (isConnected) {
            console.log('Connected', chain.id)
            localStorage.setItem("WalletConnect", "true")
        }
        else {
            console.log('Disconnected')
            setisWalletConnect(false)
            localStorage.removeItem("WalletConnect")
        }
    }, [isConnected, chain])





    return (
        <RainbowKitProvider chains={chains} theme={darkTheme()} >
            <ConnectButton></ConnectButton>
        </RainbowKitProvider>
    )
}
