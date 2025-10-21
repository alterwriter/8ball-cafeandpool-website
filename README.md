# 8Ball Café & Pool House Web Platform

Website fullstack untuk 8Ball Café & Pool House dengan fitur booking billiard per jam, login membership, dan order menu café. Proyek ini menggunakan stack:

- **Backend**: Node.js (Express) dengan security middleware (Helmet, CORS strict, rate limiting).
- **Frontend**: React + Vite + TailwindCSS.
- **Containerization**: Dockerfile per service dan docker-compose untuk orkestrasi.

## Struktur Proyek

```
.
├── backend/        # REST API Express
├── frontend/       # React SPA
├── docker-compose.yml
└── README.md
```

## Menjalankan dengan Docker

Pastikan Docker & Docker Compose telah terinstall.

```bash
docker compose up --build
```

- Frontend tersedia di http://localhost:8080
- Backend API di http://localhost:4000 (via jaringan internal Docker, otomatis diproksi oleh frontend)

## Menjalankan secara lokal (opsional)

### Backend

```bash
cd backend
cp .env.example .env   # opsional, gunakan nilai default bila tidak ada file ini
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev -- --host
```

Set environment variable `VITE_API_BASE_URL=http://localhost:4000/api` agar frontend mengarah ke API lokal.

## Akun Demo

Gunakan kredensial berikut untuk login membership:

- Email: `delia@8ballclub.id`
- Password: `playhard123`

## Catatan Security

- API menggunakan Helmet, rate limiting, validasi payload via Joi, dan JWT untuk sesi member.
- CORS dibatasi ke origin yang didefinisikan di environment variable `CORS_ORIGINS`.
- Password contoh di-hash menggunakan bcrypt di memori (untuk demonstrasi).

## Lisensi

Proyek ini dibuat sebagai contoh dan dapat dikembangkan lebih lanjut sesuai kebutuhan bisnis Anda.
