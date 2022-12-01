import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import styles from '../styles/Home.module.css'
import PopUp from '../components/PopUp'

export default function Home() {

  const [znachok, setZnachok] = useState(null)

  console.log(znachok)
  return (
    <div >
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
      <PopUp znachok={znachok} setZnachok={setZnachok} />

    </div>
  )
}
