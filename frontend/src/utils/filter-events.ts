import type { CampusEvent, Category } from "../types/campus-event";

// Metin araması (Başlık veya açıklamada)
export function searchEvents(list: CampusEvent[], text: string): CampusEvent[] {
  const q = text.trim().toLocaleLowerCase("tr-TR");
  return list.filter((e) => 
    e.title.toLocaleLowerCase("tr-TR").includes(q) || 
    e.description.toLocaleLowerCase("tr-TR").includes(q)
  );
}

// Kategoriye göre filtreleme
export function filterByCategory(list: CampusEvent[], category: Category | ""): CampusEvent[] {
  if (category === "") return list;
  return list.filter((e) => e.category === category);
}

// ID'ye göre tek bir etkinlik bulma
export function findEventById(list: CampusEvent[], id: string): CampusEvent | undefined {
  return list.find((e) => e.id === id);
}