import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import type { PageName } from "./types/page";
import Footer from "./components/layout/Footer";
import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventCard from "./components/events/EventCard";


function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
    window.scrollTo(0, 0);
  }

  const filteredEvents = filterByCategory(searchEvents(events, searchText), category);
  const categories = [...new Set(events.map(e => e.category))];
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  const pageTitles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  add: "Etkinlik Ekle",
  detail: "Etkinlik Detayı",
  update: "Etkinlik Güncelle",
};
const title = page === "detail" && selected ? selected.title : pageTitles[page];
const headerText =
  page === "home" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
  : page === "events" ? "Ekim ayında kampüste düzenlenen etkinlikler."
  : undefined;

useEffect(() => {
  document.title = `Kampüs Etkinlikleri — ${title}`;
}, [title]);



  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);



  return (
    <>
<Header title={title} text={headerText} />

<Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section className="etkinlik-listesi">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <br/>
            {upcoming.map((e) => (
  <EventCard key={e.id} event={e} onShowDetail={(id) => go("detail", id)} />
))}
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
            <p style={{ fontWeight: 'bold', color: 'var(--renk-ana)', marginBottom: '15px' }}>
              {filteredEvents.length === 0 ? "Aradığınız kriterlere uygun etkinlik bulunamadı." : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>
            {filteredEvents.map((e) => (
  <EventCard key={e.id} event={e} onShowDetail={(id) => go("detail", id)} />
))}
          </section>
        )}

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
                  <h2 style={{ fontSize: '32px', color: 'var(--renk-ana)', marginBottom: '20px' }}>{selected.title}</h2>
                  
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
                    <button onClick={() => go("events")} style={{ padding: '10px 20px', backgroundColor: '#e2e8f0', color: '#1e293b', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>← Listeye dön</button>
                    <button onClick={() => go("update", selected.id)} style={{ padding: '10px 20px', backgroundColor: 'var(--renk-ana)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Bu etkinliği güncelle</button>
                  </div>
                </article>
             )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2 style={{ fontSize: '32px', color: 'var(--renk-ana)', marginBottom: '10px' }}>
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

              <button type="submit" style={{ padding: '12px 24px', backgroundColor: 'var(--renk-ana)', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '16px', cursor: 'pointer', width: '100%', fontWeight: 'bold' }}>
                {page === "add" ? "Etkinliği Ekle" : "Değişiklikleri Kaydet"}
              </button>
            </form>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;