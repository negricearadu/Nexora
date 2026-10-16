const endpoints = [
  { id: 1, path: "/users/{id}", method: "GET", description: "Returnează un utilizator după id", documented: true },
  { id: 2, path: "/users", method: "POST", description: "Creează un utilizator nou", documented: false },
  { id: 3, path: "/users/{id}", method: "DELETE", description: "Șterge un utilizator", documented: false },
];

export default function App() {
  const undocumented = endpoints.filter((endpoint) => !endpoint.documented).length;
  const documented = endpoints.length - undocumented;
  const coverage = Math.round((documented / endpoints.length) * 100);

  return (
    <div className="app-page">
      <aside className="app-sidebar">
        <a className="app-brand" href="/" aria-label="Nexora home">
          <span className="app-brand-mark" aria-hidden="true">N</span>
          <span>Nexora</span>
        </a>
        <div className="workspace-switcher">
          <span className="workspace-avatar">NI</span>
          <span><b>Nexora Internal</b><small>Workspace</small></span>
          <span className="switcher-chevron" aria-hidden="true">⌄</span>
        </div>
        <nav className="app-nav" aria-label="Main navigation">
          <a className="nav-link is-active" href="#overview"><span aria-hidden="true">◈</span> Overview</a>
          <a className="nav-link" href="#endpoints"><span aria-hidden="true">⌘</span> Endpoints <small>{endpoints.length}</small></a>
          <a className="nav-link" href="#activity"><span aria-hidden="true">↗</span> Activity</a>
        </nav>
        <div className="sidebar-bottom">
          <p className="sidebar-label">Environment</p>
          <div className="environment"><span className="status-dot" /> Production <span className="environment-arrow">↗</span></div>
          <p className="sidebar-meta">Last synced<br /><b>Today, 09:42 UTC</b></p>
        </div>
      </aside>

      <main className="app-content" id="overview">
        <header className="content-header">
          <div className="breadcrumb"><span>Workspace</span><b>/</b><strong>Identity API</strong></div>
          <div className="header-actions"><span className="version-chip">v1.4.2</span><button className="icon-button" type="button" aria-label="More options">•••</button><span className="user-avatar">AR</span></div>
        </header>

        <div className="app-container">
          <section className="hero-block">
            <div>
              <p className="app-eyebrow">Service overview <span className="live-pill"><i /> Operational</span></p>
              <h1>Identity API</h1>
              <p className="hero-subtitle">Core authentication and user identity services for the Nexora platform.</p>
            </div>
            <p className="app-counter"><b>{endpoints.length}</b> endpoint-uri <span>·</span> <b>{undocumented}</b> nedocumentate</p>
          </section>

          <section className="metrics-grid" aria-label="API metrics">
            <article className="metric-card"><span className="metric-label">Documentation coverage</span><strong>{coverage}%</strong><span className="metric-note"><i className="trend-up">↗</i> Healthy baseline</span></article>
            <article className="metric-card"><span className="metric-label">Total endpoints</span><strong>{endpoints.length}</strong><span className="metric-note">Across 3 methods</span></article>
            <article className="metric-card metric-alert"><span className="metric-label">Needs attention</span><strong>{undocumented}</strong><span className="metric-note">Descriptions pending</span></article>
          </section>

          <section className="app-panel list-panel" id="endpoints" aria-labelledby="list-title">
            <div className="list-heading">
              <div><p className="app-eyebrow">Source snapshot</p><h2 id="list-title">API endpoints</h2></div>
              <span className="sync-label"><i /> Synced from OpenAPI</span>
            </div>
            <div className="code-toolbar"><span>endpointuri.js</span><span>Read-only preview</span></div>
            <pre>{JSON.stringify(endpoints, null, 2)}</pre>
          </section>
        </div>
        <footer className="app-footer"><span>NEXORA <b>DOCUMENTATION SYSTEM</b></span><span>API revision <b>2026.10</b></span></footer>
      </main>
    </div>
  );
}
