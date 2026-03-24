import { Ic } from "../components/icons/IconMap";
import { ScrollOverlay } from "../components/ui";
import { AreaChart } from "../components/charts";
import { PG_PROVIDERS } from "../constants/payment";
import { PayLinkGen } from "../components/forms";
import { fmtRp, fmtDT, pct } from "../utils/format";

export default function PaymentGateway({ payments, dayLabels, pgTab, setPgTab, toast_, onClose }) {
  const settled = payments.filter((p) => p.status === "settled");
  const pending = payments.filter((p) => p.status === "pending");
  const failed = payments.filter((p) => p.status === "failed");
  const totalSettled = settled.reduce((s, p) => s + p.amount, 0);
  const totalFee = settled.reduce((s, p) => s + p.fee, 0);
  const totalNet = settled.reduce((s, p) => s + p.net, 0);
  const byMethod = {};
  settled.forEach((p) => { if (!byMethod[p.methodName]) byMethod[p.methodName] = { count: 0, amount: 0, color: p.methodColor }; byMethod[p.methodName].count++; byMethod[p.methodName].amount += p.amount; });
  const last7Pay = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); const k = d.toDateString(); return settled.filter((p) => new Date(p.date).toDateString() === k).reduce((s, p) => s + p.amount, 0); });

  return (
    <ScrollOverlay onClose={onClose} title="" maxWidth={1020}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, marginTop: -20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}><Ic name="cc" size={24} /></div>
        <div><h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>Payment Gateway</h3><p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>Kelola pembayaran digital — QRIS, Virtual Account, E-Wallet, COD</p></div>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 4, background: "var(--card2)", borderRadius: 12, padding: 4, marginBottom: 20, border: "1px solid var(--border)", overflowX: "auto" }}>
        {[{ id: "overview", l: "Overview" }, { id: "transactions", l: "Transaksi" }, { id: "providers", l: "Provider" }, { id: "paylink", l: "Payment Link" }].map((t) => (
          <button key={t.id} onClick={() => setPgTab(t.id)} style={{ padding: "9px 18px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.2s", background: pgTab === t.id ? "var(--card)" : "transparent", color: pgTab === t.id ? "var(--text)" : "var(--text-dim)", boxShadow: pgTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none", whiteSpace: "nowrap" }}>{t.l}</button>
        ))}
      </div>

      {/* OVERVIEW */}
      {pgTab === "overview" && (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
            {[{ l: "Total Settled", v: fmtRp(totalSettled), c: "#10b981", ic: "check" }, { l: "Fee Gateway", v: fmtRp(totalFee), c: "#f59e0b", ic: "alert" }, { l: "Net Diterima", v: fmtRp(totalNet), c: "#6366f1", ic: "wallet" }, { l: "Pending", v: pending.length, c: "#f59e0b", ic: "clock" }, { l: "Gagal", v: failed.length, c: "#ef4444", ic: "x" }, { l: "Success Rate", v: `${pct(settled.length, payments.length)}%`, c: "#10b981", ic: "target" }].map((s, i) => (
              <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><div style={{ width: 22, height: 22, borderRadius: 6, background: `${s.c}15`, color: s.c, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={s.ic} size={11} /></div><span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</span></div>
                <div className="mono" style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
            <div style={{ background: "var(--card2)", borderRadius: 14, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Tren Settlement 7 Hari</div>
              <AreaChart data={last7Pay} labels={dayLabels} color="#6366f1" h={130} />
            </div>
            <div style={{ background: "var(--card2)", borderRadius: 14, padding: 18 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Volume per Metode</div>
              {Object.entries(byMethod).sort((a, b) => b[1].amount - a[1].amount).map(([name, d]) => {
                const maxAmt = Math.max(...Object.values(byMethod).map((v) => v.amount), 1);
                return (
                  <div key={name} style={{ marginBottom: 10 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}><span style={{ fontWeight: 600, color: d.color }}>{name} <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>({d.count}×)</span></span><span className="mono" style={{ fontWeight: 600, fontSize: 11 }}>{fmtRp(d.amount)}</span></div>
                    <div style={{ height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 3, width: `${(d.amount / maxAmt) * 100}%`, background: d.color, transition: "width 0.5s" }} /></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* TRANSACTIONS */}
      {pgTab === "transactions" && (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["ID", "Waktu", "Customer", "Ref Invoice", "Metode", "Amount", "Fee", "Net", "Status"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
            <tbody>
              {payments.map((p) => (
                <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="mono" style={{ padding: "10px 12px", fontSize: 11, color: "var(--text-dim)" }}>{p.id}</td>
                  <td style={{ padding: "10px 12px", fontSize: 11 }}>{fmtDT(p.date)}</td>
                  <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600 }}>{p.customer}</td>
                  <td className="mono" style={{ padding: "10px 12px", fontSize: 10, color: "var(--text-dim)" }}>{p.ref}</td>
                  <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: `${p.methodColor}15`, color: p.methodColor }}>{p.methodName}</span></td>
                  <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600 }}>{fmtRp(p.amount)}</td>
                  <td className="mono" style={{ padding: "10px 12px", fontSize: 11, color: "#f59e0b" }}>-{fmtRp(p.fee)}</td>
                  <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#10b981" }}>{fmtRp(p.net)}</td>
                  <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: p.status === "settled" ? "#10b98115" : p.status === "pending" ? "#f59e0b15" : "#ef444415", color: p.status === "settled" ? "#10b981" : p.status === "pending" ? "#f59e0b" : "#ef4444" }}>{p.status === "settled" ? "Settled" : p.status === "pending" ? "Pending" : "Gagal"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PROVIDERS */}
      {pgTab === "providers" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
          {PG_PROVIDERS.map((p) => (
            <div key={p.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 18, border: `1px solid ${p.active ? p.color + "30" : "var(--border)"}`, position: "relative", overflow: "hidden", opacity: p.active ? 1 : 0.55 }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.color, opacity: p.active ? 0.8 : 0.2 }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}15`, color: p.color, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={p.logo} size={18} /></div>
                  <div><div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div><div style={{ fontSize: 10, color: "var(--text-dim)" }}>{p.desc}</div></div>
                </div>
                <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: p.active ? "#10b98115" : "#ef444415", color: p.active ? "#10b981" : "#ef4444" }}>{p.active ? "AKTIF" : "NONAKTIF"}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div style={{ background: "var(--card)", borderRadius: 8, padding: 10 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Biaya</div><div className="mono" style={{ fontSize: 14, fontWeight: 700, color: p.fee === 0 ? "#10b981" : "var(--text)" }}>{p.feeType === "flat" ? fmtRp(p.fee) : p.fee === 0 ? "Gratis" : `${p.fee}%`}</div></div>
                <div style={{ background: "var(--card)", borderRadius: 8, padding: 10 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Transaksi</div><div className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{payments.filter((t) => t.method === p.id && t.status === "settled").length}×</div></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* PAYMENT LINK */}
      {pgTab === "paylink" && <PayLinkGen providers={PG_PROVIDERS.filter((p) => p.active)} toast_={toast_} />}
    </ScrollOverlay>
  );
}
