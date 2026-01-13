// backend/ipfsUpload.js
require("dotenv").config();
const axios = require("axios");

const PINATA_JWT = process.env.PINATA_JWT;

if (!PINATA_JWT) {
  console.warn("⚠️ PINATA_JWT is not set; IPFS upload will fail.");
}

async function uploadMetadataToPinata(metadata) {
  if (!PINATA_JWT) {
    throw new Error("PINATA_JWT missing");
  }

  const url = "https://api.pinata.cloud/pinning/pinJSONToIPFS";

  const body = {
    pinataMetadata: {
      name: metadata.name || "solar-panel-metadata.json",
    },
    pinataContent: metadata,
  };

  try {
    const res = await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${PINATA_JWT}`,
      },
    });

    const { IpfsHash } = res.data;
    const metadataUrl = `ipfs://${IpfsHash}`;
    return { metadataUrl, cid: IpfsHash };
  } catch (err) {
    console.error("Pinata upload error:", err.response?.data || err.message);
    throw err;
  }
}

module.exports = {
  uploadMetadataToPinata,
};
