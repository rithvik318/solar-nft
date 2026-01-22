// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");

const { buildPanelMetadata } = require("./panelService");
const { uploadMetadataToPinata } = require("./ipfsUpload");

const app = express();
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Origin", "https://rithviksolarnft.vercel.app");
    res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    return res.sendStatus(200);
  }
  next();
});
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors({
  origin: "https://rithviksolarnft.vercel.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// Health check
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "Solar NFT backend running" });
});

// POST /api/panel/preview
// body: { panelId, model, capacity_kw, city, state, country, lat, lon }
app.post("/api/panel/preview", async (req, res) => {
  try {
    const {
      panelId = 1,
      model = "Generic-Panel",
      capacity_kw,
      city,
      state = "",
      country = "",
      lat,
      lon,
    } = req.body || {};

    if (
      capacity_kw === undefined ||
      city === undefined ||
      lat === undefined ||
      lon === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields: capacity_kw, city, lat, lon",
      });
    }

    const result = await buildPanelMetadata({
      panelId,
      model,
      capacity_kw,
      city,
      state,
      country,
      lat,
      lon,
    });

    res.json(result);
  } catch (err) {
    console.error("Error in /api/panel/preview:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/panel/mintable
// body: same as /preview; returns metadata + tokenURI (ipfs://... via Pinata)
app.post("/api/panel/mintable", async (req, res) => {
  try {
    const {
      panelId = 1,
      model = "Generic-Panel",
      capacity_kw,
      city,
      state = "",
      country = "",
      lat,
      lon,
    } = req.body || {};

    if (
      capacity_kw === undefined ||
      city === undefined ||
      lat === undefined ||
      lon === undefined
    ) {
      return res.status(400).json({
        error: "Missing required fields: capacity_kw, city, lat, lon",
      });
    }

    

    // 1) Build metadata + SVG using NASA POWER + imageGen
    const panelData = await buildPanelMetadata({
      panelId,
      model,
      capacity_kw,
      city,
      state,
      country,
      lat,
      lon,
    });

    const { metadata } = panelData;

    // 2) Upload metadata JSON to Pinata (IPFS)
    const { metadataUrl } = await uploadMetadataToPinata(metadata);

    // 3) tokenURI is the ipfs://... returned by Pinata
    const tokenURI = metadataUrl;

    res.json({
      ...panelData,
      tokenURI,
    });
  } catch (err) {
    console.error(
      "Error in /api/panel/mintable:",
      err.response?.data || err.message || err
    );
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Solar NFT backend listening on port ${PORT}`);
});
