import { Ic } from "../components/icons/IconMap";
import { Badge } from "../components/ui";
import { STATUS } from "../constants/status";
import { fmtRp, fmtDate } from "../utils/format";

export default function Orders({
  filteredOrders,
  orders,
  orderFilter,
  setOrderFilter,
  setModal,
  exportCSV,
  upOrd,
  search,
}) {
  const statusCounts = Object.fromEntries(
    Object.keys(STATUS).map((key) => [
      key,
      orders.filter((o) => o.status === key).length,
    ])
  );

  return (
    <div style={{ animation: "fadeIn .3s" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>
          Daftar Pesanan
        </h2>
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={exportCSV}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid var(--border)",
              background: "var(--card)",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <Ic name="download" size={16} />
            Export
          </button>
          <button
            onClick={() => setModal({ type: "addOrder" })}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 14px",
              borderRadius: 8,
              border: "none",
              background: "var(--accent, #6366f1)",
              color: "#fff",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: 14,
            }}
          >
            <Ic name="plus" size={16} />
            Pesanan Baru
          </button>
        </div>
      </div>

      {/* Filter Pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 18,
          flexWrap: "wrap",
        }}
      >
        {/* "Semua" pill */}
        <button
          onClick={() => setOrderFilter("all")}
          style={{
            padding: "6px 14px",
            borderRadius: 20,
            border:
              orderFilter === "all"
                ? "2px solid var(--accent, #6366f1)"
                : "1px solid var(--border)",
            background:
              orderFilter === "all"
                ? "var(--accent-bg, rgba(99,102,241,0.1))"
                : "var(--card)",
            cursor: "pointer",
            fontWeight: orderFilter === "all" ? 700 : 500,
            fontSize: 13,
            transition: "all .15s",
          }}
        >
          Semua{" "}
          <span style={{ opacity: 0.6, fontSize: 12 }}>({orders.length})</span>
        </button>

        {/* Status pills */}
        {Object.entries(STATUS).map(([key, val]) => (
          <button
            key={key}
            onClick={() => setOrderFilter(key)}
            style={{
              padding: "6px 14px",
              borderRadius: 20,
              border:
                orderFilter === key
                  ? "2px solid var(--accent, #6366f1)"
                  : "1px solid var(--border)",
              background:
                orderFilter === key
                  ? "var(--accent-bg, rgba(99,102,241,0.1))"
                  : "var(--card)",
              cursor: "pointer",
              fontWeight: orderFilter === key ? 700 : 500,
              fontSize: 13,
              transition: "all .15s",
            }}
          >
            {val.label ?? val}{" "}
            <span style={{ opacity: 0.6, fontSize: 12 }}>
              ({statusCounts[key] ?? 0})
            </span>
          </button>
        ))}
      </div>

      {/* Table Card */}
      <div
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderRadius: 12,
          overflow: "auto",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr
              style={{
                borderBottom: "1px solid var(--border)",
                background: "var(--table-head, rgba(0,0,0,0.03))",
              }}
            >
              {[
                "#",
                "Tanggal",
                "Pelanggan",
                "Produk",
                "Qty",
                "Total",
                "Profit",
                "Status",
                "Aksi",
              ].map((col) => (
                <th
                  key={col}
                  style={{
                    padding: "10px 14px",
                    textAlign: "left",
                    fontSize: 11,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    whiteSpace: "nowrap",
                    opacity: 0.6,
                  }}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td
                  colSpan={9}
                  style={{
                    padding: "40px 14px",
                    textAlign: "center",
                    opacity: 0.4,
                  }}
                >
                  Tidak ada pesanan ditemukan.
                </td>
              </tr>
            ) : (
              filteredOrders.map((order, idx) => (
                <tr
                  key={order.id}
                  style={{
                    borderBottom: "1px solid var(--border)",
                    transition: "background .12s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--row-hover, rgba(0,0,0,0.03))")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  {/* # */}
                  <td style={{ padding: "10px 14px", opacity: 0.5 }}>
                    {idx + 1}
                  </td>

                  {/* Tanggal */}
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    {fmtDate(order.date ?? order.createdAt)}
                  </td>

                  {/* Pelanggan */}
                  <td style={{ padding: "10px 14px" }}>
                    {order.customer ?? order.pelanggan ?? "-"}
                  </td>

                  {/* Produk */}
                  <td style={{ padding: "10px 14px" }}>
                    {order.product ?? order.produk ?? "-"}
                  </td>

                  {/* Qty */}
                  <td style={{ padding: "10px 14px" }}>
                    {order.qty ?? order.quantity ?? "-"}
                  </td>

                  {/* Total */}
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    {fmtRp(order.total)}
                  </td>

                  {/* Profit */}
                  <td style={{ padding: "10px 14px", whiteSpace: "nowrap" }}>
                    {fmtRp(order.profit ?? 0)}
                  </td>

                  {/* Status */}
                  <td style={{ padding: "10px 14px" }}>
                    <Badge status={order.status} />
                  </td>

                  {/* Aksi */}
                  <td style={{ padding: "10px 14px" }}>
                    <div style={{ display: "flex", gap: 6 }}>
                      {order.status === "pending" && (
                        <>
                          {/* Confirm */}
                          <button
                            title="Konfirmasi"
                            onClick={() =>
                              upOrd(order.id, { status: "confirmed" })
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 30,
                              height: 30,
                              borderRadius: 6,
                              border: "1px solid #22c55e",
                              background: "rgba(34,197,94,0.08)",
                              color: "#22c55e",
                              cursor: "pointer",
                              transition: "background .12s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(34,197,94,0.18)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(34,197,94,0.08)")
                            }
                          >
                            <Ic name="check" size={14} />
                          </button>

                          {/* Cancel */}
                          <button
                            title="Batalkan"
                            onClick={() =>
                              upOrd(order.id, { status: "cancelled" })
                            }
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              width: 30,
                              height: 30,
                              borderRadius: 6,
                              border: "1px solid #ef4444",
                              background: "rgba(239,68,68,0.08)",
                              color: "#ef4444",
                              cursor: "pointer",
                              transition: "background .12s",
                            }}
                            onMouseEnter={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(239,68,68,0.18)")
                            }
                            onMouseLeave={(e) =>
                              (e.currentTarget.style.background =
                                "rgba(239,68,68,0.08)")
                            }
                          >
                            <Ic name="x" size={14} />
                          </button>
                        </>
                      )}

                      {order.status === "confirmed" && (
                        /* Kirim */
                        <button
                          title="Kirim"
                          onClick={() =>
                            upOrd(order.id, { status: "shipped" })
                          }
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 5,
                            padding: "4px 10px",
                            borderRadius: 6,
                            border: "1px solid #3b82f6",
                            background: "rgba(59,130,246,0.08)",
                            color: "#3b82f6",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: 12,
                            transition: "background .12s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(59,130,246,0.18)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(59,130,246,0.08)")
                          }
                        >
                          <Ic name="truck" size={13} />
                          Kirim
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
