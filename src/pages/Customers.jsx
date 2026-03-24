import { Ic } from "../components/icons/IconMap";

export default function Customers({ customers, search, setModal }) {
  return (
    <div style={{ animation: "fadeIn .3s" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Data Pelanggan</h2>
        <button onClick={() => setModal({ t: "addCust" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}>
          <Ic name="plus" size={14} /> Tambah
        </button>
      </div>
      <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {["Nama", "Telepon", "Alamat", "Tipe", "Orders"].map((h) => (
                  <th key={h} style={{ textAlign: "left", padding: "10px 18px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {customers
                .filter((c) => !search || c.name.toLowerCase().includes(search.toLowerCase()))
                .map((c) => (
                  <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600 }}>{c.name}</td>
                    <td className="mono" style={{ padding: "12px 18px", fontSize: 12 }}>{c.phone}</td>
                    <td style={{ padding: "12px 18px", fontSize: 12, maxWidth: 200 }}>{c.addr}</td>
                    <td style={{ padding: "12px 18px" }}>
                      <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: c.type === "rumah_tangga" ? "#3b82f615" : "#8b5cf615", color: c.type === "rumah_tangga" ? "#3b82f6" : "#8b5cf6" }}>
                        {c.type === "rumah_tangga" ? "Rumah Tangga" : "Usaha Mikro"}
                      </span>
                    </td>
                    <td className="mono" style={{ padding: "12px 18px", fontWeight: 700 }}>{c.orders}×</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
