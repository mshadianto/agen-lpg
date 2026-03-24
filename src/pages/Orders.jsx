import { Ic } from "../components/icons/IconMap";
import { Badge } from "../components/ui";
import { STATUS } from "../constants/status";
import { fmtRp, fmtDate } from "../utils/format";

export default function Orders({ filteredOrders, orders, orderFilter, setOrderFilter, setModal, exportCSV, upOrd }) {
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Daftar Pesanan</h2>
        <div style={{ display: "flex", gap: 8 }}>
          <button onClick={exportCSV} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "var(--text-dim)", fontFamily: "inherit" }}><Ic name="download" size={14} /> Export</button>
          <button onClick={() => setModal({ t: "addOrder" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="plus" size={14} /> Pesanan Baru</button>
        </div>
      </div>
      {/* Filter Pills */}
      <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
        {[{ k: "all", l: "Semua" }, ...Object.entries(STATUS).map(([k, v]) => ({ k, l: v.l }))].map(f => (
          <button key={f.k} onClick={() => setOrderFilter(f.k)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "1px solid", borderColor: orderFilter === f.k ? "var(--accent)" : "var(--border)", background: orderFilter === f.k ? "var(--accent)15" : "var(--card)", color: orderFilter === f.k ? "var(--accent)" : "var(--text-dim)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>
            {f.l} {f.k !== "all" && <span className="mono" style={{ marginLeft: 4, fontSize: 10 }}>({orders.filter(o => o.status === f.k).length})</span>}
          </button>
        ))}
      </div>
      <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead><tr>{["#", "Tanggal", "Pelanggan", "Produk", "Qty", "Total", "Profit", "Status", "Aksi"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 18px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
            <tbody>{filteredOrders.map(o => (
              <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="mono" style={{ padding: "12px 18px", fontSize: 12, color: "var(--text-dim)" }}>#{o.id}</td>
                <td style={{ padding: "12px 18px", fontSize: 12 }}>{fmtDate(o.date)}</td>
                <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600 }}>{o.cname}</td>
                <td style={{ padding: "12px 18px", fontSize: 12 }}>{o.pname}</td>
                <td className="mono" style={{ padding: "12px 18px", fontSize: 13, fontWeight: 500 }}>{o.qty}</td>
                <td className="mono" style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600 }}>{fmtRp(o.total)}</td>
                <td className="mono" style={{ padding: "12px 18px", fontSize: 12, fontWeight: 600, color: "#10b981" }}>+{fmtRp(o.profit)}</td>
                <td style={{ padding: "12px 18px" }}><Badge status={o.status} /></td>
                <td style={{ padding: "12px 18px" }}>
                  <div style={{ display: "flex", gap: 4 }}>
                    {o.status === "pending" && (
                      <>
                        <button onClick={() => upOrd(o.id, "confirmed")} style={{ background: "#10b98115", color: "#10b981", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="check" size={14} /></button>
                        <button onClick={() => upOrd(o.id, "cancelled")} style={{ background: "#ef444415", color: "#ef4444", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="x" size={14} /></button>
                      </>
                    )}
                    {o.status === "confirmed" && (
                      <button onClick={() => upOrd(o.id, "delivered")} style={{ background: "#6366f115", color: "#6366f1", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}><Ic name="truck" size={14} /> Kirim</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
