# 8Ball Cafe & Pool – Fullstack Experience

Website demo untuk lounge cafe & billiard modern dengan fitur booking, membership login, dan order F&B. Proyek ini terdiri dari backend Express dan frontend React yang dikemas menggunakan Docker.

## Arsitektur

- **Backend (`/backend`)** – REST API berbasis Express dengan fitur:
  - Registrasi & login membership (JWT) dengan hashing password (`bcrypt`).
  - Validasi request menggunakan `celebrate`/`Joi`.
  - Endpoint booking meja billiard dan order makanan/minuman (dummy in-memory store).
  - Perlindungan dasar: `helmet`, rate limiting, dan CORS configurable.
- **Frontend (`/frontend`)** – SPA React + Vite dengan tampilan modern dan warna soft.
  - Landing page dengan konten hero, layanan, menu, dan highlight staff.
  - Form booking per jam dan order F&B (terkoneksi ke backend dummy).
  - Modal membership untuk login / sign up serta dashboard member sederhana.
  - Routing menggunakan `react-router-dom` dan form via `react-hook-form`.
- **Docker** – Setiap layanan memiliki Dockerfile. `docker-compose.yml` menyediakan orkestrasi keduanya.

## Menjalankan dengan Docker

Pastikan Docker & Docker Compose sudah terpasang.

```bash
# dari root repository
docker compose up --build
```

Layanan yang tersedia setelah build:

- Frontend: http://localhost:5173
- Backend API: http://localhost:4000/api

Untuk menghentikan layanan:

```bash
docker compose down
```

### Variabel Lingkungan

- Backend: salin `backend/.env.example` menjadi `backend/.env` (opsional saat menjalankan tanpa Docker) dan sesuaikan `JWT_SECRET` serta `ALLOWED_ORIGINS`.
- Frontend: salin `frontend/.env.example` menjadi `.env` untuk mengubah `VITE_API_URL` (default mengarah ke backend lokal).

## Pengembangan Lokal (tanpa Docker)

```bash
# Backend
cd backend
cp .env.example .env
npm install
npm run dev

# Frontend (terminal lain)
cd frontend
cp .env.example .env
npm install
npm run dev
```

Frontend berjalan di http://localhost:5173 dan backend di http://localhost:4000.

## Struktur Direktori

```
.
├── backend
│   ├── src
│   │   ├── controllers
│   │   ├── middleware
│   │   ├── routes
│   │   └── utils
│   ├── Dockerfile
│   └── .env.example
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── hooks
│   │   └── pages
│   ├── Dockerfile
│   └── .env.example
├── docker-compose.yml
└── README.md
```

## Keamanan

- Hashing password dengan `bcrypt` sebelum disimpan.
- JWT dengan expiry 4 jam dan middleware otorisasi pada route booking/order.
- Validasi input ketat untuk registrasi, booking, dan order.
- Proteksi header & rate limiting untuk meminimalisasi serangan umum.
- Frontend menggunakan HTTPS-ready nginx config dan menambahkan header keamanan dasar.

> **Catatan**: Penyimpanan data saat ini bersifat in-memory untuk keperluan demo. Untuk produksi gunakan database persisten (PostgreSQL/MySQL) dan kelola rahasia menggunakan secret manager.

## Lisensi

MIT
