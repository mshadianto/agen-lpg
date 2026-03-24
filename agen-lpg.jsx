import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ─── ICON SYSTEM ───
const I = {
  flame: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/></svg>,
  pkg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16.5 9.4-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  cart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>,
  bar: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 13.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/></svg>,
  plus: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  search: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  check: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
  alert: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>,
  wallet: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><path d="M16 14h.01"/></svg>,
  menu: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
  store: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  send: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  phone: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
  star: <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  eye: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>,
  bell: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  moon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  sun: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
  download: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>,
  filter: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  trend: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  refresh: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>,
  target: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  grid: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  brain: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44A2.5 2.5 0 0 1 4.5 17.5a2.5 2.5 0 0 1-.44-4.96A2.5 2.5 0 0 1 6.5 10a2.5 2.5 0 0 1-1.54-4.46A2.5 2.5 0 0 1 9.5 2z"/><path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44A2.5 2.5 0 0 0 19.5 17.5a2.5 2.5 0 0 0 .44-4.96A2.5 2.5 0 0 0 17.5 10a2.5 2.5 0 0 0 1.54-4.46A2.5 2.5 0 0 0 14.5 2z"/></svg>,
  activity: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>,
  pie: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.21 15.89A10 10 0 1 1 8 2.83"/><path d="M22 12A10 10 0 0 0 12 2v10z"/></svg>,
  layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
  gauge: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a10 10 0 1 0 0 20 10 10 0 1 0 0-20z"/><path d="M12 6v6l4 2"/></svg>,
  cc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>,
  qr: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="8" height="8" rx="1"/><rect x="14" y="2" width="8" height="8" rx="1"/><rect x="2" y="14" width="8" height="8" rx="1"/><rect x="14" y="14" width="4" height="4"/><line x1="22" y1="14" x2="22" y2="22"/><line x1="14" y1="22" x2="22" y2="22"/></svg>,
  link: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
};

const Ic = ({ name, size = 20 }) => <span style={{ width: size, height: size, display: "inline-flex", flexShrink: 0 }}>{I[name]}</span>;

// ─── UTILS ───
const fmt = n => new Intl.NumberFormat("id-ID").format(n);
const fmtRp = n => `Rp ${fmt(n)}`;
const fmtDate = d => new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
const fmtTime = d => new Date(d).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
const fmtDT = d => `${fmtDate(d)} ${fmtTime(d)}`;
const pct = (a, b) => b > 0 ? Math.round((a / b) * 100) : 0;
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

// ─── DATA ───
const PRODUCTS = [
  { id: 1, name: "LPG 3 kg (Melon)", short: "3 kg", price: 18000, cost: 14250, stock: 485, min: 100, type: "subsidi" },
  { id: 2, name: "LPG 5.5 kg (Bright Gas)", short: "5.5 kg", price: 66000, cost: 58000, stock: 120, min: 30, type: "nonsubsidi" },
  { id: 3, name: "LPG 12 kg", short: "12 kg", price: 152000, cost: 133000, stock: 87, min: 25, type: "nonsubsidi" },
  { id: 4, name: "LPG 50 kg", short: "50 kg", price: 560000, cost: 495000, stock: 12, min: 5, type: "nonsubsidi" },
];

const CUSTOMERS = [
  { id: 1, name: "Ibu Siti Aminah", phone: "0812-3456-7890", addr: "Jl. Merpati No. 12, RT 03/RW 05", type: "rumah_tangga", orders: 24 },
  { id: 2, name: "Warung Makan Barokah", phone: "0857-1234-5678", addr: "Jl. Pahlawan No. 45", type: "usaha_mikro", orders: 48 },
  { id: 3, name: "Bp. Ahmad Fauzi", phone: "0878-9012-3456", addr: "Jl. Kenanga No. 7, RT 01/RW 02", type: "rumah_tangga", orders: 12 },
  { id: 4, name: "RM Padang Sederhana", phone: "0813-5678-9012", addr: "Jl. Sudirman No. 88", type: "usaha_mikro", orders: 96 },
  { id: 5, name: "Ibu Dewi Lestari", phone: "0856-7890-1234", addr: "Jl. Anggrek No. 3, RT 05/RW 01", type: "rumah_tangga", orders: 36 },
  { id: 6, name: "Katering Berkah", phone: "0821-4455-6677", addr: "Jl. Dahlia No. 18", type: "usaha_mikro", orders: 72 },
];

const PANGKALAN_DATA = [
  { id: 1, name: "Pangkalan Hj. Rina", owner: "Hj. Rina Marlina", phone: "0812-8800-1122", addr: "Jl. Raya Cibubur No. 15", kel: "Cibubur", kec: "Ciracas", status: "active", rating: 4.8, join: "2022-03-15", qm: 200, qu: 156, s3: 45, s5: 8, s12: 3, td: 1840, ld: "2026-03-22T10:30:00" },
  { id: 2, name: "Pangkalan Pak Darmawan", owner: "Darmawan Susilo", phone: "0857-7766-3344", addr: "Jl. Mawar No. 33, RT 02/RW 08", kel: "Cipayung", kec: "Cipayung", status: "active", rating: 4.5, join: "2021-08-10", qm: 150, qu: 132, s3: 22, s5: 5, s12: 0, td: 2350, ld: "2026-03-21T14:00:00" },
  { id: 3, name: "Pangkalan Bu Sari", owner: "Sari Wulandari", phone: "0878-5544-6677", addr: "Jl. Flamboyan No. 8, Pondok Ranggon", kel: "Pondok Ranggon", kec: "Cipayung", status: "active", rating: 4.9, join: "2020-11-20", qm: 250, qu: 210, s3: 68, s5: 12, s12: 5, td: 4120, ld: "2026-03-23T08:15:00" },
  { id: 4, name: "Pangkalan Mitra Gas", owner: "H. Bambang Prayitno", phone: "0813-1122-9988", addr: "Jl. Raya Bogor Km 28, Pekayon", kel: "Pekayon", kec: "Pasar Rebo", status: "active", rating: 4.2, join: "2023-01-05", qm: 180, qu: 98, s3: 15, s5: 2, s12: 1, td: 890, ld: "2026-03-20T16:45:00" },
  { id: 5, name: "Pangkalan Berkah Jaya", owner: "Yusuf Hakim", phone: "0856-3322-7788", addr: "Jl. Nangka No. 12, Cilangkap", kel: "Cilangkap", kec: "Cipayung", status: "suspended", rating: 3.5, join: "2023-06-18", qm: 100, qu: 0, s3: 0, s5: 0, s12: 0, td: 420, ld: "2026-02-10T09:00:00" },
  { id: 6, name: "Pangkalan Sejahtera", owner: "Ibu Nurhayati", phone: "0817-6655-4433", addr: "Jl. Rambutan No. 5, Ceger", kel: "Ceger", kec: "Cipayung", status: "active", rating: 4.6, join: "2021-04-12", qm: 175, qu: 145, s3: 38, s5: 6, s12: 2, td: 2980, ld: "2026-03-23T11:00:00" },
];

const STATUS = { pending: { l: "Menunggu", c: "#f59e0b", bg: "#fef3c7" }, confirmed: { l: "Dikonfirmasi", c: "#3b82f6", bg: "#dbeafe" }, delivered: { l: "Terkirim", c: "#10b981", bg: "#d1fae5" }, cancelled: { l: "Dibatalkan", c: "#ef4444", bg: "#fee2e2" } };
const DSTATUS = { pending: { l: "Menunggu", c: "#f59e0b", bg: "#fef3c7" }, dispatched: { l: "Dikirim", c: "#3b82f6", bg: "#dbeafe" }, received: { l: "Diterima", c: "#10b981", bg: "#d1fae5" }, cancelled: { l: "Dibatalkan", c: "#ef4444", bg: "#fee2e2" } };
const PSTATUS = { active: { l: "Aktif", c: "#10b981", bg: "#d1fae5" }, suspended: { l: "Ditangguhkan", c: "#ef4444", bg: "#fee2e2" } };

const genOrders = () => {
  const arr = []; const sts = ["pending","confirmed","delivered","delivered","delivered","delivered"];
  for (let i = 1; i <= 30; i++) { const c = CUSTOMERS[~~(Math.random()*CUSTOMERS.length)]; const p = PRODUCTS[~~(Math.random()*PRODUCTS.length)]; const q = p.type==="subsidi"?~~(Math.random()*5)+1:~~(Math.random()*3)+1; const s=sts[~~(Math.random()*sts.length)]; const d=new Date();d.setDate(d.getDate()-~~(Math.random()*45)); arr.push({id:i,cid:c.id,cname:c.name,pid:p.id,pname:p.name,qty:q,price:p.price,total:p.price*q,profit:(p.price-p.cost)*q,status:s,date:d.toISOString(),note:""}); }
  return arr.sort((a,b)=>new Date(b.date)-new Date(a.date));
};

const genDist = () => {
  const arr = []; const sts=["received","received","received","dispatched","pending"]; const pks=PANGKALAN_DATA.filter(p=>p.status==="active");
  for (let i=1;i<=25;i++){const pk=pks[~~(Math.random()*pks.length)];const q3=~~(Math.random()*40)+10;const q5=~~(Math.random()*8);const q12=~~(Math.random()*4);const s=sts[~~(Math.random()*sts.length)];const d=new Date();d.setDate(d.getDate()-~~(Math.random()*45));arr.push({id:i,pkid:pk.id,pkname:pk.name,owner:pk.owner,q3,q5,q12,total:q3+q5+q12,val:q3*14250+q5*58000+q12*133000,status:s,date:d.toISOString(),note:""});}
  return arr.sort((a,b)=>new Date(b.date)-new Date(a.date));
};

const genNotifications = () => [
  { id: 1, type: "warning", msg: "Stok LPG 3 kg mendekati batas minimum", time: "5 menit lalu", read: false },
  { id: 2, type: "success", msg: "Distribusi ke Pangkalan Bu Sari diterima", time: "1 jam lalu", read: false },
  { id: 3, type: "info", msg: "3 pesanan baru menunggu konfirmasi", time: "2 jam lalu", read: true },
  { id: 4, type: "warning", msg: "Pangkalan Berkah Jaya ditangguhkan", time: "1 hari lalu", read: true },
  { id: 5, type: "success", msg: "Laporan keuangan Maret siap diunduh", time: "2 hari lalu", read: true },
];

// ─── ROLE-SPECIFIC DATA ───
const ROLES = {
  pangkalan: { label: "Pangkalan", desc: "Stok toko & input data konsumen akhir", color: "#f97316", icon: "store", gradient: "linear-gradient(135deg,#f97316,#ea580c)" },
  driver: { label: "Driver", desc: "Logistik, rute, rekonsiliasi tabung kosong", color: "#3b82f6", icon: "truck", gradient: "linear-gradient(135deg,#3b82f6,#2563eb)" },
  sales: { label: "Sales", desc: "Akuisisi mitra baru & monitoring pasar", color: "#8b5cf6", icon: "target", gradient: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
  owner: { label: "Owner", desc: "Laporan laba rugi & kepatuhan regulasi", color: "#10b981", icon: "layers", gradient: "linear-gradient(135deg,#10b981,#059669)" },
};

const DRIVER_ROUTES = [
  { id: 1, name: "Rute Cibubur-Ciracas", stops: ["Pangkalan Hj. Rina", "Toko Maju Jaya", "RM Padang Sederhana"], dist: 12.5, est: "45 min", status: "active", driver: "Pak Joko", vehicle: "B 1234 CD", loaded: 85, empty: 12 },
  { id: 2, name: "Rute Cipayung Loop", stops: ["Pangkalan Pak Darmawan", "Pangkalan Bu Sari", "Pangkalan Sejahtera"], dist: 8.3, est: "30 min", status: "active", driver: "Pak Rudi", vehicle: "B 5678 EF", loaded: 62, empty: 8 },
  { id: 3, name: "Rute Pasar Rebo", stops: ["Pangkalan Mitra Gas", "Warung Makan Barokah", "Katering Berkah"], dist: 15.1, est: "55 min", status: "pending", driver: "Pak Anto", vehicle: "B 9012 GH", loaded: 48, empty: 0 },
  { id: 4, name: "Rute Cilangkap", stops: ["Pangkalan Berkah Jaya", "Ibu Siti Aminah", "Bp. Ahmad Fauzi"], dist: 6.8, est: "25 min", status: "completed", driver: "Pak Joko", vehicle: "B 1234 CD", loaded: 0, empty: 22 },
];

const RECONCILIATION = [
  { id: 1, date: "2026-03-25", driver: "Pak Joko", sent: 85, delivered: 82, returned: 3, emptyCollected: 34, emptyReturned: 30, diff: 4, status: "pending" },
  { id: 2, date: "2026-03-24", driver: "Pak Rudi", sent: 62, delivered: 60, returned: 2, emptyCollected: 28, emptyReturned: 28, diff: 0, status: "verified" },
  { id: 3, date: "2026-03-24", driver: "Pak Anto", sent: 48, delivered: 48, returned: 0, emptyCollected: 20, emptyReturned: 18, diff: 2, status: "pending" },
  { id: 4, date: "2026-03-23", driver: "Pak Joko", sent: 90, delivered: 88, returned: 2, emptyCollected: 40, emptyReturned: 40, diff: 0, status: "verified" },
  { id: 5, date: "2026-03-23", driver: "Pak Rudi", sent: 55, delivered: 55, returned: 0, emptyCollected: 22, emptyReturned: 20, diff: 2, status: "discrepancy" },
];

const SALES_LEADS = [
  { id: 1, name: "Warung Nasi Ibu Yuli", type: "usaha_mikro", addr: "Jl. Mangga No. 7, Cibubur", phone: "0812-9988-7766", status: "hot", notes: "Butuh 10 tabung 3kg/minggu, siap gabung", lastContact: "2026-03-24" },
  { id: 2, name: "Perumahan Green Valley", type: "komplek", addr: "Jl. Raya Bogor Km 32", phone: "0857-6655-4433", status: "warm", notes: "200+ unit, potensial pangkalan baru", lastContact: "2026-03-22" },
  { id: 3, name: "Catering Sehat Sentosa", type: "usaha_mikro", addr: "Jl. Kenari No. 15, Cipayung", phone: "0878-3344-5566", status: "hot", notes: "Butuh 12kg reguler, 20 tabung/bulan", lastContact: "2026-03-25" },
  { id: 4, name: "RT 05/RW 12 Pekayon", type: "komplek", addr: "Kel. Pekayon, Pasar Rebo", phone: "0813-2233-4455", status: "cold", notes: "Survey area, belum ada pangkalan terdekat", lastContact: "2026-03-18" },
  { id: 5, name: "Restoran Sunda Rasa", type: "usaha_mikro", addr: "Jl. Raya Cibubur No. 88", phone: "0856-7788-9900", status: "warm", notes: "Pakai 50kg, potensi kontrak bulanan", lastContact: "2026-03-20" },
];

const CONSUMERS = [
  { id: 1, nik: "3201****0001", name: "Siti Nurhaliza", addr: "RT 03/RW 05, Cibubur", phone: "0812-1111-2222", type: "subsidi", purchases: 8, lastPurchase: "2026-03-24" },
  { id: 2, nik: "3201****0002", name: "Ahmad Hidayat", addr: "RT 01/RW 02, Cipayung", phone: "0857-3333-4444", type: "subsidi", purchases: 12, lastPurchase: "2026-03-23" },
  { id: 3, nik: "3201****0003", name: "Dewi Sartika", addr: "RT 05/RW 01, Pondok Ranggon", phone: "0878-5555-6666", type: "subsidi", purchases: 6, lastPurchase: "2026-03-25" },
  { id: 4, nik: "3201****0004", name: "Budi Santoso", addr: "RT 02/RW 08, Pekayon", phone: "0813-7777-8888", type: "subsidi", purchases: 15, lastPurchase: "2026-03-22" },
  { id: 5, nik: "3201****0005", name: "Ratna Sari", addr: "RT 04/RW 03, Cilangkap", phone: "0856-9999-0000", type: "nonsubsidi", purchases: 3, lastPurchase: "2026-03-20" },
];

const COMPLIANCE_ITEMS = [
  { id: 1, name: "Izin SPPBE/SPBE", status: "active", expiry: "2027-06-15", doc: "SPBE-2024-001", risk: "low" },
  { id: 2, name: "Sertifikat APAR & K3", status: "active", expiry: "2026-08-20", doc: "K3-2025-012", risk: "medium" },
  { id: 3, name: "Laporan Distribusi Subsidi (Bulanan)", status: "overdue", expiry: "2026-03-15", doc: "-", risk: "high" },
  { id: 4, name: "Audit Tabung Berkala", status: "active", expiry: "2026-12-01", doc: "AUD-2025-Q4", risk: "low" },
  { id: 5, name: "Pajak & Retribusi Daerah", status: "active", expiry: "2026-04-30", doc: "NPWP-****1234", risk: "medium" },
  { id: 6, name: "Perjanjian Pangkalan (MoU)", status: "expiring", expiry: "2026-04-10", doc: "MOU-PK-006", risk: "high" },
];

// ─── HET (Harga Eceran Tertinggi) REGULATION ───
const HET_CONFIG = {
  region: "DKI Jakarta & Sekitarnya",
  authority: "Pergub DKI / Perbup Bogor / Perwal Bekasi",
  lastUpdated: "2026-01-15",
  rates: [
    { productId: 1, name: "LPG 3 kg (Subsidi)", het: 18000, note: "Sesuai Kepmen ESDM No. 62/2023, HET tabung 3 kg bersubsidi" },
    { productId: 2, name: "LPG 5.5 kg (Bright Gas)", het: 72600, note: "Non-subsidi, HET Perda DKI Jakarta referensi Pertamina" },
    { productId: 3, name: "LPG 12 kg", het: 162800, note: "Non-subsidi, acuan harga Pertamina per Jan 2026" },
    { productId: 4, name: "LPG 50 kg", het: 598400, note: "Harga industri, referensi Pertamina per Jan 2026" },
  ]
};

const INITIAL_HET_LOG = [
  { id: 1, date: "2026-03-10T08:30:00", actor: "Pangkalan Mitra Gas", actorRole: "pangkalan", productId: 1, productName: "LPG 3 kg (Melon)", priceSold: 20000, het: 18000, diff: 2000, pctOver: 11.1, action: "flagged", resolvedBy: null, resolvedAt: null, notes: "Harga jual melebihi HET subsidi" },
  { id: 2, date: "2026-03-15T14:20:00", actor: "Pangkalan Pak Darmawan", actorRole: "pangkalan", productId: 1, productName: "LPG 3 kg (Melon)", priceSold: 19000, het: 18000, diff: 1000, pctOver: 5.6, action: "resolved", resolvedBy: "Admin Owner", resolvedAt: "2026-03-16T09:00:00", notes: "Pangkalan telah menyesuaikan harga" },
  { id: 3, date: "2026-03-20T11:45:00", actor: "Admin Agen", actorRole: "admin", productId: 3, productName: "LPG 12 kg", priceSold: 165000, het: 162800, diff: 2200, pctOver: 1.4, action: "flagged", resolvedBy: null, resolvedAt: null, notes: "Input harga baru melebihi HET referensi" },
];

// ─── PAYMENT GATEWAY ───
const PG_PROVIDERS = [
  { id: "qris", name: "QRIS", desc: "QR Code Indonesia Standard (BI)", color: "#e11d48", fee: 0.7, logo: "qr", active: true },
  { id: "va_bca", name: "VA BCA", desc: "Virtual Account Bank BCA", color: "#003d79", fee: 4000, feeType: "flat", logo: "cc", active: true },
  { id: "va_mandiri", name: "VA Mandiri", desc: "Virtual Account Bank Mandiri", color: "#003868", fee: 4000, feeType: "flat", logo: "cc", active: true },
  { id: "va_bni", name: "VA BNI", desc: "Virtual Account Bank BNI", color: "#f26522", fee: 4000, feeType: "flat", logo: "cc", active: true },
  { id: "va_bsi", name: "VA BSI", desc: "Virtual Account Bank Syariah Indonesia", color: "#00a651", fee: 3500, feeType: "flat", logo: "cc", active: true },
  { id: "ewallet_gopay", name: "GoPay", desc: "E-Wallet Gojek/GoPay", color: "#00aed6", fee: 2, logo: "wallet", active: true },
  { id: "ewallet_ovo", name: "OVO", desc: "E-Wallet OVO", color: "#4c3494", fee: 2, logo: "wallet", active: true },
  { id: "ewallet_dana", name: "DANA", desc: "E-Wallet DANA", color: "#108ee9", fee: 1.5, logo: "wallet", active: false },
  { id: "cod", name: "COD", desc: "Cash on Delivery (Tunai)", color: "#65a30d", fee: 0, logo: "wallet", active: true },
];

const genPayments = () => {
  const txns = []; const methods = PG_PROVIDERS.filter(p => p.active);
  const statuses = ["settled","settled","settled","settled","pending","pending","failed"];
  for (let i = 1; i <= 30; i++) {
    const m = methods[~~(Math.random()*methods.length)];
    const amt = [18000,36000,54000,66000,152000,132000,72000][~~(Math.random()*7)];
    const s = statuses[~~(Math.random()*statuses.length)];
    const d = new Date(); d.setDate(d.getDate() - ~~(Math.random()*30));
    const fee = m.feeType === "flat" ? (m.fee||0) : Math.round(amt * (m.fee||0) / 100);
    txns.push({ id: `TXN-${String(i).padStart(4,"0")}`, date: d.toISOString(), method: m.id, methodName: m.name, methodColor: m.color, amount: amt, fee, net: amt - fee, status: s, customer: CUSTOMERS[~~(Math.random()*CUSTOMERS.length)].name, ref: `INV/${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}/${String(i).padStart(4,"0")}` });
  }
  return txns.sort((a,b) => new Date(b.date)-new Date(a.date));
};

// ─── SPARKLINE ───
const Spark = ({ data, color, w = 80, h = 28, fill = false }) => {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data, 1); const min = Math.min(...data, 0);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - ((v - min) / (max - min || 1)) * h}`).join(" ");
  return (
    <svg width={w} height={h} style={{ display: "block" }}>
      {fill && <polygon points={`0,${h} ${pts} ${w},${h}`} fill={color} opacity="0.12" />}
      <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={(data.length - 1) / (data.length - 1) * w} cy={h - ((data[data.length - 1] - min) / (max - min || 1)) * h} r="3" fill={color} />
    </svg>
  );
};

// ─── AREA CHART ───
const AreaChart = ({ data, labels, color, h = 160 }) => {
  const max = Math.max(...data, 1); const w = 100;
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * w},${h - 20 - ((v / max) * (h - 40))}`).join(" ");
  return (
    <div style={{ position: "relative", width: "100%", height: h }}>
      <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
        <defs><linearGradient id={`ag-${color.replace("#","")}`} x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor={color} stopOpacity="0.3"/><stop offset="100%" stopColor={color} stopOpacity="0.02"/></linearGradient></defs>
        {data.map((_, i) => i > 0 && i < data.length && <line key={i} x1={(i/(data.length-1))*w} y1="10" x2={(i/(data.length-1))*w} y2={h - 20} stroke="currentColor" opacity="0.06" strokeWidth="0.3" />)}
        <polygon points={`0,${h-20} ${pts} ${w},${h-20}`} fill={`url(#ag-${color.replace("#","")})`} />
        <polyline points={pts} fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        {data.map((v, i) => <circle key={i} cx={(i/(data.length-1))*w} cy={h - 20 - ((v / max) * (h - 40))} r="2" fill="white" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />)}
      </svg>
      {labels && <div style={{ display: "flex", justifyContent: "space-between", position: "absolute", bottom: 0, left: 0, right: 0 }}>{labels.map((l,i) => <span key={i} style={{ fontSize: 9, opacity: 0.5, fontWeight: 600 }}>{l}</span>)}</div>}
    </div>
  );
};

