import { Ic } from "../components/icons/IconMap";
import { PageOverlay, StatCard } from "../components/ui";

export default function Routes({ routes, onClose }) {
  return (
    <PageOverlay onClose={onClose} title="Rute & Logistik" maxWidth={900}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { l: "Rute Aktif", v: routes.filter((r) => r.status === "active").length, c: "#10b981" },
          { l: "Total Jarak", v: `${routes.reduce((s, r) => s + r.dist, 0).toFixed(1)} km`, c: "#3b82f6" },
          { l: "Tabung Terkirim", v: routes.reduce((s, r) => s + r.loaded, 0), c: "#f97316" },
          { l: "Tabung Kosong", v: routes.reduce((s, r) => s + r.empty, 0), c: "#8b5cf6" },
        ].map((s, i) => <StatCard key={i} label={s.l} value={s.v} color={s.c} />)}
      </div>
      {routes.map((r) => (
        <div key={r.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
            <div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</div>
              <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{r.driver} • {r.vehicle} • {r.dist} km • ~{r.est}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: r.status === "active" ? "#10b98120" : r.status === "completed" ? "#6366f120" : "#f59e0b20", color: r.status === "active" ? "#10b981" : r.status === "completed" ? "#6366f1" : "#f59e0b" }}>
              {r.status === "active" ? "Aktif" : r.status === "completed" ? "Selesai" : "Menunggu"}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
            {r.stops.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                {i > 0 && <span style={{ color: "var(--text-dim)", fontSize: 10 }}>→</span>}
                <span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: "var(--card)", border: "1px solid var(--border)" }}>{s}</span>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
            <span style={{ color: "#f97316" }}>Tabung isi: <strong>{r.loaded}</strong></span>
            <span style={{ color: "#8b5cf6" }}>Tabung kosong: <strong>{r.empty}</strong></span>
          </div>
        </div>
      ))}
    </PageOverlay>
  );
}
