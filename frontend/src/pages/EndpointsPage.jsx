import { useEffect, useState } from "react";
import EndpointForm from "../components/EndpointForm.jsx";
import EndpointList from "../components/EndpointList.jsx";
import { createEndpoint, deleteEndpoint, fetchEndpoints, updateEndpoint } from "../api.js";
import styles from "./EndpointsPage.module.css";

export default function EndpointsPage() {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionError, setActionError] = useState("");

  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchEndpoints();
        if (!ignore) setEndpoints(data);
      } catch (requestError) {
        if (!ignore) setError(requestError.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => { ignore = true; };
  }, []);

  async function handleAdd(endpoint) {
    const saved = await createEndpoint(endpoint);
    setEndpoints((previous) => [...previous, saved]);
  }

  async function handleToggle(id) {
    setActionError("");
    try {
      const current = endpoints.find((endpoint) => endpoint.id === id);
      const saved = await updateEndpoint(id, { documented: !current.documented });
      setEndpoints((previous) => previous.map((endpoint) => endpoint.id === id ? saved : endpoint));
    } catch (requestError) {
      setActionError(requestError.message);
    }
  }

  async function handleDelete(id) {
    setActionError("");
    try {
      await deleteEndpoint(id);
      setEndpoints((previous) => previous.filter((endpoint) => endpoint.id !== id));
    } catch (requestError) {
      setActionError(requestError.message);
    }
  }

  const undocumented = endpoints.filter((endpoint) => !endpoint.documented).length;

  return (
    <main className={styles.container}>
      <section className={styles.intro}>
        <p className="eyebrow">API documentation workspace</p>
        <h1>API endpoints</h1>
        <p>Transformă specificațiile OpenAPI în documentație clară și ușor de folosit.</p>
      </section>
      <EndpointForm onAdd={handleAdd} />
      <section className="panel" aria-labelledby="list-title">
        <div className={styles.heading}>
          <div>
            <p className="eyebrow">Your workspace</p>
            <h2 id="list-title">Endpoint-uri</h2>
          </div>
          <span>{endpoints.length} elemente · {undocumented} nedocumentate</span>
        </div>
        {loading && <p className="info" data-testid="loading">Se încarcă endpoint-urile...</p>}
        {error && <p className="error" data-testid="error">Nu am putut încărca datele: {error}. Rulează <code>npm run api</code>.</p>}
        {actionError && <p className="error" data-testid="action-error">{actionError}</p>}
        {!loading && !error && (
          <EndpointList endpoints={endpoints} onToggle={handleToggle} onDelete={handleDelete} />
        )}
      </section>
    </main>
  );
}
