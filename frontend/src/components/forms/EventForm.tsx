import { useState } from "react";
import type { ChangeEvent, CSSProperties, FormEvent } from "react";
import type { Category, EventFormData, EventFormErrors } from "../../types/campus-event";
import { validateEvent } from "../../utils/validate-event";

interface EventFormProps {
  initialData: EventFormData;
  submitText: string;
  onSubmit: (data: EventFormData) => void;
}

const categoryOptions: Category[] = ["Seminer", "Atölye", "Söyleşi", "Yarışma"];
const groupStyle: CSSProperties = { marginBottom: "20px" };
const labelStyle: CSSProperties = { display: "block", fontWeight: "bold", marginBottom: "8px" };
const inputStyle: CSSProperties = { width: "100%", padding: "10px", boxSizing: "border-box" };

function EventForm({ initialData, submitText, onSubmit }: EventFormProps) {
  const [data, setData] = useState<EventFormData>(initialData);
  const [errors, setErrors] = useState<EventFormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const found = validateEvent(data);
    setErrors(found);
    if (Object.keys(found).length === 0) {
      onSubmit(data);
    }
  }

  return (
    <form className="form form-alani" onSubmit={handleSubmit} noValidate>
      <div style={groupStyle}>
        <label htmlFor="title" style={labelStyle}>Etkinlik Adı</label>
        <input id="title" name="title" type="text" maxLength={80} value={data.title} onChange={handleChange}
          aria-invalid={errors.title ? true : undefined} style={inputStyle} />
        {errors.title && <span className="hata-metni">{errors.title}</span>}
      </div>

      <div style={groupStyle}>
        <label htmlFor="category" style={labelStyle}>Kategori</label>
        <select id="category" name="category" value={data.category} onChange={handleChange}
          aria-invalid={errors.category ? true : undefined} style={inputStyle}>
          <option value="">Seçiniz</option>
          {categoryOptions.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        {errors.category && <span className="hata-metni">{errors.category}</span>}
      </div>

      <div style={groupStyle}>
        <label htmlFor="date" style={labelStyle}>Tarih</label>
        <input id="date" name="date" type="date" value={data.date} onChange={handleChange}
          aria-invalid={errors.date ? true : undefined} style={inputStyle} />
        {errors.date && <span className="hata-metni">{errors.date}</span>}
      </div>

      <div style={groupStyle}>
        <label htmlFor="time" style={labelStyle}>Saat</label>
        <input id="time" name="time" type="time" value={data.time} onChange={handleChange}
          aria-invalid={errors.time ? true : undefined} style={inputStyle} />
        {errors.time && <span className="hata-metni">{errors.time}</span>}
      </div>

      <div style={groupStyle}>
        <label htmlFor="location" style={labelStyle}>Yer</label>
        <input id="location" name="location" type="text" value={data.location} onChange={handleChange}
          aria-invalid={errors.location ? true : undefined} style={inputStyle} />
        {errors.location && <span className="hata-metni">{errors.location}</span>}
      </div>

      <div style={groupStyle}>
        <label htmlFor="capacity" style={labelStyle}>Kontenjan</label>
        <input id="capacity" name="capacity" type="number" value={data.capacity} onChange={handleChange}
          aria-invalid={errors.capacity ? true : undefined} style={inputStyle} />
        {errors.capacity && <span className="hata-metni">{errors.capacity}</span>}
      </div>

      <div style={groupStyle}>
        <label htmlFor="description" style={labelStyle}>Açıklama</label>
        <textarea id="description" name="description" rows={5} value={data.description} onChange={handleChange}
          aria-invalid={errors.description ? true : undefined} style={inputStyle} />
        {errors.description && <span className="hata-metni">{errors.description}</span>}
      </div>

      <button type="submit">{submitText}</button>
    </form>
  );
}

export default EventForm;