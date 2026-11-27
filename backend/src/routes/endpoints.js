import { Router } from "express";
import { parseId, validateEndpoint } from "../validation.js";

const router = Router();

let endpoints = [
  { id: 1, path: "/users/{id}", method: "GET", description: "Returnează un utilizator după id", documented: false },
  { id: 2, path: "/users", method: "POST", description: "Creează un utilizator nou", documented: false },
  { id: 3, path: "/users/{id}", method: "DELETE", description: "Șterge un utilizator", documented: false },
  { id: 4, path: "/projects", method: "GET", description: "Listează proiectele API disponibile", documented: true },
  { id: 5, path: "/projects/{id}", method: "PUT", description: "Actualizează un proiect API", documented: false },
];
let nextId = endpoints.reduce((maxId, endpoint) => Math.max(maxId, endpoint.id), 0) + 1;

function findEndpointIndex(req, res) {
  const id = parseId(req.params.id);
  if (id === null) {
    res.status(400).json({ error: "ID invalid" });
    return -1;
  }

  const index = endpoints.findIndex((endpoint) => endpoint.id === id);
  if (index === -1) {
    res.status(404).json({ error: "Endpoint-ul nu există" });
  }
  return index;
}

router.get("/", (req, res) => {
  res.json(endpoints);
});

router.get("/:id", (req, res) => {
  const index = findEndpointIndex(req, res);
  if (index === -1) return;
  res.json(endpoints[index]);
});

router.post("/", (req, res) => {
  const { errors, data } = validateEndpoint(req.body);
  if (errors.length > 0) {
    res.status(400).json({ error: errors.join("; ") });
    return;
  }

  const endpoint = { id: nextId++, ...data };
  endpoints.push(endpoint);
  res.status(201).json(endpoint);
});

router.patch("/:id", (req, res) => {
  const index = findEndpointIndex(req, res);
  if (index === -1) return;

  const { errors, data } = validateEndpoint(req.body, { partial: true });
  if (errors.length > 0) {
    res.status(400).json({ error: errors.join("; ") });
    return;
  }

  endpoints[index] = { ...endpoints[index], ...data };
  res.json(endpoints[index]);
});

router.delete("/:id", (req, res) => {
  const index = findEndpointIndex(req, res);
  if (index === -1) return;

  endpoints.splice(index, 1);
  res.status(204).end();
});

export default router;
