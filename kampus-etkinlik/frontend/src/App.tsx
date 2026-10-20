import React, { useState } from 'react';
import './App.css';

// Örnek Veri Yapısı (Sprint 4 Standartlarına Uygun)
interface EventItem {
  id: number;
  title: string;
  category: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  description: string;
  image?: string;
}

const initialEvents: EventItem[] = [
  {
    id: 1,
    title: "Kariyer Günleri 2026",
    category: "Seminer",
    date: "2026-10-12",
    time: "14:00",
    location: "A Blok Konferans Salonu",
    capacity: 100,
    description: "Mezunlarla kariyer söyleşileri ve şirket standları."
  },
  {
    id: 2,
    title: "Robotik Atölyesi",
    category: "Atölye",
    date: "2026-10-20",
    time: "10:00",
    location: "Bilgisayar Laboratuvarı 2",
    capacity: 20,
    description: "Arduino ile çizgi izleyen robot yapımı, başlangıç seviyesi."
  }
];

export default function App() {
  const [page, setPage] = useState<string>("home");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [searchText, setSearchText] = useState<string>("");
  const [category, setCategory] = useState<string>("");

  const categories = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];

  // Sayfa değiştirme fonksiyonu
  const go = (targetPage: string, id?: number) => {
    if (id !== undefined) {
      setSelectedId(id);
    }
    setPage(targetPage);
    window.scrollTo(0, 0);
  };

  const selectedEvent = initialEvents.find(e => e.id === selectedId);

  // Filtreleme
  const filteredEvents = initialEvents.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(searchText.toLowerCase());
    const matchesCategory = category === "" || e.category === category;
    return matchesSearch && matchesCategory;
  });

  const renderCard = (item: EventItem) => (
    <article key={item.id} className="kart" style={{ marginBottom: '20px', border: '1px solid #ddd', padding: '20px', borderRadius: '8px', background: '#fff' }}>
      <h3 style={{ marginBottom: '10px', color: 'var(--renk-ana)' }}>{item.title}</h3>
      <p style={{ marginBottom: '5px' }}><strong>Kategori:</strong> {item.category}</p>
      <p style={{ marginBottom: '5px' }}><strong>Tarih:</strong> {item.date}, {item.time}</p>
      <p style={{ marginBottom: '15px' }}><strong>Yer:</strong> {item.location}</p>
      <button onClick={() => go("detail", item.id)}>Detayları gör</button>
    </article>
  );

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: 'var(--renk-zemin)' }}>
      {/* Üst Bilgi Alanı */}
      <header className="site-baslik" style={{ padding: '2rem', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '2rem' }}>Kampüs Etkinlikleri</h1>
        <p style={{ marginTop: '0.5rem', opacity: 0.9 }}>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </header>

      {/* Menü Navigasyonu */}
      <nav style={{ display: 'flex', gap: '10px', padding: '1rem 2rem', background: 'rgba(0,0,0,0.03)', borderBottom: '1px solid #ddd' }}>
        <button onClick={() => go("home")} style={{ fontWeight: page === "home" ? 'bold' : 'normal' }}>Ana Sayfa</button>
        <button onClick={() => go("events")} style={{ fontWeight: page === "events" ? 'bold' : 'normal' }}>Etkinlikler</button>
        <button onClick={() => go("add")} style={{ fontWeight: page === "add" ? 'bold' : 'normal' }}>Ekle</button>
      </nav>

      {/* İçerik Alanı */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '800px', width: '100%', margin: '0 auto' }}>
        
        {/* ANA SAYFA */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan Etkinlikler</h2>
            <br />
            <div className="kartlar">
              {initialEvents.map(renderCard)}
            </div>
          </section>
        )}

        {/* TÜM ETKİNLİKLER */}
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <br />
            <div style={{ background: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
              <div style={{ marginBottom: '10px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Ara</label>
                <input 
                  type="search" 
                  value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)} 
                  placeholder="Örn. atölye, kariyer" 
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Kategori</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">Tümü</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>

            {filteredEvents.length === 0 ? (
              <p style={{ fontWeight: 'bold', color: 'var(--renk-ana)' }}>Aradığınız kriterlere uygun etkinlik bulunamadı.</p>
            ) : (
              <div className="kartlar">
                {filteredEvents.map(renderCard)}
              </div>
            )}
          </section>
        )}

        {/* ETKİNLİK DETAY */}
        {page === "detail" && (
          <section>
            {!selectedEvent ? (
              <div style={{ padding: '20px', background: '#fee2e2', color: '#b91c1c', borderRadius: '8px' }}>
                <h3>Etkinlik Bulunamadı</h3>
                <p>Aradığınız etkinlik sistemde mevcut değil.</p>
                <button onClick={() => go("events")} style={{ marginTop: '10px' }}>Listeye dön</button>
              </div>
            ) : (
              <article className="detay" style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #ddd' }}>
                <h2 style={{ fontSize: '28px', color: 'var(--renk-ana)', marginBottom: '20px' }}>{selectedEvent.title}</h2>
                <div style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                  <p style={{ marginBottom: '10px' }}><strong>Tarih:</strong> {selectedEvent.date}, {selectedEvent.time}</p>
                  <p style={{ marginBottom: '10px' }}><strong>Yer:</strong> {selectedEvent.location}</p>
                  <p style={{ marginBottom: '10px' }}><strong>Kategori:</strong> {selectedEvent.category}</p>
                  <p style={{ marginBottom: '10px' }}><strong>Kontenjan:</strong> {selectedEvent.capacity} kişi</p>
                </div>
                <div style={{ marginBottom: '30px' }}>
                  <h3 style={{ marginBottom: '10px' }}>Açıklama</h3>
                  <p>{selectedEvent.description}</p>
                </div>
                <button onClick={() => go("events")}>← Listeye dön</button>
              </article>
            )}
          </section>
        )}

        {/* ETKİNLİK EKLE / GÜNCELLE FORMU */}
        {(page === "add" || page === "update") && (
          <section>
            <h2 style={{ fontSize: '28px', color: 'var(--renk-ana)', marginBottom: '10px' }}>
              {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            </h2>
            <p style={{ color: '#666', marginBottom: '20px' }}>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>
            
            <form onSubmit={(e) => e.preventDefault()} style={{ background: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #ddd' }}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Etkinlik Adı</label>
                <input type="text" placeholder="Örn. Kariyer Günleri 2026" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Kategori</label>
                <select style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <option value="">Seçiniz</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Tarih</label>
                  <input type="text" placeholder="gg.aa.yyyy" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Saat</label>
                  <input type="text" placeholder="--:--" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Yer</label>
                <input type="text" placeholder="Örn. A Blok Konferans Salonu" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Kontenjan</label>
                <input type="number" placeholder="100" style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Açıklama</label>
                <textarea rows={4} placeholder="Etkinlik hakkında bilgi..." style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
              </div>
              <button type="submit">{page === "add" ? "Etkinliği Ekle" : "Güncellemeleri Kaydet"}</button>
            </form>
          </section>
        )}

      </main>

      {/* Sayfa Altı Künye (Öğrenci Numarası ve Ad Soyad) */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', fontSize: '0.9rem', color: '#555', borderTop: '1px solid #ddd' }}>
        Gülsüm Arıcan · 2416501834 · 2026
      </footer>
    </div>
  );
}