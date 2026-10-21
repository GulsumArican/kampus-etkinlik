import type { PageName } from "../../types/page";

interface NavigationProps {
  current: PageName;
  onNavigate: (page: PageName) => void;
}

const menuItems: { name: PageName; label: string }[] = [
  { name: "home", label: "Ana Sayfa" },
  { name: "events", label: "Etkinlikler" },
  { name: "add", label: "Ekle" },
];

function Navigation({ current, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <ul style={{ display: "flex", listStyle: "none", gap: "10px", padding: 0, margin: 0 }}>
        {menuItems.map((item) => (
          <li key={item.name}>
            <a
              href="#"
              aria-current={current === item.name ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                onNavigate(item.name);
              }}
              style={{
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "4px",
                textDecoration: "none",
                color: current === item.name ? "var(--renk-ana)" : "#fff",
                backgroundColor: current === item.name ? "#fff" : "rgba(255, 255, 255, 0.15)",
                fontWeight: "bold",
                border: "1px solid rgba(255,255,255,0.4)",
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;