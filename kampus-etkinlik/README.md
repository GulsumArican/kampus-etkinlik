# Kampüs Etkinlikleri Projesi

**Canlı Yayın Adresi (Vercel):** https://gulsumarican-frontend.vercel.app

## Proje Hakkında
Bu proje, kampüs içerisindeki akademik, seminer, atölye ve söyleşi gibi etkinliklerin tek bir platform üzerinden takip edilmesini sağlayan React tabanlı bir web uygulamasıdır.

## Kurulum

Frontend:

    cd frontend
    npm install
    npm run dev

Backend (API, http://localhost:3000):

    cd backend
    npm install
    npm run dev

## Route Listesi

| Adres | Sayfa |
|---|---|
| `/` | Ana Sayfa |
| `/events` | Etkinlikler |
| `/events/:id` | Etkinlik Detayı |
| `/login` | Giriş |
| `/register` | Kayıt |
| `/forgot-password` | Şifremi Unuttum |
| `/admin` | Yönetim |
| `/admin/new` | Etkinlik Ekle |
| `/admin/:id/edit` | Etkinlik Güncelle |
| `*` | Sayfa Bulunamadı |

## Sprint 7 Geliştirme Notları (Express REST API)

- Frontend'in yanına ayrı `backend/` klasöründe Node.js + Express sunucusu eklendi.
- `app.js` uygulamayı ve middleware'leri (cors, express.json) kuruyor, `server.js` `.env`'deki portu dinliyor.
- Route (`routes/event-routes.js`) ve controller (`controllers/event-controller.js`) ayrı dosyalarda.
- Endpointler: GET /health, GET /events, GET /events/:id (yoksa 404), POST /events (201, eksik veride 400).
- REST sözleşmesi `backend/README.md`'de, 6 test isteği `backend/requests/kampus-api.json`'da.

Not: Geliştirme sırasında yapay zekâ desteği alınmıştır.

## Sprint 6 + Vize Geliştirme Notları (Router, Context ve Yönetim)

- React Router ile 10 sayfa gerçek adreslere bağlandı; menüde `NavLink`, sayfa içinde `Link`, kayıttan sonra `useNavigate` kullanıldı.
- Detay ve güncelleme sayfaları adresteki id'yi `useParams` ile okuyor; bulunamazsa "Sayfa bulunamadı" gösteriliyor.
- `EventsContext` ile etkinlik listesi ve ekle/güncelle/sil fonksiyonları tek yerde tutuldu; tüm sayfalar `useEvents()` ile erişiyor.
- Yönetim sayfasında tablo, Düzenle ve onaylı Sil eklendi; değişiklikler Ana Sayfa ve Etkinlikler'de de görünüyor.
- Etkinlik formu controlled form oldu; `validateEvent` ile 7 alan doğrulanıyor.
- Giriş, Kayıt ve Şifremi Unuttum sayfaları form doğrulamasıyla eklendi.
- Yönetim tablosu telefonda kart görünümüne geçiyor.
- `vercel.json` ile canlıda sayfa yenilendiğinde de route'lar çalışıyor.

## Sprint 5 Geliştirme Notları (React Bileşenleri)

- Tek büyük App.tsx; Header, Navigation, Footer, EventCard, EventList, EventFilter, EventDetail ve EventForm bileşenlerine bölündü.
- Bileşenler veriyi props ile alıyor, kullanıcı olaylarını callback ile üst bileşene bildiriyor.
- Arama ve kategori state'i ortak üst bileşende tutuldu (lifting state).
- Her bileşenin props tipi interface ile tanımlandı; tarih biçimlendirme `format-date.ts`'e taşındı.

Not: Geliştirme sırasında yapay zekâ desteği alınmıştır.

# Sprint 4 Geliştirme Notları (React, Vite, TypeScript ve State Yönetimi)
- **Canlı Yayın Adresi:** https://gulsumarican-frontend.vercel.app
- Proje React, Vite ve TypeScript teknolojilerine taşındı.
- `useState` ile sayfa yenilenmeden dinamik sekme geçişleri (Ana Sayfa, Etkinlikler, Ekle, Detay, Güncelle) sağlandı.
- Anlık arama çubuğu ve kategori filtreleme özellikleri React state'leri ile entegre edildi.
- `useEffect` hook'u kullanılarak her sayfa geçişinde ve detay sayfasında tarayıcı sekme başlığı (`document.title`) dinamik olarak güncellendi.
- `npm run build` süreci hatasız tamamlanarak uygulama Vercel üzerinde canlıya alındı.

## Projedeki Temel Dosyalar ve Görevleri
- **`src/types/campus-event.ts`**: Projede kullanılan etkinlik ve kategori veri tiplerini tanımlar.
- **`src/data/events.ts`**: Uygulama içerisinde listelenen örnek etkinlik verilerini ve afiş yollarını barındırır.
- **`src/utils/filter-events.ts`**: Arama, kategori filtreleme ve ID'ye göre etkinlik bulma işlemlerini gerçekleştiren saf fonksiyonları içerir.
- **`src/App.tsx`**: Uygulamanın ana bileşeni olup yönlendirme, state yönetimi ve ekran tasarımlarını yönetir.

---

## Sprint 3 Geliştirme Notları (JavaScript ve DOM)
- Sayfalar dinamik hale getirildi. Veriler tek bir merkezden (`data.js`) çekilerek JavaScript ile HTML'e yazdırıldı.
- Kategori ve kelime tabanlı çalışan arama/filtreleme özelliği eklendi.
- URL'den ID okunarak etkinlik detay sayfası dinamik olarak oluşturuldu.
- Etkinlik ekleme formuna JavaScript ile doğrulama (validation) kuralları eklendi.

---

## Sprint 2 Geliştirme Notları (CSS ve Responsive)
- Sprint 1'de oluşturulan semantik HTML yapısı tamamen korunarak sayfalara CSS giydirilmiştir.
- Öğrenci numarasına (2416501834) özel kurallar uygulanmış, ana renk `hsl(2416501834, 65%, 38%)` ve yazı tipi `Georgia` olarak belirlenmiştir.
- Mobil öncelikli (Mobile First) yaklaşım kullanılarak medya sorguları (`@media`) ile responsive tasarım yapılmıştır. Geniş ekranlarda kartlar yan yana, mobil ekranlarda alt alta dizilmektedir.
- Tablo yapısı terk edilerek etkinlikler modern kart (`<article>`) görünümüne taşınmıştır.
- Etkinlik detay sayfasında afiş ve künye bilgileri için grid yapısı kullanılarak düzenli bir mizanpaj oluşturulmuştur.

## Sprint 1 Geliştirme Notları
Bu sprint kapsamında uygulamanın temel iskeleti sadece **HTML5** kullanılarak inşa edilmiştir. Projede henüz CSS (tasarım/renklendirme) ve JavaScript (dinamik etkileşim) kullanılmamıştır. 

Tüm sayfalarda ortak yapı olarak `<header>`, `<nav>`, `<main>` ve `<footer>` semantik etiketleri standartlaştırılmıştır.

### Sayfa Yapıları ve Kullanılan Elemanlar
- **`index.html`:** Uygulamanın amacını belirten açıklama metni ve yaklaşan etkinliklerin kısa özetlerini içeren ana sayfa. (`<section>`, `<article>`)
- **`etkinlikler.html`:** Tüm etkinliklerin tek sütunlu ve çerçeveli bir tablo yapısı içerisinde listelendiği sayfa. (`<table>`, `<caption>`, `<tr>`, `<td>`)
- **`etkinlik-detay.html`:** Etkinliğe ait afiş görselinin (`<figure>`, `<img>`, `<figcaption>`) ve detaylı etkinlik künyesinin açıklama listesi formatında (`<dl>`, `<dt>`, `<dd>`) sunulduğu sayfa.
- **`etkinlik-ekle.html`:** Yeni etkinlik kaydı oluşturmak için kullanılan, tüm veri giriş alanlarının zorunlu tutulduğu (`required`) form sayfası.
- **`etkinlik-guncelle.html`:** Mevcut etkinlik bilgilerini düzenlemek için form alanlarının ön tanımlı verilerle (`value`) dolu olarak geldiği güncelleme sayfası.