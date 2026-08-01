import { useMemo, useState } from "react";
import { ethers } from "ethers";

const CONTRACT_ADDRESS = "0x6f4955D95F410FBca2D1e922E8BBB233Ee61d233";
const SEPOLIA_CHAIN_ID = 11155111n;

const CONTRACT_ABI = ["function safeMint(address to, string memory tokenURI_) external"];

const NETWORKS = {
  11155111: "Sepolia",
  1: "Ethereum",
  137: "Polygon",
  10: "Optimism",
  42161: "Arbitrum",
};

const PRESETS = [
  {
    label: "Urban Rooftop",
    panelId: 1001,
    model: "SunSpark-R1",
    capacity_kw: 3.2,
    city: "Bengaluru",
    state: "Karnataka",
    country: "India",
    lat: 12.9716,
    lon: 77.5946,
  },
  {
    label: "Industrial Plant",
    panelId: 2002,
    model: "VoltGrid-PRO",
    capacity_kw: 25,
    city: "Pune",
    state: "Maharashtra",
    country: "India",
    lat: 18.5204,
    lon: 73.8567,
  },
  {
    label: "Community Microgrid",
    panelId: 3003,
    model: "Aether-Community",
    capacity_kw: 8.5,
    city: "Jaipur",
    state: "Rajasthan",
    country: "India",
    lat: 26.9124,
    lon: 75.7873,
  },
];

const DASHBOARD_METRICS = [
  { title: "Asset Standard", value: "ERC‑721" },
  { title: "Storage", value: "IPFS + Pinata" },
  { title: "Data Source", value: "NASA POWER" },
  { title: "Settlement", value: "Sepolia" },
];

const FLOW_STEPS = [
  "Connect wallet",
  "Generate metadata",
  "Pin to IPFS",
  "Mint on-chain",
];

