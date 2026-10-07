// Verileri içeri aktar
import { events } from "./data.js";

// HTML'de boşalttığımız kutuyu bul
const container = document.querySelector("#detay");

// 1. Adres çubuğundaki (URL) ?id= kısmını yakala
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

if (container) {
    // 2. data.js içindeki etkinliklerden id'si eşleşeni bul
    const event = events.find(e => e.id === id);

    // 3. Eğer geçersiz bir id girilmişse veya etkinlik bulunamazsa hata göster
    if (!event) {
        container.innerHTML = `
            <div style="color: red; border: 1px solid red; padding: 20px; border-radius: 8px;">
                <h2>Geçersiz veya Eksik ID</h2>
                <p>Aradığınız etkinlik bulunamadı veya sistemden kaldırılmış olabilir.</p>
                <a href="etkinlikler.html" style="color: inherit; font-weight: bold;">← Listeye Dön</a>
            </div>
        `;
    } 
    // 4. Etkinlik bulunduysa detayları ekrana çizdir
    else {
        // Tarayıcı sekmesinin adını etkinliğin adı yap
        document.title = event.title;

        // Hem yan yana derli toplu duran hem de mobil uyumlu yapı
        container.innerHTML = `
            <div style="display: flex; flex-wrap: wrap; gap: 40px; max-width: 900px; margin: 0 auto; padding: 20px 0;">
                <figure style="flex: 1; min-width: 250px; max-width: 350px; margin: 0;">
                    <img src="afis.jpg" alt="${event.title} Afişi" style="width: 100%; border-radius: 8px;">
                    <figcaption style="margin-top: 10px; font-style: italic; color: #555;">${event.category}</figcaption>
                </figure>
                
                <div class="kunye" style="flex: 2; min-width: 300px;">
                    <h2 style="margin-top: 0; margin-bottom: 20px;">${event.title}</h2>
                    <dl style="display: grid; grid-template-columns: 100px 1fr; gap: 10px; margin: 0;">
                        <dt style="font-weight: bold;">Tarih:</dt>
                        <dd style="margin: 0;">${event.date}</dd>
                        
                        <dt style="font-weight: bold;">Saat:</dt>
                        <dd style="margin: 0;">${event.time}</dd>
                        
                        <dt style="font-weight: bold;">Konum:</dt>
                        <dd style="margin: 0;">${event.location}</dd>
                        
                        <dt style="font-weight: bold;">Kapasite:</dt>
                        <dd style="margin: 0;">${event.capacity} Kişi</dd>
                    </dl>
                    
                    <div style="margin-top: 20px;">
                        <h3 style="margin-bottom: 5px; font-size: 1.1em;">Açıklama</h3>
                        <p style="margin-top: 0;">${event.description}</p>
                    </div>
                    
                    <div style="margin-top: 30px; display: flex; gap: 15px; flex-wrap: wrap;">
                        <a href="etkinlikler.html" style="background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">← Listeye dön</a>
                        <a href="etkinlik-guncelle.html?id=${event.id}" style="background-color: #2e7d32; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">Bu etkinliği güncelle</a>
                    </div>
                </div>
            </div>
        `;
    }
}