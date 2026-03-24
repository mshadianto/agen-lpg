import { useState } from "react";
import { Ic } from "../icons/IconMap";
import { fmtRp } from "../../utils/format";
import { FG, FS, FI, FB } from "./FormPrimitives";

export default function OrderForm({ products, customers, onSubmit, onClose }) {
  const [f, sf] = useState({ customerId: "", productId: "", qty: 1, note: "" });
  const p = products.find((x) => x.id === +f.productId);
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FG label="Pelanggan">
          <FS value={f.customerId} onChange={(e) => sf({ ...f, customerId: e.target.value })}>
            <option value="">-- Pilih --</option>
            {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </FS>
        </FG>
        <FG label="Produk">
          <FS value={f.productId} onChange={(e) => sf({ ...f, productId: e.target.value })}>
            <option value="">-- Pilih --</option>
            {products.map((p) => <option key={p.id} value={p.id}>{p.name} (stok:{p.stock})</option>)}
          </FS>
        </FG>
      </div>
      <FG label="Jumlah"><FI type="number" min="1" value={f.qty} onChange={(e) => sf({ ...f, qty: e.target.value })} /></FG>
      {p && (
        <div style={{ background: "var(--card2)", borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 13, color: "var(--text-dim)" }}>Total</span>
          <span className="mono" style={{ fontSize: 18, fontWeight: 800, color: "#f97316" }}>{fmtRp(p.price * +f.qty)}</span>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <FB onClick={onClose}>Batal</FB>
        <FB primary disabled={!f.customerId || !f.productId} onClick={() => onSubmit(f)}><Ic name="check" size={14} /> Buat</FB>
      </div>
    </div>
  );
}
