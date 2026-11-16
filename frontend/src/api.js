export const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`Eroare server: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

export function fetchEndpoints() {
  return request("/endpoints");
}

export function fetchEndpoint(id) {
  return request(`/endpoints/${id}`);
}

export function createEndpoint(endpoint) {
  return request("/endpoints", {
    method: "POST",
    body: JSON.stringify(endpoint),
  });
}

export function updateEndpoint(id, changes) {
  return request(`/endpoints/${id}`, {
    method: "PATCH",
    body: JSON.stringify(changes),
  });
}

export function deleteEndpoint(id) {
  return request(`/endpoints/${id}`, { method: "DELETE" });
}
