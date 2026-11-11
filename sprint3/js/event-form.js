import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const hataMesaji = document.querySelector("#hata-mesaji");

if (form) {
    // --- GÜNCELLEME SAYFASIYSA ESKİ VERİLERİ GETİR ---
    if (form.dataset.mode === "guncelle") {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        const etkinlik = events.find(e => e.id === id);

        if (etkinlik) {
            form.elements["ad"].value = etkinlik.title;
            form.elements["kategori"].value = etkinlik.category;
            form.elements["tarih"].value = etkinlik.date;
            form.elements["saat"].value = etkinlik.time;
            form.elements["yer"].value = etkinlik.location;
            form.elements["kontenjan"].value = etkinlik.capacity;
        } else {
            form.outerHTML = `
                <div style="color: red; border: 1px solid red; padding: 20px; border-radius: 8px;">
                    <h2>Geçersiz veya Eksik ID</h2>
                    <p>Güncellenecek kayıt bulunamadı.</p>
                    <a href="etkinlikler.html" style="font-weight: bold; color: inherit;">← Listeye Dön</a>
                </div>
            `;
        }
    }

    // --- FORM KAYDETME/GÖNDERME İŞLEMİ ---
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        // Formdaki bilgileri al
        const formData = new FormData(form);
        const data = {
            title: formData.get("ad"),
            category: formData.get("kategori"),
            date: formData.get("tarih"),
            time: formData.get("saat"),
            location: formData.get("yer"),
            capacity: formData.get("kontenjan")
        };

        let errors = 0;
        if (hataMesaji) hataMesaji.textContent = "";

        // Doğrulama (Ad 3 karakterden az olamaz)
        const adAlani = document.querySelector("#ad"); 
        if (data.title.length < 3) {
            errors++;
            if (hataMesaji) hataMesaji.textContent = "Hata: Etkinlik adı en az 3 karakter olmalı!";
            if (adAlani) adAlani.style.border = "2px solid red"; // Hata varsa çerçeve kırmızı olsun
        } else {
            if (adAlani) adAlani.style.border = "1px solid #ccc";
        }

        // Hata yoksa ekrana başarı mesajını ve girilen bilgileri yazdır
        if (errors === 0) {
            const baslik = form.dataset.mode === "guncelle" ? "Güncelleme Başarılı!" : "Başarılı!";
            form.innerHTML += `
                <div style="background-color: #e8f5e9; padding: 15px; margin-top: 20px; border-radius: 8px;">
                    <h3 style="color: #2e7d32; margin-top: 0;">${baslik}</h3>
                    <pre style="margin: 0;">${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        }
    });
}