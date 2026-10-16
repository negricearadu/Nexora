const METHODS = ["GET", "POST", "PUT", "DELETE"];

const endpoints = [
  { id: 1, path: "/users/{id}", method: "GET", description: "Returnează un utilizator după id", documented: true },
  { id: 2, path: "/users", method: "POST", description: "Creează un utilizator nou", documented: false },
  { id: 3, path: "/users/{id}", method: "DELETE", description: "Șterge un utilizator", documented: false },
];

// Lists the method and path of each endpoint.
const listPaths = (list) => list.map((endpoint) => `${endpoint.method} ${endpoint.path}`);

// Counts the endpoints that are not documented.
const countUndocumented = (list) => list.filter((endpoint) => endpoint.documented === false).length;

// Searches endpoints by path or description, ignoring letter case.
const findEndpoint = (list, text) => {
  const normalizedText = text.toLowerCase();
  return list.filter(
    (endpoint) =>
      endpoint.path.toLowerCase().includes(normalizedText) ||
      endpoint.description.toLowerCase().includes(normalizedText),
  );
};

// Calculates the next available identifier.
const nextId = (list) => list.reduce((max, endpoint) => Math.max(max, endpoint.id), 0) + 1;

// Adds a new endpoint after validating the received data.
const addEndpoint = (list, path, method = "GET", description = "") => {
  const trimmedPath = path.trim();

  if (trimmedPath === "") {
    console.log("Calea nu poate fi goală.");
    return list;
  }

  if (!trimmedPath.startsWith("/")) {
    console.log("Calea trebuie să înceapă cu „/”.");
    return list;
  }

  if (!METHODS.includes(method)) {
    console.log("Metodă invalidă: " + method);
    return list;
  }

  const newEndpoint = {
    id: nextId(list),
    path: trimmedPath,
    method,
    description,
    documented: false,
  };

  return [...list, newEndpoint];
};

// Toggles the documented state for the endpoint with the given identifier.
const toggleDocumented = (list, id) =>
  list.map((endpoint) =>
    endpoint.id === id ? { ...endpoint, documented: !endpoint.documented } : endpoint,
  );

// Removes the endpoint with the given identifier without changing the original list.
const deleteEndpoint = (list, id) => list.filter((endpoint) => endpoint.id !== id);

console.log("--- Citire ---");
console.log("Endpoint-uri:", listPaths(endpoints).join(", "));
console.log("Nedocumentate:", countUndocumented(endpoints));
console.log("Căutare '{id}':", listPaths(findEndpoint(endpoints, "{id}")).join(", "));

console.log("--- Adăugare ---");
let list = addEndpoint(endpoints, "/orders", "GET", "Returnează lista de comenzi");
console.log("Lista nouă:", list.length, "endpoint-uri");
console.log("Originalul a rămas cu:", endpoints.length, "endpoint-uri");

console.log("--- Modificare și ștergere ---");
list = toggleDocumented(list, 2);
console.log("După documentarea id 2, nedocumentate:", countUndocumented(list));
list = deleteEndpoint(list, 3);
console.log("După ștergerea id 3:", listPaths(list).join(", "));

console.log("--- Validare ---");
addEndpoint(list, "   ");
addEndpoint(list, "users", "GET");
addEndpoint(list, "/test", "FETCH");
