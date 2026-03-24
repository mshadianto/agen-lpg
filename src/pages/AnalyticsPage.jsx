import { Ic } from "../components/icons/IconMap";
import { AreaChart, Spark, Donut } from "../components/charts";
import { fmtRp, pct, fmtDate } from "../utils/format";

// ─── Shared style tokens ──────────────────────────────────────────────────────
const card = {
  background: "var(--card)",
  border: "1px solid var(--border)",
  borderRadius: 16,
  padding: 20,
};

const card2 = {
  background: "var(--card2)",
  border: "1px solid var(--border)",
  borderRadius: 12,
  padding: 16,
};

const sectionTitle = {
  fontSize: 15,
  fontWeight: 700,
  marginBottom: 16,
  display: "flex",
  alignItems: "center",
  gap: 8,
};

const dimText = { color: "var(--text-dim)", fontSize: 12 };

const DAYS_ID = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];

// ─── Helper: inline bar ───────────────────────────────────────────────────────
function InlineBar({ value, max, color, height = 6, borderRadius = 3 }) {
  const pctVal = max > 0 ? Math.min((value / max) * 100, 100) : 0;
  return (
    <div
      style={{
        width: "100%",
        height,
        borderRadius,
        background: "var(--border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          width: `${pctVal}%`,
          height: "100%",
          background: color,
          borderRadius,
          transition: "width .6s cubic-bezier(.4,0,.2,1)",
        }}
      />
    </div>
  );
}

// ─── Helper: stat pill ────────────────────────────────────────────────────────
function StatPill({ label, value, color }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <span style={{ ...dimText }}>{label}</span>
      <span style={{ fontWeight: 700, fontSize: 15, color: color || "inherit" }}>{value}</span>
    </div>
  );
}

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ children, style }) {
  return (
    <div style={{ ...card, ...style }}>
      {children}
    </div>
  );
}

// ─── 1. Header ────────────────────────────────────────────────────────────────
function Header() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
      <div
        style={{
          width: 48,
          height: 48,
          borderRadius: 14,
          background: "linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          flexShrink: 0,
          boxShadow: "0 4px 16px #8b5cf640",
        }}
      >
        <Ic name="brain" size={24} />
      </div>
      <div style={{ flex: 1 }}>
        <h1 style={{ margin: 0, fontSize: 22, fontWeight: 800, lineHeight: 1.2 }}>
          Analytics &amp; Prediktif AI
        </h1>
        <p style={{ margin: 0, ...dimText, marginTop: 2 }}>
          Insight otomatis berbasis machine learning
        </p>
      </div>
      <span
        style={{
          background: "linear-gradient(135deg, #8b5cf6, #6366f1)",
          color: "#fff",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: ".1em",
          padding: "4px 12px",
          borderRadius: 20,
          boxShadow: "0 2px 8px #8b5cf650",
        }}
      >
        AI-POWERED
      </span>
    </div>
  );
}

