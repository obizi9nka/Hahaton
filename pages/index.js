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
          <div>
            Бронзовый значок
          </div>
          <br />
          {"При нажатии -> PopUp с необходимыми требования для получения значка"}
        </div>
        <div className='tokenPicture' onClick={() => { if (znachok == null) setZnachok(2) }}>
          <div>
            Серебрянный значок
          </div>
          <br />
          {"При нажатии -> PopUp с необходимыми требования для получения значка"}
        </div>
        <div className='tokenPicture' onClick={() => { if (znachok == null) setZnachok(3) }}>
          <div>
            Золотой значок
          </div>
          <br />
          {"При нажатии -> PopUp с необходимыми требования для получения значка"}
        </div>
      </div>
      <PopUp znachok={znachok} setZnachok={setZnachok} />

    </div>
  )
}
