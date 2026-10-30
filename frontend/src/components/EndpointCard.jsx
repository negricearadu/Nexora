const METHOD_LABELS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export default function EndpointCard({ endpoint, onToggle, onDelete }) {
  const methodClass = endpoint.method.toLowerCase();
  const cardClassName = endpoint.documented ? "project-card done" : "project-card";
  const stateClassName = endpoint.documented ? "project-state state-published" : "project-state state-draft";

  return (
    <li className={cardClassName}>
      <div className="project-card-main">
        <span className={`method ${methodClass}`} aria-label={`Metoda ${METHOD_LABELS[endpoint.method]}`}>
          {METHOD_LABELS[endpoint.method]}
        </span>
        <label className="endpoint-toggle">
          <input
            type="checkbox"
            checked={endpoint.documented}
            onChange={() => onToggle(endpoint.id)}
          />
          <span>
            <h3>{endpoint.path}</h3>
            <p>{endpoint.description}</p>
          </span>
        </label>
      </div>
      <div className="project-card-meta">
        <span className={`project-badge badge-${methodClass}`}>{endpoint.method}</span>
        <span className={stateClassName}>
          {endpoint.documented ? "Documentat" : "Nedocumentat"}
        </span>
        <button
          className="btn-danger"
          type="button"
          onClick={() => onDelete(endpoint.id)}
          aria-label={`Șterge endpoint-ul ${endpoint.path}`}
        >
          Șterge
        </button>
      </div>
    </li>
  );
}