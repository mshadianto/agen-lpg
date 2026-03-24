import { useState } from "react";
import { Ic } from "../icons/IconMap";
import { fmtRp, pct } from "../../utils/format";
import { FG, FI, FS, FB } from "./FormPrimitives";

export default function DistForm({ pks, products, pre, onSubmit, onClose }) {
  const [f, sf] = useState({ pkid: pre || "", q3: "", q5: "", q12: "", note: "" });
  const p3 = products.find((p) => p.id === 1),
    p5 = products.find((p) => p.id === 2),
    p12 = products.find((p) => p.id === 3);
  const tot = (+f.q3 || 0) + (+f.q5 || 0) + (+f.q12 || 0);
  const tv = (+f.q3 || 0) * (p3?.cost || 0) + (+f.q5 || 0) * (p5?.cost || 0) + (+f.q12 || 0) * (p12?.cost || 0);
  const pk = pks.find((p) => p.id === +f.pkid);
  return (
    <div>
      <FG label="Pangkalan">
        <FS value={f.pkid} onChange={(e) => sf({ ...f, pkid: e.target.value })}>
          <option value="">-- Pilih --</option>
          {pks.map((p) => <option key={p.id} value={p.id}>{p.name} — {p.owner}</option>)}
        </FS>
      </FG>
      {pk && (
        <div style={{ background: "#3b82f610", border: "1px solid #3b82f630", borderRadius: 12, padding: 12, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6" }}>Kuota: {pk.qu}/{pk.qm}</div>
          <span className="mono" style={{ fontSize: 16, fontWeight: 800, color: pk.qu >= pk.qm ? "#ef4444" : "#3b82f6" }}>{pct(pk.qu, pk.qm)}%</span>
        </div>
      )}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
        <FG label={`3 kg (stok: ${p3?.stock || 0})`}><FI type="number" min="0" value={f.q3} onChange={(e) => sf({ ...f, q3: e.target.value })} /></FG>
        <FG label={`5.5 kg (stok: ${p5?.stock || 0})`}><FI type="number" min="0" value={f.q5} onChange={(e) => sf({ ...f, q5: e.target.value })} /></FG>
        <FG label={`12 kg (stok: ${p12?.stock || 0})`}><FI type="number" min="0" value={f.q12} onChange={(e) => sf({ ...f, q12: e.target.value })} /></FG>
      </div>
      {tot > 0 && (
        <div style={{ background: "var(--card2)", borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Total</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>{tot} tabung</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Estimasi</div>
            <div className="mono" style={{ fontSize: 16, fontWeight: 700, color: "#6366f1" }}>{fmtRp(tv)}</div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <FB onClick={onClose}>Batal</FB>
        <FB primary disabled={!f.pkid || tot === 0} onClick={() => onSubmit(f)} style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}>
          <Ic name="send" size={14} /> Distribusikan
        </FB>
      </div>
    </div>
  );
}
