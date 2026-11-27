const METHODS = new Set(["GET", "POST", "PUT", "DELETE"]);
const PATH_MAX = 120;

export function parseId(value) {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export function validateEndpoint(body, { partial = false } = {}) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { errors: ["Corpul cererii trebuie să fie un obiect JSON"], data: {} };
  }

  const errors = [];
  const data = {};
  const shouldValidate = (field) => !partial || Object.hasOwn(body, field);

  if (shouldValidate("path")) {
    if (typeof body.path !== "string") {
      errors.push("Calea endpoint-ului trebuie să fie text");
    } else {
      const path = body.path.trim();
      if (!path) {
        errors.push("Calea endpoint-ului este obligatorie");
      } else if (!path.startsWith("/")) {
        errors.push("Calea endpoint-ului trebuie să înceapă cu /");
      } else if (path.length > PATH_MAX) {
        errors.push(`Calea nu poate avea mai mult de ${PATH_MAX} de caractere`);
      } else {
        data.path = path;
      }
    }
  }

  if (shouldValidate("method")) {
    if (typeof body.method !== "string" || !METHODS.has(body.method)) {
      errors.push(`Metoda trebuie să fie una dintre: ${[...METHODS].join(", ")}`);
    } else {
      data.method = body.method;
    }
  }

  if (Object.hasOwn(body, "description")) {
    if (typeof body.description !== "string") {
      errors.push("Descrierea trebuie să fie text");
    } else {
      data.description = body.description.trim();
    }
  } else if (!partial) {
    data.description = "";
  }

  if (Object.hasOwn(body, "documented")) {
    if (typeof body.documented !== "boolean") {
      errors.push("Starea documentării trebuie să fie booleană");
    } else {
      data.documented = body.documented;
    }
  } else if (!partial) {
    data.documented = false;
  }

  return { errors, data };
}
