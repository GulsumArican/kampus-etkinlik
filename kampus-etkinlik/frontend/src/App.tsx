import { useState, useEffect } from "react";
import "./App.css";

import { events } from "./data/events";
import type { Category } from "./types/campus-event";
import type { PageName } from "./types/page";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
import EventForm from "./components/forms/EventForm";

const pageTitles: Record<PageName, string> = {
  home: "Kampüs Etkinlikleri",
  events: "Tüm Etkinlikler",
  add: "Etkinlik Ekle",
  detail: "Etkinlik Detayı",
  update: "Etkinlik Güncelle",
};

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
  const categories = [...new Set(events.map((e) => e.category))];
  const selected = selectedId ? findEventById(events, selectedId) : undefined;
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  const title = page === "detail" && selected ? selected.title : pageTitles[page];
  const headerText =
    page === "home" ? "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin."
    : page === "events" ? "Ekim ayında kampüste düzenlenen etkinlikler."
    : undefined;

  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${title}`;
  }, [title]);

  const showDetail = (id: string) => go("detail", id);

  return (
    <>
      <Header title={title} text={headerText} />
      <Navigation current={page} onNavigate={go} />

      <main>
        {page === "home" && (
          <section className="etkinlik-listesi">
            <h2>Yaklaşan 2 Etkinlik</h2>
            <br />
            <EventList events={upcoming} onShowDetail={showDetail} />
            <button
  onClick={() => go("events")}
  style={{ marginTop: "20px", padding: "10px 20px", backgroundColor: "var(--renk-ana)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}
>
  Tüm etkinlikleri gör
</button>
          </section>
        )}

        {page === "events" && (
          <section className="etkinlik-listesi">
            <h2>Tüm Etkinlikler</h2>
            <br />
            <EventFilter
              searchText={searchText}
              category={category}
              categories={categories}
              onSearchChange={setSearchText}
              onCategoryChange={setCategory}
            />
            {filteredEvents.length > 0 && (
              <p style={{ fontWeight: "bold", color: "var(--renk-ana)", marginBottom: "15px" }}>
                {filteredEvents.length} etkinlik listeleniyor.
              </p>
            )}
            <EventList
              events={filteredEvents}
              onShowDetail={showDetail}
              emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı."
            />
          </section>
        )}

        {page === "detail" && (
          <section>
            {!selected && (
              <div style={{ padding: "20px", backgroundColor: "#fee2e2", color: "#b91c1c", borderRadius: "8px", border: "1px solid #f87171" }}>
                <h3>Etkinlik Bulunamadı</h3>
                <p>Aradığınız etkinlik sistemde mevcut değil.</p>
                <button onClick={() => go("events")} style={{ marginTop: "10px", padding: "8px 16px", cursor: "pointer" }}>
                  Listeye dön
                </button>
              </div>
            )}
            {selected && (
              <EventDetail
                event={selected}
                onBack={() => go("events")}
                onEdit={(id) => go("update", id)}
              />
            )}
          </section>
        )}

        {(page === "add" || page === "update") && (
          <section>
            <h2 style={{ fontSize: "32px", color: "var(--renk-ana)", marginBottom: "10px" }}>
              {page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}
            </h2>
            <EventForm onSubmit={() => window.scrollTo(0, 0)} />
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default App;