// ─── 2. Prediksi Pendapatan ───────────────────────────────────────────────────
function PrediksiPendapatan({ last30Rev, day30Labels, predRevenue }) {
  const rev30 = last30Rev || [];
  const pred7 = predRevenue || [];
  const combined = [...rev30, ...pred7];
  const avgDaily = rev30.length > 0 ? rev30.reduce((s, v) => s + v, 0) / rev30.length : 0;
  const predTotal = pred7.reduce((s, v) => s + v, 0);

  // Build combined labels: last few actual labels + 7 predicted days
  const actualLabels = (day30Labels || []).slice(-rev30.length);
  const predLabels = Array.from({ length: pred7.length }, (_, i) => `+${i + 1}d`);
  const combinedLabels = [...actualLabels, ...predLabels];

  // Show every ~7th label to avoid clutter
  const sparseLabels = combinedLabels.map((l, i) =>
    i === 0 || i === combinedLabels.length - 1 || i % 7 === 0 ? l : ""
  );

  const lastActual = rev30[rev30.length - 1] || 0;
  const firstPred = pred7[0] || 0;
  const trending = firstPred >= lastActual;

  return (
    <Section>
      <div style={sectionTitle}>
        <Ic name="trend" size={18} />
        Prediksi Pendapatan
      </div>

      {/* KPI row */}
      <div style={{ display: "flex", gap: 24, flexWrap: "wrap", marginBottom: 20 }}>
        <StatPill label="Rata-rata harian (30h)" value={fmtRp(Math.round(avgDaily))} color="#8b5cf6" />
        <StatPill label="Prediksi 7 hari ke depan" value={fmtRp(predTotal)} color="#6366f1" />
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={dimText}>Tren</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: 15,
              color: trending ? "#10b981" : "#ef4444",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            <Ic name={trending ? "trend" : "activity"} size={15} />
            {trending ? "Naik" : "Turun"}
          </span>
        </div>
      </div>

      {/* Combined chart */}
      {combined.length > 1 && (
        <div style={{ position: "relative" }}>
          {/* Overlay divider between actual and predicted */}
          {rev30.length > 0 && pred7.length > 0 && (
            <div
              style={{
                position: "absolute",
                left: `${(rev30.length / combined.length) * 100}%`,
                top: 0,
                bottom: 20,
                width: 1,
                background: "#8b5cf660",
                borderLeft: "1px dashed #8b5cf6",
                zIndex: 1,
                pointerEvents: "none",
              }}
            />
          )}
          <AreaChart data={combined} labels={sparseLabels} color="#8b5cf6" h={180} />
          {pred7.length > 0 && (
            <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
              <span style={{ ...dimText, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 12, height: 2, background: "#8b5cf6", display: "inline-block", borderRadius: 1 }} />
                Aktual 30 hari
              </span>
              <span style={{ ...dimText, display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 12, height: 2, background: "#8b5cf660", display: "inline-block", borderRadius: 1, borderTop: "1px dashed #8b5cf6" }} />
                Prediksi 7 hari
              </span>
            </div>
          )}
        </div>
      )}
    </Section>
  );
}

