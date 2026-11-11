import { Link } from "react-router-dom";
import { useEvents } from "../context/EventsContext";
import EventList from "../components/events/EventList";

function HomePage() {
  const { events } = useEvents();
  const upcoming = [...events].sort((a, b) => a.date.localeCompare(b.date)).slice(0, 2);

  return (
    <section>
      <h2 className="bolum-baslik">Yaklaşan 2 Etkinlik</h2>
      <div className="kartlar">
        <EventList events={upcoming} emptyText="Henüz etkinlik yok." />
      </div>
      <Link to="/events" className="buton" style={{ marginTop: "20px" }}>Tüm etkinlikleri gör</Link>
    </section>
  );
}

export default HomePage;