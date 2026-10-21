interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  const inputStyle = { width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" };
  const labelStyle = { display: "block", fontWeight: "bold", marginBottom: "8px" };

  return (
    <>
      <p style={{ color: "#666", marginBottom: "30px" }}>Bu sprintte form sadece görünüm; kayıt yapılmaz.</p>

      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        style={{ backgroundColor: "#fff", padding: "30px", borderRadius: "8px", border: "1px solid #ddd", maxWidth: "600px" }}
      >
        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="title" style={labelStyle}>Etkinlik Adı</label>
          <input id="title" type="text" maxLength={80} placeholder="Örn. Kariyer Günleri 2026" style={inputStyle} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="category" style={labelStyle}>Kategori</label>
          <select id="category" style={inputStyle}>
            <option value="">Seçiniz</option>
            <option value="Seminer">Seminer</option>
            <option value="Atölye">Atölye</option>
            <option value="Söyleşi">Söyleşi</option>
            <option value="Yarışma">Yarışma</option>
          </select>
        </div>

        <div style={{ marginBottom: "20px" }}>
  <label htmlFor="date" style={labelStyle}>Tarih</label>
  <input id="date" type="date" style={inputStyle} />
</div>

<div style={{ marginBottom: "20px" }}>
  <label htmlFor="time" style={labelStyle}>Saat</label>
  <input id="time" type="time" style={inputStyle} />
</div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="location" style={labelStyle}>Yer</label>
          <input id="location" type="text" placeholder="Örn. A Blok Konferans Salonu" style={inputStyle} />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label htmlFor="capacity" style={labelStyle}>Kontenjan</label>
          <input id="capacity" type="number" min={1} style={inputStyle} />
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label htmlFor="description" style={labelStyle}>Açıklama</label>
          <textarea id="description" rows={5} style={inputStyle} />
        </div>

        <button type="submit" style={{ padding: "12px 24px", backgroundColor: "var(--renk-ana)", color: "#fff", border: "none", borderRadius: "4px", fontSize: "16px", cursor: "pointer", width: "100%", fontWeight: "bold" }}>
          Kaydet
        </button>
      </form>
    </>
  );
}

export default EventForm;