# Kampüs Etkinlikleri Projesi

**Canlı Yayın Adresi (Vercel):** https://kampus-etkinlik-kohl.vercel.app/

## Proje Hakkında
Bu proje, kampüs içerisindeki akademik, seminer, atölye ve söyleşi gibi etkinliklerin tek bir platform üzerinden takip edilmesini sağlayan React tabanlı bir web uygulamasıdır.

# Sprint 4 Geliştirme Notları (React, Vite, TypeScript ve State Yönetimi)
- **Canlı Yayın Adresi:** [Buraya Vercel canlı linkini yapıştır]
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