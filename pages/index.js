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
  const { address } = useAccount()
  const [balance, setBalance] = useState()
  const [need, setneed] = useState(false)


  useEffect(() => {
    if (need)
      CheckBalance()
  }, [need])

  useEffect(() => {
    CheckBalance()
  }, [])

  const CheckBalance = async () => {
    try {
      const contract = new ethers.Contract(CONTRACT_ADDRESS, SoulBoundToken.abi, provider)
      const first = parseInt(await contract.balanceOf(address, 1))
      const second = parseInt(await contract.balanceOf(address, 2))
      const third = parseInt(await contract.balanceOf(address, 3))
      setBalance({
        first,
        second,
        third
      })
      setneed(false)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div >
      <h2 style={{ display: "flex", justifyContent: "center" }}>Ваш баланс</h2>
      <div className='balances'>
        <div>BRONZE</div>
        <div>SILVER</div>
        <div>GOLD</div>
        <div>{balance == undefined ? 0 : balance.first}</div>
        <div>{balance == undefined ? 0 : balance.second}</div>
        <div>{balance == undefined ? 0 : balance.third}</div>
      </div>

      <div className='tokensPicturesArea'>
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
      </div>
      <PopUp znachok={znachok} setZnachok={setZnachok} setneed={setneed} />

    </div>
  )
}
