import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <span className={styles.label}>AI News Platform</span>

          <h1 id="hero-title" className={styles.title}>
            News in various
            <br />
            sentiments
          </h1>

          <p className={styles.description}>
            Mood News — an app for viewing real news and rewriting it in various
            emotional styles. Choose a mood, and the AI ​​will adjust the tone
            while preserving the facts from the original publication.
          </p>

          <Link href="/news" className={styles.button}>
            Watch the news
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className={styles.features} aria-labelledby="features-title">
          <h2 id="features-title" className="sr-only">
            Platform features
          </h2>

          <div className={styles.feature}>
            <span className={styles.featureNumber} aria-hidden="true">
              01
            </span>
            <h3>Real News</h3>
            <p>
              News is obtained from an open source and stored in the database.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureNumber} aria-hidden="true">
              02
            </span>
            <h3>Four Moods</h3>
            <p>
              Happy, sad, neutral and ironic — a single piece of news can sound
              completely different.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureNumber} aria-hidden="true">
              03
            </span>
            <h3>Facts Under Protection</h3>
            <p>
              The AI ​​validator checks for the preservation of numbers, names,
              dates, quotes, and other important facts.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
