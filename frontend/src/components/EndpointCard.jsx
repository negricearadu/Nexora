import { Link } from "react-router-dom";
import { METHOD_LABELS } from "../constants.js";
import styles from "./EndpointCard.module.css";

export default function EndpointCard({ endpoint, onToggle, onDelete }) {
  const methodClass = endpoint.method.toLowerCase();
  const cardClassName = endpoint.documented ? `${styles.card} ${styles.done}` : styles.card;

  return (
    <li className={cardClassName} data-testid="item" data-id={endpoint.id}>
      <div className={styles.main}>
        <span className={`${styles.method} ${styles[methodClass]}`} aria-label={`Metoda ${METHOD_LABELS[endpoint.method]}`}>
          {METHOD_LABELS[endpoint.method]}
        </span>
        <div className={styles.toggle}>
          <input
            type="checkbox"
            checked={endpoint.documented}
            onChange={() => onToggle(endpoint.id)}
            aria-label={`Marchează ${endpoint.path} ca documentat`}
            data-testid="item-toggle"
          />
          <div>
            {/* Titlul este link spre pagina de detaliu: /endpoints/:id */}
            <h3 data-testid="item-title">
              <Link to={`/endpoints/${endpoint.id}`} data-testid="item-link">
                {endpoint.path}
              </Link>
            </h3>
            <p>{endpoint.description}</p>
          </div>
        </div>
      </div>
      <div className={styles.meta}>
        <span className={styles.badge}>{endpoint.method}</span>
        <span className={styles.state}>
          {endpoint.documented ? "Documentat" : "Nedocumentat"}
        </span>
        <button
          className="btn btn-danger"
          type="button"
          onClick={() => onDelete(endpoint.id)}
          aria-label={`Șterge endpoint-ul ${endpoint.path}`}
          data-testid="item-delete"
        >
          Șterge
        </button>
      </div>
    </li>
  );
}
