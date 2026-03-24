import { Ic } from "../icons/IconMap";

export default function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        {icon && (
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: `${color}15`,
              color,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Ic name={icon} size={11} />
          </div>
        )}
        <span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{label}</span>
      </div>
      <div className="mono" style={{ fontSize: 20, fontWeight: 800, color }}>{value}</div>
    </div>
  );
}
