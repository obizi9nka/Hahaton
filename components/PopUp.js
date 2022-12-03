import { ethers } from "ethers";
import Script from "next/script";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAccount, useSigner } from "wagmi";
import { getSignature } from "./getSignature";
import { CONTRACT_ADDRESS } from "./constants"
import SoulBoundToken from "/blockchain/SoulBoundToken.json"

export default function PopUp({ znachok, setZnachok, setneed }) {

    const [disable, setdisable] = useState(true)
    const [isSuccses, setisSuccses] = useState(undefined)

    const { address } = useAccount()

    const { data } = useSigner()

    function onChange() {
        setdisable(false)
    }

    const Mint = async () => {
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, SoulBoundToken.abi, data)
            const { message, messageHash, v, r, s } = await getSignature(address, znachok)
            const tx = await contract.mint(message, messageHash, v, r, s)
            await tx.wait()
            setTimeout(() => {
                setneed(true)
            }, 3000);
            setisSuccses(true)
        } catch (err) {
            console.log(err)
            setisSuccses(false)
        }
    }

    return (
        <div className={znachok != null ? "modall active" : "modall"} onClick={() => {
            setZnachok(null)
            if (localStorage.getItem("overflow") != "lock")
                document.body.style.overflow = ('overflow', 'auto');
            else
                document.body.style.overflow = ('overflow', 'hidden');
        }}>
            <div className="znachokAlert" onClick={e => e.stopPropagation()} >
                <div className="JustSolv">Just solve the captcha and mint<br /> your soulbound NFT Token</div>
                <ReCAPTCHA
                    sitekey="6LdlpUkjAAAAAKpYpOF0UwnEBigt5z6S7Dg2-N-g"
                    onChange={onChange}
                />
                <button className="MintButton" disabled={disable} onClick={() => Mint()}>Mint</button>
                {isSuccses != undefined &&
                    <div className="status">{
                        isSuccses ?
                            <div>Awesome! Check out your wallet for a new<br /> cool NFT Token</div>
                            :
                            <div>Oh... something goes wrong, try again</div>}
                    </div>
                }
            </div >
        </div >
    )
}
