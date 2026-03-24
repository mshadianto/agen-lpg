import { Ic } from "../components/icons/IconMap";
import { ScrollOverlay, StatCard } from "../components/ui";
import { HET_CONFIG } from "../constants/het";
import { fmtRp, fmtDate, fmtDT } from "../utils/format";

export default function HetCompliance({ hetChecks, hetViolations, openHetFlags, hetLog, resolveHetFlag, dark, onClose }) {
  return (
    <ScrollOverlay onClose={onClose} title="" maxWidth={960}>
      {/* Custom Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, marginTop: -20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#ef4444,#dc2626)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 20px rgba(239,68,68,0.3)" }}><Ic name="alert" size={24} /></div>
        <div>
          <h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>HET Compliance Check</h3>
          <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>Monitoring Harga Eceran Tertinggi — {HET_CONFIG.region}</p>
          <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>Dasar: {HET_CONFIG.authority} • Terakhir diperbarui: {fmtDate(HET_CONFIG.lastUpdated)}</div>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginBottom: 24 }}>
        {[
          { l: "Produk Dipantau", v: HET_CONFIG.rates.length, c: "#3b82f6", ic: "pkg" },
          { l: "Harga Sesuai HET", v: hetChecks.filter((h) => h.compliant).length, c: "#10b981", ic: "check" },
          { l: "Pelanggaran Aktif", v: hetViolations.length, c: hetViolations.length > 0 ? "#ef4444" : "#10b981", ic: "alert" },
          { l: "Flag Belum Resolved", v: openHetFlags.length, c: openHetFlags.length > 0 ? "#f59e0b" : "#10b981", ic: "clock" },
          { l: "Total Audit Trail", v: hetLog.length, c: "#8b5cf6", ic: "layers" },
        ].map((s, i) => (
          <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14, position: "relative", overflow: "hidden" }}>
            {s.v > 0 && (s.l.includes("Pelanggaran") || s.l.includes("Flag")) && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.c }} />}
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
              <div style={{ width: 24, height: 24, borderRadius: 6, background: `${s.c}15`, color: s.c, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={s.ic} size={12} /></div>
              <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</span>
            </div>
            <div className="mono" style={{ fontSize: 24, fontWeight: 800, color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* Real-time Price Check */}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Ic name="zap" size={16} /> Cek Harga Real-time vs HET</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
          {hetChecks.map((h) => {
            const hetRule = HET_CONFIG.rates.find((r) => r.productId === h.id);
            return (
              <div key={h.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 16, border: `2px solid ${h.compliant ? "#10b98130" : "#ef444450"}`, position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: h.compliant ? "#10b981" : "#ef4444" }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                  <div><div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div><div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>{h.type === "subsidi" ? "SUBSIDI" : "NON-SUBSIDI"}</div></div>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: h.compliant ? "#10b98115" : "#ef444415", color: h.compliant ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={h.compliant ? "check" : "alert"} size={18} /></div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                  <div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Harga Jual</div><div className="mono" style={{ fontSize: 16, fontWeight: 800, color: h.compliant ? "var(--text)" : "#ef4444" }}>{fmtRp(h.price)}</div></div>
                  <div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>HET Pemda</div><div className="mono" style={{ fontSize: 16, fontWeight: 800, color: "#3b82f6" }}>{h.het ? fmtRp(h.het) : "N/A"}</div></div>
                </div>
                {!h.compliant && (
                  <div style={{ background: "#ef444410", borderRadius: 8, padding: "8px 12px", border: "1px solid #ef444420", display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontSize: 16 }}>🚩</span>
                    <div><div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>MELEBIHI HET +{fmtRp(h.diff)} ({h.pctOver}%)</div><div style={{ fontSize: 10, color: "var(--text-dim)" }}>Segera sesuaikan harga jual!</div></div>
                  </div>
                )}
                {h.compliant && (
                  <div style={{ background: "#10b98110", borderRadius: 8, padding: "8px 12px", border: "1px solid #10b98120", fontSize: 12, fontWeight: 600, color: "#10b981", display: "flex", alignItems: "center", gap: 6 }}><Ic name="check" size={14} /> Harga sesuai regulasi</div>
                )}
                {hetRule && <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 8, fontStyle: "italic" }}>{hetRule.note}</div>}
              </div>
            );
          })}
        </div>
      </div>

      {/* Audit Trail */}
      <div>
        <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}><Ic name="layers" size={16} /> Audit Trail Pelanggaran HET</div>
        <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 14 }}>Setiap kali harga jual melebihi HET saat input produk atau pesanan, sistem mencatat otomatis ke audit trail ini.</p>
        {hetLog.length === 0 ? (
          <div style={{ background: "#10b98110", borderRadius: 12, padding: 20, textAlign: "center" }}><div style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>Tidak ada catatan pelanggaran HET</div></div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Waktu", "Aktor", "Peran", "Produk", "Harga Jual", "HET", "Selisih", "%", "Status", "Aksi"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
              <tbody>
                {hetLog.map((l) => (
                  <tr key={l.id} style={{ borderBottom: "1px solid var(--border)", background: l.action === "flagged" ? (dark ? "#ef44440a" : "#fef2f2") : "transparent" }}>
                    <td style={{ padding: "10px 12px", fontSize: 11 }}>{fmtDT(l.date)}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600 }}>{l.actor}</td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "var(--card2)", color: "var(--text-dim)", textTransform: "uppercase" }}>{l.actorRole}</span></td>
                    <td style={{ padding: "10px 12px", fontSize: 12 }}>{l.productName}</td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#ef4444" }}>{fmtRp(l.priceSold)}</td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 500, color: "#3b82f6" }}>{fmtRp(l.het)}</td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: "#ef4444" }}>+{fmtRp(l.diff)}</td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 11, fontWeight: 700, color: "#ef4444" }}>+{l.pctOver}%</td>
                    <td style={{ padding: "10px 12px" }}>
                      {l.action === "flagged" ? (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: "#ef444415", color: "#ef4444", display: "inline-flex", alignItems: "center", gap: 3 }}>🚩 FLAGGED</span>
                      ) : (
                        <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: "#10b98115", color: "#10b981" }}>✓ RESOLVED</span>
                      )}
                      {l.action === "resolved" && l.resolvedAt && <div style={{ fontSize: 9, color: "var(--text-dim)", marginTop: 2 }}>oleh {l.resolvedBy}, {fmtDate(l.resolvedAt)}</div>}
                    </td>
                    <td style={{ padding: "10px 12px" }}>
                      {l.action === "flagged" && <button onClick={() => resolveHetFlag(l.id)} style={{ background: "#10b98115", color: "#10b981", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Resolve</button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </ScrollOverlay>
  );
}
