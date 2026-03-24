import { PageOverlay, StatCard } from "../components/ui";
import { fmt } from "../utils/format";

export default function MarketMonitoring({ pangkalan, activePk, leads, onClose }) {
  return (
    <PageOverlay onClose={onClose} title="Monitoring Pasar" maxWidth={700}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
        {[
          { l: "Cakupan Kecamatan", v: [...new Set(pangkalan.map((p) => p.kec))].length, c: "#3b82f6" },
          { l: "Pangkalan Aktif", v: activePk.length, c: "#10b981" },
          { l: "Potensi Mitra", v: leads.length, c: "#8b5cf6" },
          { l: "Kompetitor Area", v: 3, c: "#f59e0b" },
        ].map((s, i) => (
          <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 16, textAlign: "center" }}>
            <div className="mono" style={{ fontSize: 28, fontWeight: 800, color: s.c }}>{s.v}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 600 }}>{s.l}</div>
          </div>
        ))}
      </div>
      <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Distribusi per Kecamatan</div>
      {[...new Set(pangkalan.map((p) => p.kec))].map((kec) => {
        const pks = pangkalan.filter((p) => p.kec === kec);
        const tot = pks.reduce((s, p) => s + p.td, 0);
        return (
          <div key={kec} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}>
              <span style={{ fontWeight: 600 }}>{kec}</span>
              <span className="mono" style={{ fontWeight: 600, fontSize: 12, color: "var(--text-dim)" }}>{pks.length} pangkalan • {fmt(tot)} tabung</span>
            </div>
            <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>
              {pks.map((p) => (
                <span key={p.id} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: p.status === "active" ? "#10b98110" : "#ef444410", color: p.status === "active" ? "#10b981" : "#ef4444", fontWeight: 600 }}>{p.name}</span>
              ))}
            </div>
          </div>
        );
      })}
    </PageOverlay>
  );
}
