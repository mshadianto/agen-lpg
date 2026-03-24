export default function AreaChart({ data, labels, color, h = 160 }) {
  const max = Math.max(...data, 1);
  const w = 100;
  const pts = data
    .map((v, i) => `${(i / (data.length - 1)) * w},${h - 20 - (v / max) * (h - 40)}`)
    .join(" ");
  const gradId = `ag-${color.replace("#", "")}`;
  return (
    <div style={{ position: "relative", width: "100%", height: h }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.3" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {data.map(
          (_, i) =>
            i > 0 &&
            i < data.length && (
              <line key={i} x1={(i / (data.length - 1)) * w} y1="10" x2={(i / (data.length - 1)) * w} y2={h - 20} stroke="currentColor" opacity="0.06" strokeWidth="0.3" />
            )
        )}
        <polygon points={`0,${h - 20} ${pts} ${w},${h - 20}`} fill={`url(#${gradId})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {data.map((v, i) => (
          <circle key={i} cx={(i / (data.length - 1)) * w} cy={h - 20 - (v / max) * (h - 40)} r="2" fill="white" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      {labels && (
        <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", bottom: 0, left: 0, right: 0 }}>
          {labels.map((l, i) => (
            <span key={i} style={{ fontSize: 9, opacity: 0.5, fontWeight: 600 }}>{l}</span>
          ))}
        </div>
      )}
    </div>
  );
}
