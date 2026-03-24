export const ROLES = {
  pangkalan: { label: "Pangkalan", desc: "Stok toko & input data konsumen akhir", color: "#f97316", icon: "store", gradient: "linear-gradient(135deg,#f97316,#ea580c)" },
  driver: { label: "Driver", desc: "Logistik, rute, rekonsiliasi tabung kosong", color: "#3b82f6", icon: "truck", gradient: "linear-gradient(135deg,#3b82f6,#2563eb)" },
  sales: { label: "Sales", desc: "Akuisisi mitra baru & monitoring pasar", color: "#8b5cf6", icon: "target", gradient: "linear-gradient(135deg,#8b5cf6,#7c3aed)" },
  owner: { label: "Owner", desc: "Laporan laba rugi & kepatuhan regulasi", color: "#10b981", icon: "layers", gradient: "linear-gradient(135deg,#10b981,#059669)" },
};

export const ROLE_FEATURES = {
  pangkalan: ["Stok Toko", "Input Konsumen", "Pesanan", "Pengiriman"],
  driver: ["Rute Harian", "Logistik", "Rekonsiliasi", "Tabung Kosong"],
  sales: ["Akuisisi Mitra", "Monitor Pasar", "Pangkalan", "Analytics"],
  owner: ["Laba Rugi", "Kepatuhan", "Keuangan", "Analytics AI"],
};
