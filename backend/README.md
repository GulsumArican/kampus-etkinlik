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
- `src/utils/date.js`: "GG-AA-YYYY" ↔ Date dönüşümü, bugünün başı
- `src/data/seed-events.js`: 6 örnek etkinlik (2'si geçmiş tarihli)
- `src/seed.js`: önce siler, sonra 6 kayıt ekler (`npm run seed`)
- `src/controllers/`, `src/routes/`: istek işleme

## Schema kuralları

| Alan | Kural |
|---|---|
| title | zorunlu, trim, 3–100 karakter |
| category | zorunlu; Seminer, Atölye, Söyleşi, Yarışma |
| capacity | sayı, en az 0, varsayılan 0 |
| date | zorunlu; API'de "GG-AA-YYYY" (örn. "15-10-2026"), veritabanında gerçek Date |
| time, location, description | isteğe bağlı; description en fazla 500 karakter |
| timestamps | createdAt ve updatedAt otomatik |

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | — | Sprint 7 |
| GET | /events | Listeyi getir (`?search=` başlıkta arar, `?category=` filtreler; ikisi birlikte olabilir) | 200 | 500 | Sprint 8, arama Sprint 9 |
| GET | /events/upcoming | Bugün ve sonrası, tarihe göre sıralı | 200 | 500 | çalışıyor |
| GET | /events/:id | Tek etkinlik (MongoDB `_id`) | 200 | 404 | Sprint 8 |
| POST | /events | Yeni etkinlik | 201 | 400 | Sprint 8 |
| PATCH | /events/:id | Sadece gönderilen alanları güncelle | 200 | 400, 404 | çalışıyor |
| DELETE | /events/:id | Sil (yanıt gövdesi yok) | 204 | 404 | çalışıyor |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 doğrulama hatası · 404 bulunamadı (geçersiz id dahil) · 500 sunucu hatası

**PATCH için 400 durumları:** boş body ("Body is empty"), geçersiz alan değeri (örn. olmayan kategori, yanlış tarih biçimi), `_id` / `createdAt` / `updatedAt` / `__v` değiştirilmeye çalışılması.

**Hata biçimi (tüm hatalar):**

```json
{ "error": { "message": "Event not found" } }
```

## Test

Postman collection `requests/kampus-api.json` dosyasındadır: 18 istek, 45 test. `_id`'ler elle girilmez; collection 02. istekteki ilk kaydın ve 05. istekte oluşan kaydın `_id`'sini kendisi kaydeder. PATCH ve DELETE yeni oluşan kayıtla çalıştığı için seed verisi bozulmaz.

```bash
npm run seed
npm run dev
# başka bir terminalde, repo kökünde:
newman run https://webdersi.vercel.app/test.json
```

Son çalıştırma sonucu `requests/run-results.json` dosyasındadır (18 istek, 45 test, 0 hata; newman JSON raporu).

Not: Geliştirme sırasında yapay zekâ desteği alınmıştır.