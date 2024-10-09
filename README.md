# WhatsApp to Facebook Video Uploader

Proyek ini memungkinkan Anda untuk mengunggah video dari WhatsApp ke Facebook menggunakan WhatsApp Web API dan Facebook Graph API. Aplikasi ini juga menyediakan antarmuka web untuk memindai kode QR untuk menghubungkan ke WhatsApp.

## Fitur

- Mengunggah video dari WhatsApp ke Facebook.
- Mendukung pengunggahan video dari pesan langsung atau balasan.
- Menyediakan antarmuka web untuk memindai kode QR.
- Menutup server web setelah terhubung ke WhatsApp.

## Persyaratan

- Node.js dan npm terinstal di sistem Anda.
- Akun Facebook dengan izin untuk mengunggah video.
- Akun WhatsApp yang dapat dihubungkan melalui WhatsApp Web.

## Instalasi

1. **Clone repositori ini:**

   ```bash
   git clone https://github.com/AutoFTbot/WhatsApp-to-Facebook.git
   cd WhatsApp-to-Facebook
   ```

2. **Instal dependensi:**

   ```bash
   npm install
   ```

3. **Konfigurasi:**

   - Pastikan Anda memiliki `chromium-browser` terinstal di sistem Anda.
   - Isi `PAGE_ID` dan `PAGE_ACCESS_TOKEN` di file `facebookUploader.js` dengan informasi dari akun Facebook Anda.

4. **Jalankan aplikasi:**

   ```bash
   node app.js
   ```

5. **Scan QR Code:**

   - Akses URL yang ditampilkan di terminal untuk memindai kode QR dan menghubungkan ke WhatsApp.

## Penggunaan

- Kirim atau balas pesan di WhatsApp dengan video dan awali pesan dengan `.upfb` untuk mengunggah video ke Facebook.
- Setelah terhubung ke WhatsApp, server web akan ditutup dan tidak dapat diakses lagi.

## Catatan

- Pastikan Anda memiliki izin yang tepat untuk mengunggah video ke halaman Facebook yang ditentukan.
- Pastikan koneksi internet Anda stabil untuk menghindari kesalahan saat mengunggah video.

## Kontribusi

Kontribusi sangat diterima! Silakan buat pull request atau buka issue untuk perbaikan atau fitur baru.

## Lisensi

Proyek ini dilisensikan di bawah [MIT License](LICENSE).
