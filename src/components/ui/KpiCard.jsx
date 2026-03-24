import { Ic } from "../icons/IconMap";
import Spark from "../charts/Spark";

export default function KpiCard({ icon, label, value, sparkData, color, sub }) {
  return (
    <div
      style={{
        background: "var(--card)",
        borderRadius: 16,
        padding: 18,
        border: "1px solid var(--border)",
        transition: "all 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: color, opacity: 0.5 }} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            background: `${color}15`,
            color: color,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ic name={icon} size={18} />
        </div>
        {sparkData && <Spark data={sparkData} color={color} fill />}
      </div>
      <div className="mono" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{value}</div>
      <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 500, marginTop: 2 }}>{label}</div>
      {sub && <div style={{ fontSize: 10, fontWeight: 600, color: color, marginTop: 4 }}>{sub}</div>}
    </div>
  );
}
