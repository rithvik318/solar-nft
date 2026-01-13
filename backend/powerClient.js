// backend/powerClient.js
const axios = require("axios");

const NASA_POWER_BASE_URL = "https://power.larc.nasa.gov/api/temporal/monthly/point";

async function getPeakSunHours(lat, lon) {
  const now = new Date();
  const year = now.getUTCFullYear() - 1;

  const params = {
    parameters: "ALLSKY_SFC_SW_DWN",
    community: "RE",
    longitude: lon,
    latitude: lat,
    start: year.toString(),
    end: year.toString(),
    format: "JSON",
  };

  try {
    const response = await axios.get(NASA_POWER_BASE_URL, { params });
    const monthly = response.data?.properties?.parameter?.ALLSKY_SFC_SW_DWN;

    if (!monthly) {
      return 4.0;
    }

    // Filter out sentinel / nonsense values
    const values = Object.values(monthly)
      .map(Number)
      .filter((v) => !Number.isNaN(v) && v > 0 && v < 10000); // Wh/m2/day sanity range [web:95]

    if (!values.length) {
      return 4.0;
    }

    const avgWhPerM2PerDay =
      values.reduce((sum, v) => sum + v, 0) / values.length;

    let peakSunHours = avgWhPerM2PerDay / 1000;

    // Clamp to a reasonable range
    if (peakSunHours < 1) peakSunHours = 1;
    if (peakSunHours > 8) peakSunHours = 8;

    return Math.round(peakSunHours * 100) / 100;
  } catch (e) {
    console.error("NASA POWER error, falling back to default 4.0 PSH:", e.message);
    return 4.0;
  }
}

module.exports = {
  getPeakSunHours,
};
