# Kampüs Etkinlikleri API (Backend)

Node.js + Express ile yazılmış REST API. Veriler şimdilik bellekte (src/data/events.js) tutulur; sunucu yeniden başlayınca POST ile eklenenler kaybolur.

## Çalıştırma

```bash
cd backend
npm install
npm run dev
```

Adres: http://localhost:3000

## Ortam değişkenleri

`.env.example` dosyasını `.env` adıyla kopyalayın.

| Değişken | Açıklama | Varsayılan |
|---|---|---|
| `PORT` | Sunucunun dinlediği port | 3000 |

## REST Sözleşmesi

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
|---|---|---|---|---|---|
| GET | /health | Sunucu ayakta mı | 200 | — | Bu sprint |
| GET | /events | Listeyi getir | 200 | — | Bu sprint |
| GET | /events/:id | Tek etkinlik | 200 | 404 | Bu sprint |
| POST | /events | Yeni etkinlik | 201 | 400 | Bu sprint |
| PATCH | /events/:id | Güncelle | 200 | 400, 404 | Sprint 9 |
| DELETE | /events/:id | Sil | 204 | 404 | Sprint 9 |

**Status code'lar:** 200 tamam · 201 oluşturuldu · 204 içerik yok · 400 eksik/yanlış veri · 404 bulunamadı

**Hata biçimi (tüm hatalar):**

```json
{ "error": { "message": "Event not found" } }
```

POST /events için `title`, `category` ve `date` zorunludur.

## Test

6 istek Postman collection olarak `requests/kampus-api.json` dosyasındadır.