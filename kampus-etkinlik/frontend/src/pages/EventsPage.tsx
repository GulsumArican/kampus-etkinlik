import { useState } from "react";
import { useEvents } from "../context/EventsContext";
import EventFilter from "../components/events/EventFilter";
import EventList from "../components/events/EventList";
import { searchEvents, filterByCategory } from "../utils/filter-events";
import type { Category } from "../types/campus-event";

function EventsPage() {
  const { events } = useEvents();
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  const categories = [...new Set(events.map((e) => e.category))];
  const filtered = filterByCategory(searchEvents(events, searchText), category);

  return (
    <section>
      <EventFilter
        searchText={searchText}
        category={category}
        categories={categories}
        onSearchChange={setSearchText}
        onCategoryChange={setCategory}
      />
      {filtered.length > 0 && (
        <p style={{ fontWeight: "bold", color: "var(--renk-ana)" }}>{filtered.length} etkinlik listeleniyor.</p>
      )}
      <div className="kartlar">
        <EventList events={filtered} emptyText="Aradığınız kriterlere uygun etkinlik bulunamadı." />
      </div>
    </section>
  );
}

export default EventsPage;