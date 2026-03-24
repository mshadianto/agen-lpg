import { Ic } from "../components/icons/IconMap";
import { Spark } from "../components/charts";
import { AreaChart } from "../components/charts";
import { fmtRp, pct } from "../utils/format";

export default function Finance({ del, pend, rev, profit, products, dayLabels, last7Rev }) {
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Laporan Keuangan</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 24 }}>
        {[
          { ic: "wallet", l: "Pendapatan", v: fmtRp(rev), c: "#f97316", sp: last7Rev },
          { ic: "trend", l: "Keuntungan", v: fmtRp(profit), c: "#10b981", sp: last7Rev.map((v) => v * 0.26) },
          { ic: "cart", l: "Pesanan Selesai", v: del.length, c: "#6366f1" },
          { ic: "clock", l: "Pending", v: pend.length, c: "#f59e0b" },
        ].map((c, i) => (
          <div key={i} style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 18 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: `${c.c}15`, color: c.c, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={c.ic} size={16} /></div>
              {c.sp && <Spark data={c.sp} color={c.c} fill />}
            </div>
            <div className="mono" style={{ fontSize: 20, fontWeight: 700 }}>{c.v}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{c.l}</div>
          </div>
        ))}
      </div>
      <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20, marginBottom: 20 }}>
        <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Tren Keuntungan 7 Hari</div>
        <AreaChart data={last7Rev.map((v) => v * 0.26)} labels={dayLabels} color="#10b981" h={160} />
      </div>
      <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 14 }}>Rincian per Produk</div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Produk", "Terjual", "Pendapatan", "Keuntungan", "Margin"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 18px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {products.map((p) => {
                const s = del.filter((o) => o.pid === p.id);
                const r = s.reduce((a, o) => a + o.total, 0);
                const pr = s.reduce((a, o) => a + o.profit, 0);
                const q = s.reduce((a, o) => a + o.qty, 0);
                return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 18px", fontWeight: 600, fontSize: 13 }}>{p.name}</td>
                    <td style={{ padding: "12px 18px" }}>{q} tabung</td>
                    <td className="mono" style={{ padding: "12px 18px", fontWeight: 500 }}>{fmtRp(r)}</td>
                    <td className="mono" style={{ padding: "12px 18px", fontWeight: 600, color: "#10b981" }}>{fmtRp(pr)}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: "#10b98115", color: "#10b981" }}>{pct(pr, r)}%</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
