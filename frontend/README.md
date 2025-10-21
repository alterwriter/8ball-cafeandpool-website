# 8Ball Cafe & Pool Frontend

SPA React yang dirender oleh Nginx pada environment produksi. Seluruh konfigurasi build dan Docker sudah diatur melalui root repository.

## Skrip

```bash
npm install
npm run dev     # menjalankan Vite dev server
npm run build   # build produksi
npm run preview # pratinjau hasil build
```

Konfigurasi API endpoint dapat diubah melalui berkas `.env` (lihat `.env.example`).
