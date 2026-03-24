import { Ic } from "../icons/IconMap";
import { Badge } from "../ui";
import { DSTATUS } from "../../constants/status";
import { fmtDate, fmtDT } from "../../utils/format";

export default function DetailPanel({ detailPk, dist, onClose }) {
  if (!detailPk) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "flex-end", animation: "fadeIn .2s" }} onClick={onClose}>
      <div style={{ width: 500, maxWidth: "100%", background: "var(--card)", height: "100%", overflowY: "auto", boxShadow: "-8px 0 50px rgba(0,0,0,0.2)", animation: "slideLeft .3s cubic-bezier(.4,0,.2,1)", borderLeft: "1px solid var(--border)" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h3 style={{ fontSize: 17, fontWeight: 800 }}>Detail Pangkalan</h3>
          <button onClick={onClose} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18} /></button>
        </div>
        <div style={{ padding: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 20 }}>{detailPk.owner.charAt(0)}</div>
            <div><div style={{ fontSize: 17, fontWeight: 700 }}>{detailPk.name}</div><div style={{ fontSize: 13, color: "var(--text-dim)" }}>{detailPk.owner}</div></div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
            {[{ l: "Telepon", v: detailPk.phone }, { l: "Kecamatan", v: detailPk.kec }, { l: "Kelurahan", v: detailPk.kel }, { l: "Bergabung", v: fmtDate(detailPk.join) }].map((x, i) => (
              <div key={i} style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}>
                <div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", letterSpacing: ".06em" }}>{x.l}</div>
                <div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{x.v}</div>
              </div>
            ))}
          </div>
          <div style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", marginBottom: 12 }}>STOK DI PANGKALAN</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
              {[{ l: "3 kg", v: detailPk.s3, c: "#f97316" }, { l: "5.5 kg", v: detailPk.s5, c: "#6366f1" }, { l: "12 kg", v: detailPk.s12, c: "#10b981" }].map((s, i) => (
                <div key={i} style={{ textAlign: "center" }}><div className="mono" style={{ fontSize: 26, fontWeight: 800, color: s.c }}>{s.v}</div><div style={{ fontSize: 10, color: "var(--text-dim)", fontWeight: 600 }}>{s.l}</div></div>
              ))}
            </div>
          </div>
          <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", marginBottom: 10 }}>RIWAYAT DISTRIBUSI</div>
          {dist.filter((d) => d.pkid === detailPk.id).slice(0, 8).map((d) => (
            <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{d.q3 > 0 ? `${d.q3}×3kg ` : ""}{d.q5 > 0 ? `${d.q5}×5.5kg ` : ""}{d.q12 > 0 ? `${d.q12}×12kg` : ""}</div>
                <div style={{ fontSize: 10, color: "var(--text-dim)" }}>{fmtDT(d.date)}</div>
              </div>
              <Badge status={d.status} map={DSTATUS} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
