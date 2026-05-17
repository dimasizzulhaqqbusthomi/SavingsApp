# Manajer Tabungan (Savings Finance Manager)

Manajer Tabungan adalah aplikasi web modern berbasis React dan Vite yang dirancang untuk membantu pengguna melacak, mengelola, dan mencapai target tabungan mereka dengan mudah dan elegan.

## Fitur Utama
- **Multi-Akun (Autentikasi Lokal)**: Sistem *login* dan *register* menggunakan isolasi *Local Storage*, memungkinkan banyak pengguna di perangkat yang sama tanpa mencampur data.
- **Manajemen Tabungan**: Buat berbagai tujuan tabungan (contoh: Dana Darurat, Liburan) dengan target dana dan tenggat waktu.
- **Pencatatan Transaksi**: Tambahkan atau tarik dana dari tujuan tabungan dengan mudah. Input angka mendukung format ribuan otomatis.
- **Histori Transaksi**: Lacak riwayat keluar masuknya uang dengan tampilan historis.
- **Desain Modern & Responsif**: Menggunakan *glassmorphism*, warna antarmuka yang profesional, *dark mode*, serta tata letak (layout) *split-screen* yang sangat responsif di perangkat mobile maupun desktop.

## Teknologi yang Digunakan
- React.js
- Vite (Build Tool)
- Vanilla CSS (dengan sistem variabel dan *glassmorphism*)
- Lucide React (Ikon)

## Cara Menjalankan Aplikasi
1. Buka terminal dan masuk ke direktori `app_build`:
   ```bash
   cd app_build
   ```
2. Instal dependensi:
   ```bash
   npm install
   ```
3. Jalankan *development server*:
   ```bash
   npm run dev
   ```
4. Buka `http://localhost:5173` di browser Anda.

## Penyimpanan Data
Semua data (termasuk kredensial *login*, daftar tujuan tabungan, dan riwayat transaksi) disimpan secara lokal di dalam *Local Storage* browser. Aplikasi ini tidak memerlukan konfigurasi *database* eksternal.