// ─── 3. Prakiraan Kehabisan Stok ──────────────────────────────────────────────
function PrakiraanStok({ stockForecasts, lowStock }) {
  const forecasts = stockForecasts || [];
  if (forecasts.length === 0 && (!lowStock || lowStock.length === 0)) {
    return (
      <Section>
        <div style={sectionTitle}><Ic name="pkg" size={18} />Prakiraan Kehabisan Stok</div>
        <p style={{ ...dimText, textAlign: "center", padding: "24px 0" }}>Tidak ada produk berisiko kehabisan stok.</p>
      </Section>
    );
  }

  const items = forecasts.length > 0 ? forecasts : (lowStock || []).map((p) => ({
    name: p.name || p.id,
    daysLeft: p.stock > 0 && p.dailySales > 0 ? Math.round(p.stock / p.dailySales) : null,
    dailySales: p.dailySales || 0,
    stock: p.stock || 0,
    depletionSpark: p.depletionSpark || [],
  }));

  const urgency = (daysLeft) => {
    if (daysLeft === null || daysLeft === undefined) return { color: "#10b981", label: "Aman", bg: "#10b98115" };
    if (daysLeft <= 3) return { color: "#ef4444", label: "Kritis", bg: "#ef444415" };
    if (daysLeft <= 7) return { color: "#f59e0b", label: "Waspada", bg: "#f59e0b15" };
    return { color: "#10b981", label: "Aman", bg: "#10b98115" };
  };

  return (
    <Section>
      <div style={sectionTitle}><Ic name="pkg" size={18} />Prakiraan Kehabisan Stok</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
        {items.map((item, i) => {
          const u = urgency(item.daysLeft);
          return (
            <div
              key={i}
              style={{
                ...card2,
                borderColor: u.color + "40",
                background: u.bg,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>{item.name}</span>
                <span
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    color: u.color,
                    background: u.color + "20",
                    padding: "2px 8px",
                    borderRadius: 8,
                  }}
                >
                  {u.label}
                </span>
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ fontSize: 22, fontWeight: 800, color: u.color }}>
                  {item.daysLeft !== null && item.daysLeft !== undefined ? item.daysLeft : "—"}
                </span>
                <span style={{ ...dimText, marginLeft: 4 }}>hari tersisa</span>
              </div>
              <div style={{ ...dimText, marginBottom: 8 }}>
                Penjualan harian: <strong>{item.dailySales || 0} unit</strong>
              </div>
              {item.depletionSpark && item.depletionSpark.length > 1 && (
                <Spark data={item.depletionSpark} color={u.color} w={120} h={28} fill />
              )}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ─── 4. Pola Pesanan ──────────────────────────────────────────────────────────
function PolaPesanan({ fulfillment }) {
  const f = fulfillment || {};
  const fulfillRate = f.fulfillRate ?? 0;
  const cancelRate = f.cancelRate ?? 0;
  const avgOrder = f.avgOrder ?? 0;
  const peakHour = f.peakHour ?? "—";
  const weekDist = f.weekDist || [0, 0, 0, 0, 0, 0, 0]; // Sun–Sat
  const maxDay = Math.max(...weekDist, 1);
  const busiest = weekDist.indexOf(maxDay);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      {/* KPIs */}
      <Section>
        <div style={sectionTitle}><Ic name="cart" size={18} />Pola Pesanan</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ ...card2, textAlign: "center" }}>
            <Donut value={fulfillRate} max={100} size={72} stroke={7} color="#10b981">
              <span style={{ fontWeight: 800, fontSize: 14, color: "#10b981" }}>{fulfillRate}%</span>
            </Donut>
            <div style={{ ...dimText, marginTop: 8 }}>Fulfillment Rate</div>
          </div>
          <div style={{ ...card2, textAlign: "center" }}>
            <Donut value={cancelRate} max={100} size={72} stroke={7} color="#ef4444">
              <span style={{ fontWeight: 800, fontSize: 14, color: "#ef4444" }}>{cancelRate}%</span>
            </Donut>
            <div style={{ ...dimText, marginTop: 8 }}>Cancel Rate</div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <StatPill label="Rata-rata pesanan" value={fmtRp(avgOrder)} />
          <StatPill label="Jam puncak" value={`${peakHour}:00`} color="#f97316" />
        </div>
      </Section>

      {/* Weekly distribution */}
      <Section>
        <div style={sectionTitle}><Ic name="bar" size={18} />Distribusi Mingguan</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {DAYS_ID.map((day, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 28,
                  fontSize: 11,
                  fontWeight: 700,
                  color: i === busiest ? "#6366f1" : "var(--text-dim)",
                }}
              >
                {day}
              </span>
              <div style={{ flex: 1 }}>
                <InlineBar
                  value={weekDist[i]}
                  max={maxDay}
                  color={i === busiest ? "#6366f1" : "#8b5cf660"}
                  height={8}
                />
              </div>
              <span style={{ fontSize: 12, fontWeight: 600, minWidth: 28, textAlign: "right" }}>
                {weekDist[i]}
              </span>
            </div>
          ))}
        </div>
        {busiest >= 0 && (
          <div
            style={{
              marginTop: 14,
              padding: "8px 12px",
              background: "#6366f115",
              borderRadius: 8,
              border: "1px solid #6366f130",
              fontSize: 12,
              color: "#6366f1",
              fontWeight: 600,
            }}
          >
            Hari tersibuk: <strong>{DAYS_ID[busiest]}</strong> dengan {weekDist[busiest]} pesanan
          </div>
        )}
      </Section>
    </div>
  );
}