// ─── DONUT ───
const Donut = ({ value, max, size = 64, stroke = 6, color, children }) => {
  const r = (size - stroke) / 2; const circ = 2 * Math.PI * r; const p = clamp(value / (max || 1), 0, 1);
  return (
    <div style={{ width: size, height: size, position: "relative", flexShrink: 0 }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="currentColor" opacity="0.08" strokeWidth={stroke}/><circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={circ*(1-p)} style={{ transition: "stroke-dashoffset 0.8s cubic-bezier(.4,0,.2,1)" }}/></svg>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>{children}</div>
    </div>
  );
};

// ─── HEATMAP (mini) ───
const HeatMap = ({ data, color }) => (
  <div style={{ display: "grid", gridTemplateColumns: "repeat(7,1fr)", gap: 2 }}>
    {data.map((v, i) => { const max = Math.max(...data, 1); const op = 0.08 + (v / max) * 0.9; return <div key={i} title={`${v}`} style={{ width: 10, height: 10, borderRadius: 2, background: color, opacity: op, transition: "opacity 0.3s" }} />; })}
  </div>
);

// ─── BADGE ───
const Badge = ({ status, map = STATUS }) => { const s = map[status]; if (!s) return null; return <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: s.bg, color: s.c, whiteSpace: "nowrap" }}>{s.l}</span>; };

// ─── MODAL ───
const Modal = ({ open, onClose, title, children, wide }) => { if (!open) return null; return (<div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: 20, animation: "fadeIn .2s" }} onClick={onClose}><div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: wide ? 680 : 480, maxHeight: "85vh", overflowY: "auto", boxShadow: "0 32px 100px rgba(0,0,0,0.25)", border: "1px solid var(--border)", animation: "slideUp .3s cubic-bezier(.4,0,.2,1)" }} onClick={e => e.stopPropagation()}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 style={{ fontSize: 17, fontWeight: 800, color: "var(--text)" }}>{title}</h3><button onClick={onClose} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>{children}</div></div>); };

const Stars = ({ n }) => <div style={{ display: "flex", gap: 1, alignItems: "center" }}>{[1,2,3,4,5].map(i => <span key={i} style={{ width: 14, height: 14, color: i <= Math.round(n) ? "#f59e0b" : "var(--border)" }}>{I.star}</span>)}<span style={{ fontSize: 11, fontWeight: 700, marginLeft: 4, color: "var(--text-dim)" }}>{n}</span></div>;

