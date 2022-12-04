import { ethers } from "ethers";
import Script from "next/script";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useAccount, useSigner } from "wagmi";
import { getSignature } from "./getSignature";
import { CONTRACT_ADDRESS } from "./constants"
import SoulBoundToken from "/blockchain/SoulBoundToken.json"
import Loader from "react-spinners/HashLoader";

export default function PopUp({ znachok, setZnachok, setneed, balance }) {

    const [disable, setdisable] = useState(true)
    const [isSuccses, setisSuccses] = useState(undefined)
    const [isPending, setisPending] = useState(undefined)

    const { address, isConnected } = useAccount()

    const { data } = useSigner()

    function onChange() {
        setdisable(false)
    }

    const Mint = async () => {
        setisPending(true)
        try {
            const contract = new ethers.Contract(CONTRACT_ADDRESS, SoulBoundToken.abi, data)
            const { message, messageHash, v, r, s } = await getSignature(address, znachok)
            const tx = await contract.mint(message, messageHash, v, r, s)
            await tx.wait()
            setneed(true)
            setisSuccses(true)
        } catch (err) {
            console.log(err)
            setisSuccses(false)
        }
        setisPending(false)
        setTimeout(() => {
            setisPending(undefined)
            setisSuccses(undefined)
        }, 5000);
    }

    return (
        <div className={znachok != null && isConnected ? "modall active" : "modall"} onClick={() => {
            setZnachok(null)
        }}>
            <div className="znachokAlert" onClick={e => e.stopPropagation()} >
                {balance.first == 0 ?
                    <div className="JustSolv">Just solve the captcha and mint<br /> your soulbound NFT Token</div>
                    :
                    <div className="JustSolv">Your wallet has been verified on this date:<br />{balance.timeMintedFirst}</div>

                }
                <ReCAPTCHA
                    sitekey="6LdlpUkjAAAAAKpYpOF0UwnEBigt5z6S7Dg2-N-g"
                    onChange={onChange}
                    theme="dark"
                />
                {balance.first == 0 ?
                    <button className="MintButton" disabled={disable} onClick={() => Mint()}>Mint</button> :
                    <button className="MintButton" disabled={disable} onClick={() => Mint()}>Update</button>
                }
                {(isSuccses != undefined || isPending != undefined) &&
                    <div className="status">{
                        isPending ?
                            <div>
                                <Loader color="white" size={40} />
                            </div>
                            :
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
