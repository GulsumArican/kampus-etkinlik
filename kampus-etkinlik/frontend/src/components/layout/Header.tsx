import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

const staticTitles: Record<string, { title: string; text?: string }> = {
  "/": { title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  "/events": { title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  "/admin": { title: "Etkinlik Yönetimi" },
  "/admin/new": { title: "Etkinlik Ekle" },
  "/login": { title: "Giriş Yap" },
  "/register": { title: "Kayıt Ol" },
  "/forgot-password": { title: "Şifremi Unuttum" },
};

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  let title = "Sayfa Bulunamadı";
  let text: string | undefined;

  const known = staticTitles[pathname];
  const detailMatch = matchPath("/events/:id", pathname);
  const editMatch = matchPath("/admin/:id/edit", pathname);

  if (known) {
    title = known.title;
    text = known.text;
  } else if (detailMatch || editMatch) {
    const id = detailMatch?.params.id ?? editMatch?.params.id ?? "";
    const event = findEventById(events, id);
    if (event) {
      title = event.title;
      text = `${event.category} · ${event.location}`;
    }
  }

  useEffect(() => {
    document.title = `${title} — Kampüs Etkinlikleri`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;