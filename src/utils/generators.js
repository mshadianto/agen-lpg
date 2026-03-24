import { CUSTOMERS } from "../constants/customers";
import { PRODUCTS } from "../constants/products";
import { PANGKALAN_DATA } from "../constants/pangkalan";
import { PG_PROVIDERS } from "../constants/payment";

export function genOrders() {
  const arr = [];
  const sts = ["pending", "confirmed", "delivered", "delivered", "delivered", "delivered"];
  for (let i = 1; i <= 30; i++) {
    const c = CUSTOMERS[~~(Math.random() * CUSTOMERS.length)];
    const p = PRODUCTS[~~(Math.random() * PRODUCTS.length)];
    const q = p.type === "subsidi" ? ~~(Math.random() * 5) + 1 : ~~(Math.random() * 3) + 1;
    const s = sts[~~(Math.random() * sts.length)];
    const d = new Date();
    d.setDate(d.getDate() - ~~(Math.random() * 45));
    arr.push({
      id: i,
      cid: c.id,
      cname: c.name,
      pid: p.id,
      pname: p.name,
      qty: q,
      price: p.price,
      total: p.price * q,
      profit: (p.price - p.cost) * q,
      status: s,
      date: d.toISOString(),
      note: "",
    });
  }
  return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function genDist() {
  const arr = [];
  const sts = ["received", "received", "received", "dispatched", "pending"];
  const pks = PANGKALAN_DATA.filter((p) => p.status === "active");
  for (let i = 1; i <= 25; i++) {
    const pk = pks[~~(Math.random() * pks.length)];
    const q3 = ~~(Math.random() * 40) + 10;
    const q5 = ~~(Math.random() * 8);
    const q12 = ~~(Math.random() * 4);
    const s = sts[~~(Math.random() * sts.length)];
    const d = new Date();
    d.setDate(d.getDate() - ~~(Math.random() * 45));
    arr.push({
      id: i,
      pkid: pk.id,
      pkname: pk.name,
      owner: pk.owner,
      q3,
      q5,
      q12,
      total: q3 + q5 + q12,
      val: q3 * 14250 + q5 * 58000 + q12 * 133000,
      status: s,
      date: d.toISOString(),
      note: "",
    });
  }
  return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function genNotifications() {
  return [
    { id: 1, type: "warning", msg: "Stok LPG 3 kg mendekati batas minimum", time: "5 menit lalu", read: false },
    { id: 2, type: "success", msg: "Distribusi ke Pangkalan Bu Sari diterima", time: "1 jam lalu", read: false },
    { id: 3, type: "info", msg: "3 pesanan baru menunggu konfirmasi", time: "2 jam lalu", read: true },
    { id: 4, type: "warning", msg: "Pangkalan Berkah Jaya ditangguhkan", time: "1 hari lalu", read: true },
    { id: 5, type: "success", msg: "Laporan keuangan Maret siap diunduh", time: "2 hari lalu", read: true },
  ];
}

export function genPayments() {
  const txns = [];
  const methods = PG_PROVIDERS.filter((p) => p.active);
  const statuses = ["settled", "settled", "settled", "settled", "pending", "pending", "failed"];
  for (let i = 1; i <= 30; i++) {
    const m = methods[~~(Math.random() * methods.length)];
    const amt = [18000, 36000, 54000, 66000, 152000, 132000, 72000][~~(Math.random() * 7)];
    const s = statuses[~~(Math.random() * statuses.length)];
    const d = new Date();
    d.setDate(d.getDate() - ~~(Math.random() * 30));
    const fee = m.feeType === "flat" ? m.fee || 0 : Math.round(amt * (m.fee || 0) / 100);
    txns.push({
      id: `TXN-${String(i).padStart(4, "0")}`,
      date: d.toISOString(),
      method: m.id,
      methodName: m.name,
      methodColor: m.color,
      amount: amt,
      fee,
      net: amt - fee,
      status: s,
      customer: CUSTOMERS[~~(Math.random() * CUSTOMERS.length)].name,
      ref: `INV/${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}/${String(i).padStart(4, "0")}`,
    });
  }
  return txns.sort((a, b) => new Date(b.date) - new Date(a.date));
}