// ─── 5. Segmentasi Pelanggan ──────────────────────────────────────────────────
function SegmentasiPelanggan({ custAnalytics, customers }) {
  const ca = custAnalytics || {};
  const rtCount = ca.rtCount ?? 0;
  const umkmCount = ca.umkmCount ?? 0;
  const rtRev = ca.rtRev ?? 0;
  const umkmRev = ca.umkmRev ?? 0;
  const totalRev = rtRev + umkmRev || 1;

  const top5 = [...(customers || [])]
    .sort((a, b) => (b.totalRev || b.revenue || 0) - (a.totalRev || a.revenue || 0))
    .slice(0, 5);

  const maxTop = top5[0] ? (top5[0].totalRev || top5[0].revenue || 1) : 1;

  return (
    <Section>
      <div style={sectionTitle}><Ic name="users" size={18} />Segmentasi Pelanggan</div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 20 }}>
        {/* Donut RT */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Donut value={rtCount} max={rtCount + umkmCount || 1} size={80} stroke={8} color="#8b5cf6">
            <span style={{ fontWeight: 800, fontSize: 13, color: "#8b5cf6" }}>
              {pct(rtCount, rtCount + umkmCount)}%
            </span>
          </Donut>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>RT / Rumahan</div>
            <div style={{ ...dimText }}>{rtCount} pelanggan</div>
          </div>
        </div>

        {/* Donut UMKM */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <Donut value={umkmCount} max={rtCount + umkmCount || 1} size={80} stroke={8} color="#f97316">
            <span style={{ fontWeight: 800, fontSize: 13, color: "#f97316" }}>
              {pct(umkmCount, rtCount + umkmCount)}%
            </span>
          </Donut>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontWeight: 700, fontSize: 13 }}>UMKM / Usaha</div>
            <div style={{ ...dimText }}>{umkmCount} pelanggan</div>
          </div>
        </div>

        {/* Revenue per segment */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#8b5cf6" }}>RT</span>
              <span style={{ fontSize: 12, fontWeight: 700 }}>{fmtRp(rtRev)}</span>
            </div>
            <InlineBar value={rtRev} max={totalRev} color="#8b5cf6" height={8} />
          </div>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 12, fontWeight: 600, color: "#f97316" }}>UMKM</span>
              <span style={{ fontSize: 12, fontWeight: 700 }}>{fmtRp(umkmRev)}</span>
            </div>
            <InlineBar value={umkmRev} max={totalRev} color="#f97316" height={8} />
          </div>
        </div>
      </div>

      {/* Top 5 Pareto */}
      {top5.length > 0 && (
        <div style={{ marginTop: 20 }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--text-dim)" }}>
            Top 5 Pelanggan (Pareto)
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {top5.map((c, i) => {
              const cRev = c.totalRev || c.revenue || 0;
              return (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: i === 0 ? "#f59e0b" : "var(--card2)",
                      border: "1px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontWeight: 800,
                      flexShrink: 0,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {c.name || c.id}
                  </span>
                  <div style={{ flex: 2 }}>
                    <InlineBar value={cRev} max={maxTop} color="#6366f1" height={6} />
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, minWidth: 80, textAlign: "right" }}>
                    {fmtRp(cRev)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Section>
  );
}

// ─── 6. Cakupan Pangkalan ─────────────────────────────────────────────────────
function CakupanPangkalan({ pkAnalytics }) {
  const pk = pkAnalytics || {};
  const avgRating = pk.avgRating ?? 0;
  const quotaPct = pk.quotaPct ?? 0;
  const nearFull = pk.nearFull ?? 0;
  const kecamatanCount = pk.kecamatanCount ?? 0;
  const byKecamatan = pk.byKecamatan || [];
  const maxKec = Math.max(...byKecamatan.map((k) => k.count || 0), 1);

  return (
    <Section>
      <div style={sectionTitle}><Ic name="store" size={18} />Cakupan Pangkalan</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Rata-rata Rating", value: avgRating.toFixed(1), icon: "star", color: "#f59e0b" },
          { label: "Quota Tersalur", value: `${quotaPct}%`, icon: "gauge", color: "#10b981" },
          { label: "Hampir Penuh", value: nearFull, icon: "alert", color: "#f97316" },
          { label: "Kecamatan", value: kecamatanCount, icon: "pin", color: "#6366f1" },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              ...card2,
              display: "flex",
              flexDirection: "column",
              gap: 6,
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <span style={{ color: stat.color }}>
              <Ic name={stat.icon} size={22} />
            </span>
            <span style={{ fontSize: 20, fontWeight: 800, color: stat.color }}>{stat.value}</span>
            <span style={dimText}>{stat.label}</span>
          </div>
        ))}
      </div>

      {byKecamatan.length > 0 && (
        <div>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10, color: "var(--text-dim)" }}>
            Distribusi per Kecamatan
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {byKecamatan.map((kec, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 12, fontWeight: 600, minWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {kec.name}
                </span>
                <div style={{ flex: 1 }}>
                  <InlineBar value={kec.count || 0} max={maxKec} color="#6366f1" height={8} />
                </div>
                <span style={{ fontSize: 12, fontWeight: 700, minWidth: 30, textAlign: "right" }}>
                  {kec.count || 0}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}

// ─── 7. Deteksi Anomali ───────────────────────────────────────────────────────
function DeteksiAnomali({ anomalies, predOrders }) {
  const items = anomalies || [];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
      <Section>
        <div style={sectionTitle}><Ic name="alert" size={18} />Deteksi Anomali</div>
        {items.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              padding: "24px 0",
            }}
          >
            <span style={{ color: "#10b981" }}>
              <Ic name="check" size={36} />
            </span>
            <span style={{ fontWeight: 700, color: "#10b981", fontSize: 14 }}>
              Tidak ada anomali terdeteksi
            </span>
            <span style={dimText}>Semua metrik dalam batas normal</span>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {items.map((a, i) => (
              <div
                key={i}
                style={{
                  ...card2,
                  borderColor: "#ef444440",
                  background: "#ef444410",
                  display: "flex",
                  gap: 10,
                  alignItems: "flex-start",
                }}
              >
                <span style={{ color: "#ef4444", flexShrink: 0, marginTop: 1 }}>
                  <Ic name="alert" size={16} />
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 2 }}>
                    {a.title || a.type || "Anomali"}
                  </div>
                  <div style={{ ...dimText }}>{a.desc || a.message || ""}</div>
                  {a.date && (
                    <div style={{ fontSize: 11, color: "#ef4444", marginTop: 2 }}>
                      {fmtDate(a.date)}
                    </div>
                  )}
                </div>
                {a.severity && (
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      color: a.severity === "high" ? "#ef4444" : "#f59e0b",
                      background: a.severity === "high" ? "#ef444420" : "#f59e0b20",
                      padding: "2px 8px",
                      borderRadius: 8,
                      flexShrink: 0,
                    }}
                  >
                    {a.severity === "high" ? "TINGGI" : "SEDANG"}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </Section>

      {/* Predicted orders 7-day bar chart */}
      <Section>
        <div style={sectionTitle}><Ic name="bar" size={18} />Prediksi Pesanan 7 Hari</div>
        {predOrders && predOrders.length > 0 ? (
          <div>
            <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 120, marginBottom: 8 }}>
              {predOrders.map((val, i) => {
                const maxOrd = Math.max(...predOrders, 1);
                const barH = Math.round((val / maxOrd) * 100);
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 4,
                      height: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <span style={{ fontSize: 10, fontWeight: 700, color: "#6366f1" }}>{val}</span>
                    <div
                      style={{
                        width: "100%",
                        height: `${barH}%`,
                        background: `linear-gradient(180deg, #6366f1 0%, #8b5cf6 100%)`,
                        borderRadius: "4px 4px 0 0",
                        minHeight: 4,
                        transition: "height .6s cubic-bezier(.4,0,.2,1)",
                      }}
                    />
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              {predOrders.map((_, i) => (
                <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 10, ...dimText }}>
                  +{i + 1}d
                </span>
              ))}
            </div>
          </div>
        ) : (
          <p style={{ ...dimText, textAlign: "center", padding: "24px 0" }}>Data prediksi pesanan tidak tersedia.</p>
        )}
      </Section>
    </div>
  );
}

// ─── 8. Rekomendasi AI ────────────────────────────────────────────────────────
function RekomendasiAI({ lowStock, stockForecasts, custAnalytics, pkAnalytics, fulfillment }) {
  const recs = [];

  // Stock-based recommendations
  const forecasts = stockForecasts || [];
  const criticals = forecasts.filter((f) => f.daysLeft !== null && f.daysLeft <= 3);
  const warnings = forecasts.filter((f) => f.daysLeft !== null && f.daysLeft > 3 && f.daysLeft <= 7);

  if (criticals.length > 0) {
    recs.push({
      icon: "flame",
      color: "#ef4444",
      bg: "#ef444410",
      border: "#ef444440",
      title: "Segera Restock",
      desc: `${criticals.map((f) => f.name).join(", ")} diprediksi habis dalam ≤3 hari. Lakukan pengadaan segera.`,
      priority: "KRITIS",
    });
  }

  if (warnings.length > 0) {
    recs.push({
      icon: "alert",
      color: "#f59e0b",
      bg: "#f59e0b10",
      border: "#f59e0b40",
      title: "Rencanakan Restock",
      desc: `${warnings.map((f) => f.name).join(", ")} perlu direstock dalam 7 hari ke depan.`,
      priority: "SEDANG",
    });
  }

  // Fulfillment recommendations
  const f = fulfillment || {};
  if ((f.fulfillRate ?? 100) < 85) {
    recs.push({
      icon: "truck",
      color: "#f97316",
      bg: "#f9731610",
      border: "#f9731640",
      title: "Tingkatkan Fulfillment",
      desc: `Fulfillment rate ${f.fulfillRate}% di bawah target 85%. Evaluasi kapasitas armada dan jadwal pengiriman.`,
      priority: "PENTING",
    });
  }

  if ((f.cancelRate ?? 0) > 10) {
    recs.push({
      icon: "x",
      color: "#ef4444",
      bg: "#ef444410",
      border: "#ef444440",
      title: "Turunkan Cancel Rate",
      desc: `Cancel rate ${f.cancelRate}% melebihi batas wajar. Tinjau penyebab pembatalan pesanan.`,
      priority: "PENTING",
    });
  }

  // Customer segment recommendations
  const ca = custAnalytics || {};
  if (ca.umkmCount > 0 && ca.rtCount > 0) {
    const umkmShare = pct(ca.umkmRev || 0, (ca.umkmRev || 0) + (ca.rtRev || 0));
    if (umkmShare < 30) {
      recs.push({
        icon: "users",
        color: "#8b5cf6",
        bg: "#8b5cf610",
        border: "#8b5cf640",
        title: "Optimalkan Segmen UMKM",
        desc: `Segmen UMKM hanya berkontribusi ${umkmShare}% pendapatan. Pertimbangkan program khusus UMKM.`,
        priority: "SARAN",
      });
    }
  }

  // Pangkalan recommendations
  const pk = pkAnalytics || {};
  if ((pk.quotaPct ?? 100) < 70) {
    recs.push({
      icon: "store",
      color: "#6366f1",
      bg: "#6366f110",
      border: "#6366f140",
      title: "Distribusi Quota Pangkalan",
      desc: `Penyaluran quota baru ${pk.quotaPct}%. Dorong pangkalan untuk meningkatkan distribusi ke konsumen.`,
      priority: "SARAN",
    });
  }

  if ((pk.nearFull ?? 0) > 2) {
    recs.push({
      icon: "gauge",
      color: "#f59e0b",
      bg: "#f59e0b10",
      border: "#f59e0b40",
      title: "Pangkalan Hampir Penuh",
      desc: `${pk.nearFull} pangkalan mendekati kapasitas penuh. Percepat distribusi untuk menghindari penolakan.`,
      priority: "SEDANG",
    });
  }

  // Low stock fallback
  if (recs.length === 0 && lowStock && lowStock.length > 0) {
    recs.push({
      icon: "pkg",
      color: "#f59e0b",
      bg: "#f59e0b10",
      border: "#f59e0b40",
      title: "Stok Rendah Terdeteksi",
      desc: `${lowStock.length} produk memiliki stok rendah. Pantau ketersediaan dan rencanakan pengadaan.`,
      priority: "SEDANG",
    });
  }

  if (recs.length === 0) {
    recs.push({
      icon: "check",
      color: "#10b981",
      bg: "#10b98110",
      border: "#10b98140",
      title: "Semua Indikator Normal",
      desc: "Tidak ada tindakan mendesak. Pertahankan performa distribusi yang sudah baik.",
      priority: "INFO",
    });
  }

  const priorityColor = { KRITIS: "#ef4444", PENTING: "#f97316", SEDANG: "#f59e0b", SARAN: "#6366f1", INFO: "#10b981" };

  return (
    <Section>
      <div style={sectionTitle}>
        <Ic name="zap" size={18} />
        Rekomendasi AI
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {recs.map((rec, i) => (
          <div
            key={i}
            style={{
              ...card2,
              background: rec.bg,
              borderColor: rec.border,
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ color: rec.color }}>
                <Ic name={rec.icon} size={20} />
              </span>
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 800,
                  color: priorityColor[rec.priority] || rec.color,
                  background: (priorityColor[rec.priority] || rec.color) + "20",
                  padding: "2px 8px",
                  borderRadius: 8,
                  letterSpacing: ".05em",
                }}
              >
                {rec.priority}
              </span>
            </div>
            <div style={{ fontWeight: 700, fontSize: 13 }}>{rec.title}</div>
            <div style={{ ...dimText, fontSize: 12, lineHeight: 1.5 }}>{rec.desc}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export default function AnalyticsPage({
  last30Rev,
  day30Labels,
  predRevenue,
  predOrders,
  stockForecasts,
  fulfillment,
  custAnalytics,
  pkAnalytics,
  anomalies,
  lowStock,
  customers,
  rev,
  dayLabels,
  last30Ord,
}) {
  return (
    <div
      style={{
        animation: "fadeIn .3s",
        display: "flex",
        flexDirection: "column",
        gap: 20,
        padding: "0 0 40px",
        maxWidth: 1200,
        margin: "0 auto",
        width: "100%",
      }}
    >
      {/* 1. Header */}
      <Header />

      {/* 2. Prediksi Pendapatan */}
      <PrediksiPendapatan
        last30Rev={last30Rev}
        day30Labels={day30Labels}
        predRevenue={predRevenue}
      />

      {/* 3. Prakiraan Kehabisan Stok */}
      <PrakiraanStok stockForecasts={stockForecasts} lowStock={lowStock} />

      {/* 4. Pola Pesanan */}
      <PolaPesanan fulfillment={fulfillment} />

      {/* 5. Segmentasi Pelanggan */}
      <SegmentasiPelanggan custAnalytics={custAnalytics} customers={customers} />

      {/* 6. Cakupan Pangkalan */}
      <CakupanPangkalan pkAnalytics={pkAnalytics} />

      {/* 7. Deteksi Anomali */}
      <DeteksiAnomali anomalies={anomalies} predOrders={predOrders} />

      {/* 8. Rekomendasi AI */}
      <RekomendasiAI
        lowStock={lowStock}
        stockForecasts={stockForecasts}
        custAnalytics={custAnalytics}
        pkAnalytics={pkAnalytics}
        fulfillment={fulfillment}
      />
    </div>
  );
}
