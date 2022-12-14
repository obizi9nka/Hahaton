import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import PopUp from '../components/PopUp'
import { useAccount, useProvider } from 'wagmi'
import { ethers } from 'ethers'
import { CONTRACT_ADDRESS } from "../components/constants"
import SoulBoundToken from "/blockchain/SoulBoundToken.json"


export default function Home() {

  const [znachok, setZnachok] = useState(null)

  const provider = useProvider()
  const { address, isConnected } = useAccount()
  const [balance, setBalance] = useState({
    first: 0,
    second: 0,
    third: 0,
    timeMintedFirst: undefined
  }
  )
  const [need, setneed] = useState(false)

  useEffect(() => {
    if (need)
      CheckBalance()
  }, [need])

  useEffect(() => {
    CheckBalance()
  }, [])

  useEffect(() => {
    CheckBalance()
  }, [address])

  const CheckBalance = async () => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, SoulBoundToken.abi, provider)
      const timeMinted = parseInt(await contract.getLastTimeMinted(address, 1))
      const date = new Date(timeMinted * 1000)
      const t = date.toDateString()
      const timeMintedFirst = `${t.substring(8, 10)} ${t.substring(4, 7)} ${t.substring(11, 15)}`
      const first = parseInt(await contract.balanceOf(address, 1))
      const second = parseInt(await contract.balanceOf(address, 2))
      const third = parseInt(await contract.balanceOf(address, 3))
      setBalance({
        first,
        second,
        third,
        timeMintedFirst
      })
      setneed(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div >
      {/* <h2 style={{ display: "flex", justifyContent: "center" }}>Ваш баланс</h2>
      <div className='balances'>
        <div>BRONZE</div>
        <div>SILVER</div>
        <div>GOLD</div>
        <div>{balance == undefined ? 0 : balance.first}</div>
        <div>{balance == undefined ? 0 : balance.second}</div>
        <div>{balance == undefined ? 0 : balance.third}</div>
      </div> */}
      <div className='CENTER zkPsprt'>Your zero-knowledge passport</div>
      <div className="CENTER description">Let everyone know that you are not a bot by verifying the <br />captcha and getting a soulbound NFT Token</div>
      <div className='CENTER'>
        <div className='image'>
          <Image src="/Good boy.png" width={250} height={250} />
        </div>
      </div>
      {
        // (address != undefined) ?
        //   <div className='CENTER verifyed'>
        //     You have already verified
        //   </div>
        //   :
        <div>
          <div className="CENTER" >
            <button className='verify pulse' onClick={() => { if (znachok == null) setZnachok(1) }}>Verify your wallet</button>
          </div>
          {!isConnected && znachok != null && <div className="CENTER">Connect your wallet</div>}
        </div>
      }


      {/* <div className='tokensPicturesArea'>
        <div className='tokenPicture' onClick={() => { if (znachok == null) setZnachok(1) }} >
          <div className='image'>
            Бронзовый значок
          </div>
        </div>
        <div className='tokenPicture' onClick={() => { if (znachok == null) setZnachok(2) }}>
          <div className='image'>
            Серебрянный значок
          </div>
        </div>
        <div className='tokenPicture' onClick={() => { if (znachok == null) setZnachok(3) }}>
          <div className='image'>
            Золотой значок
          </div>
        </div>
      </div> */}
      <PopUp znachok={znachok} setZnachok={setZnachok} setneed={setneed} balance={balance} />

    </div>
  )
}
