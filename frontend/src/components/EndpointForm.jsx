import { useState } from "react";
import { METHODS } from "../constants.js";
import styles from "./EndpointForm.module.css";

const INITIAL_FORM = { path: "", method: "GET", description: "" };
const PATH_MAX = 120;

function validate(path) {
  if (!path) return "Calea endpoint-ului este obligatorie.";
  if (!path.startsWith("/")) return "Calea endpoint-ului trebuie să înceapă cu /.";
  if (path.length > PATH_MAX) return `Calea nu poate avea mai mult de ${PATH_MAX} de caractere.`;
  return "";
}

export default function EndpointForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [invalid, setInvalid] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const path = form.path.trim();
    const validationError = validate(path);

    // Validare: dacă există o eroare, nu se trimite nicio cerere
    if (validationError) {
      setError(validationError);
      setInvalid(true);
      return;
    }

    setError("");
    setInvalid(false);
    setSubmitting(true);
    try {
      // Formularul se golește doar dacă serverul a confirmat salvarea
      await onAdd({ path, method: form.method, description: form.description.trim(), documented: false });
      setForm(INITIAL_FORM);
    } catch (requestError) {
      setError(`Endpoint-ul nu a putut fi salvat: ${requestError.message}`);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-testid="form">
      <div className={styles.fields}>
        <label>
          Cale endpoint
          <input
            name="path"
            value={form.path}
            onChange={handleChange}
            placeholder="/users/{id}"
            aria-invalid={invalid}
            aria-describedby={error ? "endpoint-form-error" : undefined}
            data-testid="form-title"
          />
        </label>
        <label>
          Metodă
          <select name="method" value={form.method} onChange={handleChange} data-testid="form-method">
            {METHODS.map((method) => (
              <option key={method.value} value={method.value}>{method.label}</option>
            ))}
          </select>
        </label>
        <label className={styles.description}>
          Descriere
          <input
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Descrierea endpoint-ului"
            data-testid="form-description"
          />
        </label>
      </div>
      {error && <p className="error" id="endpoint-form-error" role="alert" data-testid="form-error">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={submitting} data-testid="form-submit">
        {submitting ? "Se salvează..." : "Adaugă endpoint"}
      </button>
    </form>
  );
}
