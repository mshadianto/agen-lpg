import { Ic } from "../components/icons/IconMap";
import { PageOverlay, StatCard } from "../components/ui";
import { fmtDate } from "../utils/format";

export default function CompliancePage({ compliance, onClose }) {
  return (
    <PageOverlay onClose={onClose} title="Kepatuhan & Regulasi" maxWidth={800}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { l: "Aktif", v: compliance.filter((c) => c.status === "active").length, c: "#10b981" },
          { l: "Segera Expire", v: compliance.filter((c) => c.status === "expiring").length, c: "#f59e0b" },
          { l: "Overdue", v: compliance.filter((c) => c.status === "overdue").length, c: "#ef4444" },
          { l: "Risiko Tinggi", v: compliance.filter((c) => c.risk === "high").length, c: "#ef4444" },
        ].map((s, i) => <StatCard key={i} label={s.l} value={s.v} color={s.c} />)}
      </div>
      {compliance
        .slice()
        .sort((a, b) => { const o = { high: 0, medium: 1, low: 2 }; return o[a.risk] - o[b.risk]; })
        .map((c) => (
          <div key={c.id} style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 10, border: `1px solid ${c.risk === "high" ? "#ef444430" : c.risk === "medium" ? "#f59e0b30" : "var(--border)"}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: c.status === "active" ? "#10b98115" : c.status === "overdue" ? "#ef444415" : "#f59e0b15", color: c.status === "active" ? "#10b981" : c.status === "overdue" ? "#ef4444" : "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Ic name={c.status === "active" ? "check" : c.status === "overdue" ? "alert" : "clock"} size={18} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 5, textTransform: "uppercase", background: c.risk === "high" ? "#ef444415" : c.risk === "medium" ? "#f59e0b15" : "#10b98115", color: c.risk === "high" ? "#ef4444" : c.risk === "medium" ? "#f59e0b" : "#10b981" }}>RISK: {c.risk}</span>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 6, fontSize: 11, color: "var(--text-dim)" }}>
                <span>Dok: {c.doc}</span>
                <span>Exp: {fmtDate(c.expiry)}</span>
                <span style={{ fontWeight: 700, color: c.status === "active" ? "#10b981" : c.status === "overdue" ? "#ef4444" : "#f59e0b" }}>
                  {c.status === "active" ? "Aktif" : c.status === "overdue" ? "OVERDUE" : "Segera Expire"}
                </span>
              </div>
            </div>
          </div>
        ))}
    </PageOverlay>
  );
}
