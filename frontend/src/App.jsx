import { useState } from "react";
import EndpointList from "./components/EndpointList.jsx";

const ENDPOINTS_INITIALE = [
  { id: 1, path: "/users/{id}", method: "GET", description: "Returnează un utilizator după id", documented: true },
  { id: 2, path: "/users", method: "POST", description: "Creează un utilizator nou", documented: false },
  { id: 3, path: "/users/{id}", method: "DELETE", description: "Șterge un utilizator", documented: false },
];

function temaInitiala() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function App() {
  const [endpoints, setEndpoints] = useState(ENDPOINTS_INITIALE);
  const [tema, setTema] = useState(temaInitiala);

  function handleToggle(id) {
    setEndpoints((previousEndpoints) =>
      previousEndpoints.map((endpoint) =>
        endpoint.id === id ? { ...endpoint, documented: !endpoint.documented } : endpoint,
      ),
    );
  }

  function handleDelete(id) {
    setEndpoints((previousEndpoints) => previousEndpoints.filter((endpoint) => endpoint.id !== id));
  }

  function handleTema() {
    const newTheme = tema === "dark" ? "light" : "dark";
    setTema(newTheme);
    document.documentElement.dataset.theme = newTheme;
  }

  const undocumented = endpoints.filter((endpoint) => !endpoint.documented).length;

  return (
    <div className="app-page">
      <header className="app-header">
        <div className="app-header-inner">
          <a className="app-brand" href="/" aria-label="Nexora home">
            <span className="app-brand-mark" aria-hidden="true">N</span>
            <span>Nexora</span>
          </a>
          <div className="app-header-copy">
            <p className="app-eyebrow">API documentation workspace</p>
            <p>Turn OpenAPI specifications into documentation people love to use.</p>
          </div>
          <p className="app-counter">{endpoints.length} endpoint-uri, dintre care {undocumented} nedocumentate</p>
        </div>
        <button
          className="theme-toggle"
          type="button"
          aria-pressed={tema === "dark"}
          onClick={handleTema}
        >
          {tema === "dark" ? "Mod luminos" : "Mod întunecat"}
        </button>
      </header>

      <main className="app-container">
        <section className="app-panel list-panel" aria-labelledby="list-title">
          <div className="list-heading">
            <div>
              <p className="app-eyebrow">Your workspace</p>
              <h1 id="list-title">API endpoints</h1>
            </div>
            <span className="list-count">{endpoints.length} items</span>
          </div>
          <EndpointList endpoints={endpoints} onToggle={handleToggle} onDelete={handleDelete} />
        </section>
      </main>

      <footer className="app-footer">
        <p>Nexora <span aria-hidden="true">·</span> Web Technologies Project</p>
        <a href="/docs.html">View generated docs example</a>
      </footer>
    </div>
  );
}
