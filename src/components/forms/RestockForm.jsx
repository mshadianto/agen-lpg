import { useState } from "react";
import { Ic } from "../icons/IconMap";
import { FG, FI, FB } from "./FormPrimitives";

export default function RestockForm({ product, onSubmit, onClose }) {
  const [q, sq] = useState("");
  return (
    <div>
      <div style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 14 }}>
        <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Stok Saat Ini</div>
        <div className="mono" style={{ fontSize: 28, fontWeight: 800 }}>{product?.stock}</div>
      </div>
      <FG label="Jumlah Tambahan"><FI type="number" min="1" value={q} onChange={(e) => sq(e.target.value)} /></FG>
      {q > 0 && (
        <div style={{ background: "#10b98110", borderRadius: 12, padding: 14, marginBottom: 14, textAlign: "center" }}>
          <div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#10b981" }}>SETELAH RESTOCK</div>
          <div className="mono" style={{ fontSize: 28, fontWeight: 800, color: "#10b981" }}>{(product?.stock || 0) + +q}</div>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <FB onClick={onClose}>Batal</FB>
        <FB primary disabled={!q || q < 1} onClick={() => onSubmit(product.id, q)}><Ic name="check" size={14} /> Tambah</FB>
      </div>
    </div>
  );
}
