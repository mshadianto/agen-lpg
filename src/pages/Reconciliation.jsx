import { PageOverlay, StatCard } from "../components/ui";
import { fmtDate } from "../utils/format";

export default function Reconciliation({ recon, onClose }) {
  return (
    <PageOverlay onClose={onClose} title="Rekonsiliasi Tabung" maxWidth={950}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
        {[
          { l: "Total Dikirim", v: recon.reduce((s, r) => s + r.sent, 0), c: "#f97316" },
          { l: "Terkirim", v: recon.reduce((s, r) => s + r.delivered, 0), c: "#10b981" },
          { l: "Kosong Terkumpul", v: recon.reduce((s, r) => s + r.emptyCollected, 0), c: "#8b5cf6" },
          { l: "Selisih", v: recon.reduce((s, r) => s + r.diff, 0), c: recon.reduce((s, r) => s + r.diff, 0) > 0 ? "#ef4444" : "#10b981" },
        ].map((s, i) => <StatCard key={i} label={s.l} value={s.v} color={s.c} />)}
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead><tr>{["Tanggal", "Driver", "Dikirim", "Terkirim", "Retur", "Kosong↑", "Kosong↓", "Selisih", "Status"].map((h) => <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
          <tbody>
            {recon.map((r) => (
              <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }}>
                <td style={{ padding: "10px 14px", fontSize: 12 }}>{fmtDate(r.date)}</td>
                <td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 13 }}>{r.driver}</td>
                <td className="mono" style={{ padding: "10px 14px" }}>{r.sent}</td>
                <td className="mono" style={{ padding: "10px 14px" }}>{r.delivered}</td>
                <td className="mono" style={{ padding: "10px 14px" }}>{r.returned}</td>
                <td className="mono" style={{ padding: "10px 14px" }}>{r.emptyCollected}</td>
                <td className="mono" style={{ padding: "10px 14px" }}>{r.emptyReturned}</td>
                <td className="mono" style={{ padding: "10px 14px", fontWeight: 700, color: r.diff > 0 ? "#ef4444" : "#10b981" }}>{r.diff > 0 ? `+${r.diff}` : r.diff}</td>
                <td style={{ padding: "10px 14px" }}>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: r.status === "verified" ? "#10b98115" : r.status === "discrepancy" ? "#ef444415" : "#f59e0b15", color: r.status === "verified" ? "#10b981" : r.status === "discrepancy" ? "#ef4444" : "#f59e0b" }}>
                    {r.status === "verified" ? "Terverifikasi" : r.status === "discrepancy" ? "Selisih!" : "Menunggu"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </PageOverlay>
  );
}
