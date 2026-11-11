// data.js dosyasından etkinlikleri içeri aktarıyoruz
import { events } from "./data.js";

// HTML'deki boş kutumuzu (id="etkinlik-listesi") buluyoruz
const container = document.querySelector("#etkinlik-listesi");

// Tek bir etkinlik verisini alıp HTML kartına çeviren fonksiyon
function createCard(event) {
    // Tarihi daha düzgün bir formata (örn: 12 Ekim 2026) çeviriyoruz
    const dateObj = new Date(event.date);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = dateObj.toLocaleDateString("tr-TR", options);

    // Kartın HTML yapısını geriye dönüyoruz (Sprint 2'deki tasarımın aynısı)
    return `
    <article class="kart">
        <h3>${event.title}</h3>
        <p>${event.category}<br>${formattedDate}<br>${event.location}</p>
        <a href="etkinlik-detay.html?id=${event.id}">Detay →</a>
    </article>
    `;
}

// Ana yazdırma (render) fonksiyonumuz
function render(eventArray) {
    // Eğer sayfada etkinlik-listesi id'sine sahip bir kutu varsa çalışır
    if (container) {
        container.innerHTML = eventArray.map(createCard).join("");
    }
}

// Sayfa yüklendiğinde tüm etkinlikleri listele
// Eğer sayfada id="etkinlik-listesi" olan bir container varsa işlemleri yap
if (container) {
    // data-limit özelliği var mı kontrol et (Ana sayfa için)
    if (container.dataset.limit) {
        // Etkinlikleri tarihe göre sırala ve limit (2) kadarını al
        const yaklasan = [...events]
            .sort((a, b) => a.date.localeCompare(b.date))
            .slice(0, Number(container.dataset.limit));
        
        render(yaklasan); // Sadece yaklaşan 2'sini çizdir
    } else {
        // data-limit yoksa (Tüm Etkinlikler sayfası), hepsini çizdir
        render(events);
    }
}
// Filtreleme elementlerini yakalayalım
const filtreFormu = document.querySelector("#filtre-formu");
const arama = document.querySelector("#arama");
const kategoriFiltre = document.querySelector("#kategori-filtre");
const sonucMetni = document.querySelector("#sonuc");

// Eğer sayfada filtre formu varsa (Sadece etkinlikler.html'de çalışması için)
if (filtreFormu) {
    // Formun enter'a basılınca sayfayı yenilemesini engelle
    filtreFormu.addEventListener("submit", (e) => e.preventDefault());

    // 1. Verideki kategorileri bulup otomatik (dinamik) olarak select kutusuna ekle
    const benzersizKategoriler = new Set(events.map(e => e.category));
    benzersizKategoriler.forEach(kategori => {
        kategoriFiltre.innerHTML += `<option value="${kategori}">${kategori}</option>`;
    });

    // 2. Filtreleme Fonksiyonu
    function filtrele() {
        // Kullanıcının yazdığını küçük harfe çevir (Büyük/küçük harf sorunu olmasın)
        const aranan = arama.value.toLocaleLowerCase("tr-TR");
        const secilenKategori = kategoriFiltre.value;

        // Hem yazıya hem kategoriye göre uyumlu olanları filtrele
        const sonuclar = events.filter(e => {
            const baslikVeyaAciklama = e.title.toLocaleLowerCase("tr-TR").includes(aranan) || 
                                       e.description.toLocaleLowerCase("tr-TR").includes(aranan);
            
            const kategoriUyuyor = (secilenKategori === "Tümü") || (e.category === secilenKategori);
            
            return baslikVeyaAciklama && kategoriUyuyor;
        });

        // 3. Çıkan sonuçları ekrana çizdir
        render(sonuclar);

        // 4. Sonuç sayısını göster veya bulunamadı yaz
        if (sonuclar.length === 0) {
            container.innerHTML = "<p>Aradığınız kritere uygun etkinlik bulunamadı.</p>";
            sonucMetni.textContent = "0 sonuç";
        } else {
            sonucMetni.textContent = `${sonuclar.length} sonuç`;
        }
    }

    // Arama kutusuna her harf girildiğinde (input) ve kategori her değiştiğinde (change) çalıştır
    arama.addEventListener("input", filtrele);
    kategoriFiltre.addEventListener("change", filtrele);
}