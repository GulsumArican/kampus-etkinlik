import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "add" | "detail" | "update";

function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  const filteredEvents = filterByCategory(searchEvents(events, searchText), category);
  const categories = [...new Set(events.map(e => e.category))];
  
  // ADIM 12: Seçili etkinliği buluyoruz (Eğer sayfa "detail" ise bu bize lazım olacak)
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // ADIM 11: Side Effect (Sekme Başlığını Değiştirme)
  // Sayfa değiştikçe veya detay sayfasında seçili etkinlik değiştikçe tarayıcının sekme adı güncellenecek
  useEffect(() => {
    if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri — ${selected.title}`;
    } else {
      document.title = "Kampüs Etkinlikleri";
    }
  }, [page, selected]);

  const menuItems: { id: PageName; label: string }[] = [
    { id: "home", label: "Ana Sayfa" },
    { id: "events", label: "Etkinlikler" },
    { id: "add", label: "Ekle" },
  ];

  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h2>{event.title}</h2>
        <span className="kategori-etiketi">{event.category}</span>
        <p>Tarih: {event.date}, {event.time}</p>
        <p>Yer: {event.location}</p>
        <p>Kontenjan: {event.capacity} kişi</p>
        <p>{event.description}</p>
        <a
          href="#"
          className="detay-link"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
        <p>Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin.</p>
      </header>

      <nav className="menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id}>
              <a
                href="#"
                aria-current={page === item.id ? "page" : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  go(item.id);
                }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main>
        {page === "home" && (
          <section className="etkinlik-listesi">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <br/>
            {upcoming.map(renderCard)}
          </section>
        )}

        {page === "events" && (
          <section className="etkinlik-listesi">
            <h2>Tüm Etkinlikler</h2>
            <br/>
            <div className="filtre-kutusu" style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', marginBottom: '20px', border: '1px solid #ddd' }}>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Etkinlik ara</label>
                <input 
                  type="search" 
                  value={searchText} 
                  onChange={(e) => setSearchText(e.target.value)} 
                  placeholder="Örn. atölye, kariyer"
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px' }}>Kategori</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                  style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}
                >
                  <option value="">Tümü</option>
                  {categories.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
            <p style={{ fontWeight: 'bold', color: '#2e7d32', marginBottom: '15px' }}>
              {filteredEvents.length === 0 ? "Aradığınız kriterlere uygun etkinlik bulunamadı." : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>
            {filteredEvents.map(renderCard)}
          </section>
        )}

        {/* ADIM 12: DETAY SAYFASI */}
        {page === "detail" && (
          <section>
             {!selected && (
                <div style={{ padding: '20px', backgroundColor: '#fee2e2', color: '#b91c1c', borderRadius: '8px', border: '1px solid #f87171' }}>
                  <h3>Etkinlik Bulunamadı</h3>
                  <p>Aradığınız etkinlik sistemde mevcut değil.</p>
                  <button onClick={() => go("events")} style={{ marginTop: '10px', padding: '8px 16px', cursor: 'pointer' }}>Listeye dön</button>
                </div>
             )}
             
             {selected && (
                <article className="detay" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #ddd' }}>
                  <h2 style={{ fontSize: '32px', color: '#2e7d32', marginBottom: '20px' }}>{selected.title}</h2>
                  
                  {/* Afiş sadece varsa görünür */}
                  {selected.image && (
                    <figure style={{ marginBottom: '20px' }}>
                      <img src={selected.image} alt={`${selected.title} afişi`} style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px' }} />
                    </figure>
                  )}
                  
                  <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                    <h3 style={{ marginBottom: '15px', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>Etkinlik Künyesi</h3>
                    <p style={{ marginBottom: '10px' }}><strong>Tarih:</strong> {selected.date}, {selected.time}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Yer:</strong> {selected.location}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Kategori:</strong> {selected.category}</p>
                    <p style={{ marginBottom: '10px' }}><strong>Kontenjan:</strong> {selected.capacity} kişi</p>
                  </div>

                  <div style={{ marginBottom: '30px' }}>
                     <h3 style={{ marginBottom: '10px' }}>Açıklama</h3>
                     <p>{selected.description}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '15px' }}>
                    <button onClick={() => go("events")} style={{ padding: '10px 20px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}>← Listeye dön</button>
                    <button onClick={() => go("update", selected.id)} style={{ padding: '10px 20px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Bu etkinliği güncelle</button>
                  </div>
                </article>
             )}
          </section>
        )}

        {/* ADIM 13: EKLE VE GÜNCELLE FORMLARI */}
        {(page === "add" || page === "update") && (
          <section>
            <h2 style={{ fontSize: '32px', color: '#2e7d32', marginBottom: '10px' }}>
              {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            </h2>
            <p style={{ color: '#666', marginBottom: '30px' }}>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

            <form 
              className="form" 
              onSubmit={(e) => e.preventDefault()} 
              style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '8px', border: '1px solid #ddd', maxWidth: '600px' }}
            >
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="title" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Etkinlik Adı</label>
                <input id="title" type="text" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="category" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Kategori</label>
                <select id="category" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
                  <option value="">Seçiniz</option>
                  <option value="Seminer">Seminer</option>
                  <option value="Atölye">Atölye</option>
                  <option value="Söyleşi">Söyleşi</option>
                  <option value="Yarışma">Yarışma</option>
                </select>
              </div>

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
                <div style={{ flex: 1 }}>
                  <label htmlFor="date" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Tarih</label>
                  <input id="date" type="date" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label htmlFor="time" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Saat</label>
                  <input id="time" type="time" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="location" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Yer</label>
                <input id="location" type="text" placeholder="Örn. A Blok Konferans Salonu" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="capacity" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Kontenjan</label>
                <input id="capacity" type="number" min={1} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
              </div>

              <div style={{ marginBottom: '30px' }}>
                <label htmlFor="description" style={{ display: 'block', fontWeight: 'bold', marginBottom: '8px' }}>Açıklama</label>
                <textarea id="description" rows={5} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}></textarea>
              </div>

              <button type="submit" style={{ padding: '12px 24px', backgroundColor: '#2e7d32', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', width: '100%' }}>
                {page === "add" ? "Etkinliği Ekle" : "Değişiklikleri Kaydet"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer className="site-altbilgi">
        <p>Gülsüm Arıcan · 2416501834 · 2026</p>
      </footer>
    </>
  );
}

export default App;