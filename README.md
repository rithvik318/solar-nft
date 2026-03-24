# Solar Panel NFT (Sepolia)

🔗 **Live Demo:** 

1. https://rithviksolarnft.vercel.app

2. https://rithviksolar-af27h2wvc-rithvikb318-5042s-projects.vercel.app/


---

**Solar Panel NFT** is a small end-to-end **Web3 dApp** that mints **ERC-721 NFTs** representing individual solar panels using **open irradiance data** and **IPFS-hosted metadata**.

Each NFT acts as a **digital certificate** and includes:

- **Panel location and capacity**
- **Estimated annual energy generation (kWh/year)**
- **Data source and proof hash**
- **An auto-generated SVG “panel card” image**

The project demonstrates how **open data, IPFS, and NFTs** can be combined to create **verifiable, non-speculative digital assets**.

---

## Tech Stack

- **Smart Contract:** Solidity, OpenZeppelin ERC-721 (Sepolia)
- **Frontend:** Next.js + React + ethers.js
- **Backend Logic:** Node.js via Next.js API Routes
- **Storage:** IPFS via Pinata (JSON metadata + SVG)

---

## Architecture & Deployment

The application is deployed entirely on **Vercel**.

Backend functionality—such as **solar data processing**, **metadata generation**, and **IPFS uploads**—is implemented using **Next.js API routes** (`pages/api`).

This unified setup allows the frontend and backend to run together on the same deployment, avoiding **CORS issues** and simplifying the deployment pipeline.

The `backend/` directory contains reusable server-side logic that is imported by the API routes.  
It is **not deployed as a standalone Express service** in the final architecture.

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
