import { Ic } from "../components/icons/IconMap";
import { Badge, Stars } from "../components/ui";
import { Donut } from "../components/charts";
import { DSTATUS, PSTATUS } from "../constants/status";
import { fmtRp, fmtDate, fmtDT, fmt, pct, clamp } from "../utils/format";

export default function Pangkalan({ pangkalan, activePk, dist, pendDist, products, search, pkTab, setPkTab, setModal, setDetailPk, togPk, upDist, theme }) {
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Manajemen Pangkalan</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={() => setModal({ t: "distribute" })} style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="send" size={14} /> Distribusi</button>
          <button onClick={() => setModal({ t: "addPk" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="plus" size={14} /> Baru</button>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { ic: "store", l: "Pangkalan Aktif", v: activePk.length, c: "#6366f1" },
          { ic: "send", l: "Distribusi Bulan Ini", v: `${fmt(dist.filter((d) => d.status !== "cancelled").reduce((s, d) => s + d.total, 0))}`, c: "#8b5cf6" },
          { ic: "pin", l: "Kecamatan", v: [...new Set(activePk.map((p) => p.kec))].length, c: "#0ea5e9" },
          { ic: "target", l: "Pending", v: pendDist.length, c: pendDist.length > 0 ? "#f59e0b" : "#10b981" },
        ].map((c, i) => (
          <div key={i} style={{ background: "var(--card)", borderRadius: 14, padding: 16, border: "1px solid var(--border)" }}>
            <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.c}15`, color: c.c, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}><Ic name={c.ic} size={16} /></div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 700 }}>{c.v}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 500 }}>{c.l}</div>
          </div>
        ))}
      </div>
      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "var(--card2)", borderRadius: 12, padding: 4, marginBottom: 20, border: "1px solid var(--border)" }}>
        {[{ id: "dir", l: "Direktori" }, { id: "dist", l: "Distribusi" }, { id: "perf", l: "Performa" }].map((t) => (
          <button key={t.id} onClick={() => setPkTab(t.id)} style={{ padding: "9px 18px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.2s", background: pkTab === t.id ? "var(--card)" : "transparent", color: pkTab === t.id ? "var(--text)" : "var(--text-dim)", boxShadow: pkTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>{t.l}</button>
        ))}
      </div>

      {/* DIR */}
      {pkTab === "dir" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16 }}>
          {pangkalan.filter((pk) => !search || pk.name.toLowerCase().includes(search.toLowerCase()) || pk.owner.toLowerCase().includes(search.toLowerCase())).map((pk) => {
            const qp = pct(pk.qu, pk.qm);
            const qc = qp >= 90 ? "#ef4444" : qp >= 70 ? "#f59e0b" : "#10b981";
            return (
              <div key={pk.id} style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden", transition: "all 0.3s" }}>
                <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 15, fontWeight: 700 }}>{pk.name}</span><Badge status={pk.status} map={PSTATUS} /></div>
                    <div style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 500 }}>{pk.owner}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 11, color: "var(--text-dim)" }}><Ic name="phone" size={12} /> {pk.phone}</div>
                  </div>
                  <Donut value={pk.qu} max={pk.qm} size={54} stroke={5} color={qc}><span className="mono" style={{ fontSize: 11, fontWeight: 800, color: qc }}>{qp}%</span></Donut>
                </div>
                <div style={{ padding: "14px 18px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-dim)", marginBottom: 12 }}><Ic name="pin" size={12} /> {pk.addr}</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                    {[{ l: "3 kg", v: pk.s3, c: "#f97316" }, { l: "5.5 kg", v: pk.s5, c: "#6366f1" }, { l: "12 kg", v: pk.s12, c: "#10b981" }].map((s, i) => (
                      <div key={i} style={{ textAlign: "center", background: "var(--card2)", borderRadius: 10, padding: "8px 4px" }}>
                        <div className="mono" style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                        <div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{pk.qu}/{pk.qm} kuota (3 kg)</div>
                    <Stars n={pk.rating} />
                  </div>
                  {pk.ld && <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-dim)" }}>Terakhir: {fmtDT(pk.ld)}</div>}
                </div>
                <div style={{ padding: "12px 18px", borderTop: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <button onClick={() => setModal({ t: "distribute", d: pk })} style={{ background: `${theme?.["--accent2"] || "#6366f1"}15`, color: "var(--accent2)", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><Ic name="send" size={12} /> Kirim</button>
                  <button onClick={() => setDetailPk(pk)} style={{ background: "var(--hover)", color: "var(--text-dim)", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><Ic name="eye" size={12} /> Detail</button>
                  <button onClick={() => togPk(pk.id)} style={{ marginLeft: "auto", background: pk.status === "active" ? "#ef444410" : "#10b98110", color: pk.status === "active" ? "#ef4444" : "#10b981", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{pk.status === "active" ? "Tangguhkan" : "Aktifkan"}</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* DIST */}
      {pkTab === "dist" && (
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["#", "Tanggal", "Pangkalan", "3 kg", "5.5 kg", "12 kg", "Total", "Nilai", "Status", "Aksi"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
              <tbody>
                {dist.map((d) => (
                  <tr key={d.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="mono" style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-dim)" }}>#{d.id}</td>
                    <td style={{ padding: "12px 16px", fontSize: 12 }}>{fmtDate(d.date)}</td>
                    <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600 }}>{d.pkname}</td>
                    <td className="mono" style={{ padding: "12px 16px", fontSize: 13 }}>{d.q3 || "-"}</td>
                    <td className="mono" style={{ padding: "12px 16px", fontSize: 13 }}>{d.q5 || "-"}</td>
                    <td className="mono" style={{ padding: "12px 16px", fontSize: 13 }}>{d.q12 || "-"}</td>
                    <td className="mono" style={{ padding: "12px 16px", fontWeight: 600 }}>{d.total}</td>
                    <td className="mono" style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500 }}>{fmtRp(d.val)}</td>
                    <td style={{ padding: "12px 16px" }}><Badge status={d.status} map={DSTATUS} /></td>
                    <td style={{ padding: "12px 16px" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {d.status === "pending" && <button onClick={() => upDist(d.id, "dispatched")} style={{ background: "#6366f115", color: "#6366f1", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="truck" size={14} /></button>}
                        {d.status === "dispatched" && <button onClick={() => upDist(d.id, "received")} style={{ background: "#10b98115", color: "#10b981", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="check" size={14} /></button>}
                        {(d.status === "pending" || d.status === "dispatched") && <button onClick={() => upDist(d.id, "cancelled")} style={{ background: "#ef444415", color: "#ef4444", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="x" size={14} /></button>}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* PERF */}
      {pkTab === "perf" && (
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Pangkalan", "Status", "Rating", "Kuota", "Total Distribusi", "Stok", "Bergabung"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
              <tbody>
                {pangkalan.slice().sort((a, b) => b.td - a.td).map((pk) => {
                  const qp = pct(pk.qu, pk.qm);
                  return (
                    <tr key={pk.id} style={{ borderBottom: "1px solid var(--border)" }}>
                      <td style={{ padding: "12px 16px" }}><div style={{ fontWeight: 600, fontSize: 13 }}>{pk.name}</div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>{pk.owner}</div></td>
                      <td style={{ padding: "12px 16px" }}><Badge status={pk.status} map={PSTATUS} /></td>
                      <td style={{ padding: "12px 16px" }}><Stars n={pk.rating} /></td>
                      <td style={{ padding: "12px 16px" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <div style={{ flex: 1, maxWidth: 70, height: 5, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}>
                            <div style={{ height: "100%", borderRadius: 3, width: `${clamp(qp, 0, 100)}%`, background: qp >= 90 ? "#ef4444" : qp >= 70 ? "#f59e0b" : "#10b981", transition: "width 0.5s" }} />
                          </div>
                          <span className="mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--text-dim)" }}>{qp}%</span>
                        </div>
                      </td>
                      <td className="mono" style={{ padding: "12px 16px", fontWeight: 600 }}>{fmt(pk.td)}</td>
                      <td className="mono" style={{ padding: "12px 16px", fontSize: 12 }}>{pk.s3 + pk.s5 + pk.s12}</td>
                      <td style={{ padding: "12px 16px", fontSize: 12 }}>{fmtDate(pk.join)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
