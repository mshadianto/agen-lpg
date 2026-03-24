export const fmt = (n) => new Intl.NumberFormat("id-ID").format(n);
export const fmtRp = (n) => `Rp ${fmt(n)}`;
export const fmtDate = (d) =>
  new Date(d).toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" });
export const fmtTime = (d) =>
  new Date(d).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
export const fmtDT = (d) => `${fmtDate(d)} ${fmtTime(d)}`;
export const pct = (a, b) => (b > 0 ? Math.round((a / b) * 100) : 0);
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
