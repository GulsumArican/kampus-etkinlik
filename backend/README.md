# Kampüs Etkinlikleri API (Backend)

Node.js + Express + MongoDB (Mongoose) ile yazılmış REST API. Etkinlikler MongoDB'deki `kampus` veritabanının `events` koleksiyonunda tutulur; sunucu kapanıp açılınca kayıtlar kaybolmaz.

## Çalıştırma

```bash
cd backend
npm install
cp .env.example .env   # MONGODB_URI'yi kendi adresinle değiştir
npm run seed           # 6 örnek etkinliği veritabanına yükler
npm run dev
```

Adres: http://localhost:3000

## Ortam değişkenleri

| Değişken | Açıklama | Örnek (.env.example) |
|---|---|---|
| `PORT` | Sunucunun dinlediği port | 3000 |
| `MONGODB_URI` | MongoDB bağlantı adresi (gerçek adres sadece `.env` içinde) | mongodb://127.0.0.1:27017/kampus |

## Klasör yapısı

- `src/config/database.js`: `MONGODB_URI` ile MongoDB bağlantısı
- `src/models/event-model.js`: Event schema ve modeli
- `src/data/seed-events.js`: 6 örnek etkinlik
- `src/seed.js`: önce siler, sonra 6 kayıt ekler (`npm run seed`)
- `src/controllers/`, `src/routes/`: istek işleme

## Schema kuralları

| Alan | Kural |
|---|---|
| title | zorunlu, trim, 3–100 karakter |
| category | zorunlu; Seminer, Atölye, Söyleşi, Yarışma |
| capacity | sayı, en az 0, varsayılan 0 |
| date | zorunlu |
| time, location, description | isteğe bağlı; description en fazla 500 karakter |
| timestamps | createdAt ve updatedAt otomatik |

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | /events | Listeyi getir (`?category=` isteğe bağlı) | 200 | 500 | Sprint 8 |
| GET | /events/:id | Tek etkinlik (MongoDB `_id`) | 200 | 404 | Sprint 8 |
| POST | /events | Yeni etkinlik | 201 | 400 | Sprint 8 |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 doğrulama hatası · 404 bulunamadı (geçersiz id dahil) · 500 sunucu hatası

**Hata biçimi (tüm hatalar):**

```json
{ "error": { "message": "Event not found" } }
```

## Test

6 istek Postman collection olarak `requests/kampus-api.json` dosyasındadır. 3. istekteki `_id`, seed sonrası listeden alınmıştır; seed yeniden çalıştırılırsa `_id`'ler değişir.