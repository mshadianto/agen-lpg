import { useMemo } from "react";
import { HET_CONFIG } from "../constants/het";
import { pct } from "../utils/format";
import { linReg, buildTimeSeries, buildDayLabels } from "../utils/analytics";

export default function useAnalytics({ orders, del, products, customers, pangkalan, activePk, dist, rev }) {
  const dayLabels = useMemo(() => buildDayLabels(7), []);
  const day30Labels = useMemo(() => buildDayLabels(30), []);

  const last7Rev = useMemo(
    () => buildTimeSeries(del, 7, (o) => o.date, (filtered) => filtered.reduce((s, o) => s + o.total, 0)),
    [del]
  );
  const last7Ord = useMemo(
    () => buildTimeSeries(orders, 7, (o) => o.date, (filtered) => filtered.length),
    [orders]
  );
  const last7Dist = useMemo(
    () => buildTimeSeries(dist, 7, (d) => d.date, (filtered) => filtered.reduce((s, d) => s + d.total, 0)),
    [dist]
  );
  const last30Heat = useMemo(
    () => buildTimeSeries(orders, 28, (o) => o.date, (filtered) => filtered.length),
    [orders]
  );
  const last30Rev = useMemo(
    () => buildTimeSeries(del, 30, (o) => o.date, (filtered) => filtered.reduce((s, o) => s + o.total, 0)),
    [del]
  );
  const last30Ord = useMemo(
    () => buildTimeSeries(orders, 30, (o) => o.date, (filtered) => filtered.length),
    [orders]
  );
  const last30Profit = useMemo(
    () => buildTimeSeries(del, 30, (o) => o.date, (filtered) => filtered.reduce((s, o) => s + o.profit, 0)),
    [del]
  );

  // Forecast: simple moving average for 3kg
  const forecast3kg = useMemo(() => {
    const avg = last7Ord.reduce((a, b) => a + b, 0) / 7;
    const p = products.find((p) => p.id === 1);
    if (!p) return null;
    const days = p.stock / Math.max(avg * 0.6, 1);
    return { avg: Math.round(avg * 0.6), days: Math.round(days), stock: p.stock };
  }, [last7Ord, products]);

  // Predictions
  const predRevenue = useMemo(() => {
    const reg = linReg(last30Rev);
    return Array.from({ length: 7 }, (_, i) => reg.predict(30 + i));
  }, [last30Rev]);
  const predOrders = useMemo(() => {
    const reg = linReg(last30Ord);
    return Array.from({ length: 7 }, (_, i) => reg.predict(30 + i));
  }, [last30Ord]);

  // Stock depletion forecast
  const stockForecasts = useMemo(
    () =>
      products.map((p) => {
        const dailySales =
          del.filter((o) => o.pid === p.id).length > 0
            ? del.filter((o) => o.pid === p.id).reduce((s, o) => s + o.qty, 0) / 30
            : 0.5;
        const daysLeft = dailySales > 0 ? Math.round(p.stock / dailySales) : 999;
        const depletion = Array.from({ length: 14 }, (_, i) => Math.max(0, Math.round(p.stock - dailySales * i)));
        return {
          ...p,
          dailySales: Math.round(dailySales * 10) / 10,
          daysLeft,
          depletion,
          urgency: daysLeft < 7 ? "critical" : daysLeft < 14 ? "warning" : "safe",
        };
      }),
    [products, del]
  );

  // Customer analytics
  const custAnalytics = useMemo(() => {
    const sorted = customers.slice().sort((a, b) => b.orders - a.orders);
    const totalOrders = customers.reduce((s, c) => s + c.orders, 0);
    const top3Revenue = sorted.slice(0, 3).reduce((s, c) => s + c.orders, 0);
    const custByType = {
      rumah_tangga: customers.filter((c) => c.type === "rumah_tangga").length,
      usaha_mikro: customers.filter((c) => c.type === "usaha_mikro").length,
    };
    const revByType = {
      rumah_tangga: del.filter((o) => { const c = customers.find((cc) => cc.id === o.cid); return c?.type === "rumah_tangga"; }).reduce((s, o) => s + o.total, 0),
      usaha_mikro: del.filter((o) => { const c = customers.find((cc) => cc.id === o.cid); return c?.type === "usaha_mikro"; }).reduce((s, o) => s + o.total, 0),
    };
    return { sorted, totalOrders, top3Revenue, top3Pct: pct(top3Revenue, totalOrders), custByType, revByType };
  }, [customers, del]);

  // Pangkalan analytics
  const pkAnalytics = useMemo(() => {
    const avgRating = activePk.length > 0 ? Math.round((activePk.reduce((s, p) => s + p.rating, 0) / activePk.length) * 10) / 10 : 0;
    const totalQuota = activePk.reduce((s, p) => s + p.qm, 0);
    const usedQuota = activePk.reduce((s, p) => s + p.qu, 0);
    const overQuota = activePk.filter((p) => p.qu >= p.qm * 0.9).length;
    const byKec = {};
    pangkalan.forEach((p) => {
      if (!byKec[p.kec]) byKec[p.kec] = { count: 0, dist: 0 };
      byKec[p.kec].count++;
      byKec[p.kec].dist += p.td;
    });
    return { avgRating, totalQuota, usedQuota, quotaPct: pct(usedQuota, totalQuota), overQuota, byKec };
  }, [pangkalan, activePk]);

  // Fulfillment metrics
  const fulfillment = useMemo(() => {
    const total = orders.length;
    const delivered = del.length;
    const cancelled = orders.filter((o) => o.status === "cancelled").length;
    const rate = pct(delivered, total);
    const cancelRate = pct(cancelled, total);
    const avgOrderValue = delivered > 0 ? Math.round(rev / delivered) : 0;
    const hourDist = Array.from({ length: 24 }, (_, h) => orders.filter((o) => new Date(o.date).getHours() === h).length);
    const peakHour = hourDist.indexOf(Math.max(...hourDist));
    const weekDist = Array.from({ length: 7 }, (_, d) => orders.filter((o) => new Date(o.date).getDay() === d).length);
    const dayNames = ["Min", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab"];
    const peakDay = dayNames[weekDist.indexOf(Math.max(...weekDist))];
    return { total, delivered, cancelled, rate, cancelRate, avgOrderValue, hourDist, peakHour, weekDist, dayNames, peakDay };
  }, [orders, del, rev]);

  // Anomaly detection
  const anomalies = useMemo(() => {
    const mean = last30Ord.reduce((a, b) => a + b, 0) / 30;
    const std = Math.sqrt(last30Ord.reduce((s, v) => s + (v - mean) ** 2, 0) / 30);
    return last30Ord
      .map((v, i) => ({ day: i, val: v, anomaly: v > mean + 2 * std, mean: Math.round(mean * 10) / 10 }))
      .filter((x) => x.anomaly);
  }, [last30Ord]);

  // HET compliance
  const hetChecks = useMemo(
    () =>
      products.map((p) => {
        const hetRule = HET_CONFIG.rates.find((r) => r.productId === p.id);
        if (!hetRule) return { ...p, het: null, compliant: true, diff: 0, pctOver: 0 };
        const compliant = p.price <= hetRule.het;
        const diff = p.price - hetRule.het;
        const pctOver = hetRule.het > 0 ? Math.round((diff / hetRule.het) * 1000) / 10 : 0;
        return { ...p, het: hetRule.het, hetNote: hetRule.note, compliant, diff, pctOver };
      }),
    [products]
  );
  const hetViolations = useMemo(() => hetChecks.filter((h) => !h.compliant), [hetChecks]);

  return {
    dayLabels, day30Labels,
    last7Rev, last7Ord, last7Dist, last30Heat,
    last30Rev, last30Ord, last30Profit,
    forecast3kg, predRevenue, predOrders,
    stockForecasts, custAnalytics, pkAnalytics,
    fulfillment, anomalies, hetChecks, hetViolations,
  };
}
