import EndpointCard from "./EndpointCard.jsx";
import styles from "./EndpointList.module.css";

export default function EndpointList({ endpoints, onToggle, onDelete }) {
  if (endpoints.length === 0) {
    return <p className="empty" data-testid="empty">Nu există niciun endpoint.</p>;
  }

  return (
    <ul className={styles.list}>
      {endpoints.map((endpoint) => (
        <EndpointCard
          key={endpoint.id}
          endpoint={endpoint}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
}