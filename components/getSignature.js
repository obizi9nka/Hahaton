const { ethers } = require("ethers"); // need to change
// const PRIVATE_KEY_SIGNER = process.env.PRIVATE_KEY_SIGNER
// const NODE_URL = process.env.NODE_URL

const PRIVATE_KEY_SIGNER = "bf230942dc9130d0fbfd110cec6f4228a7e03f531df6df067b2f2bae746b7239"
const PUBLIC_KEY_SIGNER = "0x53dA845Ebe1F9668c37b9fBd9a40EC6130040834"
const NODE_URL = "https://goerli.infura.io/v3/ae1a9e55f1824b8f86fda122aafded26"

const getSignature = async (minter, id) => {
    const provider = new ethers.providers.JsonRpcProvider(NODE_URL)
    const signer = new ethers.Wallet(PRIVATE_KEY_SIGNER, provider)
    const message = ethers.utils.defaultAbiCoder.encode(["uint256", "address"], [id, minter]);
    const messageHash = ethers.utils.solidityKeccak256(["bytes"], [message])
    const messageHashBytes = ethers.utils.arrayify(messageHash)

    const flatSig = await signer.signMessage(messageHashBytes)
    const sig = ethers.utils.splitSignature(flatSig);
    const v = sig.v
    const r = sig.r
    const s = sig.s

    return { message, messageHash, v, r, s }
}

module.exports = {
    getSignature,
}