// ═══════════════════════════════════════
// ═══  MAIN APP
// ═══════════════════════════════════════
export default function AgenLPG() {
  const [dark, setDark] = useState(false);
  const [role, setRole] = useState(null); // null = role picker, "pangkalan"|"driver"|"sales"|"owner"
  const [page, setPage] = useState("dashboard");
  const [products, setProducts] = useState(PRODUCTS);
  const [customers, setCustomers] = useState(CUSTOMERS);
  const [orders, setOrders] = useState(() => genOrders());
  const [pangkalan, setPangkalan] = useState(PANGKALAN_DATA);
  const [dist, setDist] = useState(() => genDist());
  const [sidebar, setSidebar] = useState(false);
  const [modal, setModal] = useState({ t: null, d: null });
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState(null);
  const [pkTab, setPkTab] = useState("dir");
  const [detailPk, setDetailPk] = useState(null);
  const [notifs, setNotifs] = useState(genNotifications);
  const [showNotif, setShowNotif] = useState(false);
  const [orderFilter, setOrderFilter] = useState("all");
  const [liveTime, setLiveTime] = useState(new Date());
  const [sideCollapsed, setSideCollapsed] = useState(false);
  const [routes] = useState(DRIVER_ROUTES);
  const [recon, setRecon] = useState(RECONCILIATION);
  const [leads, setLeads] = useState(SALES_LEADS);
  const [consumers, setConsumers] = useState(CONSUMERS);
  const [compliance] = useState(COMPLIANCE_ITEMS);
  const [hetLog, setHetLog] = useState(INITIAL_HET_LOG);
  const [payments] = useState(() => genPayments());
  const [pgTab, setPgTab] = useState("overview");

  useEffect(() => { const t = setInterval(() => setLiveTime(new Date()), 60000); return () => clearInterval(t); }, []);

  const toast_ = useCallback((msg, type = "success") => { setToast({ msg, type }); setTimeout(() => setToast(null), 3500); }, []);

  // ─── COMPUTED ───
  const del = useMemo(() => orders.filter(o => o.status === "delivered"), [orders]);
  const pend = useMemo(() => orders.filter(o => o.status === "pending"), [orders]);
  const rev = useMemo(() => del.reduce((s, o) => s + o.total, 0), [del]);
  const profit = useMemo(() => del.reduce((s, o) => s + o.profit, 0), [del]);
  const totStock = useMemo(() => products.reduce((s, p) => s + p.stock, 0), [products]);
  const lowStock = useMemo(() => products.filter(p => p.stock <= p.min), [products]);
  const activePk = useMemo(() => pangkalan.filter(p => p.status === "active"), [pangkalan]);
  const pendDist = useMemo(() => dist.filter(d => d.status === "pending" || d.status === "dispatched"), [dist]);
  const unread = notifs.filter(n => !n.read).length;

  const dayLabels = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); return d.toLocaleDateString("id-ID", { weekday: "short" }); }), []);
  const last7Rev = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); const k = d.toDateString(); return del.filter(o => new Date(o.date).toDateString() === k).reduce((s, o) => s + o.total, 0); }), [del]);
  const last7Ord = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); const k = d.toDateString(); return orders.filter(o => new Date(o.date).toDateString() === k).length; }), [orders]);
  const last7Dist = useMemo(() => Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (6 - i)); const k = d.toDateString(); return dist.filter(dt => new Date(dt.date).toDateString() === k).reduce((s, dt) => s + dt.total, 0); }), [dist]);
  const last30Heat = useMemo(() => Array.from({ length: 28 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (27 - i)); const k = d.toDateString(); return orders.filter(o => new Date(o.date).toDateString() === k).length; }), [orders]);

  // Forecast: simple moving average
  const forecast3kg = useMemo(() => { const avg = last7Ord.reduce((a,b) => a+b, 0) / 7; const p = products.find(p => p.id === 1); if (!p) return null; const days = p.stock / Math.max(avg * 0.6, 1); return { avg: Math.round(avg * 0.6), days: Math.round(days), stock: p.stock }; }, [last7Ord, products]);

  // ─── ANALYTICS ENGINE ───
  // 30-day data series
  const last30Rev = useMemo(() => Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); const k = d.toDateString(); return del.filter(o => new Date(o.date).toDateString() === k).reduce((s, o) => s + o.total, 0); }), [del]);
  const last30Ord = useMemo(() => Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); const k = d.toDateString(); return orders.filter(o => new Date(o.date).toDateString() === k).length; }), [orders]);
  const last30Profit = useMemo(() => Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); const k = d.toDateString(); return del.filter(o => new Date(o.date).toDateString() === k).reduce((s, o) => s + o.profit, 0); }), [del]);
  const day30Labels = useMemo(() => Array.from({ length: 30 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - i)); return d.getDate().toString(); }), []);

  // Linear regression for prediction
  const linReg = (data) => { const n = data.length; if (n < 2) return { slope: 0, intercept: 0, predict: () => 0 }; const sx = data.reduce((s,_,i)=>s+i,0); const sy = data.reduce((s,v)=>s+v,0); const sxy = data.reduce((s,v,i)=>s+i*v,0); const sx2 = data.reduce((s,_,i)=>s+i*i,0); const slope=(n*sxy-sx*sy)/(n*sx2-sx*sx||1); const intercept=(sy-slope*sx)/n; return { slope, intercept, predict: x => Math.max(0, Math.round(slope * x + intercept)) }; };

  // Predictions
  const predRevenue = useMemo(() => { const reg = linReg(last30Rev); return Array.from({ length: 7 }, (_, i) => reg.predict(30 + i)); }, [last30Rev]);
  const predOrders = useMemo(() => { const reg = linReg(last30Ord); return Array.from({ length: 7 }, (_, i) => reg.predict(30 + i)); }, [last30Ord]);

  // Stock depletion forecast per product
  const stockForecasts = useMemo(() => products.map(p => {
    const dailySales = del.filter(o => o.pid === p.id).length > 0
      ? del.filter(o => o.pid === p.id).reduce((s,o) => s + o.qty, 0) / 30
      : 0.5;
    const daysLeft = dailySales > 0 ? Math.round(p.stock / dailySales) : 999;
    const depletion = Array.from({ length: 14 }, (_, i) => Math.max(0, Math.round(p.stock - dailySales * i)));
    return { ...p, dailySales: Math.round(dailySales * 10) / 10, daysLeft, depletion, urgency: daysLeft < 7 ? "critical" : daysLeft < 14 ? "warning" : "safe" };
  }), [products, del]);

  // Customer analytics
  const custAnalytics = useMemo(() => {
    const sorted = customers.slice().sort((a,b) => b.orders - a.orders);
    const totalOrders = customers.reduce((s,c) => s + c.orders, 0);
    const top3Revenue = sorted.slice(0, 3).reduce((s,c) => s + c.orders, 0);
    const custByType = { rumah_tangga: customers.filter(c => c.type === "rumah_tangga").length, usaha_mikro: customers.filter(c => c.type === "usaha_mikro").length };
    const revByType = { rumah_tangga: del.filter(o => { const c = customers.find(cc => cc.id === o.cid); return c?.type === "rumah_tangga"; }).reduce((s,o) => s+o.total, 0), usaha_mikro: del.filter(o => { const c = customers.find(cc => cc.id === o.cid); return c?.type === "usaha_mikro"; }).reduce((s,o) => s+o.total, 0) };
    return { sorted, totalOrders, top3Revenue, top3Pct: pct(top3Revenue, totalOrders), custByType, revByType };
  }, [customers, del]);

  // Pangkalan analytics
  const pkAnalytics = useMemo(() => {
    const avgRating = activePk.length > 0 ? Math.round(activePk.reduce((s,p) => s+p.rating, 0) / activePk.length * 10) / 10 : 0;
    const totalQuota = activePk.reduce((s,p) => s+p.qm, 0);
    const usedQuota = activePk.reduce((s,p) => s+p.qu, 0);
    const overQuota = activePk.filter(p => p.qu >= p.qm * 0.9).length;
    const byKec = {};
    pangkalan.forEach(p => { if (!byKec[p.kec]) byKec[p.kec] = { count: 0, dist: 0 }; byKec[p.kec].count++; byKec[p.kec].dist += p.td; });
    return { avgRating, totalQuota, usedQuota, quotaPct: pct(usedQuota, totalQuota), overQuota, byKec };
  }, [pangkalan, activePk]);

  // Order fulfillment metrics
  const fulfillment = useMemo(() => {
    const total = orders.length;
    const delivered = del.length;
    const cancelled = orders.filter(o => o.status === "cancelled").length;
    const rate = pct(delivered, total);
    const cancelRate = pct(cancelled, total);
    const avgOrderValue = delivered > 0 ? Math.round(rev / delivered) : 0;
    // Hourly distribution
    const hourDist = Array.from({ length: 24 }, (_, h) => orders.filter(o => new Date(o.date).getHours() === h).length);
    const peakHour = hourDist.indexOf(Math.max(...hourDist));
    // Weekly distribution
    const weekDist = Array.from({ length: 7 }, (_, d) => orders.filter(o => new Date(o.date).getDay() === d).length);
    const dayNames = ["Min","Sen","Sel","Rab","Kam","Jum","Sab"];
    const peakDay = dayNames[weekDist.indexOf(Math.max(...weekDist))];
    return { total, delivered, cancelled, rate, cancelRate, avgOrderValue, hourDist, peakHour, weekDist, dayNames, peakDay };
  }, [orders, del, rev]);

  // Anomaly detection (simple: flag days with orders > 2*stddev above mean)
  const anomalies = useMemo(() => {
    const mean = last30Ord.reduce((a,b) => a+b, 0) / 30;
    const std = Math.sqrt(last30Ord.reduce((s,v) => s + (v-mean)**2, 0) / 30);
    return last30Ord.map((v, i) => ({ day: i, val: v, anomaly: v > mean + 2 * std, mean: Math.round(mean * 10) / 10 })).filter(x => x.anomaly);
  }, [last30Ord]);

  // ─── HET COMPLIANCE ENGINE ───
  const hetChecks = useMemo(() => products.map(p => {
    const hetRule = HET_CONFIG.rates.find(r => r.productId === p.id);
    if (!hetRule) return { ...p, het: null, compliant: true, diff: 0, pctOver: 0 };
    const compliant = p.price <= hetRule.het;
    const diff = p.price - hetRule.het;
    const pctOver = hetRule.het > 0 ? Math.round((diff / hetRule.het) * 1000) / 10 : 0;
    return { ...p, het: hetRule.het, hetNote: hetRule.note, compliant, diff, pctOver };
  }), [products]);
  const hetViolations = useMemo(() => hetChecks.filter(h => !h.compliant), [hetChecks]);
  const openHetFlags = useMemo(() => hetLog.filter(l => l.action === "flagged"), [hetLog]);

  const checkHET = useCallback((productId, price, actor, actorRole) => {
    const hetRule = HET_CONFIG.rates.find(r => r.productId === productId);
    if (!hetRule || price <= hetRule.het) return false;
    const diff = price - hetRule.het;
    const pctOver = Math.round((diff / hetRule.het) * 1000) / 10;
    const prod = products.find(p => p.id === productId);
    const violation = { id: Math.max(0, ...hetLog.map(l => l.id)) + 1, date: new Date().toISOString(), actor, actorRole, productId, productName: prod?.name || `Produk #${productId}`, priceSold: price, het: hetRule.het, diff, pctOver, action: "flagged", resolvedBy: null, resolvedAt: null, notes: `Harga ${fmtRp(price)} melebihi HET ${fmtRp(hetRule.het)} (+${pctOver}%)` };
    setHetLog(prev => [violation, ...prev]);
    return true;
  }, [products, hetLog]);

  const resolveHetFlag = useCallback((id) => {
    setHetLog(hetLog.map(l => l.id === id ? { ...l, action: "resolved", resolvedBy: ROLES[role]?.label || "Admin", resolvedAt: new Date().toISOString() } : l));
    toast_("Pelanggaran HET ditandai resolved");
  }, [hetLog, role, toast_]);

  // ─── HANDLERS ───
  const addOrder = d => {
    const prod = products.find(p => p.id === +d.productId); const cust = customers.find(c => c.id === +d.customerId);
    if (!prod || !cust) return; if (prod.stock < d.qty) { toast_("Stok tidak mencukupi!", "error"); return; }
    // HET check on order
    const hetRule = HET_CONFIG.rates.find(r => r.productId === prod.id);
    if (hetRule && prod.price > hetRule.het) {
      checkHET(prod.id, prod.price, cust.name, "customer_order");
      toast_(`⚠ Harga ${prod.name} melebihi HET! Tercatat di audit trail.`, "error");
    }
    setOrders([{ id: Math.max(0, ...orders.map(o => o.id)) + 1, cid: cust.id, cname: cust.name, pid: prod.id, pname: prod.name, qty: +d.qty, price: prod.price, total: prod.price * +d.qty, profit: (prod.price - prod.cost) * +d.qty, status: "pending", date: new Date().toISOString(), note: d.note || "" }, ...orders]);
    setProducts(products.map(p => p.id === prod.id ? { ...p, stock: p.stock - +d.qty } : p));
    setCustomers(customers.map(c => c.id === cust.id ? { ...c, orders: c.orders + 1 } : c));
    setModal({ t: null }); toast_("Pesanan baru ditambahkan!");
  };
  const upOrd = (id, s) => { setOrders(orders.map(o => o.id === id ? { ...o, status: s } : o)); toast_(`Pesanan #${id}: ${STATUS[s].l}`); };
  const addProd = d => {
    const newId = Math.max(0,...products.map(p=>p.id))+1;
    const price = +d.price;
    // HET check on product creation
    const hetRule = HET_CONFIG.rates.find(r => r.productId === newId) || HET_CONFIG.rates.find(r => d.name.includes(r.name.match(/\d+/)?.[0]));
    if (hetRule && price > hetRule.het) {
      checkHET(hetRule.productId, price, ROLES[role]?.label || "Admin", role || "admin");
      toast_(`⚠ Harga Rp ${fmt(price)} melebihi HET Rp ${fmt(hetRule.het)}! Audit trail dicatat.`, "error");
    }
    setProducts([...products, { id: newId, name:d.name, short:d.name.match(/\d+/)?.[0]+" kg"||"", price, cost:+d.cost, stock:+d.stock, min:+d.min, type:d.type }]);
    setModal({t:null}); toast_("Produk ditambahkan!");
  };
  const addCust = d => { setCustomers([...customers, { id: Math.max(0,...customers.map(c=>c.id))+1, name:d.name, phone:d.phone, addr:d.addr, type:d.type, orders:0 }]); setModal({t:null}); toast_("Pelanggan ditambahkan!"); };
  const restock = (id, q) => { setProducts(products.map(p => p.id === id ? { ...p, stock: p.stock + +q } : p)); toast_("Stok ditambahkan!"); setModal({ t: null }); };
  const addPk = d => { setPangkalan([...pangkalan, { id: Math.max(0,...pangkalan.map(p=>p.id))+1, name:d.name, owner:d.owner, phone:d.phone, addr:d.addr, kel:d.kel, kec:d.kec, status:"active", rating:0, join:new Date().toISOString().slice(0,10), qm:+d.qm, qu:0, s3:0, s5:0, s12:0, td:0, ld:null }]); setModal({t:null}); toast_("Pangkalan ditambahkan!"); };

  const distribute = d => {
    const pk = pangkalan.find(p => p.id === +d.pkid); if (!pk) return;
    const q3 = +d.q3 || 0, q5 = +d.q5 || 0, q12 = +d.q12 || 0;
    const p3 = products.find(p => p.id === 1), p5 = products.find(p => p.id === 2), p12 = products.find(p => p.id === 3);
    if (p3 && p3.stock < q3) { toast_("Stok 3 kg tidak cukup!", "error"); return; }
    if (p5 && p5.stock < q5) { toast_("Stok 5.5 kg tidak cukup!", "error"); return; }
    if (p12 && p12.stock < q12) { toast_("Stok 12 kg tidak cukup!", "error"); return; }
    const tt = q3+q5+q12, tv = q3*(p3?.cost||0)+q5*(p5?.cost||0)+q12*(p12?.cost||0);
    setDist([{ id: Math.max(0,...dist.map(d=>d.id))+1, pkid:pk.id, pkname:pk.name, owner:pk.owner, q3,q5,q12, total:tt, val:tv, status:"dispatched", date:new Date().toISOString(), note:d.note||"" }, ...dist]);
    setProducts(products.map(p => { if(p.id===1) return{...p,stock:p.stock-q3}; if(p.id===2) return{...p,stock:p.stock-q5}; if(p.id===3) return{...p,stock:p.stock-q12}; return p; }));
    setPangkalan(pangkalan.map(p => p.id === pk.id ? { ...p, s3:p.s3+q3, s5:p.s5+q5, s12:p.s12+q12, qu:p.qu+q3, td:p.td+tt, ld:new Date().toISOString() } : p));
    setModal({t:null}); toast_(`${tt} tabung didistribusikan ke ${pk.name}!`);
  };
  const upDist = (id, s) => { setDist(dist.map(d => d.id === id ? { ...d, status: s } : d)); toast_(`Distribusi #${id}: ${DSTATUS[s].l}`); };
  const togPk = id => { setPangkalan(pangkalan.map(p => p.id !== id ? p : { ...p, status: p.status === "active" ? "suspended" : "active" })); toast_("Status pangkalan diperbarui!"); };
  const markAllRead = () => setNotifs(notifs.map(n => ({ ...n, read: true })));

  const exportCSV = () => {
    const rows = [["ID","Tanggal","Pelanggan","Produk","Qty","Total","Status"]];
    orders.forEach(o => rows.push([o.id, fmtDate(o.date), o.cname, o.pname, o.qty, o.total, STATUS[o.status].l]));
    toast_("Data pesanan di-export (simulasi)!");
  };

  const nav = useMemo(() => {
    const all = [
      { id: "dashboard", l: "Dashboard", ic: "grid", r: ["pangkalan","driver","sales","owner"] },
      { id: "orders", l: "Pesanan", ic: "cart", b: pend.length || null, r: ["pangkalan","owner"] },
      { id: "consumers", l: "Konsumen Akhir", ic: "users", r: ["pangkalan"] },
      { id: "pangkalan", l: "Pangkalan", ic: "store", b: pendDist.length || null, r: ["pangkalan","sales","owner"] },
      { id: "stock", l: "Stok", ic: "pkg", b: lowStock.length > 0 ? "!" : null, r: ["pangkalan","owner"] },
      { id: "het", l: "HET Compliance", ic: "alert", b: openHetFlags.length > 0 ? openHetFlags.length : null, r: ["pangkalan","owner"] },
      { id: "routes", l: "Rute & Logistik", ic: "truck", r: ["driver"] },
      { id: "reconciliation", l: "Rekonsiliasi", ic: "refresh", r: ["driver","owner"] },
      { id: "salesLeads", l: "Akuisisi Mitra", ic: "target", r: ["sales"] },
      { id: "market", l: "Monitoring Pasar", ic: "activity", r: ["sales"] },
      { id: "customers", l: "Pelanggan", ic: "users", r: ["sales","owner"] },
      { id: "delivery", l: "Pengiriman", ic: "truck", r: ["driver","pangkalan"] },
      { id: "finance", l: "Keuangan", ic: "wallet", r: ["owner"] },
      { id: "payment", l: "Payment Gateway", ic: "cc", r: ["pangkalan","owner"] },
      { id: "compliancePage", l: "Kepatuhan", ic: "layers", r: ["owner"] },
      { id: "analytics", l: "Analytics AI", ic: "brain", r: ["owner","sales"] },
    ];
    return role ? all.filter(n => n.r.includes(role)) : all;
  }, [role, pend.length, pendDist.length, lowStock.length]);

  const filteredOrders = useMemo(() => {
    let o = orders;
    if (orderFilter !== "all") o = o.filter(x => x.status === orderFilter);
    if (search) o = o.filter(x => x.cname.toLowerCase().includes(search.toLowerCase()) || x.pname.toLowerCase().includes(search.toLowerCase()));
    return o;
  }, [orders, orderFilter, search]);

  // ─── CSS VARS ───
  const theme = dark ? {
    "--bg": "#0c0f1a", "--card": "#141829", "--card2": "#1a1f36", "--border": "#252b45", "--text": "#e8eaf0", "--text-dim": "#7c829b", "--hover": "#1e2440", "--accent": "#f97316", "--accent2": "#8b5cf6", "--shadow": "0 8px 40px rgba(0,0,0,0.4)", "--sidebar": "#0f1225", "--topbar": "rgba(12,15,26,0.88)",
  } : {
    "--bg": "#f0f2f5", "--card": "#ffffff", "--card2": "#f8f9fb", "--border": "#e4e7ed", "--text": "#111827", "--text-dim": "#6b7280", "--hover": "#f3f4f6", "--accent": "#f97316", "--accent2": "#6366f1", "--shadow": "0 8px 40px rgba(0,0,0,0.08)", "--sidebar": "#111827", "--topbar": "rgba(255,255,255,0.88)",
  };

  return (
    <div style={{ ...theme, fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "var(--bg)", minHeight: "100vh", display: "flex", color: "var(--text)", transition: "background 0.4s, color 0.4s" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,500;0,9..40,700;0,9..40,800;1,9..40,400&family=DM+Mono:wght@400;500&display=swap');
        @keyframes fadeIn{from{opacity:0}to{opacity:1}} @keyframes slideUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}} @keyframes slideLeft{from{transform:translateX(100%)}to{transform:translateX(0)}} @keyframes pulse{0%,100%{opacity:1}50%{opacity:.5}}
        *{box-sizing:border-box;margin:0;padding:0} ::-webkit-scrollbar{width:5px} ::-webkit-scrollbar-thumb{background:var(--border);border-radius:3px}
        input,select,textarea{font-family:inherit} .mono{font-family:'DM Mono',monospace}
      `}</style>

      {/* ═══ ROLE PICKER ═══ */}
      {!role && (
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24, animation: "fadeIn .4s" }}>
          <div style={{ maxWidth: 680, width: "100%", textAlign: "center" }}>
            <div style={{ width: 64, height: 64, borderRadius: 20, background: "linear-gradient(135deg,#f97316,#ef4444)", display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", marginBottom: 20, boxShadow: "0 8px 40px rgba(249,115,22,0.35)" }}><Ic name="flame" size={32}/></div>
            <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 6 }}>Agen LPG Enterprise</h1>
            <p style={{ fontSize: 14, color: "var(--text-dim)", marginBottom: 32 }}>Pilih peran Anda untuk mengakses fitur yang sesuai</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, textAlign: "left" }}>
              {Object.entries(ROLES).map(([k, r]) => (
                <div key={k} onClick={() => { setRole(k); setPage("dashboard"); }} style={{ background: "var(--card)", borderRadius: 18, border: "1px solid var(--border)", padding: 22, cursor: "pointer", transition: "all 0.3s", position: "relative", overflow: "hidden" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${r.color}20`; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: r.gradient }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: r.gradient, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: `0 4px 16px ${r.color}40` }}><Ic name={r.icon} size={22}/></div>
                    <div><div style={{ fontSize: 17, fontWeight: 800 }}>{r.label}</div><div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 500, marginTop: 1 }}>{r.desc}</div></div>
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                    {k === "pangkalan" && ["Stok Toko","Input Konsumen","Pesanan","Pengiriman"].map(t => <span key={t} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 5, background: `${r.color}10`, color: r.color, fontWeight: 600 }}>{t}</span>)}
                    {k === "driver" && ["Rute Harian","Logistik","Rekonsiliasi","Tabung Kosong"].map(t => <span key={t} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 5, background: `${r.color}10`, color: r.color, fontWeight: 600 }}>{t}</span>)}
                    {k === "sales" && ["Akuisisi Mitra","Monitor Pasar","Pangkalan","Analytics"].map(t => <span key={t} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 5, background: `${r.color}10`, color: r.color, fontWeight: 600 }}>{t}</span>)}
                    {k === "owner" && ["Laba Rugi","Kepatuhan","Keuangan","Analytics AI"].map(t => <span key={t} style={{ fontSize: 9, padding: "3px 8px", borderRadius: 5, background: `${r.color}10`, color: r.color, fontWeight: 600 }}>{t}</span>)}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 24, display: "flex", justifyContent: "center", alignItems: "center", gap: 8 }}>
              <button onClick={() => setDark(!dark)} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "6px 14px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "var(--text-dim)", display: "flex", alignItems: "center", gap: 4 }}><Ic name={dark?"sun":"moon"} size={14}/> {dark?"Light":"Dark"} Mode</button>
            </div>
          </div>
        </div>
      )}

      {role && (<>
      <aside style={{ width: sideCollapsed ? 72 : 240, background: "var(--sidebar)", display: "flex", flexDirection: "column", position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 40, transition: "width 0.3s cubic-bezier(.4,0,.2,1)", overflow: "hidden" }}>
        <div style={{ padding: sideCollapsed ? "20px 16px" : "20px", display: "flex", alignItems: "center", gap: 12, borderBottom: "1px solid rgba(255,255,255,0.06)", cursor: "pointer", minHeight: 72 }} onClick={() => setSideCollapsed(!sideCollapsed)}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: ROLES[role]?.gradient || "linear-gradient(135deg,#f97316,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0, boxShadow: `0 4px 20px ${ROLES[role]?.color||"#f97316"}40` }}><Ic name={ROLES[role]?.icon||"flame"} size={22}/></div>
          {!sideCollapsed && <div style={{ overflow: "hidden" }}><div style={{ color: "#fff", fontSize: 16, fontWeight: 800, letterSpacing: "-0.03em", whiteSpace: "nowrap" }}>Agen LPG</div><div style={{ color: ROLES[role]?.color||"#64748b", fontSize: 10, fontWeight: 600, textTransform: "uppercase" }}>{ROLES[role]?.label}</div></div>}
        </div>
        <nav style={{ flex: 1, padding: "12px 8px", overflowY: "auto" }}>
          {nav.map(n => (
            <div key={n.id} onClick={() => { setPage(n.id); setSidebar(false); setDetailPk(null); }} style={{ display: "flex", alignItems: "center", gap: 12, padding: sideCollapsed ? "11px 0" : "11px 14px", justifyContent: sideCollapsed ? "center" : "flex-start", borderRadius: 10, color: page === n.id ? (ROLES[role]?.color||"#fb923c") : "#94a3b8", background: page === n.id ? `${ROLES[role]?.color||"#f97316"}18` : "transparent", cursor: "pointer", transition: "all 0.2s", marginBottom: 2, position: "relative", fontSize: 13, fontWeight: 600 }}>
              <Ic name={n.ic} size={20}/>
              {!sideCollapsed && <span style={{ whiteSpace: "nowrap" }}>{n.l}</span>}
              {n.b && <span style={{ position: sideCollapsed ? "absolute" : "relative", top: sideCollapsed ? 4 : "auto", right: sideCollapsed ? 8 : "auto", marginLeft: sideCollapsed ? 0 : "auto", background: "#ef4444", color: "#fff", fontSize: 10, fontWeight: 700, minWidth: 18, height: 18, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 9, padding: "0 5px" }}>{n.b}</span>}
            </div>
          ))}
        </nav>
        {!sideCollapsed && <div style={{ padding: "10px 12px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <button onClick={() => { setRole(null); setPage("dashboard"); }} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", cursor: "pointer", color: "#94a3b8", fontSize: 11, fontWeight: 600, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}><Ic name="refresh" size={12}/> Ganti Peran</button>
        </div>}
      </aside>

      {/* MAIN */}
      <div style={{ flex: 1, marginLeft: sideCollapsed ? 72 : 240, minHeight: "100vh", transition: "margin-left 0.3s" }}>
        {/* TOPBAR */}
        <div style={{ background: "var(--topbar)", borderBottom: "1px solid var(--border)", padding: "12px 24px", display: "flex", alignItems: "center", gap: 14, position: "sticky", top: 0, zIndex: 30, backdropFilter: "blur(16px)" }}>
          <div style={{ flex: 1, maxWidth: 380, display: "flex", alignItems: "center", gap: 8, background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "7px 14px" }}>
            <Ic name="search" size={16}/><input placeholder="Cari data..." value={search} onChange={e => setSearch(e.target.value)} style={{ flex: 1, border: "none", background: "none", outline: "none", fontSize: 13, color: "var(--text)", fontFamily: "inherit" }} />
          </div>
          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 8 }}>
            {/* Live Clock */}
            <div className="mono" style={{ fontSize: 12, fontWeight: 500, color: "var(--text-dim)", padding: "6px 12px", background: "var(--hover)", borderRadius: 8 }}>
              {liveTime.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
            </div>
            {/* Dark Mode */}
            <button onClick={() => setDark(!dark)} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "var(--text-dim)" }}><Ic name={dark ? "sun" : "moon"} size={16}/></button>
            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button onClick={() => setShowNotif(!showNotif)} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "var(--text-dim)", position: "relative" }}><Ic name="bell" size={16}/>
                {unread > 0 && <span style={{ position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: 4, background: "#ef4444", border: "2px solid var(--card)", animation: "pulse 2s infinite" }} />}
              </button>
              {showNotif && (
                <div style={{ position: "absolute", top: 44, right: 0, width: 340, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 14, boxShadow: "var(--shadow)", zIndex: 50, animation: "slideUp .2s", overflow: "hidden" }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, fontSize: 14 }}>Notifikasi</span><button onClick={markAllRead} style={{ fontSize: 11, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Tandai semua dibaca</button></div>
                  <div style={{ maxHeight: 320, overflowY: "auto" }}>{notifs.map(n => (
                    <div key={n.id} style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", background: n.read ? "transparent" : dark ? "rgba(249,115,22,0.05)" : "rgba(249,115,22,0.03)", display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, marginTop: 5, flexShrink: 0, background: n.type === "warning" ? "#f59e0b" : n.type === "success" ? "#10b981" : "#3b82f6" }} />
                      <div><div style={{ fontSize: 13, fontWeight: n.read ? 400 : 600, color: "var(--text)", lineHeight: 1.4 }}>{n.msg}</div><div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{n.time}</div></div>
                    </div>
                  ))}</div>
                </div>
              )}
            </div>
            {/* Export */}
            <button onClick={exportCSV} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: 7, cursor: "pointer", display: "flex", color: "var(--text-dim)" }} title="Export CSV"><Ic name="download" size={16}/></button>
            {/* Profile */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginLeft: 4 }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "4px 10px", borderRadius: 6, background: `${ROLES[role]?.color||"#f97316"}15`, color: ROLES[role]?.color||"#f97316", textTransform: "uppercase", letterSpacing: ".04em" }}>{ROLES[role]?.label}</span>
              <div style={{ width: 34, height: 34, borderRadius: 10, background: ROLES[role]?.gradient||"linear-gradient(135deg,#f97316,#ef4444)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{(ROLES[role]?.label||"A").charAt(0)}</div>
            </div>
          </div>
        </div>

        <div style={{ padding: 24 }}>

          {/* ═══ DASHBOARD ═══ */}
          {page === "dashboard" && (<div style={{ animation: "fadeIn .3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div><h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Dashboard</h2><p style={{ fontSize: 13, color: "var(--text-dim)", marginTop: 2 }}>{new Date().toLocaleDateString("id-ID", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}</p></div>
              <button onClick={() => setModal({ t: "addOrder" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 12, padding: "10px 20px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6, boxShadow: "0 4px 20px rgba(249,115,22,0.35)" }}><Ic name="plus" size={16}/> Pesanan Baru</button>
            </div>

            {/* KPI Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 14, marginBottom: 24 }}>
              {[
                { ic: "wallet", l: "Total Pendapatan", v: fmtRp(rev), sp: last7Rev, sc: "#f97316", sub: `${del.length} transaksi` },
                { ic: "trend", l: "Keuntungan Bersih", v: fmtRp(profit), sp: last7Rev.map(v => v * 0.26), sc: "#10b981", sub: `margin ${pct(profit, rev)}%` },
                { ic: "cart", l: "Total Pesanan", v: orders.length, sp: last7Ord, sc: "#6366f1", sub: `${pend.length} pending` },
                { ic: "store", l: "Pangkalan Aktif", v: `${activePk.length}/${pangkalan.length}`, sp: last7Dist, sc: "#8b5cf6", sub: `${pendDist.length} distribusi aktif` },
                { ic: "pkg", l: "Total Stok", v: `${fmt(totStock)}`, sp: null, sc: lowStock.length > 0 ? "#ef4444" : "#0ea5e9", sub: lowStock.length > 0 ? `${lowStock.length} rendah!` : "Aman" },
              ].map((c, i) => (
                <div key={i} style={{ background: "var(--card)", borderRadius: 16, padding: 18, border: "1px solid var(--border)", transition: "all 0.3s", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: c.sc, opacity: 0.5 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: `${c.sc}15`, color: c.sc, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={c.ic} size={18}/></div>
                    {c.sp && <Spark data={c.sp} color={c.sc} fill />}
                  </div>
                  <div className="mono" style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.02em" }}>{c.v}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 500, marginTop: 2 }}>{c.l}</div>
                  <div style={{ fontSize: 10, fontWeight: 600, color: c.sc, marginTop: 4 }}>{c.sub}</div>
                </div>
              ))}
            </div>

            {/* Charts Row */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16, marginBottom: 24 }}>
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><span style={{ fontWeight: 700, fontSize: 14 }}>Tren Pendapatan 7 Hari</span><span className="mono" style={{ fontSize: 12, color: "var(--accent)" }}>{fmtRp(last7Rev.reduce((a,b) => a+b, 0))}</span></div>
                <AreaChart data={last7Rev} labels={dayLabels} color="#f97316" h={140} />
              </div>
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}><span style={{ fontWeight: 700, fontSize: 14 }}>Aktivitas Pesanan</span><HeatMap data={last30Heat} color="var(--accent2)" /></div>
                <AreaChart data={last7Ord} labels={dayLabels} color="#6366f1" h={140} />
              </div>
            </div>

            {/* Forecast + Quick Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16, marginBottom: 24 }}>
              {forecast3kg && (
                <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: "#f59e0b15", color: "#f59e0b", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name="zap" size={14}/></div><span style={{ fontWeight: 700, fontSize: 14 }}>Prakiraan Stok LPG 3 kg</span></div>
                  <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
                    <Donut value={forecast3kg.stock} max={500} size={72} stroke={7} color={forecast3kg.days < 7 ? "#ef4444" : "#10b981"}>
                      <span className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{forecast3kg.days}h</span>
                    </Donut>
                    <div>
                      <div style={{ fontSize: 12, color: "var(--text-dim)" }}>Konsumsi rata-rata</div>
                      <div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>~{forecast3kg.avg} tabung/hari</div>
                      <div style={{ fontSize: 12, color: forecast3kg.days < 7 ? "#ef4444" : "var(--text-dim)", fontWeight: 600, marginTop: 4 }}>
                        {forecast3kg.days < 7 ? "⚠ Segera restock!" : `Cukup untuk ~${forecast3kg.days} hari`}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Produk Terlaris</div>
                {products.slice().sort((a,b) => { const qa = del.filter(o => o.pid === a.id).reduce((s,o)=>s+o.qty,0); const qb = del.filter(o => o.pid === b.id).reduce((s,o)=>s+o.qty,0); return qb-qa; }).slice(0,3).map((p,i) => { const qty = del.filter(o => o.pid === p.id).reduce((s,o)=>s+o.qty,0); const maxQty = del.reduce((s,o)=>s+o.qty,0); return (
                  <div key={p.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                    <span className="mono" style={{ fontSize: 18, fontWeight: 800, color: i===0?"#f97316":i===1?"#6366f1":"var(--text-dim)", width: 24 }}>#{i+1}</span>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{p.name}</div><div style={{ height: 4, borderRadius: 2, background: "var(--border)", marginTop: 4, overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 2, width: `${pct(qty,maxQty)}%`, background: i===0?"#f97316":i===1?"#6366f1":"var(--text-dim)", transition: "width 0.8s" }}/></div></div>
                    <span className="mono" style={{ fontSize: 13, fontWeight: 700 }}>{qty}</span>
                  </div>
                ); })}
              </div>
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20 }}>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Performa Pangkalan Top</div>
                {pangkalan.filter(p=>p.status==="active").sort((a,b)=>b.td-a.td).slice(0,4).map(pk => (
                  <div key={pk.id} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                    <Donut value={pk.qu} max={pk.qm} size={36} stroke={4} color={pct(pk.qu,pk.qm)>=90?"#ef4444":pct(pk.qu,pk.qm)>=70?"#f59e0b":"#10b981"}>
                      <span style={{ fontSize: 8, fontWeight: 800 }}>{pct(pk.qu,pk.qm)}%</span>
                    </Donut>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{pk.name}</div><div style={{ fontSize: 10, color: "var(--text-dim)" }}>{fmt(pk.td)} tabung total</div></div>
                    <Stars n={pk.rating} />
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tables */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 16 }}>
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, fontSize: 14 }}>Pesanan Terbaru</span><button onClick={() => setPage("orders")} style={{ fontSize: 12, color: "var(--accent)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Lihat Semua →</button></div>
                <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Pelanggan","Produk","Total","Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 20px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead><tbody>{orders.slice(0,5).map(o => <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600 }}>{o.cname}</td><td style={{ padding: "12px 20px", fontSize: 13 }}>{o.pname} ×{o.qty}</td><td className="mono" style={{ padding: "12px 20px", fontSize: 13, fontWeight: 500 }}>{fmtRp(o.total)}</td><td style={{ padding: "12px 20px" }}><Badge status={o.status}/></td></tr>)}</tbody></table></div>
              </div>
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
                <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><span style={{ fontWeight: 700, fontSize: 14 }}>Distribusi Terbaru</span><button onClick={() => { setPage("pangkalan"); setPkTab("dist"); }} style={{ fontSize: 12, color: "var(--accent2)", background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: "inherit" }}>Lihat Semua →</button></div>
                <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Pangkalan","Tabung","Nilai","Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 20px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead><tbody>{dist.slice(0,5).map(d => <tr key={d.id} style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: "12px 20px", fontSize: 13, fontWeight: 600 }}>{d.pkname}</td><td style={{ padding: "12px 20px", fontSize: 12 }}>{d.q3>0?`${d.q3}×3kg `:""}{d.q5>0?`${d.q5}×5.5kg `:""}{d.q12>0?`${d.q12}×12kg`:""}</td><td className="mono" style={{ padding: "12px 20px", fontSize: 13, fontWeight: 500 }}>{fmtRp(d.val)}</td><td style={{ padding: "12px 20px" }}><Badge status={d.status} map={DSTATUS}/></td></tr>)}</tbody></table></div>
              </div>
            </div>
          </div>)}

          {/* ═══ ORDERS ═══ */}
          {page === "orders" && (<div style={{ animation: "fadeIn .3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Daftar Pesanan</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={exportCSV} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6, color: "var(--text-dim)", fontFamily: "inherit" }}><Ic name="download" size={14}/> Export</button>
                <button onClick={() => setModal({ t: "addOrder" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="plus" size={14}/> Pesanan Baru</button>
              </div>
            </div>
            {/* Filter Pills */}
            <div style={{ display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" }}>
              {[{ k: "all", l: "Semua" }, ...Object.entries(STATUS).map(([k, v]) => ({ k, l: v.l }))].map(f => (
                <button key={f.k} onClick={() => setOrderFilter(f.k)} style={{ padding: "6px 14px", borderRadius: 8, fontSize: 12, fontWeight: 600, border: "1px solid", borderColor: orderFilter === f.k ? "var(--accent)" : "var(--border)", background: orderFilter === f.k ? `${theme["--accent"]}15` : "var(--card)", color: orderFilter === f.k ? "var(--accent)" : "var(--text-dim)", cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }}>{f.l} {f.k !== "all" && <span className="mono" style={{ marginLeft: 4, fontSize: 10 }}>({orders.filter(o => o.status === f.k).length})</span>}</button>
              ))}
            </div>
            <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}><div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["#","Tanggal","Pelanggan","Produk","Qty","Total","Profit","Status","Aksi"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 18px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
                <tbody>{filteredOrders.map(o => <tr key={o.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="mono" style={{ padding: "12px 18px", fontSize: 12, color: "var(--text-dim)" }}>#{o.id}</td><td style={{ padding: "12px 18px", fontSize: 12 }}>{fmtDate(o.date)}</td><td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600 }}>{o.cname}</td><td style={{ padding: "12px 18px", fontSize: 12 }}>{o.pname}</td><td className="mono" style={{ padding: "12px 18px", fontSize: 13, fontWeight: 500 }}>{o.qty}</td><td className="mono" style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600 }}>{fmtRp(o.total)}</td><td className="mono" style={{ padding: "12px 18px", fontSize: 12, fontWeight: 600, color: "#10b981" }}>+{fmtRp(o.profit)}</td><td style={{ padding: "12px 18px" }}><Badge status={o.status}/></td>
                  <td style={{ padding: "12px 18px" }}><div style={{ display: "flex", gap: 4 }}>
                    {o.status === "pending" && <><button onClick={() => upOrd(o.id,"confirmed")} style={{ background: "#10b98115", color: "#10b981", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="check" size={14}/></button><button onClick={() => upOrd(o.id,"cancelled")} style={{ background: "#ef444415", color: "#ef4444", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="x" size={14}/></button></>}
                    {o.status === "confirmed" && <button onClick={() => upOrd(o.id,"delivered")} style={{ background: "#6366f115", color: "#6366f1", border: "none", borderRadius: 6, padding: "4px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, fontFamily: "inherit" }}><Ic name="truck" size={14}/> Kirim</button>}
                  </div></td>
                </tr>)}</tbody></table>
            </div></div>
          </div>)}

          {/* ═══ PANGKALAN ═══ */}
          {page === "pangkalan" && (<div style={{ animation: "fadeIn .3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Manajemen Pangkalan</h2>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => setModal({ t: "distribute" })} style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="send" size={14}/> Distribusi</button>
                <button onClick={() => setModal({ t: "addPk" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="plus" size={14}/> Baru</button>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginBottom: 20 }}>
              {[{ ic: "store", l: "Pangkalan Aktif", v: activePk.length, c: "#6366f1" }, { ic: "send", l: "Distribusi Bulan Ini", v: `${fmt(dist.filter(d => d.status !== "cancelled").reduce((s,d) => s+d.total, 0))}`, c: "#8b5cf6" }, { ic: "pin", l: "Kecamatan", v: [...new Set(activePk.map(p => p.kec))].length, c: "#0ea5e9" }, { ic: "target", l: "Pending", v: pendDist.length, c: pendDist.length > 0 ? "#f59e0b" : "#10b981" }].map((c,i) => (
                <div key={i} style={{ background: "var(--card)", borderRadius: 14, padding: 16, border: "1px solid var(--border)" }}>
                  <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c.c}15`, color: c.c, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 8 }}><Ic name={c.ic} size={16}/></div>
                  <div className="mono" style={{ fontSize: 20, fontWeight: 700 }}>{c.v}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 500 }}>{c.l}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, background: "var(--card2)", borderRadius: 12, padding: 4, marginBottom: 20, border: "1px solid var(--border)" }}>
              {[{ id: "dir", l: "Direktori" }, { id: "dist", l: "Distribusi" }, { id: "perf", l: "Performa" }].map(t => (
                <button key={t.id} onClick={() => setPkTab(t.id)} style={{ padding: "9px 18px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.2s", background: pkTab === t.id ? "var(--card)" : "transparent", color: pkTab === t.id ? "var(--text)" : "var(--text-dim)", boxShadow: pkTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none" }}>{t.l}</button>
              ))}
            </div>

            {/* DIR */}
            {pkTab === "dir" && <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16 }}>
              {pangkalan.filter(pk => !search || pk.name.toLowerCase().includes(search.toLowerCase()) || pk.owner.toLowerCase().includes(search.toLowerCase())).map(pk => {
                const qp = pct(pk.qu, pk.qm); const qc = qp >= 90 ? "#ef4444" : qp >= 70 ? "#f59e0b" : "#10b981";
                return (
                  <div key={pk.id} style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden", transition: "all 0.3s" }}>
                    <div style={{ padding: "16px 18px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}><span style={{ fontSize: 15, fontWeight: 700 }}>{pk.name}</span><Badge status={pk.status} map={PSTATUS}/></div>
                        <div style={{ fontSize: 12, color: "var(--text-dim)", fontWeight: 500 }}>{pk.owner}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4, fontSize: 11, color: "var(--text-dim)" }}><Ic name="phone" size={12}/> {pk.phone}</div>
                      </div>
                      <Donut value={pk.qu} max={pk.qm} size={54} stroke={5} color={qc}><span className="mono" style={{ fontSize: 11, fontWeight: 800, color: qc }}>{qp}%</span></Donut>
                    </div>
                    <div style={{ padding: "14px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--text-dim)", marginBottom: 12 }}><Ic name="pin" size={12}/> {pk.addr}</div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 12 }}>
                        {[{ l: "3 kg", v: pk.s3, c: "#f97316" }, { l: "5.5 kg", v: pk.s5, c: "#6366f1" }, { l: "12 kg", v: pk.s12, c: "#10b981" }].map((s,i) => (
                          <div key={i} style={{ textAlign: "center", background: "var(--card2)", borderRadius: 10, padding: "8px 4px" }}><div className="mono" style={{ fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</div></div>
                        ))}
                      </div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div style={{ fontSize: 11, color: "var(--text-dim)" }}>{pk.qu}/{pk.qm} kuota (3 kg)</div>
                        <Stars n={pk.rating} />
                      </div>
                      {pk.ld && <div style={{ marginTop: 8, fontSize: 10, color: "var(--text-dim)" }}>Terakhir: {fmtDT(pk.ld)}</div>}
                    </div>
                    <div style={{ padding: "12px 18px", borderTop: "1px solid var(--border)", display: "flex", gap: 6, flexWrap: "wrap" }}>
                      <button onClick={() => setModal({ t: "distribute", d: pk })} style={{ background: `${theme["--accent2"]}15`, color: "var(--accent2)", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><Ic name="send" size={12}/> Kirim</button>
                      <button onClick={() => setDetailPk(pk)} style={{ background: "var(--hover)", color: "var(--text-dim)", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 4 }}><Ic name="eye" size={12}/> Detail</button>
                      <button onClick={() => togPk(pk.id)} style={{ marginLeft: "auto", background: pk.status === "active" ? "#ef444410" : "#10b98110", color: pk.status === "active" ? "#ef4444" : "#10b981", border: "none", borderRadius: 8, padding: "6px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>{pk.status === "active" ? "Tangguhkan" : "Aktifkan"}</button>
                    </div>
                  </div>
                );
              })}
            </div>}

            {/* DIST */}
            {pkTab === "dist" && <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}><div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["#","Tanggal","Pangkalan","3 kg","5.5 kg","12 kg","Total","Nilai","Status","Aksi"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
                <tbody>{dist.filter(d => !search || d.pkname.toLowerCase().includes(search.toLowerCase())).map(d => <tr key={d.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="mono" style={{ padding: "12px 16px", fontSize: 12, color: "var(--text-dim)" }}>#{d.id}</td><td style={{ padding: "12px 16px", fontSize: 12 }}>{fmtDate(d.date)}</td><td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600 }}>{d.pkname}</td>
                  <td className="mono" style={{ padding: "12px 16px", fontSize: 13 }}>{d.q3||"-"}</td><td className="mono" style={{ padding: "12px 16px", fontSize: 13 }}>{d.q5||"-"}</td><td className="mono" style={{ padding: "12px 16px", fontSize: 13 }}>{d.q12||"-"}</td>
                  <td className="mono" style={{ padding: "12px 16px", fontWeight: 600 }}>{d.total}</td><td className="mono" style={{ padding: "12px 16px", fontSize: 13, fontWeight: 500 }}>{fmtRp(d.val)}</td><td style={{ padding: "12px 16px" }}><Badge status={d.status} map={DSTATUS}/></td>
                  <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", gap: 4 }}>
                    {d.status === "pending" && <button onClick={() => upDist(d.id,"dispatched")} style={{ background: "#6366f115", color: "#6366f1", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="truck" size={14}/></button>}
                    {d.status === "dispatched" && <button onClick={() => upDist(d.id,"received")} style={{ background: "#10b98115", color: "#10b981", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="check" size={14}/></button>}
                    {(d.status === "pending" || d.status === "dispatched") && <button onClick={() => upDist(d.id,"cancelled")} style={{ background: "#ef444415", color: "#ef4444", border: "none", borderRadius: 6, padding: "4px 8px", cursor: "pointer", display: "flex" }}><Ic name="x" size={14}/></button>}
                  </div></td>
                </tr>)}</tbody></table>
            </div></div>}

            {/* PERF */}
            {pkTab === "perf" && <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}><div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Pangkalan","Status","Rating","Kuota","Total Distribusi","Stok","Bergabung"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 16px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
                <tbody>{pangkalan.slice().sort((a,b) => b.td-a.td).map(pk => { const qp = pct(pk.qu,pk.qm); return (
                  <tr key={pk.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "12px 16px" }}><div style={{ fontWeight: 600, fontSize: 13 }}>{pk.name}</div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>{pk.owner}</div></td>
                    <td style={{ padding: "12px 16px" }}><Badge status={pk.status} map={PSTATUS}/></td><td style={{ padding: "12px 16px" }}><Stars n={pk.rating}/></td>
                    <td style={{ padding: "12px 16px" }}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><div style={{ flex: 1, maxWidth: 70, height: 5, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 3, width: `${clamp(qp,0,100)}%`, background: qp>=90?"#ef4444":qp>=70?"#f59e0b":"#10b981", transition: "width 0.5s" }}/></div><span className="mono" style={{ fontSize: 11, fontWeight: 600, color: "var(--text-dim)" }}>{qp}%</span></div></td>
                    <td className="mono" style={{ padding: "12px 16px", fontWeight: 600 }}>{fmt(pk.td)}</td><td className="mono" style={{ padding: "12px 16px", fontSize: 12 }}>{pk.s3+pk.s5+pk.s12}</td><td style={{ padding: "12px 16px", fontSize: 12 }}>{fmtDate(pk.join)}</td>
                  </tr>); })}</tbody></table>
            </div></div>}
          </div>)}

          {/* ═══ STOCK ═══ */}
          {page === "stock" && (<div style={{ animation: "fadeIn .3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Stok Barang</h2>
              <button onClick={() => setModal({ t: "addProd" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="plus" size={14}/> Tambah</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 16 }}>
              {products.map(p => { const pr = Math.min((p.stock / (p.min * 5)) * 100, 100); const low = p.stock <= p.min; const totalSold = del.filter(o => o.pid === p.id).reduce((s,o) => s+o.qty, 0); return (
                <div key={p.id} style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 18, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: low ? "#ef4444" : "#10b981", opacity: 0.6 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                    <div><div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{p.name}</div><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: p.type === "subsidi" ? "#10b98115" : "var(--card2)", color: p.type === "subsidi" ? "#10b981" : "var(--text-dim)" }}>{p.type === "subsidi" ? "SUBSIDI" : "NON-SUBSIDI"}</span></div>
                    {low && <div style={{ color: "#ef4444", animation: "pulse 2s infinite" }}><Ic name="alert" size={20}/></div>}
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10, marginBottom: 14 }}>
                    <div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Jual</div><div className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{fmtRp(p.price)}</div></div>
                    <div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Beli</div><div className="mono" style={{ fontSize: 14, fontWeight: 700, color: "var(--text-dim)" }}>{fmtRp(p.cost)}</div></div>
                    <div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Margin</div><div className="mono" style={{ fontSize: 14, fontWeight: 700, color: "#10b981" }}>+{fmtRp(p.price - p.cost)}</div></div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: low ? "#ef4444" : "var(--text-dim)" }}>Stok: {p.stock} (min: {p.min})</span>
                    <span style={{ fontSize: 11, color: "var(--text-dim)" }}>Terjual: {totalSold}</span>
                  </div>
                  <div style={{ height: 5, borderRadius: 3, background: "var(--border)", overflow: "hidden", marginBottom: 14 }}><div style={{ height: "100%", borderRadius: 3, width: `${pr}%`, background: low ? "linear-gradient(90deg,#ef4444,#f97316)" : "linear-gradient(90deg,#10b981,#34d399)", transition: "width 0.8s" }}/></div>
                  <button onClick={() => setModal({ t: "restock", d: p })} style={{ width: "100%", background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "8px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 4, color: "var(--text)" }}><Ic name="plus" size={14}/> Tambah Stok</button>
                </div>
              ); })}
            </div>
          </div>)}

          {/* ═══ CUSTOMERS ═══ */}
          {page === "customers" && (<div style={{ animation: "fadeIn .3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Data Pelanggan</h2>
              <button onClick={() => setModal({ t: "addCust" })} style={{ background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff", border: "none", borderRadius: 10, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }}><Ic name="plus" size={14}/> Tambah</button>
            </div>
            <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}><div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Nama","Telepon","Alamat","Tipe","Orders"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 18px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
                <tbody>{customers.filter(c => !search || c.name.toLowerCase().includes(search.toLowerCase())).map(c => <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 18px", fontSize: 13, fontWeight: 600 }}>{c.name}</td><td className="mono" style={{ padding: "12px 18px", fontSize: 12 }}>{c.phone}</td><td style={{ padding: "12px 18px", fontSize: 12, maxWidth: 200 }}>{c.addr}</td>
                  <td style={{ padding: "12px 18px" }}><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: c.type === "rumah_tangga" ? "#3b82f615" : "#8b5cf615", color: c.type === "rumah_tangga" ? "#3b82f6" : "#8b5cf6" }}>{c.type === "rumah_tangga" ? "Rumah Tangga" : "Usaha Mikro"}</span></td>
                  <td className="mono" style={{ padding: "12px 18px", fontWeight: 700 }}>{c.orders}×</td>
                </tr>)}</tbody></table>
            </div></div>
          </div>)}

          {/* ═══ ANALYTICS & PREDICTIVE AI ═══ */}
          {page === "analytics" && (<div style={{ animation: "fadeIn .3s" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}><div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#8b5cf6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Ic name="brain" size={18}/></div><h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em" }}>Analytics & Prediktif AI</h2></div>
                <p style={{ fontSize: 12, color: "var(--text-dim)" }}>Analisis data real-time, prediksi tren, dan rekomendasi cerdas berbasis model statistik</p>
              </div>
              <span style={{ fontSize: 10, fontWeight: 700, padding: "5px 12px", borderRadius: 20, background: "linear-gradient(135deg,#8b5cf620,#6366f120)", color: "#8b5cf6", border: "1px solid #8b5cf630", letterSpacing: ".03em" }}><Ic name="zap" size={10}/> AI-POWERED</span>
            </div>

            {/* ─ SECTION 1: PREDICTIVE REVENUE ─ */}
            <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 22, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Ic name="trend" size={16}/><span style={{ fontWeight: 700, fontSize: 15 }}>Prediksi Pendapatan — 7 Hari ke Depan</span></div>
              <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 16 }}>Model regresi linier berdasarkan data 30 hari terakhir. Area biru = prediksi.</p>
              <div style={{ display: "flex", gap: 20, flexWrap: "wrap", marginBottom: 18 }}>
                <div><div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Rata-rata Harian (30h)</div><div className="mono" style={{ fontSize: 22, fontWeight: 800, color: "#f97316" }}>{fmtRp(Math.round(last30Rev.reduce((a,b)=>a+b,0)/30))}</div></div>
                <div><div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Prediksi 7 Hari</div><div className="mono" style={{ fontSize: 22, fontWeight: 800, color: "#6366f1" }}>{fmtRp(predRevenue.reduce((a,b)=>a+b,0))}</div></div>
                <div><div style={{ fontSize: 10, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Tren</div><div style={{ fontSize: 22, fontWeight: 800, color: predRevenue[6] >= predRevenue[0] ? "#10b981" : "#ef4444" }}>{predRevenue[6] >= predRevenue[0] ? "↑ Naik" : "↓ Turun"}</div></div>
              </div>
              <AreaChart data={[...last30Rev, ...predRevenue]} labels={[...day30Labels.filter((_,i) => i % 5 === 0), "P1","P3","P5","P7"]} color="#6366f1" h={180} />
              <div style={{ display: "flex", gap: 12, marginTop: 10, fontSize: 10, color: "var(--text-dim)" }}><span style={{ display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 12, height: 3, borderRadius: 2, background: "#6366f1" }}/>Data aktual + prediksi</span></div>
            </div>

            {/* ─ SECTION 2: STOCK DEPLETION FORECAST ─ */}
            <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 22, marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Ic name="activity" size={16}/><span style={{ fontWeight: 700, fontSize: 15 }}>Prakiraan Kehabisan Stok</span></div>
              <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 18 }}>Estimasi hari hingga stok habis berdasarkan rata-rata penjualan harian. Kurva menunjukkan proyeksi 14 hari.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 16 }}>
                {stockForecasts.map(sf => {
                  const urgColor = sf.urgency === "critical" ? "#ef4444" : sf.urgency === "warning" ? "#f59e0b" : "#10b981";
                  return (
                    <div key={sf.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 16, border: `1px solid ${urgColor}20`, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: urgColor, opacity: 0.6 }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                        <div><div style={{ fontSize: 14, fontWeight: 700 }}>{sf.name}</div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>{sf.dailySales} tabung/hari</div></div>
                        <div style={{ textAlign: "right" }}><div className="mono" style={{ fontSize: 24, fontWeight: 800, color: urgColor }}>{sf.daysLeft > 90 ? "90+" : sf.daysLeft}</div><div style={{ fontSize: 9, fontWeight: 700, color: urgColor, textTransform: "uppercase" }}>{sf.urgency === "critical" ? "KRITIS!" : sf.urgency === "warning" ? "Perhatian" : "Aman"} hari</div></div>
                      </div>
                      <Spark data={sf.depletion} color={urgColor} w={220} h={36} fill />
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6, fontSize: 10, color: "var(--text-dim)" }}><span>Hari ini: {sf.stock}</span><span>14 hari: ~{sf.depletion[13]}</span></div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(380px,1fr))", gap: 16, marginBottom: 20 }}>
              {/* ─ SECTION 3: ORDER PATTERN ANALYSIS ─ */}
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Ic name="pie" size={16}/><span style={{ fontWeight: 700, fontSize: 15 }}>Pola Pesanan</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 18 }}>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Fulfillment Rate</div><div className="mono" style={{ fontSize: 22, fontWeight: 800, color: "#10b981" }}>{fulfillment.rate}%</div></div>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Cancel Rate</div><div className="mono" style={{ fontSize: 22, fontWeight: 800, color: "#ef4444" }}>{fulfillment.cancelRate}%</div></div>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Rata-rata Order</div><div className="mono" style={{ fontSize: 22, fontWeight: 800 }}>{fmtRp(fulfillment.avgOrderValue)}</div></div>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Jam Puncak</div><div className="mono" style={{ fontSize: 22, fontWeight: 800, color: "#8b5cf6" }}>{fulfillment.peakHour}:00</div></div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Distribusi Pesanan per Hari</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 70 }}>
                  {fulfillment.weekDist.map((v, i) => { const max = Math.max(...fulfillment.weekDist, 1); return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
                      <span className="mono" style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)" }}>{v}</span>
                      <div style={{ width: "100%", height: `${(v/max)*50}px`, borderRadius: 4, background: v === Math.max(...fulfillment.weekDist) ? "#8b5cf6" : "var(--accent)", opacity: 0.3 + (v/max)*0.7, transition: "height 0.5s" }} />
                      <span style={{ fontSize: 9, fontWeight: 600, color: "var(--text-dim)" }}>{fulfillment.dayNames[i]}</span>
                    </div>
                  ); })}
                </div>
                <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-dim)", padding: "8px 12px", background: "var(--card2)", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 }}><Ic name="zap" size={12}/> Hari tersibuk: <strong style={{ color: "var(--text)" }}>{fulfillment.peakDay}</strong> — optimalkan stok & pengiriman di hari ini.</div>
              </div>

              {/* ─ SECTION 4: CUSTOMER SEGMENTATION ─ */}
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Ic name="users" size={16}/><span style={{ fontWeight: 700, fontSize: 15 }}>Segmentasi Pelanggan</span></div>
                <div style={{ display: "flex", gap: 16, marginBottom: 18 }}>
                  <Donut value={custAnalytics.custByType.rumah_tangga} max={customers.length} size={90} stroke={10} color="#3b82f6">
                    <div style={{ textAlign: "center" }}><div className="mono" style={{ fontSize: 16, fontWeight: 800 }}>{custAnalytics.custByType.rumah_tangga}</div><div style={{ fontSize: 8, color: "var(--text-dim)" }}>RT</div></div>
                  </Donut>
                  <Donut value={custAnalytics.custByType.usaha_mikro} max={customers.length} size={90} stroke={10} color="#8b5cf6">
                    <div style={{ textAlign: "center" }}><div className="mono" style={{ fontSize: 16, fontWeight: 800 }}>{custAnalytics.custByType.usaha_mikro}</div><div style={{ fontSize: 8, color: "var(--text-dim)" }}>UMKM</div></div>
                  </Donut>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, marginBottom: 6 }}>Revenue per Segmen</div>
                    {[{ l: "Rumah Tangga", v: custAnalytics.revByType.rumah_tangga, c: "#3b82f6" }, { l: "Usaha Mikro", v: custAnalytics.revByType.usaha_mikro, c: "#8b5cf6" }].map((s,i) => (
                      <div key={i} style={{ marginBottom: 8 }}><div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, marginBottom: 3 }}><span style={{ color: s.c, fontWeight: 600 }}>{s.l}</span><span className="mono" style={{ fontWeight: 600 }}>{fmtRp(s.v)}</span></div><div style={{ height: 5, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 3, width: `${pct(s.v, rev)}%`, background: s.c, transition: "width 0.5s" }}/></div></div>
                    ))}
                  </div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Top Pelanggan (Pareto)</div>
                {custAnalytics.sorted.slice(0,5).map((c,i) => (
                  <div key={c.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 0", borderBottom: "1px solid var(--border)" }}>
                    <span className="mono" style={{ fontSize: 14, fontWeight: 800, color: i<3 ? "#f97316" : "var(--text-dim)", width: 22 }}>#{i+1}</span>
                    <div style={{ flex: 1 }}><div style={{ fontSize: 12, fontWeight: 600 }}>{c.name}</div></div>
                    <span className="mono" style={{ fontSize: 12, fontWeight: 700 }}>{c.orders} order</span>
                    <span style={{ fontSize: 10, fontWeight: 600, padding: "2px 6px", borderRadius: 4, background: c.type === "rumah_tangga" ? "#3b82f615" : "#8b5cf615", color: c.type === "rumah_tangga" ? "#3b82f6" : "#8b5cf6" }}>{c.type === "rumah_tangga" ? "RT" : "UMKM"}</span>
                  </div>
                ))}
                <div style={{ marginTop: 12, fontSize: 11, color: "var(--text-dim)", padding: "8px 12px", background: "var(--card2)", borderRadius: 8, display: "flex", alignItems: "center", gap: 6 }}><Ic name="target" size={12}/> Top 3 pelanggan = <strong style={{ color: "var(--text)" }}>{custAnalytics.top3Pct}%</strong> total pesanan. Fokus retensi pada segmen ini.</div>
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 16, marginBottom: 20 }}>
              {/* ─ SECTION 5: PANGKALAN COVERAGE ─ */}
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}><Ic name="layers" size={16}/><span style={{ fontWeight: 700, fontSize: 15 }}>Cakupan Pangkalan</span></div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Avg Rating</div><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{pkAnalytics.avgRating} ★</div></div>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Kuota Terpakai</div><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: pkAnalytics.quotaPct >= 80 ? "#ef4444" : "#10b981" }}>{pkAnalytics.quotaPct}%</div></div>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Hampir Penuh</div><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: "#f59e0b" }}>{pkAnalytics.overQuota}</div></div>
                  <div style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Kecamatan</div><div className="mono" style={{ fontSize: 20, fontWeight: 800 }}>{Object.keys(pkAnalytics.byKec).length}</div></div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Distribusi per Kecamatan</div>
                {Object.entries(pkAnalytics.byKec).sort((a,b) => b[1].dist - a[1].dist).map(([kec, data]) => {
                  const maxD = Math.max(...Object.values(pkAnalytics.byKec).map(v => v.dist), 1);
                  return (
                    <div key={kec} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}><span style={{ fontWeight: 600 }}>{kec} <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>({data.count} pangkalan)</span></span><span className="mono" style={{ fontWeight: 600, fontSize: 11 }}>{fmt(data.dist)} tabung</span></div>
                      <div style={{ height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 3, width: `${(data.dist/maxD)*100}%`, background: "linear-gradient(90deg,#8b5cf6,#6366f1)", transition: "width 0.5s" }}/></div>
                    </div>
                  );
                })}
              </div>

              {/* ─ SECTION 6: ANOMALY DETECTION ─ */}
              <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 22 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}><Ic name="alert" size={16}/><span style={{ fontWeight: 700, fontSize: 15 }}>Deteksi Anomali</span></div>
                <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 16 }}>Hari dengan pesanan &gt; 2σ di atas rata-rata (z-score)</p>
                {anomalies.length === 0 ? (
                  <div style={{ background: "#10b98110", borderRadius: 12, padding: 20, textAlign: "center" }}><div style={{ color: "#10b981", marginBottom: 4 }}><Ic name="check" size={24}/></div><div style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>Tidak ada anomali terdeteksi</div><div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 4 }}>Semua data pesanan 30 hari terakhir dalam rentang normal</div></div>
                ) : (
                  <div>{anomalies.map((a, i) => { const d = new Date(); d.setDate(d.getDate() - (29 - a.day)); return (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#ef444410", borderRadius: 10, marginBottom: 8, border: "1px solid #ef444420" }}>
                      <div style={{ width: 8, height: 8, borderRadius: 4, background: "#ef4444", flexShrink: 0, animation: "pulse 2s infinite" }} />
                      <div style={{ flex: 1 }}><div style={{ fontSize: 13, fontWeight: 600 }}>{fmtDate(d)}</div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>Rata-rata: {a.mean} pesanan/hari</div></div>
                      <div className="mono" style={{ fontSize: 20, fontWeight: 800, color: "#ef4444" }}>{a.val}</div>
                    </div>
                  ); })}</div>
                )}

                <div style={{ marginTop: 20, fontSize: 12, fontWeight: 700, marginBottom: 8 }}>Prediksi Pesanan 7 Hari</div>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 80 }}>
                  {predOrders.map((v, i) => { const max = Math.max(...predOrders, 1); const d = new Date(); d.setDate(d.getDate() + i + 1); return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
                      <span className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#6366f1" }}>{v}</span>
                      <div style={{ width: "100%", borderRadius: 4, height: `${(v/max)*50}px`, background: "linear-gradient(180deg,#6366f1,#8b5cf6)", opacity: 0.7 + (i/7)*0.3, transition: "height 0.5s" }} />
                      <span style={{ fontSize: 8, color: "var(--text-dim)", fontWeight: 600 }}>{d.toLocaleDateString("id-ID", { weekday: "short" })}</span>
                    </div>
                  ); })}
                </div>
              </div>
            </div>

            {/* ─ SECTION 7: AI RECOMMENDATIONS ─ */}
            <div style={{ background: "linear-gradient(135deg,var(--card),var(--card2))", borderRadius: 16, border: "1px solid var(--border)", padding: 22 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}><div style={{ width: 28, height: 28, borderRadius: 8, background: "linear-gradient(135deg,#8b5cf6,#6366f1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}><Ic name="brain" size={14}/></div><span style={{ fontWeight: 700, fontSize: 15 }}>Rekomendasi AI</span><span style={{ fontSize: 10, fontWeight: 600, color: "#8b5cf6", padding: "2px 8px", borderRadius: 4, background: "#8b5cf610" }}>Auto-generated</span></div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
                {[
                  ...(lowStock.length > 0 ? [{ ic: "alert", c: "#ef4444", t: "Restock Mendesak", d: `${lowStock.map(p => p.name).join(", ")} di bawah stok minimum. Segera lakukan pemesanan ke supplier.`, tag: "URGENT" }] : []),
                  ...(stockForecasts.filter(s => s.urgency === "critical").length > 0 ? [{ ic: "activity", c: "#f59e0b", t: "Stok Kritis dalam 7 Hari", d: `${stockForecasts.filter(s => s.urgency === "critical").map(s => s.name).join(", ")} diprediksi habis dalam 7 hari berdasarkan tren penjualan.`, tag: "WARNING" }] : []),
                  { ic: "target", c: "#10b981", t: "Optimalisasi Pelanggan", d: `Top 3 pelanggan menyumbang ${custAnalytics.top3Pct}% pesanan. Pertimbangkan program loyalitas untuk mempertahankan segmen ini.`, tag: "GROWTH" },
                  { ic: "store", c: "#6366f1", t: "Ekspansi Pangkalan", d: `${Object.entries(pkAnalytics.byKec).sort((a,b) => a[1].count - b[1].count)[0]?.[0] || "Kecamatan baru"} memiliki coverage terendah. Pertimbangkan penambahan pangkalan.`, tag: "STRATEGY" },
                  ...(pkAnalytics.overQuota > 0 ? [{ ic: "gauge", c: "#8b5cf6", t: "Kuota Pangkalan", d: `${pkAnalytics.overQuota} pangkalan mendekati batas kuota bulanan (>90%). Review alokasi kuota bulan depan.`, tag: "REVIEW" }] : []),
                  { ic: "trend", c: "#f97316", t: `Hari Puncak: ${fulfillment.peakDay}`, d: `Pesanan paling banyak di hari ${fulfillment.peakDay} (jam ${fulfillment.peakHour}:00). Pastikan stok dan armada pengiriman siap.`, tag: "INSIGHT" },
                ].map((r, i) => (
                  <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 16, border: "1px solid var(--border)", display: "flex", gap: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${r.c}15`, color: r.c, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic name={r.ic} size={16}/></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}><span style={{ fontSize: 13, fontWeight: 700 }}>{r.t}</span><span style={{ fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: `${r.c}15`, color: r.c }}>{r.tag}</span></div>
                      <div style={{ fontSize: 11, color: "var(--text-dim)", lineHeight: 1.5 }}>{r.d}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>)}
          {page === "delivery" && (<div style={{ animation: "fadeIn .3s" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Pengiriman</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
              {orders.filter(o => o.status === "confirmed").length === 0 && <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 40, textAlign: "center", gridColumn: "1/-1" }}><div style={{ color: "var(--text-dim)", marginBottom: 8 }}><Ic name="truck" size={32}/></div><div style={{ fontSize: 14, fontWeight: 600, color: "var(--text-dim)" }}>Tidak ada pengiriman menunggu</div></div>}
              {orders.filter(o => o.status === "confirmed").map(o => (
                <div key={o.id} style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 18, position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "#6366f1", opacity: 0.5 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}><div><div className="mono" style={{ fontSize: 11, color: "#6366f1", fontWeight: 700 }}>PESANAN #{o.id}</div><div style={{ fontSize: 15, fontWeight: 700, marginTop: 2 }}>{o.cname}</div></div><Badge status={o.status}/></div>
                  <div style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 4 }}>{o.pname} × {o.qty} tabung</div>
                  <div className="mono" style={{ fontSize: 15, fontWeight: 700, marginBottom: 10 }}>{fmtRp(o.total)}</div>
                  <div style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 14, display: "flex", alignItems: "center", gap: 4 }}><Ic name="pin" size={12}/> {customers.find(c => c.id === o.cid)?.addr || "-"}</div>
                  <button onClick={() => upOrd(o.id, "delivered")} style={{ width: "100%", background: "linear-gradient(135deg,#10b981,#059669)", color: "#fff", border: "none", borderRadius: 10, padding: "9px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}><Ic name="check" size={14}/> Tandai Terkirim</button>
                </div>
              ))}
            </div>
          </div>)}

          {/* ═══ FINANCE ═══ */}
          {page === "finance" && (<div style={{ animation: "fadeIn .3s" }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 20 }}>Laporan Keuangan</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 14, marginBottom: 24 }}>
              {[{ ic: "wallet", l: "Pendapatan", v: fmtRp(rev), c: "#f97316", sp: last7Rev }, { ic: "trend", l: "Keuntungan", v: fmtRp(profit), c: "#10b981", sp: last7Rev.map(v => v * 0.26) }, { ic: "cart", l: "Pesanan Selesai", v: del.length, c: "#6366f1" }, { ic: "clock", l: "Pending", v: pend.length, c: "#f59e0b" }].map((c,i) => (
                <div key={i} style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 18 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}><div style={{ width: 32, height: 32, borderRadius: 8, background: `${c.c}15`, color: c.c, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={c.ic} size={16}/></div>{c.sp && <Spark data={c.sp} color={c.c} fill />}</div>
                  <div className="mono" style={{ fontSize: 20, fontWeight: 700 }}>{c.v}</div><div style={{ fontSize: 11, color: "var(--text-dim)", marginTop: 2 }}>{c.l}</div>
                </div>
              ))}
            </div>
            <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", padding: 20, marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 16 }}>Tren Keuntungan 7 Hari</div>
              <AreaChart data={last7Rev.map(v => v * 0.26)} labels={dayLabels} color="#10b981" h={160} />
            </div>
            <div style={{ background: "var(--card)", borderRadius: 16, border: "1px solid var(--border)", overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, fontSize: 14 }}>Rincian per Produk</div>
              <div style={{ overflowX: "auto" }}><table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Produk","Terjual","Pendapatan","Keuntungan","Margin"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 18px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
                <tbody>{products.map(p => { const s = del.filter(o => o.pid === p.id); const r = s.reduce((a,o) => a+o.total, 0); const pr = s.reduce((a,o) => a+o.profit, 0); const q = s.reduce((a,o) => a+o.qty, 0); return (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}><td style={{ padding: "12px 18px", fontWeight: 600, fontSize: 13 }}>{p.name}</td><td style={{ padding: "12px 18px" }}>{q} tabung</td><td className="mono" style={{ padding: "12px 18px", fontWeight: 500 }}>{fmtRp(r)}</td><td className="mono" style={{ padding: "12px 18px", fontWeight: 600, color: "#10b981" }}>{fmtRp(pr)}</td><td style={{ padding: "12px 18px" }}><span style={{ fontSize: 11, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: "#10b98115", color: "#10b981" }}>{pct(pr,r)}%</span></td></tr>
                ); })}</tbody></table></div>
            </div>
          </div>)}
        </div>
      </div>

      {/* ═══ MODALS ═══ */}
      <Modal open={modal.t === "addOrder"} onClose={() => setModal({t:null})} title="Pesanan Baru" wide><OrderForm products={products} customers={customers} onSubmit={addOrder} onClose={() => setModal({t:null})} /></Modal>
      <Modal open={modal.t === "addProd"} onClose={() => setModal({t:null})} title="Tambah Produk"><ProdForm onSubmit={addProd} onClose={() => setModal({t:null})} /></Modal>
      <Modal open={modal.t === "addCust"} onClose={() => setModal({t:null})} title="Tambah Pelanggan"><CustForm onSubmit={addCust} onClose={() => setModal({t:null})} /></Modal>
      <Modal open={modal.t === "restock"} onClose={() => setModal({t:null})} title={`Restock: ${modal.d?.name}`}><RestockForm product={modal.d} onSubmit={restock} onClose={() => setModal({t:null})} /></Modal>
      <Modal open={modal.t === "addPk"} onClose={() => setModal({t:null})} title="Pangkalan Baru" wide><PkForm onSubmit={addPk} onClose={() => setModal({t:null})} /></Modal>
      <Modal open={modal.t === "distribute"} onClose={() => setModal({t:null})} title="Distribusi Stok" wide><DistForm pks={activePk} products={products} pre={modal.d?.id} onSubmit={distribute} onClose={() => setModal({t:null})} /></Modal>

      {/* DETAIL PANEL */}
      {detailPk && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "flex-end", animation: "fadeIn .2s" }} onClick={() => setDetailPk(null)}>
          <div style={{ width: 500, maxWidth: "100%", background: "var(--card)", height: "100%", overflowY: "auto", boxShadow: "-8px 0 50px rgba(0,0,0,0.2)", animation: "slideLeft .3s cubic-bezier(.4,0,.2,1)", borderLeft: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
            <div style={{ padding: "20px 24px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}><h3 style={{ fontSize: 17, fontWeight: 800 }}>Detail Pangkalan</h3><button onClick={() => setDetailPk(null)} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>
            <div style={{ padding: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
                <div style={{ width: 52, height: 52, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 20 }}>{detailPk.owner.charAt(0)}</div>
                <div><div style={{ fontSize: 17, fontWeight: 700 }}>{detailPk.name}</div><div style={{ fontSize: 13, color: "var(--text-dim)" }}>{detailPk.owner}</div></div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
                {[{l:"Telepon",v:detailPk.phone},{l:"Kecamatan",v:detailPk.kec},{l:"Kelurahan",v:detailPk.kel},{l:"Bergabung",v:fmtDate(detailPk.join)}].map((x,i) => <div key={i} style={{ background: "var(--card2)", borderRadius: 10, padding: 12 }}><div style={{ fontSize: 9, fontWeight: 700, textTransform: "uppercase", color: "var(--text-dim)", letterSpacing: ".06em" }}>{x.l}</div><div style={{ fontSize: 13, fontWeight: 600, marginTop: 3 }}>{x.v}</div></div>)}
              </div>
              <div style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 20 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", marginBottom: 12 }}>STOK DI PANGKALAN</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                  {[{l:"3 kg",v:detailPk.s3,c:"#f97316"},{l:"5.5 kg",v:detailPk.s5,c:"#6366f1"},{l:"12 kg",v:detailPk.s12,c:"#10b981"}].map((s,i) => <div key={i} style={{ textAlign: "center" }}><div className="mono" style={{ fontSize: 26, fontWeight: 800, color: s.c }}>{s.v}</div><div style={{ fontSize: 10, color: "var(--text-dim)", fontWeight: 600 }}>{s.l}</div></div>)}
                </div>
              </div>
              <div style={{ fontSize: 11, fontWeight: 700, color: "var(--text-dim)", marginBottom: 10 }}>RIWAYAT DISTRIBUSI</div>
              {dist.filter(d => d.pkid === detailPk.id).slice(0,8).map(d => (
                <div key={d.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                  <div><div style={{ fontSize: 13, fontWeight: 600 }}>{d.q3>0?`${d.q3}×3kg `:""}{d.q5>0?`${d.q5}×5.5kg `:""}{d.q12>0?`${d.q12}×12kg`:""}</div><div style={{ fontSize: 10, color: "var(--text-dim)" }}>{fmtDT(d.date)}</div></div>
                  <Badge status={d.status} map={DSTATUS}/>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ═══ ROLE: KONSUMEN AKHIR (Pangkalan) ═══ */}
      {role && page === "consumers" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: 20, animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 800, maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", animation: "slideUp .3s" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 style={{ fontSize: 18, fontWeight: 800 }}>Data Konsumen Akhir (Subsidi)</h3><button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>
            <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 16 }}>Pendataan penerima LPG 3 kg bersubsidi sesuai regulasi BPH Migas</p>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["NIK","Nama","Alamat","Telepon","Tipe","Pembelian","Terakhir"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
                <tbody>{consumers.map(c => <tr key={c.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td className="mono" style={{ padding: "10px 14px", fontSize: 12 }}>{c.nik}</td><td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 13 }}>{c.name}</td><td style={{ padding: "10px 14px", fontSize: 12 }}>{c.addr}</td><td className="mono" style={{ padding: "10px 14px", fontSize: 12 }}>{c.phone}</td>
                  <td style={{ padding: "10px 14px" }}><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: c.type === "subsidi" ? "#10b98115" : "#6366f115", color: c.type === "subsidi" ? "#10b981" : "#6366f1" }}>{c.type === "subsidi" ? "SUBSIDI" : "NON-SUBSIDI"}</span></td>
                  <td className="mono" style={{ padding: "10px 14px", fontWeight: 600 }}>{c.purchases}×</td><td style={{ padding: "10px 14px", fontSize: 12 }}>{fmtDate(c.lastPurchase)}</td>
                </tr>)}</tbody></table>
            </div>
          </div>
        </div>
      )}

      {/* ═══ ROLE: ROUTES (Driver) ═══ */}
      {role && page === "routes" && (() => { const RC = ROLES.driver?.color || "#3b82f6"; return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: 20, animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 900, maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", animation: "slideUp .3s" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 style={{ fontSize: 18, fontWeight: 800 }}>Rute & Logistik</h3><button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
              {[{ l: "Rute Aktif", v: routes.filter(r=>r.status==="active").length, c: "#10b981" }, { l: "Total Jarak", v: `${routes.reduce((s,r)=>s+r.dist,0).toFixed(1)} km`, c: "#3b82f6" }, { l: "Tabung Terkirim", v: routes.reduce((s,r)=>s+r.loaded,0), c: "#f97316" }, { l: "Tabung Kosong", v: routes.reduce((s,r)=>s+r.empty,0), c: "#8b5cf6" }].map((s,i) => (
                <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</div><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div></div>
              ))}
            </div>
            {routes.map(r => (
              <div key={r.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 16, marginBottom: 12, border: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div><div style={{ fontSize: 15, fontWeight: 700 }}>{r.name}</div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>{r.driver} • {r.vehicle} • {r.dist} km • ~{r.est}</div></div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 6, background: r.status === "active" ? "#10b98120" : r.status === "completed" ? "#6366f120" : "#f59e0b20", color: r.status === "active" ? "#10b981" : r.status === "completed" ? "#6366f1" : "#f59e0b" }}>{r.status === "active" ? "Aktif" : r.status === "completed" ? "Selesai" : "Menunggu"}</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 10 }}>
                  {r.stops.map((s, i) => (<div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>{i > 0 && <span style={{ color: "var(--text-dim)", fontSize: 10 }}>→</span>}<span style={{ fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 6, background: "var(--card)", border: "1px solid var(--border)" }}>{s}</span></div>))}
                </div>
                <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
                  <span style={{ color: "#f97316" }}>Tabung isi: <strong>{r.loaded}</strong></span>
                  <span style={{ color: "#8b5cf6" }}>Tabung kosong: <strong>{r.empty}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ); })()}

      {/* ═══ ROLE: RECONCILIATION (Driver) ═══ */}
      {role && page === "reconciliation" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: 20, animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 950, maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", animation: "slideUp .3s" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 style={{ fontSize: 18, fontWeight: 800 }}>Rekonsiliasi Tabung</h3><button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
              {[{ l: "Total Dikirim", v: recon.reduce((s,r)=>s+r.sent,0), c: "#f97316" }, { l: "Terkirim", v: recon.reduce((s,r)=>s+r.delivered,0), c: "#10b981" }, { l: "Kosong Terkumpul", v: recon.reduce((s,r)=>s+r.emptyCollected,0), c: "#8b5cf6" }, { l: "Selisih", v: recon.reduce((s,r)=>s+r.diff,0), c: recon.reduce((s,r)=>s+r.diff,0) > 0 ? "#ef4444" : "#10b981" }].map((s,i) => (
                <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</div><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div></div>
              ))}
            </div>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}><thead><tr>{["Tanggal","Driver","Dikirim","Terkirim","Retur","Kosong↑","Kosong↓","Selisih","Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 14px", fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)" }}>{h}</th>)}</tr></thead>
                <tbody>{recon.map(r => <tr key={r.id} style={{ borderBottom: "1px solid var(--border)" }}>
                  <td style={{ padding: "10px 14px", fontSize: 12 }}>{fmtDate(r.date)}</td><td style={{ padding: "10px 14px", fontWeight: 600, fontSize: 13 }}>{r.driver}</td>
                  <td className="mono" style={{ padding: "10px 14px" }}>{r.sent}</td><td className="mono" style={{ padding: "10px 14px" }}>{r.delivered}</td><td className="mono" style={{ padding: "10px 14px" }}>{r.returned}</td>
                  <td className="mono" style={{ padding: "10px 14px" }}>{r.emptyCollected}</td><td className="mono" style={{ padding: "10px 14px" }}>{r.emptyReturned}</td>
                  <td className="mono" style={{ padding: "10px 14px", fontWeight: 700, color: r.diff > 0 ? "#ef4444" : "#10b981" }}>{r.diff > 0 ? `+${r.diff}` : r.diff}</td>
                  <td style={{ padding: "10px 14px" }}><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: r.status === "verified" ? "#10b98115" : r.status === "discrepancy" ? "#ef444415" : "#f59e0b15", color: r.status === "verified" ? "#10b981" : r.status === "discrepancy" ? "#ef4444" : "#f59e0b" }}>{r.status === "verified" ? "Terverifikasi" : r.status === "discrepancy" ? "Selisih!" : "Menunggu"}</span></td>
                </tr>)}</tbody></table>
            </div>
          </div>
        </div>
      )}

      {/* ═══ ROLE: SALES LEADS ═══ */}
      {role && page === "salesLeads" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: 20, animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 860, maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", animation: "slideUp .3s" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 style={{ fontSize: 18, fontWeight: 800 }}>Akuisisi Mitra Baru</h3><button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
              {[{ l: "Total Leads", v: leads.length, c: "#8b5cf6" }, { l: "Hot", v: leads.filter(l=>l.status==="hot").length, c: "#ef4444" }, { l: "Warm", v: leads.filter(l=>l.status==="warm").length, c: "#f59e0b" }, { l: "Cold", v: leads.filter(l=>l.status==="cold").length, c: "#6b7280" }].map((s,i) => (
                <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</div><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div></div>
              ))}
            </div>
            {leads.sort((a,b) => { const o = { hot: 0, warm: 1, cold: 2 }; return o[a.status] - o[b.status]; }).map(l => (
              <div key={l.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 16, marginBottom: 10, border: "1px solid var(--border)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 10, height: 10, borderRadius: 5, marginTop: 5, flexShrink: 0, background: l.status === "hot" ? "#ef4444" : l.status === "warm" ? "#f59e0b" : "#6b7280" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ fontSize: 14, fontWeight: 700 }}>{l.name}</div><div style={{ fontSize: 11, color: "var(--text-dim)" }}>{l.addr} • {l.phone}</div></div><span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 5, textTransform: "uppercase", background: l.type === "usaha_mikro" ? "#8b5cf615" : "#3b82f615", color: l.type === "usaha_mikro" ? "#8b5cf6" : "#3b82f6" }}>{l.type === "usaha_mikro" ? "UMKM" : "Komplek"}</span></div>
                  <div style={{ fontSize: 12, color: "var(--text)", marginTop: 6, padding: "6px 10px", background: "var(--card)", borderRadius: 8, border: "1px solid var(--border)" }}>{l.notes}</div>
                  <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 6 }}>Kontak terakhir: {fmtDate(l.lastContact)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ ROLE: MARKET MONITORING (Sales) ═══ */}
      {role && page === "market" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: 20, animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 700, maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", animation: "slideUp .3s" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 style={{ fontSize: 18, fontWeight: 800 }}>Monitoring Pasar</h3><button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 20 }}>
              {[{ l: "Cakupan Kecamatan", v: [...new Set(pangkalan.map(p=>p.kec))].length, c: "#3b82f6" }, { l: "Pangkalan Aktif", v: activePk.length, c: "#10b981" }, { l: "Potensi Mitra", v: leads.length, c: "#8b5cf6" }, { l: "Kompetitor Area", v: 3, c: "#f59e0b" }].map((s,i) => (
                <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 16, textAlign: "center" }}><div className="mono" style={{ fontSize: 28, fontWeight: 800, color: s.c }}>{s.v}</div><div style={{ fontSize: 11, color: "var(--text-dim)", fontWeight: 600 }}>{s.l}</div></div>
              ))}
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>Distribusi per Kecamatan</div>
            {[...new Set(pangkalan.map(p => p.kec))].map(kec => { const pks = pangkalan.filter(p => p.kec === kec); const tot = pks.reduce((s,p) => s+p.td, 0); return (
              <div key={kec} style={{ padding: "10px 0", borderBottom: "1px solid var(--border)" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: 4 }}><span style={{ fontWeight: 600 }}>{kec}</span><span className="mono" style={{ fontWeight: 600, fontSize: 12, color: "var(--text-dim)" }}>{pks.length} pangkalan • {fmt(tot)} tabung</span></div>
                <div style={{ display: "flex", gap: 4, flexWrap: "wrap" }}>{pks.map(p => <span key={p.id} style={{ fontSize: 10, padding: "2px 8px", borderRadius: 4, background: p.status === "active" ? "#10b98110" : "#ef444410", color: p.status === "active" ? "#10b981" : "#ef4444", fontWeight: 600 }}>{p.name}</span>)}</div>
              </div>
            ); })}
          </div>
        </div>
      )}

      {/* ═══ ROLE: COMPLIANCE (Owner) ═══ */}
      {role && page === "compliancePage" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "center", padding: 20, animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 800, maxHeight: "90vh", overflowY: "auto", border: "1px solid var(--border)", animation: "slideUp .3s" }} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}><h3 style={{ fontSize: 18, fontWeight: 800 }}>Kepatuhan & Regulasi</h3><button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button></div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: 12, marginBottom: 20 }}>
              {[{ l: "Aktif", v: compliance.filter(c=>c.status==="active").length, c: "#10b981" }, { l: "Segera Expire", v: compliance.filter(c=>c.status==="expiring").length, c: "#f59e0b" }, { l: "Overdue", v: compliance.filter(c=>c.status==="overdue").length, c: "#ef4444" }, { l: "Risiko Tinggi", v: compliance.filter(c=>c.risk==="high").length, c: "#ef4444" }].map((s,i) => (
                <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</div><div className="mono" style={{ fontSize: 20, fontWeight: 800, color: s.c }}>{s.v}</div></div>
              ))}
            </div>
            {compliance.sort((a,b) => { const o = { high:0, medium:1, low:2 }; return o[a.risk]-o[b.risk]; }).map(c => (
              <div key={c.id} style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 10, border: `1px solid ${c.risk==="high"?"#ef444430":c.risk==="medium"?"#f59e0b30":"var(--border)"}`, display: "flex", gap: 14, alignItems: "flex-start" }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: c.status==="active"?"#10b98115":c.status==="overdue"?"#ef444415":"#f59e0b15", color: c.status==="active"?"#10b981":c.status==="overdue"?"#ef4444":"#f59e0b", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Ic name={c.status==="active"?"check":c.status==="overdue"?"alert":"clock"} size={18}/></div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div><span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 5, textTransform: "uppercase", background: c.risk==="high"?"#ef444415":c.risk==="medium"?"#f59e0b15":"#10b98115", color: c.risk==="high"?"#ef4444":c.risk==="medium"?"#f59e0b":"#10b981" }}>RISK: {c.risk}</span></div>
                  <div style={{ display: "flex", gap: 16, marginTop: 6, fontSize: 11, color: "var(--text-dim)" }}><span>Dok: {c.doc}</span><span>Exp: {fmtDate(c.expiry)}</span><span style={{ fontWeight: 700, color: c.status==="active"?"#10b981":c.status==="overdue"?"#ef4444":"#f59e0b" }}>{c.status==="active"?"Aktif":c.status==="overdue"?"OVERDUE":"Segera Expire"}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ═══ HET COMPLIANCE CHECK ═══ */}
      {role && page === "het" && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: 20, overflowY: "auto", animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 960, border: "1px solid var(--border)", animation: "slideUp .3s", margin: "20px 0" }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#ef4444,#dc2626)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 20px rgba(239,68,68,0.3)" }}><Ic name="alert" size={24}/></div>
                <div><h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>HET Compliance Check</h3>
                  <p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>Monitoring Harga Eceran Tertinggi — {HET_CONFIG.region}</p>
                  <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>Dasar: {HET_CONFIG.authority} • Terakhir diperbarui: {fmtDate(HET_CONFIG.lastUpdated)}</div>
                </div>
              </div>
              <button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button>
            </div>

            {/* Summary Cards */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(170px,1fr))", gap: 12, marginBottom: 24 }}>
              {[
                { l: "Produk Dipantau", v: HET_CONFIG.rates.length, c: "#3b82f6", ic: "pkg" },
                { l: "Harga Sesuai HET", v: hetChecks.filter(h=>h.compliant).length, c: "#10b981", ic: "check" },
                { l: "Pelanggaran Aktif", v: hetViolations.length, c: hetViolations.length > 0 ? "#ef4444" : "#10b981", ic: "alert" },
                { l: "Flag Belum Resolved", v: openHetFlags.length, c: openHetFlags.length > 0 ? "#f59e0b" : "#10b981", ic: "clock" },
                { l: "Total Audit Trail", v: hetLog.length, c: "#8b5cf6", ic: "layers" },
              ].map((s,i) => (
                <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14, position: "relative", overflow: "hidden" }}>
                  {s.v > 0 && (s.l.includes("Pelanggaran") || s.l.includes("Flag")) && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: s.c }} />}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: `${s.c}15`, color: s.c, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={s.ic} size={12}/></div>
                    <span style={{ fontSize: 10, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</span>
                  </div>
                  <div className="mono" style={{ fontSize: 24, fontWeight: 800, color: s.c }}>{s.v}</div>
                </div>
              ))}
            </div>

            {/* Real-time Price Check */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 12, display: "flex", alignItems: "center", gap: 8 }}><Ic name="zap" size={16}/> Cek Harga Real-time vs HET</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 12 }}>
                {hetChecks.map(h => {
                  const hetRule = HET_CONFIG.rates.find(r => r.productId === h.id);
                  return (
                    <div key={h.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 16, border: `2px solid ${h.compliant ? "#10b98130" : "#ef444450"}`, position: "relative", overflow: "hidden" }}>
                      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: h.compliant ? "#10b981" : "#ef4444" }} />
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                        <div><div style={{ fontSize: 14, fontWeight: 700 }}>{h.name}</div><div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 2 }}>{h.type === "subsidi" ? "SUBSIDI" : "NON-SUBSIDI"}</div></div>
                        <div style={{ width: 36, height: 36, borderRadius: 10, background: h.compliant ? "#10b98115" : "#ef444415", color: h.compliant ? "#10b981" : "#ef4444", display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={h.compliant ? "check" : "alert"} size={18}/></div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                        <div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Harga Jual</div><div className="mono" style={{ fontSize: 16, fontWeight: 800, color: h.compliant ? "var(--text)" : "#ef4444" }}>{fmtRp(h.price)}</div></div>
                        <div><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>HET Pemda</div><div className="mono" style={{ fontSize: 16, fontWeight: 800, color: "#3b82f6" }}>{h.het ? fmtRp(h.het) : "N/A"}</div></div>
                      </div>
                      {!h.compliant && (
                        <div style={{ background: "#ef444410", borderRadius: 8, padding: "8px 12px", border: "1px solid #ef444420", display: "flex", alignItems: "center", gap: 8 }}>
                          <span style={{ fontSize: 16 }}>🚩</span>
                          <div><div style={{ fontSize: 12, fontWeight: 700, color: "#ef4444" }}>MELEBIHI HET +{fmtRp(h.diff)} ({h.pctOver}%)</div><div style={{ fontSize: 10, color: "var(--text-dim)" }}>Segera sesuaikan harga jual!</div></div>
                        </div>
                      )}
                      {h.compliant && (
                        <div style={{ background: "#10b98110", borderRadius: 8, padding: "8px 12px", border: "1px solid #10b98120", fontSize: 12, fontWeight: 600, color: "#10b981", display: "flex", alignItems: "center", gap: 6 }}><Ic name="check" size={14}/> Harga sesuai regulasi</div>
                      )}
                      {hetRule && <div style={{ fontSize: 10, color: "var(--text-dim)", marginTop: 8, fontStyle: "italic" }}>{hetRule.note}</div>}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Audit Trail */}
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 8 }}><Ic name="layers" size={16}/> Audit Trail Pelanggaran HET</div>
              <p style={{ fontSize: 11, color: "var(--text-dim)", marginBottom: 14 }}>Setiap kali harga jual melebihi HET saat input produk atau pesanan, sistem mencatat otomatis ke audit trail ini.</p>
              {hetLog.length === 0 ? (
                <div style={{ background: "#10b98110", borderRadius: 12, padding: 20, textAlign: "center" }}><div style={{ fontSize: 13, fontWeight: 700, color: "#10b981" }}>Tidak ada catatan pelanggaran HET</div></div>
              ) : (
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead><tr>{["Waktu","Aktor","Peran","Produk","Harga Jual","HET","Selisih","%","Status","Aksi"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
                    <tbody>{hetLog.map(l => (
                      <tr key={l.id} style={{ borderBottom: "1px solid var(--border)", background: l.action === "flagged" ? (dark ? "#ef44440a" : "#fef2f2") : "transparent" }}>
                        <td style={{ padding: "10px 12px", fontSize: 11 }}>{fmtDT(l.date)}</td>
                        <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600 }}>{l.actor}</td>
                        <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 9, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: "var(--card2)", color: "var(--text-dim)", textTransform: "uppercase" }}>{l.actorRole}</span></td>
                        <td style={{ padding: "10px 12px", fontSize: 12 }}>{l.productName}</td>
                        <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#ef4444" }}>{fmtRp(l.priceSold)}</td>
                        <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 500, color: "#3b82f6" }}>{fmtRp(l.het)}</td>
                        <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 700, color: "#ef4444" }}>+{fmtRp(l.diff)}</td>
                        <td className="mono" style={{ padding: "10px 12px", fontSize: 11, fontWeight: 700, color: "#ef4444" }}>+{l.pctOver}%</td>
                        <td style={{ padding: "10px 12px" }}>
                          {l.action === "flagged" ? <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: "#ef444415", color: "#ef4444", display: "inline-flex", alignItems: "center", gap: 3 }}>🚩 FLAGGED</span>
                            : <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: "#10b98115", color: "#10b981" }}>✓ RESOLVED</span>}
                          {l.action === "resolved" && l.resolvedAt && <div style={{ fontSize: 9, color: "var(--text-dim)", marginTop: 2 }}>oleh {l.resolvedBy}, {fmtDate(l.resolvedAt)}</div>}
                        </td>
                        <td style={{ padding: "10px 12px" }}>
                          {l.action === "flagged" && <button onClick={() => resolveHetFlag(l.id)} style={{ background: "#10b98115", color: "#10b981", border: "none", borderRadius: 6, padding: "4px 10px", fontSize: 10, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Resolve</button>}
                        </td>
                      </tr>
                    ))}</tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ═══ PAYMENT GATEWAY ═══ */}
      {role && page === "payment" && (() => {
        const settled = payments.filter(p => p.status === "settled");
        const pending = payments.filter(p => p.status === "pending");
        const failed = payments.filter(p => p.status === "failed");
        const totalSettled = settled.reduce((s,p) => s + p.amount, 0);
        const totalFee = settled.reduce((s,p) => s + p.fee, 0);
        const totalNet = settled.reduce((s,p) => s + p.net, 0);
        const byMethod = {};
        settled.forEach(p => { if (!byMethod[p.methodName]) byMethod[p.methodName] = { count: 0, amount: 0, color: p.methodColor }; byMethod[p.methodName].count++; byMethod[p.methodName].amount += p.amount; });
        const last7Pay = Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate()-(6-i)); const k = d.toDateString(); return settled.filter(p => new Date(p.date).toDateString()===k).reduce((s,p)=>s+p.amount,0); });
        return (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(6px)", zIndex: 50, display: "flex", justifyContent: "center", alignItems: "flex-start", padding: 20, overflowY: "auto", animation: "fadeIn .2s" }} onClick={() => setPage("dashboard")}>
          <div style={{ background: "var(--card)", borderRadius: 20, padding: 28, width: "100%", maxWidth: 1020, border: "1px solid var(--border)", animation: "slideUp .3s", margin: "20px 0" }} onClick={e => e.stopPropagation()}>
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#6366f1,#8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", boxShadow: "0 4px 20px rgba(99,102,241,0.3)" }}><Ic name="cc" size={24}/></div>
                <div><h3 style={{ fontSize: 20, fontWeight: 800, letterSpacing: "-0.03em" }}>Payment Gateway</h3><p style={{ fontSize: 12, color: "var(--text-dim)", marginTop: 2 }}>Kelola pembayaran digital — QRIS, Virtual Account, E-Wallet, COD</p></div>
              </div>
              <button onClick={() => setPage("dashboard")} style={{ background: "var(--hover)", border: "none", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--text-dim)", display: "flex" }}><Ic name="x" size={18}/></button>
            </div>

            {/* Tabs */}
            <div style={{ display: "flex", gap: 4, background: "var(--card2)", borderRadius: 12, padding: 4, marginBottom: 20, border: "1px solid var(--border)", overflowX: "auto" }}>
              {[{ id: "overview", l: "Overview" },{ id: "transactions", l: "Transaksi" },{ id: "providers", l: "Provider" },{ id: "paylink", l: "Payment Link" }].map(t => (
                <button key={t.id} onClick={() => setPgTab(t.id)} style={{ padding: "9px 18px", borderRadius: 9, fontSize: 12, fontWeight: 600, cursor: "pointer", border: "none", fontFamily: "inherit", transition: "all 0.2s", background: pgTab === t.id ? "var(--card)" : "transparent", color: pgTab === t.id ? "var(--text)" : "var(--text-dim)", boxShadow: pgTab === t.id ? "0 1px 4px rgba(0,0,0,0.06)" : "none", whiteSpace: "nowrap" }}>{t.l}</button>
              ))}
            </div>

            {/* OVERVIEW */}
            {pgTab === "overview" && (<div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(160px,1fr))", gap: 12, marginBottom: 20 }}>
                {[{ l: "Total Settled", v: fmtRp(totalSettled), c: "#10b981", ic: "check" },{ l: "Fee Gateway", v: fmtRp(totalFee), c: "#f59e0b", ic: "alert" },{ l: "Net Diterima", v: fmtRp(totalNet), c: "#6366f1", ic: "wallet" },{ l: "Pending", v: pending.length, c: "#f59e0b", ic: "clock" },{ l: "Gagal", v: failed.length, c: "#ef4444", ic: "x" },{ l: "Success Rate", v: `${pct(settled.length, payments.length)}%`, c: "#10b981", ic: "target" }].map((s,i) => (
                  <div key={i} style={{ background: "var(--card2)", borderRadius: 12, padding: 14 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}><div style={{ width: 22, height: 22, borderRadius: 6, background: `${s.c}15`, color: s.c, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={s.ic} size={11}/></div><span style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{s.l}</span></div>
                    <div className="mono" style={{ fontSize: 18, fontWeight: 800, color: s.c }}>{s.v}</div>
                  </div>
                ))}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 16 }}>
                <div style={{ background: "var(--card2)", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Tren Settlement 7 Hari</div>
                  <AreaChart data={last7Pay} labels={dayLabels} color="#6366f1" h={130} />
                </div>
                <div style={{ background: "var(--card2)", borderRadius: 14, padding: 18 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 14 }}>Volume per Metode</div>
                  {Object.entries(byMethod).sort((a,b) => b[1].amount-a[1].amount).map(([name,d]) => { const maxAmt = Math.max(...Object.values(byMethod).map(v=>v.amount),1); return (
                    <div key={name} style={{ marginBottom: 10 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}><span style={{ fontWeight: 600, color: d.color }}>{name} <span style={{ color: "var(--text-dim)", fontWeight: 400 }}>({d.count}×)</span></span><span className="mono" style={{ fontWeight: 600, fontSize: 11 }}>{fmtRp(d.amount)}</span></div>
                      <div style={{ height: 6, borderRadius: 3, background: "var(--border)", overflow: "hidden" }}><div style={{ height: "100%", borderRadius: 3, width: `${(d.amount/maxAmt)*100}%`, background: d.color, transition: "width 0.5s" }}/></div>
                    </div>
                  ); })}
                </div>
              </div>
            </div>)}

            {/* TRANSACTIONS */}
            {pgTab === "transactions" && (<div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead><tr>{["ID","Waktu","Customer","Ref Invoice","Metode","Amount","Fee","Net","Status"].map(h => <th key={h} style={{ textAlign: "left", padding: "10px 12px", fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", color: "var(--text-dim)", background: "var(--card2)", borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" }}>{h}</th>)}</tr></thead>
                <tbody>{payments.map(p => (
                  <tr key={p.id} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 11, color: "var(--text-dim)" }}>{p.id}</td>
                    <td style={{ padding: "10px 12px", fontSize: 11 }}>{fmtDT(p.date)}</td>
                    <td style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600 }}>{p.customer}</td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 10, color: "var(--text-dim)" }}>{p.ref}</td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: `${p.methodColor}15`, color: p.methodColor }}>{p.methodName}</span></td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600 }}>{fmtRp(p.amount)}</td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 11, color: "#f59e0b" }}>-{fmtRp(p.fee)}</td>
                    <td className="mono" style={{ padding: "10px 12px", fontSize: 12, fontWeight: 600, color: "#10b981" }}>{fmtRp(p.net)}</td>
                    <td style={{ padding: "10px 12px" }}><span style={{ fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: p.status==="settled"?"#10b98115":p.status==="pending"?"#f59e0b15":"#ef444415", color: p.status==="settled"?"#10b981":p.status==="pending"?"#f59e0b":"#ef4444" }}>{p.status==="settled"?"Settled":p.status==="pending"?"Pending":"Gagal"}</span></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>)}

            {/* PROVIDERS */}
            {pgTab === "providers" && (<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 14 }}>
              {PG_PROVIDERS.map(p => (
                <div key={p.id} style={{ background: "var(--card2)", borderRadius: 14, padding: 18, border: `1px solid ${p.active ? p.color+"30" : "var(--border)"}`, position: "relative", overflow: "hidden", opacity: p.active ? 1 : 0.55 }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: p.color, opacity: p.active ? 0.8 : 0.2 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 10, background: `${p.color}15`, color: p.color, display: "flex", alignItems: "center", justifyContent: "center" }}><Ic name={p.logo} size={18}/></div>
                      <div><div style={{ fontSize: 14, fontWeight: 700 }}>{p.name}</div><div style={{ fontSize: 10, color: "var(--text-dim)" }}>{p.desc}</div></div>
                    </div>
                    <span style={{ fontSize: 9, fontWeight: 700, padding: "3px 8px", borderRadius: 5, background: p.active ? "#10b98115" : "#ef444415", color: p.active ? "#10b981" : "#ef4444" }}>{p.active ? "AKTIF" : "NONAKTIF"}</span>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                    <div style={{ background: "var(--card)", borderRadius: 8, padding: 10 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Biaya</div><div className="mono" style={{ fontSize: 14, fontWeight: 700, color: p.fee === 0 ? "#10b981" : "var(--text)" }}>{p.feeType === "flat" ? fmtRp(p.fee) : p.fee === 0 ? "Gratis" : `${p.fee}%`}</div></div>
                    <div style={{ background: "var(--card)", borderRadius: 8, padding: 10 }}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>Transaksi</div><div className="mono" style={{ fontSize: 14, fontWeight: 700 }}>{payments.filter(t => t.method === p.id && t.status === "settled").length}×</div></div>
                  </div>
                </div>
              ))}
            </div>)}

            {/* PAYMENT LINK GENERATOR */}
            {pgTab === "paylink" && (<PayLinkGen providers={PG_PROVIDERS.filter(p=>p.active)} toast_={toast_} />)}
          </div>
        </div>
        );
      })()}

      </>)}

      {toast && <div style={{ position: "fixed", bottom: 24, right: 24, padding: "14px 24px", borderRadius: 12, fontSize: 13, fontWeight: 700, color: "#fff", zIndex: 100, animation: "slideUp .3s", boxShadow: "0 8px 30px rgba(0,0,0,0.3)", background: toast.type === "error" ? "linear-gradient(135deg,#dc2626,#b91c1c)" : "linear-gradient(135deg,#059669,#047857)" }}>{toast.msg}</div>}
    </div>
  );
}