export default function Home() {
  const [form, setForm] = useState({
    panelId: 1,
    model: "Demo-100",
    capacity_kw: 2,
    city: "Guwahati",
    state: "Assam",
    country: "India",
    lat: 26.1445,
    lon: 91.7362,
  });

  const [preview, setPreview] = useState(null);
  const [tokenURI, setTokenURI] = useState("");
  const [status, setStatus] = useState("Wallet disconnected");
  const [walletAddress, setWalletAddress] = useState("");
  const [network, setNetwork] = useState("Unknown");
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    const numericFields = ["panelId", "capacity_kw", "lat", "lon"];
    setForm((prev) => ({
      ...prev,
      [name]: numericFields.includes(name) ? Number(value) : value,
    }));
  };

  const applyPreset = (preset) => {
    setForm({ ...preset });
    setStatus(`Preset loaded: ${preset.label}`);
  };

  const refreshNetwork = async (provider) => {
    const detected = await provider.getNetwork();
    const chainId = Number(detected.chainId);
    setNetwork(NETWORKS[chainId] || `Chain ${chainId}`);
    return detected;
  };

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask not detected");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const [account] = await window.ethereum.request({ method: "eth_requestAccounts" });
      setWalletAddress(account);
      await refreshNetwork(provider);
      setStatus("Wallet connected");
    } catch (err) {
      setStatus(`Wallet error: ${err.message}`);
    }
  };

  const switchToSepolia = async () => {
    if (!window.ethereum) {
      setStatus("MetaMask not detected");
      return;
    }
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0xaa36a7" }],
      });
      const provider = new ethers.BrowserProvider(window.ethereum);
      await refreshNetwork(provider);
      setStatus("Switched to Sepolia");
    } catch (err) {
      setStatus(`Network switch failed: ${err.message}`);
    }
  };

  const handleGenerate = async () => {
    try {
      setIsGenerating(true);
      setStatus("Generating metadata and pinning to IPFS...");
      setTokenURI("");
      setPreview(null);
      setTxHash("");

      const res = await fetch("/api/panel/mintable", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.error || "Backend error");
      }

      const data = await res.json();
      setPreview(data);
      setTokenURI(data.tokenURI);
      setStatus("Metadata generated and pinned successfully");
    } catch (err) {
      setStatus(`Generate error: ${err.message}`);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleMint = async () => {
    try {
      if (!window.ethereum) {
        setStatus("MetaMask not detected");
        return;
      }
      if (!tokenURI) {
        setStatus("Generate metadata before minting");
        return;
      }

      setIsMinting(true);
      setStatus("Preparing mint transaction...");

      const provider = new ethers.BrowserProvider(window.ethereum);
      const chain = await refreshNetwork(provider);
      if (chain.chainId !== SEPOLIA_CHAIN_ID) {
        setStatus("Wrong network. Please switch to Sepolia.");
        return;
      }

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      const receiver = walletAddress || (await signer.getAddress());
      const tx = await contract.safeMint(receiver, tokenURI);

      setTxHash(tx.hash);
      setStatus(`Transaction submitted: ${tx.hash}`);

      const receipt = await tx.wait();
      setTxHash(receipt.hash || tx.hash);
      setStatus("Mint successful. NFT is now on Sepolia.");
    } catch (err) {
      setStatus(`Mint error: ${err.message}`);
    } finally {
      setIsMinting(false);
    }
  };

  const imageSrc =
    preview?.metadata?.image && preview.metadata.image.startsWith("data:image")
      ? preview.metadata.image
      : null;

  const addressShort = walletAddress
    ? `${walletAddress.slice(0, 6)}...${walletAddress.slice(-4)}`
    : "Not connected";

  const statusTone = useMemo(() => {
    if (status.toLowerCase().includes("error") || status.toLowerCase().includes("failed")) {
      return "danger";
    }
    if (status.toLowerCase().includes("successful") || status.toLowerCase().includes("connected")) {
      return "good";
    }
    return "neutral";
  }, [status]);

  const metadataRows = preview?.metadata?.attributes || [];

  return (
    <main className="app-shell">
      <section className="hero-card">
        <div>
          <div className="badge">Web3 clean-energy credential dApp</div>
          <h1>Solar Panel NFT Mint Console</h1>
          <p>
            Create verifiable solar panel certificates from open irradiance data, upload signed
            metadata to IPFS, and mint ERC‑721 assets on Sepolia.
          </p>
        </div>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={connectWallet}>
            {walletAddress ? `Connected ${addressShort}` : "Connect MetaMask"}
          </button>
          <button className="btn btn-ghost" onClick={switchToSepolia}>
            Switch to Sepolia
          </button>
        </div>
      </section>

      <section className="metrics-grid">
        {DASHBOARD_METRICS.map((metric) => (
          <article key={metric.title} className="metric-card">
            <span>{metric.title}</span>
            <strong>{metric.value}</strong>
          </article>
        ))}
      </section>

      <section className="workflow-card">
        {FLOW_STEPS.map((step, index) => (
          <div key={step} className="flow-item">
            <div className="flow-index">{index + 1}</div>
            <p>{step}</p>
          </div>
        ))}
      </section>

      <section className="main-grid">
        <article className="panel-card">
          <div className="card-header">
            <h2>Panel Inputs</h2>
            <span>On-chain metadata source</span>
          </div>

          <div className="preset-row">
            {PRESETS.map((preset) => (
              <button key={preset.label} className="chip" onClick={() => applyPreset(preset)}>
                {preset.label}
              </button>
            ))}
          </div>

          <div className="form-grid">
            <label>
              Panel ID
              <input type="number" name="panelId" value={form.panelId} onChange={handleChange} />
            </label>
            <label>
              Model
              <input type="text" name="model" value={form.model} onChange={handleChange} />
            </label>
            <label>
              Capacity (kW)
              <input
                type="number"
                step="0.1"
                name="capacity_kw"
                value={form.capacity_kw}
                onChange={handleChange}
              />
            </label>
            <label>
              City
              <input type="text" name="city" value={form.city} onChange={handleChange} />
            </label>
            <label>
              State
              <input type="text" name="state" value={form.state} onChange={handleChange} />
            </label>
            <label>
              Country
              <input type="text" name="country" value={form.country} onChange={handleChange} />
            </label>
            <label>
              Latitude
              <input type="number" step="0.0001" name="lat" value={form.lat} onChange={handleChange} />
            </label>
            <label>
              Longitude
              <input type="number" step="0.0001" name="lon" value={form.lon} onChange={handleChange} />
            </label>
          </div>

          <div className="action-row">
            <button className="btn btn-primary" onClick={handleGenerate} disabled={isGenerating}>
              {isGenerating ? "Generating..." : "Generate Metadata"}
            </button>
            <button
              className="btn btn-accent"
              onClick={handleMint}
              disabled={!tokenURI || isMinting || isGenerating}
            >
              {isMinting ? "Minting..." : "Mint NFT"}
            </button>
          </div>
        </article>

        <article className="panel-card">
          <div className="card-header">
            <h2>Wallet & Chain</h2>
            <span>Mint readiness</span>
          </div>

          <div className="stack-list">
            <div>
              <span>Wallet</span>
              <strong>{addressShort}</strong>
            </div>
            <div>
              <span>Network</span>
              <strong>{network}</strong>
            </div>
            <div>
              <span>Contract</span>
              <strong>{`${CONTRACT_ADDRESS.slice(0, 8)}...${CONTRACT_ADDRESS.slice(-6)}`}</strong>
            </div>
            <div>
              <span>tokenURI</span>
              <strong>{tokenURI ? "Ready" : "Not generated"}</strong>
            </div>
          </div>

          <div className={`status-box ${statusTone}`}>{status}</div>

          {tokenURI && (
            <a className="external-link" href={tokenURI} target="_blank" rel="noreferrer">
              View metadata on IPFS
            </a>
          )}
          {txHash && (
            <a
              className="external-link"
              href={`https://sepolia.etherscan.io/tx/${txHash}`}
              target="_blank"
              rel="noreferrer"
            >
              View transaction on Etherscan
            </a>
          )}
        </article>
      </section>

      <section className="preview-grid">
        <article className="panel-card">
          <div className="card-header">
            <h2>NFT Preview</h2>
            <span>Generated SVG card</span>
          </div>
          <div className="preview-box">
            {imageSrc ? (
              <img src={imageSrc} alt="Panel preview" />
            ) : (
              <p>Generate metadata to render the NFT art card.</p>
            )}
          </div>
          {preview && (
            <div className="insights-row">
              <div>
                <span>Estimated Annual Yield</span>
                <strong>{preview.estimated_generation_kwh_year} kWh</strong>
              </div>
              <div>
                <span>Peak Sun Hours</span>
                <strong>{preview.peak_sun_hours_per_day} h/day</strong>
              </div>
            </div>
          )}
        </article>

        <article className="panel-card">
          <div className="card-header">
            <h2>Metadata Attributes</h2>
            <span>IPFS payload details</span>
          </div>
          {metadataRows.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Trait</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {metadataRows.map((item) => (
                    <tr key={item.trait_type}>
                      <td>{item.trait_type}</td>
                      <td>{String(item.value)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="empty-state">Attributes will appear after metadata generation.</p>
          )}
        </article>
      </section>
    </main>
  );
}
