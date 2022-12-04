This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Project overview

Project is submitted to the Hackathon Web3Souls by team DAOers

It implements service, which ensures user is not the bot by passing the recaptcha and giving the permission to mint SBT

Permission is payload and signature.

## Structure of repository

Token contract lies in root directory, SoulBoundToken.sol

Other files are part of frontend on Next.js

## Getting Started

```
git clone https://github.com/obizi9nka/Hahaton.git
cd Hahaton
nmp i
```

Create .env.local file and config server private key and RPC URL, for example:
```
NEXT_PUBLIC_NODE_URL=https://eth-goerli.g.alchemy.com/v2/Fvr4iHEEClnFhZtgTB8ITVSen4GPwOls
NEXT_PUBLIC_PRIVATE_KEY_SIGNER=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

After, deploy contract with argument signer - public key of private key above
Set
```CONTRACT_ADDRESS="address of deployed contract"``` in components/constants.js

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.
