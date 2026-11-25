import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

export default function Layout() {
  const [theme, setTheme] = useState(() =>
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light",
  );

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <NavLink className={styles.brand} to="/">
          <span className={styles.mark} aria-hidden="true">N</span>
          <span>Nexora</span>
        </NavLink>
        <div className={styles.actions}>
          {/* NavLink marchează singur pagina curentă; "end" cere potrivire exactă pentru "/" */}
          <nav className={styles.nav} aria-label="Navigare principală" data-testid="nav">
            <NavLink to="/" end>Endpoint-uri</NavLink>
            <NavLink to="/despre">Despre</NavLink>
          </nav>
          <button className="btn" type="button" onClick={toggleTheme} aria-pressed={theme === "dark"}>
            {theme === "dark" ? "Mod luminos" : "Mod întunecat"}
          </button>
        </div>
      </header>
      <Outlet />
      <footer className={styles.footer}>
        <span>Nexora · Proiect Tehnologii Web</span>
      </footer>
    </div>
  );
}
