import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.label}>AI News Platform</span>

          <h1 className={styles.title}>
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

        <section className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureNumber}>01</span>
            <h2>Real News</h2>
            <p>
              News is obtained from an open source and stored in the database.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureNumber}>02</span>
            <h2>Four Moods</h2>
            <p>
              Happy, sad, neutral and ironic — a single piece of news can sound
              completely different.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureNumber}>03</span>
            <h2>Facts Under Protection</h2>
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
