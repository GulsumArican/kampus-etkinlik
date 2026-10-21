import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (text: string) => void;
  onCategoryChange: (category: Category | "") => void;
}

function EventFilter({ searchText, category, categories, onSearchChange, onCategoryChange }: EventFilterProps) {
  return (
    <div className="filtre-kutusu" style={{ backgroundColor: "#fff", padding: "20px", borderRadius: "8px", marginBottom: "20px", border: "1px solid #ddd" }}>
      <div style={{ marginBottom: "15px" }}>
        <label htmlFor="arama" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Etkinlik ara</label>
        <input
          id="arama"
          type="search"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Örn. atölye, kariyer"
          style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        />
      </div>
      <div>
        <label htmlFor="kategori-filtre" style={{ display: "block", fontWeight: "bold", marginBottom: "5px" }}>Kategori</label>
        <select
          id="kategori-filtre"
          value={category}
          onChange={(e) => onCategoryChange(e.target.value as Category | "")}
          style={{ width: "100%", padding: "10px", borderRadius: "4px", border: "1px solid #ccc" }}
        >
          <option value="">Tümü</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default EventFilter;