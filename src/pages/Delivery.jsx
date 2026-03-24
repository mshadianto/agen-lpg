import { Ic } from "../components/icons/IconMap";
import { Badge } from "../components/ui";
import { fmtRp } from "../utils/format";

export default function Delivery({ orders, customers, upOrd }) {
  const confirmed = orders.filter((o) => o.status === "confirmed");
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Pengiriman</h2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
        {confirmed.length === 0 && (
          <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 40, textAlign: "center", gridColumn: "1/-1" }}>
            <div style={{ color: "var(--text-dim)", marginBottom: 8 }}><Ic name="truck" size={32} /></div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dim)" }}>Tidak ada pengiriman menunggu</div>
          </div>
        )}
        {confirmed.map((o) => (
          <div key={o.id} style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 18, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#6366f1", opacity: 0.5 }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
              <div>
                <div className="mono" style={{ fontSize: 11, color: "#6366f1", fontWeight: 700 }}>PESANAN #{o.id}</div>
                <div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{o.cname}</div>
              </div>
              <Badge status={o.status} />
            </div>
            <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>{o.pname} × {o.qty} tabung</div>
            <div className="mono" style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{fmtRp(o.total)}</div>
            <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 14, display: "flex", alignItems: "center", gap: 4 }}>
              <Ic name="pin" size={12} /> {customers.find((c) => c.id === o.cid)?.addr || "-"}
            </div>
            <button onClick={() => upOrd(o.id, "delivered")} style={{ width: "100%", background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", border: "none", borderRadius: 10, padding: "9px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
              <Ic name="check" size={14} /> Tandai Terkirim
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
