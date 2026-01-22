import { buildPanelMetadata } from "../../../../backend/panelService";
import { uploadMetadataToPinata } from "../../../../backend/ipfsUpload";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

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
    } = req.body;

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
    const { metadataUrl } = await uploadMetadataToPinata(metadata);

    res.status(200).json({
      ...panelData,
      tokenURI: metadataUrl,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
}
