import { Ic } from "../components/icons/IconMap";
import { ScrollOverlay } from "../components/ui";
import { fmtDT } from "../utils/format";

export default function Integration({ pangkalan, activePk, consumers, orders, products, dist, payments, toast_, onClose }) {
  const SYSTEMS = [
    { id: "monica", name: "Monica LPG", url: "https://monicalpg.id", desc: "Monitoring & visit pangkalan, koordinat GPS, performa pangkalan", color: "#e11d48", status: "connected", lastSync: "2026-03-25T09:30:00",
      features: ["Visit/inspeksi pangkalan", "Update koordinat GPS pangkalan", "Monitoring stok sub penyalur", "Evaluasi performa pangkalan", "Data titik koordinat real-time"],
      dataMap: [
        { local: "Pangkalan → Direktori", remote: "Monica → Daftar Pangkalan", sync: "auto", status: "synced", count: pangkalan.length },
        { local: "Pangkalan → Koordinat", remote: "Monica → Visit Agen GPS", sync: "manual", status: "pending", count: activePk.length },
        { local: "Pangkalan → Stok 3kg", remote: "Monica → Monitoring Stok", sync: "auto", status: "synced", count: activePk.reduce((s, p) => s + p.s3, 0) },
        { local: "Pangkalan → Rating/Performa", remote: "Monica → Evaluasi Pangkalan", sync: "manual", status: "synced", count: activePk.length },
      ]
    },
    { id: "map", name: "MAP (Merchant Apps Pangkalan)", url: "https://merchant.mypertamina.id", desc: "Pencatatan distribusi real-time, registrasi sub-pangkalan, transaksi subsidi", color: "#0ea5e9", status: "connected", lastSync: "2026-03-25T08:15:00",
      features: ["Catat distribusi LPG 3kg real-time", "Registrasi sub-pangkalan baru", "Verifikasi KTP pembeli (P3KE/DTKS)", "Laporan transaksi subsidi", "Data penerima subsidi terverifikasi"],
      dataMap: [
        { local: "Konsumen Akhir → NIK/KTP", remote: "MAP → Verifikasi P3KE/DTKS", sync: "auto", status: "synced", count: consumers.length },
        { local: "Pesanan → Subsidi 3kg", remote: "MAP → Transaksi Real-time", sync: "auto", status: "synced", count: orders.filter(o => o.pid === 1).length },
        { local: "Pangkalan → Sub-pangkalan", remote: "MAP → Registrasi Merchant", sync: "manual", status: "pending", count: 0 },
        { local: "HET Compliance → Harga", remote: "MAP → Validasi HET", sync: "auto", status: "synced", count: products.length },
      ]
    },
    { id: "brimola", name: "BRIMOLA (BRI Monitoring LPG)", url: "https://brimola.bri.co.id", desc: "Pemesanan online pangkalan→agen, pembayaran VA BRI, monitoring kuota", color: "#003d79", status: "connected", lastSync: "2026-03-25T07:00:00",
      features: ["Pemesanan LPG online (pangkalan→agen)", "Pembayaran via BRI Virtual Account", "Cek kuota real-time", "Monitoring status pengiriman", "Laporan transaksi & kuota"],
      dataMap: [
        { local: "Pesanan → Order Pangkalan", remote: "BRIMOLA → Pemesanan Online", sync: "auto", status: "synced", count: orders.length },
        { local: "Stok → Kuota Tersedia", remote: "BRIMOLA → Info Kuota", sync: "auto", status: "synced", count: products.reduce((s, p) => s + p.stock, 0) },
        { local: "Payment → VA BRI", remote: "BRIMOLA → Pembayaran", sync: "auto", status: "synced", count: payments.filter(p => p.method === "va_bca").length },
        { local: "Distribusi → Status Kirim", remote: "BRIMOLA → Monitoring Transaksi", sync: "auto", status: "synced", count: dist.length },
      ]
    },
  ];
  const totalSynced = SYSTEMS.flatMap(s => s.dataMap).filter(d => d.status === "synced").length;
  const totalPending = SYSTEMS.flatMap(s => s.dataMap).filter(d => d.status === "pending").length;

  return (
    <ScrollOverlay onClose={onClose} title="" maxWidth={980}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24, marginTop: -20 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#0ea5e9,#0284c7)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 20px rgba(14,165,233,0.3)" }}><Ic name="link" size={24} /></div>
        <div><h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>Integrasi Pertamina</h3><p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>Hub sinkronisasi data dengan Monica LPG, MAP, dan BRIMOLA</p></div>
      </div>

      {/* Summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 24 }}>
        {[{ l: "Sistem Terhubung", v: SYSTEMS.length, c: "#10b981", ic: "link" }, { l: "Data Synced", v: totalSynced, c: "#0ea5e9", ic: "check" }, { l: "Pending Sync", v: totalPending, c: totalPending > 0 ? "#f59e0b" : "#10b981", ic: "clock" }, { l: "Regulasi Aktif", v: "Ditjen Migas 2025", c: "#8b5cf6", ic: "layers" }].map((s, i) => (
          <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><div style={{ width: 22, height: 22, borderRadius: 6, background: `${s.c}15`, color: s.c, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={s.ic} size={11} /></div><span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</span></div>
            <div className="mono" style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
          </div>
        ))}
      </div>

      {/* System Cards */}
      {SYSTEMS.map(sys => (
        <div key={sys.id} style={{ background: "var(--card2)", borderRadius: 16, border: `1px solid ${sys.color}25`, marginBottom: 16, overflow: "hidden" }}>
          <div style={{ position: "relative", padding: "18px 22px", borderBottom: "1px solid var(--border)" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: sys.color, opacity: 0.7 }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: `${sys.color}15`, color: sys.color, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 14 }}>{sys.name.charAt(0)}</div>
                <div><div style={{ fontSize: 16, fontWeight: 700 }}>{sys.name}</div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>{sys.desc}</div></div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: "#10b98115", color: "#10b981" }}>CONNECTED</span>
                <a href={sys.url} target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 6, background: `${sys.color}15`, color: sys.color, textDecoration: "none", cursor: "pointer" }}>Buka Portal →</a>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 10 }}>
              {sys.features.map((f, i) => <span key={i} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 5, background: "var(--card)", border: "1px solid var(--border)", color: "var(--text-dim)", fontWeight: 500 }}>{f}</span>)}
            </div>
            <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 8 }}>Sync terakhir: {fmtDT(sys.lastSync)}</div>
          </div>
          {/* Data Mapping Table */}
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead><tr>{["Data Lokal (Agen LPG)", "Data Remote", "Mode", "Status", "Records"].map(h => <th key={h} style={{ textAlign: "left", padding: "8px 16px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
              <tbody>{sys.dataMap.map((d, i) => (
                <tr key={i} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 16px", fontSize: 12, fontWeight: 600 }}>{d.local}</td>
                  <td style={{ padding: "10px 16px", fontSize: 12, color: sys.color }}>{d.remote}</td>
                  <td style={{ padding: "10px 16px" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: d.sync === "auto" ? "#10b98115" : "#f59e0b15", color: d.sync === "auto" ? "#10b981" : "#f59e0b" }}>{d.sync === "auto" ? "AUTO-SYNC" : "MANUAL"}</span></td>
                  <td style={{ padding: "10px 16px" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4, background: d.status === "synced" ? "#10b98115" : "#f59e0b15", color: d.status === "synced" ? "#10b981" : "#f59e0b" }}>{d.status === "synced" ? "SYNCED" : "PENDING"}</span></td>
                  <td className="mono" style={{ padding: "10px 16px", fontSize: 12, fontWeight: 600 }}>{d.count}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        </div>
      ))}

      {/* Sync Actions */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button onClick={() => toast_("Sinkronisasi Monica LPG berhasil! (simulasi)")} style={{ background: "#e11d4815", color: "#e11d48", border: "1px solid #e11d4830", borderRadius: 10, padding: "9px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="refresh" size={14} /> Sync Monica</button>
        <button onClick={() => toast_("Sinkronisasi MAP berhasil! (simulasi)")} style={{ background: "#0ea5e915", color: "#0ea5e9", border: "1px solid #0ea5e930", borderRadius: 10, padding: "9px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="refresh" size={14} /> Sync MAP</button>
        <button onClick={() => toast_("Sinkronisasi BRIMOLA berhasil! (simulasi)")} style={{ background: "#003d7915", color: "#003d79", border: "1px solid #003d7930", borderRadius: 10, padding: "9px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="refresh" size={14} /> Sync BRIMOLA</button>
        <button onClick={() => toast_("Semua sistem berhasil disinkronisasi! (simulasi)")} style={{ background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", border: "none", borderRadius: 10, padding: "9px 18px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, marginLeft: "auto" }}><Ic name="check" size={14} /> Sync Semua</button>
      </div>

      {/* Regulation Notice */}
      <div style={{ marginTop: 20, background: "#f59e0b10", border: "1px solid #f59e0b30", borderRadius: 12, padding: 16, display: "flex", gap: 12, alignItems: "flex-start" }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "#f59e0b15", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic name="alert" size={16} /></div>
        <div><div style={{ fontSize: 13, fontWeight: 700, marginBottom: 4 }}>Kewajiban Agen LPG Samarinda (Regional Kalimantan)</div>
          <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.7 }}>
            Berdasarkan Surat Ditjen Migas No. B-570/MG.05/DJM/2025, agen wajib:<br/>
            1. Menyalurkan 100% LPG 3 kg hanya ke pengguna langsung terdaftar (RT miskin, usaha mikro, petani, nelayan)<br/>
            2. Update koordinat GPS pangkalan via fitur Visit Agen di <strong>Monica LPG</strong><br/>
            3. Monitoring stok tabung 3 kg di semua pangkalan via <strong>Monica LPG</strong><br/>
            4. Inspeksi rutin pangkalan via <strong>Monica</strong> untuk evaluasi performa<br/>
            5. Pencatatan distribusi real-time via <strong>MAP (Merchant Apps Pangkalan)</strong>
          </div>
        </div>
      </div>
    </ScrollOverlay>
  );
}
