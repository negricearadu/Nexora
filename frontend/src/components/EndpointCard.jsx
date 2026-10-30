const METHOD_LABELS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export default function EndpointCard({ endpoint }) {
  const methodClass = endpoint.method.toLowerCase();
  const cardClassName = endpoint.documented ? "project-card done" : "project-card";
  const stateClassName = endpoint.documented ? "project-state state-published" : "project-state state-draft";

  return (
    <li className={cardClassName}>
      <div className="project-card-main">
        <span className={`method ${methodClass}`} aria-label={`Metoda ${METHOD_LABELS[endpoint.method]}`}>
          {METHOD_LABELS[endpoint.method]}
        </span>
        <div>
          <h3>{endpoint.path}</h3>
          <p>{endpoint.description}</p>
        </div>
      </div>
      <div className="project-card-meta">
        <span className={`project-badge badge-${methodClass}`}>{endpoint.method}</span>
        <span className={stateClassName}>
          {endpoint.documented ? "Documentat" : "Nedocumentat"}
        </span>
      </div>
    </li>
  );
}