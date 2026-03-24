import { useState } from "react";
import { Ic } from "../icons/IconMap";
import { FG, FI, FS, FB } from "./FormPrimitives";

export default function CustForm({ onSubmit, onClose }) {
  const [f, sf] = useState({ name: "", phone: "", addr: "", type: "rumah_tangga" });
  return (
    <div>
      <FG label="Nama"><FI value={f.name} onChange={(e) => sf({ ...f, name: e.target.value })} /></FG>
      <FG label="Telepon"><FI value={f.phone} onChange={(e) => sf({ ...f, phone: e.target.value })} placeholder="0812-xxxx-xxxx" /></FG>
      <FG label="Alamat"><FI value={f.addr} onChange={(e) => sf({ ...f, addr: e.target.value })} /></FG>
      <FG label="Tipe">
        <FS value={f.type} onChange={(e) => sf({ ...f, type: e.target.value })}>
          <option value="rumah_tangga">Rumah Tangga</option>
          <option value="usaha_mikro">Usaha Mikro</option>
        </FS>
      </FG>
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
        <FB onClick={onClose}>Batal</FB>
        <FB primary disabled={!f.name} onClick={() => onSubmit(f)}><Ic name="check" size={14} /> Simpan</FB>
      </div>
    </div>
  );
}
