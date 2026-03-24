import { useState } from "react";
import { Ic } from "../icons/IconMap";
import { FG, FI, FB } from "./FormPrimitives";

export default function PkForm({ onSubmit, onClose }) {
  const [f, sf] = useState({ name: "", owner: "", phone: "", addr: "", kel: "", kec: "", qm: "" });
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FG label="Nama Pangkalan"><FI value={f.name} onChange={(e) => sf({ ...f, name: e.target.value })} /></FG>
        <FG label="Pemilik"><FI value={f.owner} onChange={(e) => sf({ ...f, owner: e.target.value })} /></FG>
        <FG label="Telepon"><FI value={f.phone} onChange={(e) => sf({ ...f, phone: e.target.value })} /></FG>
        <FG label="Kuota Bulanan (3 kg)"><FI type="number" value={f.qm} onChange={(e) => sf({ ...f, qm: e.target.value })} /></FG>
        <FG label="Kelurahan"><FI value={f.kel} onChange={(e) => sf({ ...f, kel: e.target.value })} /></FG>
        <FG label="Kecamatan"><FI value={f.kec} onChange={(e) => sf({ ...f, kec: e.target.value })} /></FG>
      </div>
      <FG label="Alamat"><FI value={f.addr} onChange={(e) => sf({ ...f, addr: e.target.value })} /></FG>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <FB onClick={onClose}>Batal</FB>
        <FB primary disabled={!f.name || !f.owner} onClick={() => onSubmit(f)}><Ic name="check" size={14} /> Simpan</FB>
      </div>
    </div>
  );
}
