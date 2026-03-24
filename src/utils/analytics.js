export function linReg(data) {
  const n = data.length;
  if (n < 2) return { slope: 0, intercept: 0, predict: () => 0 };
  const sx = data.reduce((s, _, i) => s + i, 0);
  const sy = data.reduce((s, v) => s + v, 0);
  const sxy = data.reduce((s, v, i) => s + i * v, 0);
  const sx2 = data.reduce((s, _, i) => s + i * i, 0);
  const slope = (n * sxy - sx * sy) / (n * sx2 - sx * sx || 1);
  const intercept = (sy - slope * sx) / n;
  return { slope, intercept, predict: (x) => Math.max(0, Math.round(slope * x + intercept)) };
}

export function buildTimeSeries(data, days, filterFn, reduceFn) {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    const k = d.toDateString();
    const filtered = data.filter((item) => new Date(filterFn(item)).toDateString() === k);
    return reduceFn(filtered);
  });
}

export function buildDayLabels(days) {
  return Array.from({ length: days }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (days - 1 - i));
    return days <= 7
      ? d.toLocaleDateString("id-ID", { weekday: "short" })
      : d.getDate().toString();
  });
}
