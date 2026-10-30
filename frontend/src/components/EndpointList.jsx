import EndpointCard from "./EndpointCard.jsx";

export default function EndpointList({ endpoints }) {
  if (endpoints.length === 0) {
    return <p className="empty">Nu există niciun endpoint.</p>;
  }

  return (
    <ul className="project-list">
      {endpoints.map((endpoint) => (
        <EndpointCard key={endpoint.id} endpoint={endpoint} />
      ))}
    </ul>
  );
}