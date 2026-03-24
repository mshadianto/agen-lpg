export const HET_CONFIG = {
  region: "DKI Jakarta & Sekitarnya",
  authority: "Pergub DKI / Perbup Bogor / Perwal Bekasi",
  lastUpdated: "2026-01-15",
  rates: [
    { productId: 1, name: "LPG 3 kg (Subsidi)", het: 18000, note: "Sesuai Kepmen ESDM No. 62/2023, HET tabung 3 kg bersubsidi" },
    { productId: 2, name: "LPG 5.5 kg (Bright Gas)", het: 72600, note: "Non-subsidi, HET Perda DKI Jakarta referensi Pertamina" },
    { productId: 3, name: "LPG 12 kg", het: 162800, note: "Non-subsidi, acuan harga Pertamina per Jan 2026" },
    { productId: 4, name: "LPG 50 kg", het: 598400, note: "Harga industri, referensi Pertamina per Jan 2026" },
  ],
};

export const INITIAL_HET_LOG = [
  { id: 1, date: "2026-03-10T08:30:00", actor: "Pangkalan Mitra Gas", actorRole: "pangkalan", productId: 1, productName: "LPG 3 kg (Melon)", priceSold: 20000, het: 18000, diff: 2000, pctOver: 11.1, action: "flagged", resolvedBy: null, resolvedAt: null, notes: "Harga jual melebihi HET subsidi" },
  { id: 2, date: "2026-03-15T14:20:00", actor: "Pangkalan Pak Darmawan", actorRole: "pangkalan", productId: 1, productName: "LPG 3 kg (Melon)", priceSold: 19000, het: 18000, diff: 1000, pctOver: 5.6, action: "resolved", resolvedBy: "Admin Owner", resolvedAt: "2026-03-16T09:00:00", notes: "Pangkalan telah menyesuaikan harga" },
  { id: 3, date: "2026-03-20T11:45:00", actor: "Admin Agen", actorRole: "admin", productId: 3, productName: "LPG 12 kg", priceSold: 165000, het: 162800, diff: 2200, pctOver: 1.4, action: "flagged", resolvedBy: null, resolvedAt: null, notes: "Input harga baru melebihi HET referensi" },
];
