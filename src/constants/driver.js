export const DRIVER_ROUTES = [
  { id: 1, name: "Rute Cibubur-Ciracas", stops: ["Pangkalan Hj. Rina", "Toko Maju Jaya", "RM Padang Sederhana"], dist: 12.5, est: "45 min", status: "active", driver: "Pak Joko", vehicle: "B 1234 CD", loaded: 85, empty: 12 },
  { id: 2, name: "Rute Cipayung Loop", stops: ["Pangkalan Pak Darmawan", "Pangkalan Bu Sari", "Pangkalan Sejahtera"], dist: 8.3, est: "30 min", status: "active", driver: "Pak Rudi", vehicle: "B 5678 EF", loaded: 62, empty: 8 },
  { id: 3, name: "Rute Pasar Rebo", stops: ["Pangkalan Mitra Gas", "Warung Makan Barokah", "Katering Berkah"], dist: 15.1, est: "55 min", status: "pending", driver: "Pak Anto", vehicle: "B 9012 GH", loaded: 48, empty: 0 },
  { id: 4, name: "Rute Cilangkap", stops: ["Pangkalan Berkah Jaya", "Ibu Siti Aminah", "Bp. Ahmad Fauzi"], dist: 6.8, est: "25 min", status: "completed", driver: "Pak Joko", vehicle: "B 1234 CD", loaded: 0, empty: 22 },
];

export const RECONCILIATION = [
  { id: 1, date: "2026-03-25", driver: "Pak Joko", sent: 85, delivered: 82, returned: 3, emptyCollected: 34, emptyReturned: 30, diff: 4, status: "pending" },
  { id: 2, date: "2026-03-24", driver: "Pak Rudi", sent: 62, delivered: 60, returned: 2, emptyCollected: 28, emptyReturned: 28, diff: 0, status: "verified" },
  { id: 3, date: "2026-03-24", driver: "Pak Anto", sent: 48, delivered: 48, returned: 0, emptyCollected: 20, emptyReturned: 18, diff: 2, status: "pending" },
  { id: 4, date: "2026-03-23", driver: "Pak Joko", sent: 90, delivered: 88, returned: 2, emptyCollected: 40, emptyReturned: 40, diff: 0, status: "verified" },
  { id: 5, date: "2026-03-23", driver: "Pak Rudi", sent: 55, delivered: 55, returned: 0, emptyCollected: 22, emptyReturned: 20, diff: 2, status: "discrepancy" },
];
