import styles from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <main className={styles.container}>
      <section className="panel">
        <p className="eyebrow">Despre Nexora</p>
        <h1>Documentație API fără fricțiune</h1>
        <p>Nexora organizează endpoint-urile și le transformă într-o referință clară pentru echipele care construiesc și folosesc API-uri.</p>
      </section>
    </main>
  );
}
