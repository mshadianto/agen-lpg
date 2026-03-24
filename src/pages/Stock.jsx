import { Ic } from "../components/icons/IconMap";
import { fmtRp } from "../utils/format";

export default function Stock({ products, del, setModal }) {
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", margin: 0 }}>
          Stok Barang
        </h2>
        <button
          onClick={() => setModal({ t: "addProd" })}
          style={{
            background: "linear-gradient(135deg,#f97316,#ea580c)",
            color: "#fff",
            border: "none",
            borderRadius: 10,
            padding: "8px 16px",
            fontSize: 12,
            fontWeight: 700,
            cursor: "pointer",
            fontFamily: "inherit",
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <Ic name="plus" size={14} /> Tambah
        </button>
      </div>

      {/* Product Cards Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}
      >
        {products.map((p) => {
          const isLow = p.stock <= p.min;
          const totalSold = del
            .filter((o) => o.pid === p.id)
            .reduce((sum, o) => sum + (o.qty ?? 0), 0);
          const stockPct = Math.min(100, Math.round((p.stock / (p.min * 5)) * 100));
          const margin = p.price - p.cost;

          return (
            <div
              key={p.id}
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 14,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Top color bar */}
              <div
                style={{
                  height: 4,
                  background: isLow
                    ? "linear-gradient(90deg,#ef4444,#dc2626)"
                    : "linear-gradient(90deg,#22c55e,#16a34a)",
                }}
              />

              <div style={{ padding: "16px 18px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
                {/* Product name + badge */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
                  <div style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.3 }}>
                    {p.name}
                  </div>
                  <span
                    style={{
                      flexShrink: 0,
                      fontSize: 10,
                      fontWeight: 700,
                      padding: "3px 8px",
                      borderRadius: 5,
                      background: p.type === "subsidi" ? "rgba(59,130,246,0.12)" : "rgba(139,92,246,0.12)",
                      color: p.type === "subsidi" ? "#3b82f6" : "#8b5cf6",
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {p.type === "subsidi" ? "Subsidi" : "Non-Subsidi"}
                  </span>
                </div>

                {/* Price grid: Jual / Beli / Margin */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr 1fr",
                    gap: 8,
                  }}
                >
                  {/* Jual */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Jual
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{fmtRp(p.price)}</span>
                  </div>

                  {/* Beli */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Beli
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700 }}>{fmtRp(p.cost)}</span>
                  </div>

                  {/* Margin */}
                  <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <span style={{ fontSize: 10, fontWeight: 600, opacity: 0.5, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Margin
                    </span>
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#22c55e" }}>
                      +{fmtRp(margin)}
                    </span>
                  </div>
                </div>

                {/* Stock info */}
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 11, fontWeight: 600, opacity: 0.6 }}>
                      Stok: <strong style={{ color: isLow ? "#ef4444" : "inherit", opacity: 1 }}>{p.stock}</strong> unit
                    </span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        color: isLow ? "#ef4444" : "#22c55e",
                      }}
                    >
                      {stockPct}%
                    </span>
                  </div>

                  {/* Stock progress bar */}
                  <div
                    style={{
                      height: 6,
                      borderRadius: 999,
                      background: "var(--border)",
                      overflow: "hidden",
                    }}
                  >
                    <div
                      style={{
                        height: "100%",
                        width: `${stockPct}%`,
                        borderRadius: 999,
                        background: isLow
                          ? "linear-gradient(90deg,#ef4444,#dc2626)"
                          : "linear-gradient(90deg,#22c55e,#16a34a)",
                        transition: "width .4s ease",
                      }}
                    />
                  </div>

                  <div style={{ fontSize: 10, opacity: 0.45, display: "flex", justifyContent: "space-between" }}>
                    <span>Min: {p.min}</span>
                    <span>Terjual: {totalSold}</span>
                  </div>
                </div>

                {/* Tambah Stok button */}
                <button
                  onClick={() => setModal({ t: "restock", d: p })}
                  style={{
                    marginTop: "auto",
                    width: "100%",
                    padding: "8px 0",
                    borderRadius: 8,
                    border: "1px solid var(--border)",
                    background: "transparent",
                    fontFamily: "inherit",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    transition: "background .15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(249,115,22,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Ic name="refresh" size={13} /> Tambah Stok
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
