import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({ event, onBack, onEdit }: EventDetailProps) {
  return (
    <article className="detay" style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", border: "1px solid #ddd" }}>
      <h2 style={{ fontSize: "32px", color: "var(--renk-ana)", marginBottom: "20px" }}>{event.title}</h2>

      {event.image && (
        <figure style={{ marginBottom: "20px" }}>
          <img src={event.image} alt={`${event.title} afişi`} style={{ maxWidth: "100%", height: "auto", borderRadius: "4px" }} />
        </figure>
      )}

      <div style={{ backgroundColor: "var(--renk-zemin)", padding: "20px", borderRadius: "8px", marginBottom: "20px" }}>
        <h3 style={{ marginBottom: "15px", borderBottom: "1px solid #eee", paddingBottom: "10px" }}>Etkinlik Künyesi</h3>
        <p style={{ marginBottom: "10px" }}><strong>Tarih:</strong> {formatDate(event.date)}, {event.time}</p>
        <p style={{ marginBottom: "10px" }}><strong>Yer:</strong> {event.location}</p>
        <p style={{ marginBottom: "10px" }}><strong>Kategori:</strong> {event.category}</p>
        <p style={{ marginBottom: "10px" }}><strong>Kontenjan:</strong> {event.capacity} kişi</p>
      </div>

      <div style={{ marginBottom: "30px" }}>
        <h3 style={{ marginBottom: "10px" }}>Açıklama</h3>
        <p>{event.description}</p>
      </div>

      <div style={{ display: "flex", gap: "15px" }}>
        <button onClick={onBack} style={{ padding: "10px 20px", backgroundColor: "#e2e8f0", color: "#1e293b", border: "1px solid #cbd5e1", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
          ← Listeye dön
        </button>
        <button onClick={() => onEdit(event.id)} style={{ padding: "10px 20px", backgroundColor: "var(--renk-ana)", color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontWeight: "bold" }}>
          Bu etkinliği güncelle
        </button>
      </div>
    </article>
  );
}

export default EventDetail;