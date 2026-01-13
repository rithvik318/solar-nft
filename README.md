# Solar Panel NFT (Sepolia)

Solar Panel NFT is a small end-to-end Web3 dApp that mints ERC-721 NFTs representing individual solar panels using open irradiance data and IPFS-hosted metadata.

Each NFT acts as a digital certificate and includes:
- Panel location and capacity
- Estimated annual energy generation (kWh/year)
- Data source and proof hash
- An auto-generated SVG “panel card” image

The project demonstrates how open data, IPFS, and NFTs can be combined to create verifiable, non-speculative digital assets.

---

## Tech Stack

- Smart Contract: Solidity, OpenZeppelin ERC-721 (Sepolia)
- Backend: Node.js + Express
- Frontend: Next.js + React + ethers.js
- Storage: IPFS via Pinata (JSON metadata + SVG)

---

## Quick Setup (Local)

### 1. Clone and install

```bash
git clone https://github.com/chainfly/Solar-Panel-NFT.git
cd Solar-Panel-NFT
````

Backend:

```bash
cd backend
npm install
```

Frontend:

```bash
cd ../frontend
npm install
```

---

### 2. Backend configuration

Create `backend/.env`:

```env
PORT=4000
PINATA_JWT=your_pinata_jwt_here
```

Start backend:

```bash
cd backend
node server.js
```

---

### 3. Frontend configuration

Update the contract address in `frontend/pages/index.js` if needed:

```js
const CONTRACT_ADDRESS = "0x6f4955D95F410FBca2D1e922E8BBB233Ee61d233";
```

Start frontend:

```bash
cd frontend
npm run dev
```

---

### 4. Using the dApp

1. Open `http://localhost:3000` in a browser with MetaMask installed.
2. Switch MetaMask network to Sepolia and connect your wallet.
3. Generate metadata (IPFS upload) using the backend.
4. Mint the NFT on Sepolia and confirm the transaction in MetaMask.
5. Verify the NFT via a Sepolia explorer and IPFS gateway.

---

## Notes

* The ERC-721 contract is deployed on Sepolia via Remix + MetaMask.
* Backend and frontend can be deployed independently for a live demo.
* The contract can be redeployed with the same interface if required; only the address needs to be updated.
