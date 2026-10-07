const form = document.querySelector("#etkinlik-formu");
const hataMesaji = document.querySelector("#hata-mesaji");

if (form) {
    form.addEventListener("submit", (e) => {
        // 1. Sayfanın yenilenmesini (formun gönderilmesini) engelle
        e.preventDefault();

        // 2. Formdaki tüm verileri FormData ile topla
        const formData = new FormData(form);
        const data = {
            title: formData.get("ad"),       // HTML'deki input name="ad" olmalı
            category: formData.get("kategori"),
            date: formData.get("tarih-saat"),
            location: formData.get("yer"),
            capacity: formData.get("kontenjan")
        };

        // 3. Doğrulama (Hata Kontrolü)
        let errors = 0;
        hataMesaji.textContent = ""; // Önceki hataları temizle

        // Ad alanı HTML'de id="ad" olarak tanımlı olmalı
        const adAlani = document.querySelector("#ad"); 
        
        // Etkinlik adı en az 3 karakter olmalı kuralı
        if (data.title.length < 3) {
            errors++;
            hataMesaji.textContent = "Hata: Etkinlik adı en az 3 karakter olmalı!";
            if(adAlani) adAlani.setAttribute("aria-invalid", "true"); // Alanı kırmızı yapmak için
        } else {
            if(adAlani) adAlani.removeAttribute("aria-invalid");
        }

        // 4. Hata yoksa veriyi formun altına yeşil kutu içinde yazdır
        if (errors === 0) {
            form.innerHTML += `
                <div style="background-color: #e8f5e9; padding: 15px; margin-top: 20px; border-radius: 8px;">
                    <h3 style="color: #2e7d32; margin-top: 0;">Başarılı! Oluşan Nesne:</h3>
                    <pre style="margin: 0;">${JSON.stringify(data, null, 2)}</pre>
                </div>
            `;
        }
    });
}