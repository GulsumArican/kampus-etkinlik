import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="detay" style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", border: "1px solid #ddd" }}>
      {event.image && (
        <figure style={{ marginBottom: "20px" }}>
          <img src={event.image} alt={`${event.title} afişi`} style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }} />
          <figcaption>{event.title} afişi</figcaption>
        </figure>
      )}

      <div style={{ backgroundColor: "var(--renk-zemin)", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "15px" }}>Etkinlik Künyesi</h3>
        <p><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p><strong>Yer:</strong> {event.location}</p>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>

      <h3>Açıklama</h3>
      <p>{event.description}</p>

      <div className="islemler" style={{ marginTop: "20px" }}>
        <Link to="/events" className="buton">← Listeye dön</Link>
        <Link to={`/admin/${event.id}/edit`} className="buton">Bu etkinliği güncelle</Link>
      </div>
    </article>
  );
}

export default EventDetail;