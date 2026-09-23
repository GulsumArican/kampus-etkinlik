# Kampüs Etkinlikleri Projesi

**Canlı Yayın Adresi (Vercel):** https://kampus-etkinlik-kohl.vercel.app/

## Proje Hakkında
Bu proje, kampüs içerisindeki akademik, sosyal ve kültürel etkinliklerin tek bir platform üzerinden kolayca takip edilmesini ve yönetilmesini sağlayan web tabanlı bir uygulamadır.

## Sprint 1 Geliştirme Notları
Bu sprint kapsamında uygulamanın temel iskeleti sadece **HTML5** kullanılarak inşa edilmiştir. Projede henüz CSS (tasarım/renklendirme) ve JavaScript (dinamik etkileşim) kullanılmamıştır. 

Tüm sayfalarda ortak yapı olarak `<header>`, `<nav>`, `<main>` ve `<footer>` semantik etiketleri standartlaştırılmıştır.

### Sayfa Yapıları ve Kullanılan Elemanlar
* **`index.html`:** Uygulamanın amacını belirten açıklama metni ve yaklaşan etkinliklerin kısa özetlerini içeren ana sayfa. (`<section>`, `<article>`)
* **`etkinlikler.html`:** Tüm etkinliklerin tek sütunlu ve çerçeveli bir tablo yapısı içerisinde listelendiği sayfa. (`<table>`, `<caption>`, `<tr>`, `<td>`)
* **`etkinlik-detay.html`:** Etkinliğe ait afiş görselinin (`<figure>`, `<img>`, `<figcaption>`) ve detaylı etkinlik künyesinin açıklama listesi formatında (`<dl>`, `<dt>`, `<dd>`) sunulduğu sayfa.
* **`etkinlik-ekle.html`:** Yeni etkinlik kaydı oluşturmak için kullanılan, tüm veri giriş alanlarının zorunlu tutulduğu (`required`) form sayfası.
* **`etkinlik-guncelle.html`:** Mevcut etkinlik bilgilerini düzenlemek için form alanlarının ön tanımlı verilerle (`value`) dolu olarak geldiği güncelleme sayfası.