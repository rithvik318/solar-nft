// backend/panelService.js
const crypto = require("crypto");
const { getPeakSunHours } = require("./powerClient");
const { generatePanelSvg } = require("./imageGen");

const PERFORMANCE_RATIO = 0.8;

function estimateAnnualKwh(capacityKw, peakSunHoursPerDay) {
  return capacityKw * peakSunHoursPerDay * 365 * PERFORMANCE_RATIO;
}

// ADD THIS FUNCTION (missing now)
function buildDataProof({ lat, lon, capacity_kw, source, query_date, annual_kwh }) {
  const input = JSON.stringify({
    lat,
    lon,
    capacity_kw,
    source,
    query_date,
    annual_kwh,
  });
  return crypto.createHash("sha256").update(input).digest("hex");
}

async function buildPanelMetadata({ panelId, model, capacity_kw, city, state, country, lat, lon }) {
  const capacityNum = Number(capacity_kw);
  const peakSunHours = await getPeakSunHours(lat, lon);

  const annualKwh = Math.round(
    estimateAnnualKwh(capacityNum, peakSunHours)
  );

  const queryDate = new Date().toISOString().split("T")[0];
  const source = "NASA POWER";

  const data_proof = buildDataProof({
    lat,
    lon,
    capacity_kw: capacityNum,
    source,
    query_date: queryDate,
    annual_kwh: annualKwh,
  });

  const name = `Solar Panel #${panelId} - ${city}`;
  const description =
    "Testnet Solar Panel NFT backed by open irradiance data (Pinata + IPFS).";

  const svg = generatePanelSvg({
    panelId,
    city,
    capacity_kw: capacityNum,
    estimated_kwh_year: annualKwh,
  });

  const image = `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

  const metadata = {
    name,
    description,
    image,
    attributes: [
      { trait_type: "Model", value: model || "Generic-Panel" },
      { trait_type: "Capacity (kW)", value: capacityNum },
      { trait_type: "Performance Ratio", value: PERFORMANCE_RATIO },
      { trait_type: "Estimated Annual (kWh)", value: annualKwh },
      { trait_type: "Latitude", value: lat },
      { trait_type: "Longitude", value: lon },
      { trait_type: "City", value: city },
      { trait_type: "State", value: state },
      { trait_type: "Country", value: country },
      { trait_type: "Data Source", value: source },
      { trait_type: "Data Query Date", value: queryDate },
      { trait_type: "Data Proof (sha256)", value: data_proof },
    ],
  };

  return {
    panelId,
    capacity_kw: capacityNum,
    peak_sun_hours_per_day: peakSunHours,
    estimated_generation_kwh_year: annualKwh,
    data_sources: [source],
    verification: {
      data_proof,
      query_date: queryDate,
    },
    svg,
    metadata,
  };
}

module.exports = {
  buildPanelMetadata,
};
