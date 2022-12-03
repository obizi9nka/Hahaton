const { ethers } = require("ethers"); // need to change
const PRIVATE_KEY_SIGNER = process.env.NEXT_PUBLIC_PRIVATE_KEY_SIGNER
const NODE_URL = process.env.NEXT_PUBLIC_NODE_URL

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