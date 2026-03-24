import { Ic } from "../components/icons/IconMap";
import { KpiCard, Badge, Stars } from "../components/ui";
import { AreaChart, HeatMap, Donut, Spark } from "../components/charts";
import { STATUS, DSTATUS } from "../constants/status";
import { fmtRp, fmtDate, fmt, pct } from "../utils/format";

export default function Dashboard({
  orders, del, products, pangkalan, activePk, dist, pendDist, pend,
  rev, profit, totStock, lowStock,
  setModal, setPage, setPkTab,
  dayLabels, last7Rev, last7Ord, last7Dist, last30Heat, forecast3kg,
}) {
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Dashboard</h2>
          <p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}>{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p>
        </div>
        <button onClick={() => setModal({ t: "addOrder" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}>
          <Ic name="plus" size={16} /> Pesanan Baru
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 24 }}>
        <KpiCard icon="wallet" label="Total Pendapatan" value={fmtRp(rev)} sparkData={last7Rev} color="#f97316" sub={`${del.length} transaksi`} />
        <KpiCard icon="trend" label="Keuntungan Bersih" value={fmtRp(profit)} sparkData={last7Rev.map(v => v * 0.26)} color="#10b981" sub={`margin ${pct(profit, rev)}%`} />
        <KpiCard icon="cart" label="Total Pesanan" value={orders.length} sparkData={last7Ord} color="#6366f1" sub={`${pend.length} pending`} />
        <KpiCard icon="store" label="Pangkalan Aktif" value={`${activePk.length}/${pangkalan.length}`} sparkData={last7Dist} color="#8b5cf6" sub={`${pendDist.length} distribusi aktif`} />
        <KpiCard icon="pkg" label="Total Stok" value={fmt(totStock)} color={lowStock.length > 0 ? "#ef4444" : "#0ea5e9"} sub={lowStock.length > 0 ? `${lowStock.length} rendah!` : "Aman"} />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16, marginBottom: 24 }}>
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Tren Pendapatan 7 Hari</span>
            <span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{fmtRp(last7Rev.reduce((a, b) => a + b, 0))}</span>
          </div>
          <AreaChart data={last7Rev} labels={dayLabels} color="#f97316" h={140} />
        </div>
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Aktivitas Pesanan</span>
            <HeatMap data={last30Heat} color="var(--accent2)" />
          </div>
          <AreaChart data={last7Ord} labels={dayLabels} color="#6366f1" h={140} />
        </div>
      </div>

      {/* Forecast + Quick Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginBottom: 24 }}>
        {forecast3kg && (
          <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: "#f59e0b15", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name="zap" size={14} /></div>
              <span style={{ fontWeight: 700, fontSize: 14 }}>Prakiraan Stok LPG 3 kg</span>
            </div>
            <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
              <Donut value={forecast3kg.stock} max={500} size={72} stroke={7} color={forecast3kg.days < 7 ? "#ef4444" : "#10b981"}>
                <span className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{forecast3kg.days}h</span>
              </Donut>
              <div>
                <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Konsumsi rata-rata</div>
                <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>~{forecast3kg.avg} tabung/hari</div>
                <div style={{ fontSize: 12, color: forecast3kg.days < 7 ? "#ef4444" : "var(--text-dim)", fontWeight: 600, marginTop: 4 }}>
                  {forecast3kg.days < 7 ? "Segera restock!" : `Cukup untuk ~${forecast3kg.days} hari`}
                </div>
              </div>
            </div>
          </div>
        )}
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Produk Terlaris</div>
          {products.slice().sort((a, b) => {
            const qa = del.filter(o => o.pid === a.id).reduce((s, o) => s + o.qty, 0);
            const qb = del.filter(o => o.pid === b.id).reduce((s, o) => s + o.qty, 0);
            return qb - qa;
          }).slice(0, 3).map((p, i) => {
            const qty = del.filter(o => o.pid === p.id).reduce((s, o) => s + o.qty, 0);
            const maxQty = del.reduce((s, o) => s + o.qty, 0);
            return (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <span className="mono" style={{ fontSize: 18, fontWeight: 800, color: i === 0 ? "#f97316" : i === 1 ? "#6366f1" : "var(--text-dim)", width: 24 }}>#{i + 1}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div>
                  <div style={{ height: 4, borderRadius: 2, background: "var(--border)", marginTop: 4, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 2, width: `${pct(qty, maxQty)}%`, background: i === 0 ? "#f97316" : i === 1 ? "#6366f1" : "var(--text-dim)", transition: "width 0.8s" }} />
                  </div>
                </div>
                <span className="mono" style={{ fontSize: 13, fontWeight: 700 }}>{qty}</span>
              </div>
            );
          })}
        </div>
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
          <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Performa Pangkalan Top</div>
          {pangkalan.filter(p => p.status === "active").sort((a, b) => b.td - a.td).slice(0, 4).map(pk => (
            <div key={pk.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <Donut value={pk.qu} max={pk.qm} size={36} stroke={4} color={pct(pk.qu, pk.qm) >= 90 ? "#ef4444" : pct(pk.qu, pk.qm) >= 70 ? "#f59e0b" : "#10b981"}>
                <span style={{ fontSize: 8, fontWeight: 800 }}>{pct(pk.qu, pk.qm)}%</span>
              </Donut>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 600 }}>{pk.name}</div>
                <div style={{ fontSize: 10, color: "var(--text-dim)" }}>{fmt(pk.td)} tabung total</div>
              </div>
              <Stars n={pk.rating} />
            </div>
          ))}
        </div>
      </div>

      {/* Recent Tables */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 16 }}>
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Pesanan Terbaru</span>
            <button onClick={() => setPage("orders")} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Lihat Semua →</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Pelanggan", "Produk", "Total", "Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 20px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
              <tbody>{orders.slice(0, 5).map(o => (
                <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600 }}>{o.cname}</td>
                  <td style={{ padding: "12px 20px", fontSize: 13 }}>{o.pname} ×{o.qty}</td>
                  <td className="mono" style={{ padding: "12px 20px", fontSize: 13, fontWeight: 500 }}>{fmtRp(o.total)}</td>
                  <td style={{ padding: "12px 20px" }}><Badge status={o.status} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
        <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
          <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, fontSize: 14 }}>Distribusi Terbaru</span>
            <button onClick={() => { setPage("pangkalan"); setPkTab("dist"); }} style={{ fontSize: 12, color: "var(--accent2)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Lihat Semua →</button>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Pangkalan", "Tabung", "Nilai", "Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 20px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
              <tbody>{dist.slice(0, 5).map(d => (
                <tr key={d.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600 }}>{d.pkname}</td>
                  <td style={{ padding: "12px 20px", fontSize: 12 }}>{d.q3 > 0 ? `${d.q3}×3kg ` : ""}{d.q5 > 0 ? `${d.q5}×5.5kg ` : ""}{d.q12 > 0 ? `${d.q12}×12kg` : ""}</td>
                  <td className="mono" style={{ padding: "12px 20px", fontSize: 13, fontWeight: 500 }}>{fmtRp(d.val)}</td>
                  <td style={{ padding: "12px 20px" }}><Badge status={d.status} map={DSTATUS} /></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
