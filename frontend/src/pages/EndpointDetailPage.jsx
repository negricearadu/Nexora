import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchEndpoint } from "../api.js";
import { METHOD_LABELS } from "../constants.js";
import styles from "./EndpointDetailPage.module.css";

export default function EndpointDetailPage() {
  const { id } = useParams();
  const [endpoint, setEndpoint] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Efectul rulează din nou la fiecare schimbare a id-ului din adresă
  useEffect(() => {
    let ignore = false;
    async function load() {
      try {
        const data = await fetchEndpoint(id);
        if (!ignore) {
          setEndpoint(data);
          setError(""); // o eroare de la un id anterior nu mai este valabilă
        }
      } catch (requestError) {
        if (!ignore) setError(requestError.message);
      } finally {
        if (!ignore) setLoading(false);
      }
    }
    load();
    return () => {
      ignore = true;
    };
  }, [id]);

  if (loading) {
    return (
      <main className={styles.container}>
        <p className="info" data-testid="loading">Se încarcă endpoint-ul...</p>
      </main>
    );
  }

  if (error || !endpoint) {
    return (
      <main className={styles.container}>
        <section className="panel">
          <p className="error" data-testid="error">
            Endpoint-ul #{id} nu a putut fi încărcat: {error || "nu există"}.
          </p>
          <Link className="back-link" to="/">← Înapoi la endpoint-uri</Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.container}>
      <Link className="back-link" to="/">← Înapoi la endpoint-uri</Link>
      <article className="panel" data-testid="detail">
        <p className="eyebrow">Endpoint #{endpoint.id}</p>
        <h1 className={endpoint.documented ? styles.done : undefined} data-testid="detail-title">
          {endpoint.path}
        </h1>
        <p className={styles.method}>{METHOD_LABELS[endpoint.method]}</p>
        <dl className={styles.fields}>
          <div><dt>Metodă</dt><dd>{endpoint.method}</dd></div>
          <div><dt>Stare</dt><dd>{endpoint.documented ? "Documentat" : "Nedocumentat"}</dd></div>
          <div><dt>Descriere</dt><dd>{endpoint.description || "Fără descriere."}</dd></div>
          <div><dt>ID</dt><dd>{endpoint.id}</dd></div>
        </dl>
      </article>
    </main>
  );
}