// ─── FORM COMPONENTS ───
const FG = ({ label, children }) => <div style={{ marginBottom: 14 }}><label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "var(--text-dim)", marginBottom: 5 }}>{label}</label>{children}</div>;
const FI = props => <input {...props} style={{ width: "100%", padding: "9px 13px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 13, fontFamily: "inherit", color: "var(--text)", background: "var(--card2)", outline: "none", ...props.style }} />;
const FS = props => <select {...props} style={{ width: "100%", padding: "9px 13px", border: "1px solid var(--border)", borderRadius: 10, fontSize: 13, fontFamily: "inherit", color: "var(--text)", background: "var(--card2)", outline: "none", ...props.style }} />;
const FB = ({ primary, children, ...props }) => <button {...props} style={{ padding: "9px 18px", borderRadius: 10, fontSize: 13, fontWeight: 700, fontFamily: "inherit", border: "none", cursor: props.disabled ? "not-allowed" : "pointer", opacity: props.disabled ? 0.5 : 1, display: "flex", alignItems: "center", gap: 6, ...(primary ? { background: "linear-gradient(135deg,#f97316,#ea580c)", color: "#fff" } : { background: "var(--hover)", color: "var(--text-dim)" }), ...props.style }}>{children}</button>;

function OrderForm({ products, customers, onSubmit, onClose }) {
  const [f, sf] = useState({ customerId: "", productId: "", qty: 1, note: "" }); const p = products.find(x => x.id === +f.productId);
  return <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <FG label="Pelanggan"><FS value={f.customerId} onChange={e => sf({...f,customerId:e.target.value})}><option value="">-- Pilih --</option>{customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}</FS></FG>
      <FG label="Produk"><FS value={f.productId} onChange={e => sf({...f,productId:e.target.value})}><option value="">-- Pilih --</option>{products.map(p => <option key={p.id} value={p.id}>{p.name} (stok:{p.stock})</option>)}</FS></FG>
    </div>
    <FG label="Jumlah"><FI type="number" min="1" value={f.qty} onChange={e => sf({...f,qty:e.target.value})} /></FG>
    {p && <div style={{ background: "var(--card2)", borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 13, color: "var(--text-dim)" }}>Total</span><span className="mono" style={{ fontSize: 18, fontWeight: 800, color: "#f97316" }}>{fmtRp(p.price * +f.qty)}</span></div>}
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><FB onClick={onClose}>Batal</FB><FB primary disabled={!f.customerId || !f.productId} onClick={() => onSubmit(f)}><Ic name="check" size={14}/> Buat</FB></div>
  </div>;
}
function ProdForm({ onSubmit, onClose }) {
  const [f, sf] = useState({ name: "", price: "", cost: "", stock: "", min: "", type: "nonsubsidi" });
  const matchedHet = f.price ? HET_CONFIG.rates.find(r => f.name && f.name.toLowerCase().includes(r.name.match(/\d+/)?.[0])) || (f.type === "subsidi" ? HET_CONFIG.rates[0] : null) : null;
  const hetExceeded = matchedHet && +f.price > matchedHet.het;
  return <div>
    <FG label="Nama"><FI value={f.name} onChange={e => sf({...f,name:e.target.value})} placeholder="LPG 3 kg Melon" /></FG>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <FG label="Harga Jual">
        <FI type="number" value={f.price} onChange={e => sf({...f,price:e.target.value})} style={hetExceeded ? { borderColor: "#ef4444", boxShadow: "0 0 0 3px rgba(239,68,68,0.15)" } : {}} />
        {matchedHet && <div style={{ marginTop: 4, fontSize: 10, color: hetExceeded ? "#ef4444" : "#10b981", fontWeight: 600, display: "flex", alignItems: "center", gap: 4 }}>
          {hetExceeded ? "🚩" : "✓"} HET: {fmtRp(matchedHet.het)} {hetExceeded && `— melebihi +${fmtRp(+f.price - matchedHet.het)} (${Math.round((+f.price - matchedHet.het) / matchedHet.het * 100)}%)`}
        </div>}
      </FG>
      <FG label="Harga Beli"><FI type="number" value={f.cost} onChange={e => sf({...f,cost:e.target.value})} /></FG><FG label="Stok"><FI type="number" value={f.stock} onChange={e => sf({...f,stock:e.target.value})} /></FG><FG label="Min Stok"><FI type="number" value={f.min} onChange={e => sf({...f,min:e.target.value})} /></FG></div>
    <FG label="Tipe"><FS value={f.type} onChange={e => sf({...f,type:e.target.value})}><option value="subsidi">Subsidi</option><option value="nonsubsidi">Non-Subsidi</option></FS></FG>
    {hetExceeded && <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 10, padding: 12, marginBottom: 14, display: "flex", gap: 10, alignItems: "flex-start" }}><span style={{ fontSize: 18, flexShrink: 0 }}>⚠️</span><div><div style={{ fontSize: 12, fontWeight: 700, color: "#dc2626" }}>Harga melebihi HET Pemda!</div><div style={{ fontSize: 11, color: "#7f1d1d", marginTop: 2 }}>Produk akan tetap disimpan namun akan dicatat di Audit Trail HET Compliance sebagai pelanggaran. Dasar: {matchedHet.note}</div></div></div>}
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><FB onClick={onClose}>Batal</FB><FB primary disabled={!f.name || !f.price} onClick={() => onSubmit(f)} style={hetExceeded ? { background: "linear-gradient(135deg,#ef4444,#dc2626)" } : {}}><Ic name="check" size={14}/> {hetExceeded ? "Simpan + Flag HET" : "Simpan"}</FB></div>
  </div>;
}
function CustForm({ onSubmit, onClose }) {
  const [f, sf] = useState({ name: "", phone: "", addr: "", type: "rumah_tangga" });
  return <div>
    <FG label="Nama"><FI value={f.name} onChange={e => sf({...f,name:e.target.value})} /></FG>
    <FG label="Telepon"><FI value={f.phone} onChange={e => sf({...f,phone:e.target.value})} placeholder="0812-xxxx-xxxx" /></FG>
    <FG label="Alamat"><FI value={f.addr} onChange={e => sf({...f,addr:e.target.value})} /></FG>
    <FG label="Tipe"><FS value={f.type} onChange={e => sf({...f,type:e.target.value})}><option value="rumah_tangga">Rumah Tangga</option><option value="usaha_mikro">Usaha Mikro</option></FS></FG>
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><FB onClick={onClose}>Batal</FB><FB primary disabled={!f.name} onClick={() => onSubmit(f)}><Ic name="check" size={14}/> Simpan</FB></div>
  </div>;
}
function RestockForm({ product, onSubmit, onClose }) {
  const [q, sq] = useState("");
  return <div>
    <div style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 14 }}><div style={{ fontSize: 12, color: "var(--text-dim)" }}>Stok Saat Ini</div><div className="mono" style={{ fontSize: 28, fontWeight: 800 }}>{product?.stock}</div></div>
    <FG label="Jumlah Tambahan"><FI type="number" min="1" value={q} onChange={e => sq(e.target.value)} /></FG>
    {q > 0 && <div style={{ background: "#10b98110", borderRadius: 12, padding: 14, marginBottom: 14, textAlign: "center" }}><div className="mono" style={{ fontSize: 10, fontWeight: 700, color: "#10b981" }}>SETELAH RESTOCK</div><div className="mono" style={{ fontSize: 28, fontWeight: 800, color: "#10b981" }}>{(product?.stock||0)+ +q}</div></div>}
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><FB onClick={onClose}>Batal</FB><FB primary disabled={!q||q<1} onClick={() => onSubmit(product.id, q)}><Ic name="check" size={14}/> Tambah</FB></div>
  </div>;
}
function PkForm({ onSubmit, onClose }) {
  const [f, sf] = useState({ name: "", owner: "", phone: "", addr: "", kel: "", kec: "", qm: "" });
  return <div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
      <FG label="Nama Pangkalan"><FI value={f.name} onChange={e => sf({...f,name:e.target.value})} /></FG><FG label="Pemilik"><FI value={f.owner} onChange={e => sf({...f,owner:e.target.value})} /></FG>
      <FG label="Telepon"><FI value={f.phone} onChange={e => sf({...f,phone:e.target.value})} /></FG><FG label="Kuota Bulanan (3 kg)"><FI type="number" value={f.qm} onChange={e => sf({...f,qm:e.target.value})} /></FG>
      <FG label="Kelurahan"><FI value={f.kel} onChange={e => sf({...f,kel:e.target.value})} /></FG><FG label="Kecamatan"><FI value={f.kec} onChange={e => sf({...f,kec:e.target.value})} /></FG>
    </div>
    <FG label="Alamat"><FI value={f.addr} onChange={e => sf({...f,addr:e.target.value})} /></FG>
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><FB onClick={onClose}>Batal</FB><FB primary disabled={!f.name||!f.owner} onClick={() => onSubmit(f)}><Ic name="check" size={14}/> Simpan</FB></div>
  </div>;
}
function DistForm({ pks, products, pre, onSubmit, onClose }) {
  const [f, sf] = useState({ pkid: pre || "", q3: "", q5: "", q12: "", note: "" });
  const p3 = products.find(p=>p.id===1), p5 = products.find(p=>p.id===2), p12 = products.find(p=>p.id===3);
  const tot = (+f.q3||0)+(+f.q5||0)+(+f.q12||0); const tv = (+f.q3||0)*(p3?.cost||0)+(+f.q5||0)*(p5?.cost||0)+(+f.q12||0)*(p12?.cost||0);
  const pk = pks.find(p=>p.id===+f.pkid);
  return <div>
    <FG label="Pangkalan"><FS value={f.pkid} onChange={e => sf({...f,pkid:e.target.value})}><option value="">-- Pilih --</option>{pks.map(p => <option key={p.id} value={p.id}>{p.name} — {p.owner}</option>)}</FS></FG>
    {pk && <div style={{ background: "#3b82f610", border: "1px solid #3b82f630", borderRadius: 12, padding: 12, marginBottom: 14, display: "flex", justifyContent: "space-between", alignItems: "center" }}><div style={{ fontSize: 12, fontWeight: 600, color: "#3b82f6" }}>Kuota: {pk.qu}/{pk.qm}</div><span className="mono" style={{ fontSize: 16, fontWeight: 800, color: pk.qu>=pk.qm?"#ef4444":"#3b82f6" }}>{pct(pk.qu,pk.qm)}%</span></div>}
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
      <FG label={`3 kg (stok: ${p3?.stock||0})`}><FI type="number" min="0" value={f.q3} onChange={e => sf({...f,q3:e.target.value})} /></FG>
      <FG label={`5.5 kg (stok: ${p5?.stock||0})`}><FI type="number" min="0" value={f.q5} onChange={e => sf({...f,q5:e.target.value})} /></FG>
      <FG label={`12 kg (stok: ${p12?.stock||0})`}><FI type="number" min="0" value={f.q12} onChange={e => sf({...f,q12:e.target.value})} /></FG>
    </div>
    {tot > 0 && <div style={{ background: "var(--card2)", borderRadius: 12, padding: 14, marginBottom: 14, display: "flex", justifyContent: "space-between" }}><div><div style={{ fontSize: 12, color: "var(--text-dim)" }}>Total</div><div className="mono" style={{ fontSize: 16, fontWeight: 700 }}>{tot} tabung</div></div><div style={{ textAlign: "right" }}><div style={{ fontSize: 12, color: "var(--text-dim)" }}>Estimasi</div><div className="mono" style={{ fontSize: 16, fontWeight: 700, color: "#6366f1" }}>{fmtRp(tv)}</div></div></div>}
    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><FB onClick={onClose}>Batal</FB><FB primary disabled={!f.pkid||tot===0} onClick={() => onSubmit(f)} style={{ background: "linear-gradient(135deg,#6366f1,#4f46e5)" }}><Ic name="send" size={14}/> Distribusikan</FB></div>
  </div>;
}

