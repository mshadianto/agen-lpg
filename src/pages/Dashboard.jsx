import I, { Ic } from "../components/icons/IconMap";
import KpiCard from "../components/ui/KpiCard";
import { AreaChart, HeatMap, Donut, Spark } from "../components/charts";
import { Badge, Stars } from "../components/ui";
import { STATUS, DSTATUS } from "../constants/status";
import { fmtRp, fmtDate, fmt, pct } from "../utils/format";

const card = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: 20,
};

const th = {
  fontSize: 11,
  fontWeight: 700,
  color: "var(--text-dim)",
  textTransform: "uppercase",
  letterSpacing: ".06em",
  padding: "6px 0",
  borderBottom: "1px solid var(--border)",
};

const td = {
  padding: "10px 0",
  fontSize: 13,
  borderBottom: "1px solid var(--border)",
  verticalAlign: "middle",
};

export default function Dashboard({
  orders, del, products, pangkalan, activePk, dist, pendDist, pend, rev, profit,
  totStock, lowStock, fmt: fmtProp, fmtRp: fmtRpProp, pct: pctProp,
  setModal, setPage, setPkTab,
  dayLabels, last7Rev, last7Ord, last7Dist, last30Heat, forecast3kg,
}) {
  // Use passed-in formatters if provided, else fall back to imported ones
  const _fmt    = fmtProp   || fmt;
  const _fmtRp  = fmtRpProp || fmtRp;
  const _pct    = pctProp   || pct;

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
  });

  // Top 3 products by qty sold
  const topProducts = [...(products || [])]
    .sort((a, b) => (b.sold || 0) - (a.sold || 0))
    .slice(0, 3);

  // Top 4 active pangkalan by rating / orders
  const topPangkalan = [...(pangkalan || [])]
    .filter((p) => p.status === "active")
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 4);

  const recentOrders = [...(orders || [])].slice(-5).reverse();
  const recentDist   = [...(dist   || [])].slice(-5).reverse();

  const forecastTotal = (forecast3kg || []).reduce((s, v) => s + v, 0);

  return (
    <div style={{ animation: "fadeIn .3s", display: "flex", flexDirection: "column", gap: 24 }}>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>Dashboard</h1>
          <div style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>{today}</div>
        </div>
        <button
          onClick={() => setModal({ t: "addOrder" })}
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "9px 18px", borderRadius: 10, border: "none",
            background: "var(--accent)", color: "#fff",
            fontWeight: 700, fontSize: 13, cursor: "pointer",
          }}
        >
          <Ic name="plus" size={15} /> Pesanan Baru
        </button>
      </div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
        <KpiCard icon="revenue"    label="Pendapatan"       value={_fmtRp(rev)}            color="#6366f1" sparkData={last7Rev} />
        <KpiCard icon="profit"     label="Keuntungan"       value={_fmtRp(profit)}          color="#10b981" sparkData={last7Rev} />
        <KpiCard icon="orders"     label="Total Pesanan"    value={_fmt(orders?.length||0)} color="#f59e0b" sparkData={last7Ord}
          sub={pend ? `${pend} menunggu` : null}
        />
        <KpiCard icon="pangkalan"  label="Pangkalan Aktif"  value={_fmt(activePk)}          color="#3b82f6" />
        <KpiCard icon="stock"      label="Total Stok"       value={_fmt(totStock)}          color="#8b5cf6"
          sub={lowStock ? `${lowStock} stok rendah` : null}
        />
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16 }}>

        {/* Tren Pendapatan 7 Hari */}
        <div style={card}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Tren Pendapatan 7 Hari</div>
          <AreaChart data={last7Rev || []} labels={dayLabels} color="#6366f1" h={160} />
        </div>

        {/* Aktivitas Pesanan */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Aktivitas Pesanan</span>
            <span style={{ fontSize: 11, color: "var(--text-dim)" }}>30 hari terakhir</span>
          </div>
          <AreaChart data={last7Ord || []} labels={dayLabels} color="#f59e0b" h={100} />
          <div style={{ marginTop: 14 }}>
            <HeatMap data={last30Heat || []} color="#f59e0b" />
          </div>
        </div>

      </div>

      {/* Forecast + Quick Stats Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>

        {/* Forecast 3kg Donut */}
        <div style={card}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 16 }}>Forecast 3kg (7 hari)</div>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <Donut value={forecastTotal} max={forecastTotal * 1.5 || 1} size={80} stroke={8} color="#6366f1">
              <span style={{ fontSize: 12, fontWeight: 800 }}>{_fmt(forecastTotal)}</span>
            </Donut>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
              {(forecast3kg || []).map((v, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 10, color: "var(--text-dim)", width: 28 }}>
                    {dayLabels?.[i] ?? `D+${i + 1}`}
                  </span>
                  <div style={{ flex: 1, height: 6, borderRadius: 4, background: "var(--border)" }}>
                    <div style={{
                      width: `${_pct(v, Math.max(...(forecast3kg || [1])))}%`,
                      height: "100%", borderRadius: 4, background: "#6366f1",
                      transition: "width .6s",
                    }} />
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, width: 32, textAlign: "right" }}>{_fmt(v)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Produk Terlaris */}
        <div style={card}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Produk Terlaris</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topProducts.map((p, i) => (
              <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 26, height: 26, borderRadius: 8, flexShrink: 0,
                  background: ["#6366f115","#10b98115","#f59e0b15"][i],
                  color: ["#6366f1","#10b981","#f59e0b"][i],
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 12, fontWeight: 800,
                }}>{i + 1}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{_fmt(p.sold || 0)} terjual</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#10b981" }}>{_fmtRp(p.price || 0)}</div>
              </div>
            ))}
            {topProducts.length === 0 && (
              <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Belum ada data produk.</div>
            )}
          </div>
        </div>

        {/* Performa Pangkalan Top */}
        <div style={card}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 14 }}>Performa Pangkalan Top</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {topPangkalan.map((pk) => (
              <div key={pk.id} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 10, flexShrink: 0,
                  background: "var(--border)", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 14, fontWeight: 800,
                }}>
                  {(pk.name || "?")[0].toUpperCase()}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{pk.name}</div>
                  <Stars n={pk.rating || 0} />
                </div>
                <div style={{ fontSize: 11, color: "var(--text-dim)", textAlign: "right", flexShrink: 0 }}>
                  {_fmt(pk.totalOrders || 0)} pesanan
                </div>
              </div>
            ))}
            {topPangkalan.length === 0 && (
              <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Belum ada pangkalan aktif.</div>
            )}
          </div>
        </div>

      </div>

      {/* Recent Tables Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 16 }}>

        {/* Pesanan Terbaru */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Pesanan Terbaru</span>
            <button onClick={() => setPage("orders")} style={{
              fontSize: 11, fontWeight: 700, color: "var(--accent)",
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}>Lihat semua →</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ID", "Pelanggan", "Total", "Status"].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((o) => (
                <tr key={o.id}>
                  <td style={{ ...td, color: "var(--text-dim)", fontSize: 11 }}>#{String(o.id).slice(-5)}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{o.customerName || o.customer || "—"}</td>
                  <td style={{ ...td }} className="mono">{_fmtRp(o.total || 0)}</td>
                  <td style={td}><Badge status={o.status} map={STATUS} /></td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                <tr><td colSpan={4} style={{ ...td, color: "var(--text-dim)", textAlign: "center" }}>Belum ada pesanan.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Distribusi Terbaru */}
        <div style={card}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 13, fontWeight: 700 }}>Distribusi Terbaru</span>
            <button onClick={() => { setPage("distribution"); }} style={{
              fontSize: 11, fontWeight: 700, color: "var(--accent)",
              background: "none", border: "none", cursor: "pointer", padding: 0,
            }}>Lihat semua →</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["ID", "Pangkalan", "Qty", "Status"].map((h) => (
                  <th key={h} style={th}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentDist.map((d) => (
                <tr key={d.id}>
                  <td style={{ ...td, color: "var(--text-dim)", fontSize: 11 }}>#{String(d.id).slice(-5)}</td>
                  <td style={{ ...td, fontWeight: 600 }}>{d.pangkalanName || d.pangkalan || "—"}</td>
                  <td style={{ ...td }} className="mono">{_fmt(d.qty || 0)}</td>
                  <td style={td}><Badge status={d.status} map={DSTATUS} /></td>
                </tr>
              ))}
              {recentDist.length === 0 && (
                <tr><td colSpan={4} style={{ ...td, color: "var(--text-dim)", textAlign: "center" }}>Belum ada distribusi.</td></tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
