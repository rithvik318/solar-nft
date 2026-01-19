module.exports = [
"[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("react/jsx-dev-runtime", () => require("react/jsx-dev-runtime"));

module.exports = mod;
}),
"[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/utils/api.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
// frontend/utils/api.js
const API_BASE = ("TURBOPACK compile-time value", "https://solar-nft-backend.onrender.com");
const __TURBOPACK__default__export__ = API_BASE;
}),
"[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js [ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

return __turbopack_context__.a(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {

__turbopack_context__.s([
    "default",
    ()=>Home
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
// frontend/pages/index.js
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__ = __turbopack_context__.i("[externals]/ethers [external] (ethers, esm_import, [project]/node_modules/ethers)");
var __TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$chainfly$2f$solar$2d$nft$2f$frontend$2f$utils$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/utils/api.js [ssr] (ecmascript)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__
]);
[__TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__;
;
;
;
;
const CONTRACT_ADDRESS = "0x6f4955D95F410FBca2D1e922E8BBB233Ee61d233";
const CONTRACT_ABI = [
    "function safeMint(address to, string memory tokenURI_) external"
];
function Home() {
    const [form, setForm] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        panelId: 1,
        model: "Demo-100",
        capacity_kw: 2.0,
        city: "Guwahati",
        state: "Assam",
        country: "India",
        lat: 26.1445,
        lon: 91.7362
    });
    const [preview, setPreview] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])(null);
    const [tokenURI, setTokenURI] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [status, setStatus] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const [walletAddress, setWalletAddress] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])("");
    const handleChange = (e)=>{
        const { name, value } = e.target;
        setForm((prev)=>({
                ...prev,
                [name]: name === "capacity_kw" || name === "lat" || name === "lon" ? Number(value) : value
            }));
    };
    const connectWallet = async ()=>{
        if (!window.ethereum) {
            alert("MetaMask not found");
            return;
        }
        const [account] = await window.ethereum.request({
            method: "eth_requestAccounts"
        });
        setWalletAddress(account);
    };
    const handleGenerate = async ()=>{
        try {
            setStatus("Generating metadata and uploading to IPFS via backend…");
            setTokenURI("");
            setPreview(null);
            const res = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$OneDrive$2f$Desktop$2f$chainfly$2f$solar$2d$nft$2f$frontend$2f$utils$2f$api$2e$js__$5b$ssr$5d$__$28$ecmascript$29$__["default"]}/mint`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(form)
            });
            if (!res.ok) {
                const err = await res.json().catch(()=>({}));
                throw new Error(err.error || "Backend error");
            }
            const data = await res.json();
            setPreview(data);
            setTokenURI(data.tokenURI);
            setStatus("Metadata created and pinned to IPFS.");
        } catch (err) {
            console.error(err);
            setStatus(`Error: ${err.message}`);
        }
    };
    const handleMint = async ()=>{
        try {
            if (!window.ethereum) {
                alert("MetaMask not found");
                return;
            }
            if (!tokenURI) {
                alert("Generate metadata & tokenURI first.");
                return;
            }
            setStatus("Minting NFT on Sepolia…");
            const provider = new __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__["ethers"].BrowserProvider(window.ethereum);
            const network = await provider.getNetwork();
            console.log("NETWORK DEBUG", network); // add this line
            if (network.chainId !== 11155111n) {
                alert(`Wrong network: chainId=${network.chainId.toString()}. Please switch MetaMask to Sepolia (11155111) and reload the page.`);
                return;
            }
            const signer = await provider.getSigner();
            const contract = new __TURBOPACK__imported__module__$5b$externals$5d2f$ethers__$5b$external$5d$__$28$ethers$2c$__esm_import$2c$__$5b$project$5d2f$node_modules$2f$ethers$29$__["ethers"].Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
            const to = walletAddress || await signer.getAddress();
            const tx = await contract.safeMint(to, tokenURI);
            setStatus(`Transaction sent: ${tx.hash}`);
            const receipt = await tx.wait();
            setStatus(`Minted! Tx hash: ${receipt.transactionHash}`);
        } catch (err) {
            console.error(err);
            setStatus(`Mint error: ${err.message}`);
        }
    };
    const imageSrc = preview?.metadata?.image && preview.metadata.image.startsWith("data:image") ? preview.metadata.image : null;
    // --------- UI ---------
    const pageStyle = {
        minHeight: "100vh",
        margin: 0,
        background: "radial-gradient(circle at top left, #22c55e22, transparent 55%), radial-gradient(circle at bottom right, #38bdf822, #020617 55%)",
        color: "#e5e7eb",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    };
    const shellStyle = {
        maxWidth: "1120px",
        margin: "0 auto",
        padding: "2.5rem 1.5rem 3rem"
    };
    const cardStyle = {
        background: "rgba(15,23,42,0.92)",
        borderRadius: "1.25rem",
        border: "1px solid rgba(148,163,184,0.25)",
        boxShadow: "0 24px 80px rgba(15,23,42,0.85)",
        padding: "1.5rem 1.75rem 1.75rem"
    };
    const labelStyle = {
        fontSize: "0.8rem",
        color: "#9ca3af",
        marginBottom: "0.15rem"
    };
    const inputStyle = {
        width: "100%",
        padding: "0.45rem 0.55rem",
        borderRadius: "0.5rem",
        border: "1px solid #1f2937",
        background: "#020617",
        color: "#e5e7eb",
        fontSize: "0.9rem"
    };
    const primaryBtn = {
        padding: "0.6rem 1.25rem",
        borderRadius: "999px",
        border: "none",
        background: "linear-gradient(135deg,#22c55e,#16a34a)",
        color: "#022c22",
        fontWeight: 600,
        fontSize: "0.9rem",
        cursor: "pointer"
    };
    const secondaryBtn = (enabled)=>({
            padding: "0.6rem 1.25rem",
            borderRadius: "999px",
            border: "1px solid rgba(148,163,184,0.3)",
            background: enabled ? "rgba(15,23,42,0.9)" : "#111827",
            color: enabled ? "#e5e7eb" : "#6b7280",
            fontSize: "0.9rem",
            cursor: enabled ? "pointer" : "not-allowed"
        });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
        style: pageStyle,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
            style: shellStyle,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("header", {
                    style: {
                        display: "flex",
                        justifyContent: "space-between",
                        gap: "1.5rem",
                        marginBottom: "2rem",
                        alignItems: "center"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "inline-flex",
                                        alignItems: "center",
                                        gap: "0.4rem",
                                        padding: "0.2rem 0.6rem",
                                        borderRadius: "999px",
                                        background: "rgba(34,197,94,0.08)",
                                        border: "1px solid rgba(34,197,94,0.35)",
                                        fontSize: "0.75rem",
                                        color: "#bbf7d0",
                                        marginBottom: "0.75rem"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                            style: {
                                                width: 6,
                                                height: 6,
                                                borderRadius: "999px",
                                                background: "#22c55e"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 209,
                                            columnNumber: 15
                                        }, this),
                                        "On‑chain solar panel certificates (Sepolia)"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 195,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h1", {
                                    style: {
                                        fontSize: "2.25rem",
                                        lineHeight: 1.15,
                                        fontWeight: 650,
                                        marginBottom: "0.5rem"
                                    },
                                    children: "Mint a Solar Panel NFT"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 219,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                    style: {
                                        maxWidth: "560px",
                                        fontSize: "0.95rem",
                                        color: "#9ca3af"
                                    },
                                    children: "Feed coordinates and capacity, fetch open irradiance data, pin the proof to IPFS, and mint a clean ERC‑721 testnet certificate for your panel."
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 229,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                            lineNumber: 194,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                            onClick: connectWallet,
                            style: primaryBtn,
                            children: walletAddress ? `Wallet: ${walletAddress.slice(0, 6)}…${walletAddress.slice(-4)}` : "Connect MetaMask"
                        }, void 0, false, {
                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                            lineNumber: 242,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                    lineNumber: 185,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                    style: {
                        ...cardStyle,
                        display: "grid",
                        gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
                        gap: "1.5rem"
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: "1.05rem",
                                        marginBottom: "0.75rem",
                                        fontWeight: 550
                                    },
                                    children: "Panel details"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 260,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "grid",
                                        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                                        gap: "0.8rem",
                                        marginBottom: "0.9rem"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "Panel ID"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 279,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    name: "panelId",
                                                    value: form.panelId,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 280,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 278,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "Model"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 289,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "model",
                                                    value: form.model,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 290,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 288,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "Capacity (kW)"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 299,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.1",
                                                    name: "capacity_kw",
                                                    value: form.capacity_kw,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 300,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 298,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "City"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 310,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "city",
                                                    value: form.city,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 311,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 309,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "State"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 320,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "state",
                                                    value: form.state,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 321,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 319,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "Country"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 330,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "text",
                                                    name: "country",
                                                    value: form.country,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 331,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 329,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "Latitude"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 340,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.0001",
                                                    name: "lat",
                                                    value: form.lat,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 341,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 339,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                                    style: labelStyle,
                                                    children: "Longitude"
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 351,
                                                    columnNumber: 17
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("input", {
                                                    type: "number",
                                                    step: "0.0001",
                                                    name: "lon",
                                                    value: form.lon,
                                                    onChange: handleChange,
                                                    style: inputStyle
                                                }, void 0, false, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 352,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 350,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 270,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "0.6rem",
                                        alignItems: "center"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: handleGenerate,
                                            style: primaryBtn,
                                            children: "Generate & upload metadata"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 371,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("button", {
                                            onClick: handleMint,
                                            style: secondaryBtn(!!tokenURI),
                                            disabled: !tokenURI,
                                            children: "Mint NFT on Sepolia"
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 374,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 363,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "0.8rem",
                                        fontSize: "0.8rem",
                                        color: "#9ca3af"
                                    },
                                    children: status
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 383,
                                    columnNumber: 13
                                }, this),
                                tokenURI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "0.4rem",
                                        fontSize: "0.8rem",
                                        color: "#e5e7eb",
                                        wordBreak: "break-all"
                                    },
                                    children: [
                                        "tokenURI: ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("code", {
                                            children: tokenURI
                                        }, void 0, false, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 401,
                                            columnNumber: 27
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 393,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                            lineNumber: 259,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("section", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("h2", {
                                    style: {
                                        fontSize: "1.05rem",
                                        marginBottom: "0.75rem",
                                        fontWeight: 550
                                    },
                                    children: "Live preview"
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 408,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        borderRadius: "1rem",
                                        border: "1px solid rgba(148,163,184,0.35)",
                                        background: "radial-gradient(circle at top, #1d4ed822, transparent 60%), #020617",
                                        padding: "0.8rem",
                                        minHeight: "230px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    },
                                    children: imageSrc ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("img", {
                                        src: imageSrc,
                                        alt: "Panel preview",
                                        style: {
                                            width: "100%",
                                            borderRadius: "0.8rem",
                                            border: "1px solid rgba(148,163,184,0.4)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                        lineNumber: 432,
                                        columnNumber: 17
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("p", {
                                        style: {
                                            fontSize: "0.85rem",
                                            color: "#6b7280"
                                        },
                                        children: [
                                            "Fill in your panel details and click",
                                            " ",
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("strong", {
                                                children: "Generate & upload metadata"
                                            }, void 0, false, {
                                                fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                lineNumber: 444,
                                                columnNumber: 19
                                            }, this),
                                            " to see the card."
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                        lineNumber: 442,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 418,
                                    columnNumber: 13
                                }, this),
                                preview && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginTop: "0.8rem",
                                        padding: "0.65rem 0.75rem",
                                        borderRadius: "0.75rem",
                                        background: "#020617",
                                        border: "1px dashed rgba(148,163,184,0.4)",
                                        fontSize: "0.8rem",
                                        color: "#9ca3af"
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                "Estimated annual yield:",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#e5e7eb"
                                                    },
                                                    children: [
                                                        preview.estimated_generation_kwh_year,
                                                        " kWh"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 463,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 461,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("div", {
                                            children: [
                                                "Peak sun hours (avg):",
                                                " ",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        color: "#e5e7eb"
                                                    },
                                                    children: [
                                                        preview.peak_sun_hours_per_day,
                                                        " h/day"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                                    lineNumber: 469,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                            lineNumber: 467,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                                    lineNumber: 450,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                            lineNumber: 407,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
                    lineNumber: 250,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
            lineNumber: 183,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/OneDrive/Desktop/chainfly/solar-nft/frontend/pages/index.js",
        lineNumber: 182,
        columnNumber: 5
    }, this);
}
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__33e39067._.js.map