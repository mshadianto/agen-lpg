export const SALES_LEADS = [
  { id: 1, name: "Warung Nasi Ibu Yuli", type: "usaha_mikro", addr: "Jl. Mangga No. 7, Cibubur", phone: "0812-9988-7766", status: "hot", notes: "Butuh 10 tabung 3kg/minggu, siap gabung", lastContact: "2026-03-24" },
  { id: 2, name: "Perumahan Green Valley", type: "komplek", addr: "Jl. Raya Bogor Km 32", phone: "0857-6655-4433", status: "warm", notes: "200+ unit, potensial pangkalan baru", lastContact: "2026-03-22" },
  { id: 3, name: "Catering Sehat Sentosa", type: "usaha_mikro", addr: "Jl. Kenari No. 15, Cipayung", phone: "0878-3344-5566", status: "hot", notes: "Butuh 12kg reguler, 20 tabung/bulan", lastContact: "2026-03-25" },
  { id: 4, name: "RT 05/RW 12 Pekayon", type: "komplek", addr: "Kel. Pekayon, Pasar Rebo", phone: "0813-2233-4455", status: "cold", notes: "Survey area, belum ada pangkalan terdekat", lastContact: "2026-03-18" },
  { id: 5, name: "Restoran Sunda Rasa", type: "usaha_mikro", addr: "Jl. Raya Cibubur No. 88", phone: "0856-7788-9900", status: "warm", notes: "Pakai 50kg, potensi kontrak bulanan", lastContact: "2026-03-20" },
];

export const CONSUMERS = [
  { id: 1, nik: "3201****0001", name: "Siti Nurhaliza", addr: "RT 03/RW 05, Cibubur", phone: "0812-1111-2222", type: "subsidi", purchases: 8, lastPurchase: "2026-03-24" },
  { id: 2, nik: "3201****0002", name: "Ahmad Hidayat", addr: "RT 01/RW 02, Cipayung", phone: "0857-3333-4444", type: "subsidi", purchases: 12, lastPurchase: "2026-03-23" },
  { id: 3, nik: "3201****0003", name: "Dewi Sartika", addr: "RT 05/RW 01, Pondok Ranggon", phone: "0878-5555-6666", type: "subsidi", purchases: 6, lastPurchase: "2026-03-25" },
  { id: 4, nik: "3201****0004", name: "Budi Santoso", addr: "RT 02/RW 08, Pekayon", phone: "0813-7777-8888", type: "subsidi", purchases: 15, lastPurchase: "2026-03-22" },
  { id: 5, nik: "3201****0005", name: "Ratna Sari", addr: "RT 04/RW 03, Cilangkap", phone: "0856-9999-0000", type: "nonsubsidi", purchases: 3, lastPurchase: "2026-03-20" },
];

export const COMPLIANCE_ITEMS = [
  { id: 1, name: "Izin SPPBE/SPBE", status: "active", expiry: "2027-06-15", doc: "SPBE-2024-001", risk: "low" },
  { id: 2, name: "Sertifikat APAR & K3", status: "active", expiry: "2026-08-20", doc: "K3-2025-012", risk: "medium" },
  { id: 3, name: "Laporan Distribusi Subsidi (Bulanan)", status: "overdue", expiry: "2026-03-15", doc: "-", risk: "high" },
  { id: 4, name: "Audit Tabung Berkala", status: "active", expiry: "2026-12-01", doc: "AUD-2025-Q4", risk: "low" },
  { id: 5, name: "Pajak & Retribusi Daerah", status: "active", expiry: "2026-04-30", doc: "NPWP-****1234", risk: "medium" },
  { id: 6, name: "Perjanjian Pangkalan (MoU)", status: "expiring", expiry: "2026-04-10", doc: "MOU-PK-006", risk: "high" },
];
