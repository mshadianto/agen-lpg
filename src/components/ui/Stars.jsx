import I from "../icons/IconMap";

export default function Stars({ n }) {
  return (
    <div style={{ display: "flex", gap: 1, alignItems: "center" }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} style={{ width: 14, height: 14, color: i <= Math.round(n) ? "#f59e0b" : "var(--border)" }}>
          {I.star}
        </span>
      ))}
      <span style={{ fontSize: 11, fontWeight: 700, marginLeft: 4, color: "var(--text-dim)" }}>{n}</span>
    </div>
  );
}
