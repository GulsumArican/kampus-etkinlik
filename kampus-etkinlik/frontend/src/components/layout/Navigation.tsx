import { NavLink } from "react-router-dom";

const menu = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/events", label: "Etkinlikler" },
  { to: "/admin", label: "Yönetim" },
  { to: "/login", label: "Giriş" },
];

function Navigation() {
  return (
    <nav className="menu">
      <ul style={{ display: "flex", flexWrap: "wrap", listStyle: "none", gap: "10px", padding: 0, margin: 0 }}>
        {menu.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.to === "/"}
              style={({ isActive }) => ({
                display: "inline-block",
                padding: "8px 16px",
                borderRadius: "4px",
                textDecoration: "none",
                color: isActive ? "var(--renk-ana)" : "#fff",
                backgroundColor: isActive ? "#fff" : "transparent",
fontWeight: "bold",
border: "none",
              })}
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navigation;