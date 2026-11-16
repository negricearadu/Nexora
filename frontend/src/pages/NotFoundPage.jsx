import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css";

export default function NotFoundPage() {
  return (
    <main className={styles.container}>
      <section className="panel">
        <p className="eyebrow">404</p>
        <h1>Pagina nu există</h1>
        <p>Adresa accesată nu corespunde unei pagini Nexora.</p>
        <Link className="btn btn-primary" to="/">Înapoi la lista de endpoint-uri</Link>
      </section>
    </main>
  );
}
