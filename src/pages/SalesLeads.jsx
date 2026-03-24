import { PageOverlay, StatCard } from "../components/ui";
import { fmtDate } from "../utils/format";

export default function SalesLeads({ leads, onClose }) {
  return (
    <PageOverlay onClose={onClose} title="Akuisisi Mitra Baru" maxWidth={860}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { l: "Total Leads", v: leads.length, c: "#8b5cf6" },
          { l: "Hot", v: leads.filter((l) => l.status === "hot").length, c: "#ef4444" },
          { l: "Warm", v: leads.filter((l) => l.status === "warm").length, c: "#f59e0b" },
          { l: "Cold", v: leads.filter((l) => l.status === "cold").length, c: "#6b7280" },
        ].map((s, i) => <StatCard key={i} label={s.l} value={s.v} color={s.c} />)}
      </div>
      {leads
        .slice()
        .sort((a, b) => { const o = { hot: 0, warm: 1, cold: 2 }; return o[a.status] - o[b.status]; })
        .map((l) => (
          <div key={l.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 16, marginBottom: 10, border: "1px solid var(--border)", display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, marginTop: 5, flexShrink: 0, background: l.status === "hot" ? "#ef4444" : l.status === "warm" ? "#f59e0b" : "#6b7280" }} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{l.addr} • {l.phone}</div>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 5, textTransform: "uppercase", background: l.type === "usaha_mikro" ? "#8b5cf615" : "#3b82f615", color: l.type === "usaha_mikro" ? "#8b5cf6" : "#3b82f6" }}>
                  {l.type === "usaha_mikro" ? "UMKM" : "Komplek"}
                </span>
              </div>
              <div style={{ fontSize: 12, color: "var(--text)", marginTop: 6, padding: "6px 10px", background: "var(--card)", borderRadius: 8, border: "1px solid var(--border)" }}>{l.notes}</div>
              <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 6 }}>Kontak terakhir: {fmtDate(l.lastContact)}</div>
            </div>
          </div>
        ))}
    </PageOverlay>
  );
}
