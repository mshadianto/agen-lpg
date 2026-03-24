export const DRIVER_ROUTES = [
  { id: 1, name: "Rute Samarinda Ulu", stops: ["Pangkalan Hj. Rina", "Pangkalan Pak Darmawan", "RM Padang Sederhana"], dist: 8.5, est: "35 min", status: "active", driver: "Pak Joko", vehicle: "KT 1234 AB", loaded: 85, empty: 12 },
  { id: 2, name: "Rute Samarinda Utara-Sempaja", stops: ["Pangkalan Bu Sari", "Warung Makan Barokah", "Katering Berkah Kaltim"], dist: 11.3, est: "40 min", status: "active", driver: "Pak Rudi", vehicle: "KT 5678 CD", loaded: 62, empty: 8 },
  { id: 3, name: "Rute Sungai Pinang-Ilir", stops: ["Pangkalan Mitra Gas", "Pangkalan Sejahtera", "Ibu Siti Aminah"], dist: 9.1, est: "30 min", status: "pending", driver: "Pak Anto", vehicle: "KT 9012 EF", loaded: 48, empty: 0 },
  { id: 4, name: "Rute Samarinda Seberang", stops: ["Pangkalan Berkah Jaya", "Bp. Ahmad Fauzi", "Ibu Dewi Lestari"], dist: 14.8, est: "50 min", status: "completed", driver: "Pak Joko", vehicle: "KT 1234 AB", loaded: 0, empty: 22 },
];

export const RECONCILIATION = [
  { id: 1, date: "2026-03-25", driver: "Pak Joko", sent: 85, delivered: 82, returned: 3, emptyCollected: 34, emptyReturned: 30, diff: 4, status: "pending" },
  { id: 2, date: "2026-03-24", driver: "Pak Rudi", sent: 62, delivered: 60, returned: 2, emptyCollected: 28, emptyReturned: 28, diff: 0, status: "verified" },
  { id: 3, date: "2026-03-24", driver: "Pak Anto", sent: 48, delivered: 48, returned: 0, emptyCollected: 20, emptyReturned: 18, diff: 2, status: "pending" },
  { id: 4, date: "2026-03-23", driver: "Pak Joko", sent: 90, delivered: 88, returned: 2, emptyCollected: 40, emptyReturned: 40, diff: 0, status: "verified" },
  { id: 5, date: "2026-03-23", driver: "Pak Rudi", sent: 55, delivered: 55, returned: 0, emptyCollected: 22, emptyReturned: 20, diff: 2, status: "discrepancy" },
];
