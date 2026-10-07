// Verileri içeri aktarıyoruz
import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const hataMesaji = document.querySelector("#hata-mesaji");

if (form) {
    // --- ADIM 11: GÜNCELLEME SAYFASINDA FORMU DOLDUR VEYA GİZLE ---
    if (form.dataset.mode === "guncelle") {
        // Adres çubuğundaki id'yi yakala
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get("id");
        
        // data.js içinden bu id'ye sahip etkinliği bul
        const etkinlik = events.find(e => e.id === id);

        if (etkinlik) {
            // Etkinlik bulunduysa eski bilgileri form inputlarına yazdır
            if (form.elements["ad"]) form.elements["ad"].value = etkinlik.title;
            if (form.elements["kategori"]) form.elements["kategori"].value = etkinlik.category;
            if (form.elements["yer"]) form.elements["yer"].value = etkinlik.location;
            if (form.elements["kontenjan"]) form.elements["kontenjan"].value = etkinlik.capacity;
            
            // Tarih ve Saat inputları (Tek veya ayrı kullanmış olabilirsin, ikisini de kapsar)
            if (form.elements["tarih-saat"]) form.elements["tarih-saat"].value = etkinlik.date + "T" + etkinlik.time;
            if (form.elements["tarih"]) form.elements["tarih"].value = etkinlik.date;
            if (form.elements["saat"]) form.elements["saat"].value = etkinlik.time;
            
        } else {
            // Etkinlik bulunamadıysa formu tamamen silip yerine hata mesajı koy
            form.outerHTML = `
                <div style="color: red; border: 1px solid red; padding: 20px; border-radius: 8px;">
                    <h2>Geçersiz veya Eksik ID</h2>
                    <p>Güncellenecek kayıt bulunamadı. Hatalı bir adrese girmiş olabilirsiniz.</p>
                    <a href="etkinlikler.html" style="font-weight: bold; color: inherit;">← Listeye Dön</a>
                </div>
            `;
        }
    }
    // -------------------------------------------------------------

    // Form Gönderme (Submit) İşlemi
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = {
            title: formData.get("ad"),
            category: formData.get("kategori"),
            location: formData.get("yer"),
            capacity: formData.get("kontenjan")
        };

        let errors = 0;
        if (hataMesaji) hataMesaji.textContent = "";

        const adAlani = document.querySelector("#ad"); 
        
        // Ad 3 karakter kontrolü
        if (data.title && data.title.length < 3) {
            errors++;
            if (hataMesaji) hataMesaji.textContent = "Hata: Etkinlik adı en az 3 karakter olmalı!";
            if (adAlani) adAlani.setAttribute("aria-invalid", "true");
        } else {
            if (adAlani) adAlani.removeAttribute("aria-invalid");
        }

        // Hata yoksa işlemi onayla
        if (errors === 0) {
            // Güncelleme sayfasıysa mesajı "Güncelleme Başarılı!" yap
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