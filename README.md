# Agen LPG Enterprise

Sistem manajemen distribusi LPG berbasis web untuk agen gas di Indonesia. Mencakup rantai distribusi lengkap dari agen ke pangkalan hingga konsumen akhir.

**[Live Demo](https://mshadianto.github.io/agen-lpg/)**

## Fitur Utama

### Multi-Role Dashboard
Empat peran dengan akses fitur yang disesuaikan:
- **Pangkalan** — Stok toko, input konsumen akhir, pesanan, pengiriman
- **Driver** — Rute harian, logistik, rekonsiliasi tabung kosong
- **Sales** — Akuisisi mitra baru, monitoring pasar, analytics
- **Owner** — Laporan laba rugi, kepatuhan regulasi, keuangan

### Manajemen Pesanan & Stok
- CRUD pesanan dengan kalkulasi otomatis (total, profit, margin)
- Monitoring stok real-time dengan alert batas minimum
- Prakiraan kehabisan stok berdasarkan tren penjualan

### Distribusi ke Pangkalan
- Distribusi stok per produk (3 kg, 5.5 kg, 12 kg) ke setiap pangkalan
- Tracking kuota bulanan pangkalan
- Rating dan performa pangkalan
- Detail panel dengan riwayat distribusi

### HET Compliance
- Monitoring otomatis Harga Eceran Tertinggi (HET) sesuai regulasi pemerintah
- Auto-flag pelanggaran harga saat input produk atau pesanan
- Audit trail lengkap dengan resolve workflow

### Analytics & Prediktif AI
- Prediksi pendapatan 7 hari ke depan (regresi linier)
- Prakiraan kehabisan stok per produk
- Deteksi anomali pesanan (z-score)
- Segmentasi pelanggan (Pareto analysis)
- Analisis pola pesanan (jam puncak, hari tersibuk)
- Rekomendasi AI otomatis

### Payment Gateway
- Multi-provider: QRIS, Virtual Account (BCA, Mandiri, BNI, BSI), E-Wallet (GoPay, OVO, DANA), COD
- Kalkulasi fee per metode pembayaran
- Payment link generator
- Dashboard transaksi dan settlement

### Fitur Tambahan
- Dark/light mode
- Rekonsiliasi tabung (isi vs kosong) untuk driver
- Manajemen rute pengiriman
- Data konsumen akhir subsidi (regulasi BPH Migas)
- Kepatuhan & regulasi (izin, sertifikasi, pajak)
- Export data (simulasi)

## Tech Stack

- **React 18** — UI framework
- **Vite** — Build tool & dev server
- **Pure SVG** — Charts (Spark, AreaChart, Donut, HeatMap) tanpa library eksternal
- **CSS Custom Properties** — Sistem tema dark/light
- **GitHub Actions** — CI/CD ke GitHub Pages

## Quick Start

```bash
# Clone
git clone https://github.com/mshadianto/agen-lpg.git
cd agen-lpg

# Install & run
npm install
npm run dev
```

Buka http://localhost:5173/agen-lpg/ di browser.

## Build & Deploy

```bash
npm run build      # Build production → dist/
npm run preview    # Preview production build
```

Deploy otomatis ke GitHub Pages setiap push ke branch `main`.

## Struktur Proyek

```
src/
├── main.jsx                # Entry point
├── App.jsx                 # Root component
├── constants/              # Data statis & konfigurasi (9 file)
├── utils/                  # Format, analytics, data generators
├── hooks/                  # useAppState (state+handler), useAnalytics (computed)
├── components/
│   ├── icons/              # Sistem ikon SVG
│   ├── charts/             # Spark, AreaChart, Donut, HeatMap
│   ├── ui/                 # Badge, Modal, Toast, KpiCard, dll
│   ├── forms/              # 7 form components + primitives
│   └── layout/             # Sidebar, Topbar, RolePicker, DetailPanel
├── pages/                  # 16 halaman/view
└── styles/                 # CSS global & tema
```

## Lisensi

MIT
