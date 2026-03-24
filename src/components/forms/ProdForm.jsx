import { useState } from "react";
import { Ic } from "../icons/IconMap";
import { HET_CONFIG } from "../../constants/het";
import { fmtRp } from "../../utils/format";
import { FG, FI, FS, FB } from "./FormPrimitives";

export default function ProdForm({ onSubmit, onClose }) {
  const [f, sf] = useState({ name: "", price: "", cost: "", stock: "", min: "", type: "nonsubsidi" });
  const matchedHet = f.price
    ? HET_CONFIG.rates.find((r) => f.name && f.name.toLowerCase().includes(r.name.match(/\d+/)?.[0])) || (f.type === "subsidi" ? HET_CONFIG.rates[0] : null)
    : null;
  const hetExceeded = matchedHet && +f.price > matchedHet.het;
  return (
    <div>
      <FG label="Nama"><FI value={f.name} onChange={(e) => sf({ ...f, name: e.target.value })} placeholder="LPG 3 kg Melon" /></FG>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FG label="Harga Jual">
          <FI type="number" value={f.price} onChange={(e) => sf({ ...f, price: e.target.value })} style={hetExceeded ? { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.15)" } : {}} />
          {matchedHet && (
            <div style={{ marginTop: 4, fontSize: 10, color: hetExceeded ? "#ef4444" : "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
              {hetExceeded ? "🚩" : "✓"} HET: {fmtRp(matchedHet.het)}{" "}
              {hetExceeded && `— melebihi +${fmtRp(+f.price - matchedHet.het)} (${Math.round(((+f.price - matchedHet.het) / matchedHet.het) * 100)}%)`}
            </div>
          )}
        </FG>
        <FG label="Harga Beli"><FI type="number" value={f.cost} onChange={(e) => sf({ ...f, cost: e.target.value })} /></FG>
        <FG label="Stok"><FI type="number" value={f.stock} onChange={(e) => sf({ ...f, stock: e.target.value })} /></FG>
        <FG label="Min Stok"><FI type="number" value={f.min} onChange={(e) => sf({ ...f, min: e.target.value })} /></FG>
      </div>
      <FG label="Tipe">
        <FS value={f.type} onChange={(e) => sf({ ...f, type: e.target.value })}>
          <option value="subsidi">Subsidi</option>
          <option value="nonsubsidi">Non-Subsidi</option>
        </FS>
      </FG>
      {hetExceeded && (
        <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 12, marginBottom: 14, display: "flex", gap: 10, alignItems: "flex-start" }}>
          <span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626" }}>Harga melebihi HET Pemda!</div>
            <div style={{ fontSize: 11, color: "#7f1d1d", marginTop: 2 }}>Produk akan tetap disimpan namun akan dicatat di Audit Trail HET Compliance sebagai pelanggaran. Dasar: {matchedHet.note}</div>
          </div>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <FB onClick={onClose}>Batal</FB>
        <FB primary disabled={!f.name || !f.price} onClick={() => onSubmit(f)} style={hetExceeded ? { background: "linear-gradient(135deg,#ef4444,#dc2626)" } : {}}>
          <Ic name="check" size={14} /> {hetExceeded ? "Simpan + Flag HET" : "Simpan"}
        </FB>
      </div>
    </div>
  );
}
