import { useState } from "react";
import { Ic } from "../icons/IconMap";
import { fmtRp, fmtDT } from "../../utils/format";
import { FG, FI, FB } from "./FormPrimitives";

export default function PayLinkGen({ providers, toast_ }) {
  const [f, sf] = useState({ customer: "", amount: "", method: "", desc: "" });
  const [generated, setGenerated] = useState(null);
  const sel = providers.find((p) => p.id === f.method);
  const fee = sel ? (sel.feeType === "flat" ? sel.fee || 0 : Math.round(+f.amount * (sel.fee || 0) / 100)) : 0;
  const net = (+f.amount || 0) - fee;
  const generate = () => {
    if (!f.customer || !f.amount || !f.method) return;
    const id = `PL-${Date.now().toString(36).toUpperCase()}`;
    const link = `https://pay.agenlpg.id/${id}`;
    setGenerated({ id, link, customer: f.customer, amount: +f.amount, method: sel?.name, fee, net, created: new Date().toISOString(), expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() });
    toast_("Payment link berhasil dibuat!");
  };
  return (
    <div>
      {!generated ? (
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <FG label="Nama Customer"><FI value={f.customer} onChange={(e) => sf({ ...f, customer: e.target.value })} placeholder="Nama pelanggan" /></FG>
            <FG label="Jumlah (Rp)"><FI type="number" value={f.amount} onChange={(e) => sf({ ...f, amount: e.target.value })} placeholder="0" /></FG>
          </div>
          <FG label="Metode Pembayaran">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8 }}>
              {providers.map((p) => (
                <div key={p.id} onClick={() => sf({ ...f, method: p.id })} style={{ background: f.method === p.id ? `${p.color}15` : "var(--card)", border: `2px solid ${f.method === p.id ? p.color : "var(--border)"}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${p.color}20`, color: p.color, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}><Ic name={p.logo} size={14} /></div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: f.method === p.id ? p.color : "var(--text)" }}>{p.name}</div>
                  <div style={{ fontSize: 9, color: "var(--text-dim)", marginTop: 2 }}>{p.feeType === "flat" ? fmtRp(p.fee) : p.fee === 0 ? "Gratis" : `${p.fee}%`}</div>
                </div>
              ))}
            </div>
          </FG>
          <FG label="Deskripsi (opsional)"><FI value={f.desc} onChange={(e) => sf({ ...f, desc: e.target.value })} placeholder="Pembayaran LPG 3 kg x 5 tabung" /></FG>
          {+f.amount > 0 && sel && (
            <div style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "var(--text-dim)" }}>Subtotal</span><span className="mono" style={{ fontWeight: 600 }}>{fmtRp(+f.amount)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#f59e0b" }}>Fee {sel.name} ({sel.feeType === "flat" ? "flat" : `${sel.fee}%`})</span><span className="mono" style={{ fontWeight: 600, color: "#f59e0b" }}>-{fmtRp(fee)}</span></div>
              <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 8, display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 14, fontWeight: 700 }}>Net Diterima</span><span className="mono" style={{ fontSize: 18, fontWeight: 800, color: "#10b981" }}>{fmtRp(net)}</span></div>
            </div>
          )}
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <FB primary disabled={!f.customer || !f.amount || !f.method} onClick={generate} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}>
              <Ic name="link" size={14} /> Generate Payment Link
            </FB>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: "center" }}>
          <div style={{ width: 64, height: 64, borderRadius: 20, background: "#10b98115", color: "#10b981", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Ic name="check" size={32} /></div>
          <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Payment Link Dibuat!</h4>
          <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 20 }}>Kirim link ini ke pelanggan untuk melakukan pembayaran</p>
          <div style={{ background: "var(--card2)", borderRadius: 14, padding: 20, marginBottom: 20, textAlign: "left" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
              {[{ l: "Customer", v: generated.customer }, { l: "Metode", v: generated.method }, { l: "Amount", v: fmtRp(generated.amount), c: "#6366f1", mono: true }, { l: "Net Diterima", v: fmtRp(generated.net), c: "#10b981", mono: true }].map((x, i) => (
                <div key={i}>
                  <div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{x.l}</div>
                  <div className={x.mono ? "mono" : ""} style={{ fontSize: x.mono ? 18 : 14, fontWeight: x.mono ? 800 : 600, color: x.c || "var(--text)", marginTop: 2 }}>{x.v}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--card)", borderRadius: 10, padding: "12px 16px", border: "2px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
              <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: "#6366f1", wordBreak: "break-all" }}>{generated.link}</span>
              <button onClick={() => { navigator.clipboard?.writeText(generated.link).catch(() => {}); toast_("Link disalin!"); }} style={{ background: "#6366f115", color: "#6366f1", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Copy</button>
            </div>
            <div style={{ fontSize: 10, color: "var(--text-dim)" }}>ID: {generated.id} • Dibuat: {fmtDT(generated.created)} • Expired: {fmtDT(generated.expires)}</div>
          </div>
          <button onClick={() => { setGenerated(null); sf({ customer: "", amount: "", method: "", desc: "" }); }} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "9px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "var(--text-dim)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Ic name="plus" size={14} /> Buat Link Baru
          </button>
        </div>
      )}
    </div>
  );
}