// ─── PAYMENT LINK GENERATOR ───
function PayLinkGen({ providers, toast_ }) {
  const [f, sf] = useState({ customer: "", amount: "", method: "", desc: "" });
  const [generated, setGenerated] = useState(null);
  const sel = providers.find(p => p.id === f.method);
  const fee = sel ? (sel.feeType === "flat" ? (sel.fee||0) : Math.round(+f.amount * (sel.fee||0) / 100)) : 0;
  const net = (+f.amount || 0) - fee;
  const generate = () => {
    if (!f.customer || !f.amount || !f.method) return;
    const id = `PL-${Date.now().toString(36).toUpperCase()}`;
    const link = `https://pay.agenlpg.id/${id}`;
    setGenerated({ id, link, customer: f.customer, amount: +f.amount, method: sel?.name, fee, net, created: new Date().toISOString(), expires: new Date(Date.now() + 24*60*60*1000).toISOString() });
    toast_("Payment link berhasil dibuat!");
  };
  return <div>
    {!generated ? (<div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
        <FG label="Nama Customer"><FI value={f.customer} onChange={e => sf({...f,customer:e.target.value})} placeholder="Nama pelanggan" /></FG>
        <FG label="Jumlah (Rp)"><FI type="number" value={f.amount} onChange={e => sf({...f,amount:e.target.value})} placeholder="0" /></FG>
      </div>
      <FG label="Metode Pembayaran">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: 8 }}>
          {providers.map(p => (
            <div key={p.id} onClick={() => sf({...f,method:p.id})} style={{ background: f.method === p.id ? `${p.color}15` : "var(--card)", border: `2px solid ${f.method === p.id ? p.color : "var(--border)"}`, borderRadius: 10, padding: "10px 12px", cursor: "pointer", transition: "all 0.2s", textAlign: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: 8, background: `${p.color}20`, color: p.color, display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 4 }}><Ic name={p.logo} size={14}/></div>
              <div style={{ fontSize: 11, fontWeight: 700, color: f.method === p.id ? p.color : "var(--text)" }}>{p.name}</div>
              <div style={{ fontSize: 9, color: "var(--text-dim)", marginTop: 2 }}>{p.feeType === "flat" ? fmtRp(p.fee) : p.fee === 0 ? "Gratis" : `${p.fee}%`}</div>
            </div>
          ))}
        </div>
      </FG>
      <FG label="Deskripsi (opsional)"><FI value={f.desc} onChange={e => sf({...f,desc:e.target.value})} placeholder="Pembayaran LPG 3 kg x 5 tabung" /></FG>
      {+f.amount > 0 && sel && (
        <div style={{ background: "var(--card2)", borderRadius: 12, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "var(--text-dim)" }}>Subtotal</span><span className="mono" style={{ fontWeight: 600 }}>{fmtRp(+f.amount)}</span></div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}><span style={{ fontSize: 12, color: "#f59e0b" }}>Fee {sel.name} ({sel.feeType === "flat" ? "flat" : `${sel.fee}%`})</span><span className="mono" style={{ fontWeight: 600, color: "#f59e0b" }}>-{fmtRp(fee)}</span></div>
          <div style={{ borderTop: "1px dashed var(--border)", paddingTop: 8, display: "flex", justifyContent: "space-between" }}><span style={{ fontSize: 14, fontWeight: 700 }}>Net Diterima</span><span className="mono" style={{ fontSize: 18, fontWeight: 800, color: "#10b981" }}>{fmtRp(net)}</span></div>
        </div>
      )}
      <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}><FB primary disabled={!f.customer||!f.amount||!f.method} onClick={generate} style={{ background: "linear-gradient(135deg,#6366f1,#8b5cf6)" }}><Ic name="link" size={14}/> Generate Payment Link</FB></div>
    </div>) : (
      <div style={{ textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 20, background: "#10b98115", color: "#10b981", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}><Ic name="check" size={32}/></div>
        <h4 style={{ fontSize: 18, fontWeight: 800, marginBottom: 4 }}>Payment Link Dibuat!</h4>
        <p style={{ fontSize: 12, color: "var(--text-dim)", marginBottom: 20 }}>Kirim link ini ke pelanggan untuk melakukan pembayaran</p>
        <div style={{ background: "var(--card2)", borderRadius: 14, padding: 20, marginBottom: 20, textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 14 }}>
            {[{ l: "Customer", v: generated.customer },{ l: "Metode", v: generated.method },{ l: "Amount", v: fmtRp(generated.amount), c: "#6366f1", mono: true },{ l: "Net Diterima", v: fmtRp(generated.net), c: "#10b981", mono: true }].map((x,i) => (
              <div key={i}><div style={{ fontSize: 9, fontWeight: 700, color: "var(--text-dim)", textTransform: "uppercase" }}>{x.l}</div><div className={x.mono?"mono":""} style={{ fontSize: x.mono?18:14, fontWeight: x.mono?800:600, color: x.c||"var(--text)", marginTop: 2 }}>{x.v}</div></div>
            ))}
          </div>
          <div style={{ background: "var(--card)", borderRadius: 10, padding: "12px 16px", border: "2px dashed var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
            <span className="mono" style={{ fontSize: 12, fontWeight: 600, color: "#6366f1", wordBreak: "break-all" }}>{generated.link}</span>
            <button onClick={() => { navigator.clipboard?.writeText(generated.link).catch(()=>{}); toast_("Link disalin!"); }} style={{ background: "#6366f115", color: "#6366f1", border: "none", borderRadius: 6, padding: "6px 12px", fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Copy</button>
          </div>
          <div style={{ fontSize: 10, color: "var(--text-dim)" }}>ID: {generated.id} • Dibuat: {fmtDT(generated.created)} • Expired: {fmtDT(generated.expires)}</div>
        </div>
        <button onClick={() => { setGenerated(null); sf({ customer: "", amount: "", method: "", desc: "" }); }} style={{ background: "var(--hover)", border: "1px solid var(--border)", borderRadius: 10, padding: "9px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", color: "var(--text-dim)", display: "inline-flex", alignItems: "center", gap: 6 }}><Ic name="plus" size={14}/> Buat Link Baru</button>
      </div>
    )}
  </div>;
}
