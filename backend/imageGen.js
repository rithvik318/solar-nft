// backend/imageGen.js

function generatePanelSvg({ panelId, city, capacity_kw, estimated_kwh_year }) {
  const title = `Solar Panel #${panelId}`;
  const subtitle = city || "Unknown location";
  const statsLine = `${capacity_kw} kW · Est. ${estimated_kwh_year} kWh/yr`;

  return `
<svg width="640" height="360" viewBox="0 0 640 360" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="100%" stop-color="#020617"/>
    </linearGradient>

    <linearGradient id="panelGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>

    <linearGradient id="panelShine" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#e0f2fe55"/>
      <stop offset="100%" stop-color="#0f172a00"/>
    </linearGradient>
  </defs>

  <rect width="100%" height="100%" fill="url(#bgGrad)" rx="24" ry="24"/>

  <!-- Simple flat ground -->
  <rect x="0" y="250" width="640" height="110" fill="#020617"/>

  <!-- Smaller solar panel, moved left -->
  <g transform="translate(60,170) skewX(-8)">
    <rect x="0" y="-60" width="210" height="120" rx="16" ry="16"
          fill="url(#panelGrad)" stroke="#e5f0ff" stroke-width="3"/>
    <rect x="0" y="-60" width="210" height="120" rx="16" ry="16"
          fill="url(#panelShine)"/>

    <!-- Grid -->
    <g stroke="#bfdbfe80" stroke-width="1.5">
      <line x1="28" y1="-54" x2="28" y2="54"/>
      <line x1="56" y1="-54" x2="56" y2="54"/>
      <line x1="84" y1="-54" x2="84" y2="54"/>
      <line x1="112" y1="-54" x2="112" y2="54"/>
      <line x1="140" y1="-54" x2="140" y2="54"/>
      <line x1="168" y1="-54" x2="168" y2="54"/>
    </g>
    <g stroke="#bfdbfe66" stroke-width="1.4">
      <line x1="0" y1="-36" x2="210" y2="-36"/>
      <line x1="0" y1="-12" x2="210" y2="-12"/>
      <line x1="0" y1="12" x2="210" y2="12"/>
      <line x1="0" y1="36" x2="210" y2="36"/>
    </g>

    <!-- Legs -->
    <line x1="26" y1="50" x2="14" y2="80" stroke="#020617" stroke-width="5" stroke-linecap="round"/>
    <line x1="184" y1="50" x2="196" y2="80" stroke="#020617" stroke-width="5" stroke-linecap="round"/>
  </g>

  <!-- Text block, moved slightly right and centered vertically -->
  <g transform="translate(310,150)">
    <text x="0" y="0"
          fill="#e5e7eb"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="26" font-weight="600">
      ${title}
    </text>
    <text x="0" y="26"
          fill="#9ca3af"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="15">
      ${subtitle}
    </text>
    <text x="0" y="52"
          fill="#bfdbfe"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="16">
      ${statsLine}
    </text>
    <text x="0" y="78"
          fill="#9ca3af"
          font-family="system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
          font-size="12">
      Backed by open solar data · IPFS‑pinned metadata
    </text>
  </g>
</svg>
  `.trim();
}

module.exports = { generatePanelSvg };
