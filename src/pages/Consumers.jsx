import { PageOverlay } from "../components/ui";
import { fmtDate } from "../utils/format";

export default function Consumers({ consumers, onClose }) {
  return (
    <PageOverlay onClose={onClose} title="Data Konsumen Akhir (Subsidi)" maxWidth={800}>
      <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 16 }}>Pendataan penerima LPG 3 kg bersubsidi sesuai regulasi BPH Migas</p>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>{["NIK", "Nama", "Alamat", "Telepon", "Tipe", "Pembelian", "Terakhir"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {consumers.map((c) => (
              <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td className="mono" style={{ padding: "10px 14px", fontSize: 12 }}>{c.nik}</td>
                <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 13 }}>{c.name}</td>
                <td style={{ padding: "10px 14px", fontSize: 12 }}>{c.addr}</td>
                <td className="mono" style={{ padding: "10px 14px", fontSize: 12 }}>{c.phone}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: c.type === "subsidi" ? "#10b98115" : "#6366f115", color: c.type === "subsidi" ? "#10b981" : "#6366f1" }}>
                    {c.type === "subsidi" ? "SUBSIDI" : "NON-SUBSIDI"}
                  </span>
                </td>
                <td className="mono" style={{ padding: "10px 14px", fontWeight: 600 }}>{c.purchases}×</td>
                <td style={{ padding: "10px 14px", fontSize: 12 }}>{fmtDate(c.lastPurchase)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageOverlay>
  );
}
