import { useState } from "react";
import { METHODS } from "../constants.js";
import styles from "./EndpointForm.module.css";

const INITIAL_FORM = { path: "", method: "GET", description: "" };
const PATH_MAX = 120;

export default function EndpointForm({ onAdd }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const path = form.path.trim();

    if (!path) {
      setError("Calea endpoint-ului este obligatorie.");
      return;
    }
    if (!path.startsWith("/")) {
      setError("Calea endpoint-ului trebuie să înceapă cu /.");
      return;
    }
    if (path.length > PATH_MAX) {
      setError(`Calea nu poate avea mai mult de ${PATH_MAX} de caractere.`);
      return;
    }

    setError("");
    setSubmitting(true);
    try {
      await onAdd({ path, method: form.method, description: form.description.trim(), documented: false });
      setForm(INITIAL_FORM);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} data-testid="item-form">
      <div className={styles.fields}>
        <label>
          Cale endpoint
          <input
            name="path"
            value={form.path}
            onChange={handleChange}
            placeholder="/users/{id}"
            data-testid="item-title"
          />
        </label>
        <label>
          Metodă
          <select name="method" value={form.method} onChange={handleChange} data-testid="item-label">
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
            data-testid="item-description"
          />
        </label>
      </div>
      {error && <p className="error" data-testid="form-error">{error}</p>}
      <button className="btn btn-primary" type="submit" disabled={submitting} data-testid="item-submit">
        {submitting ? "Se salvează..." : "Adaugă endpoint"}
      </button>
    </form>
  );
}
