export const METHODS = [
  { value: "GET", label: "GET" },
  { value: "POST", label: "POST" },
  { value: "PUT", label: "PUT" },
  { value: "DELETE", label: "DELETE" },
];

export const METHOD_LABELS = Object.fromEntries(
  METHODS.map((method) => [method.value, method.label]),
);
