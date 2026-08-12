import Link from "next/link";
import styles from "./page.module.css";

const Home = () => {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <section className={styles.hero}>
          <span className={styles.label}>AI News Platform</span>

          <h1 className={styles.title}>
            Новости в разных
            <br />
            настроениях
          </h1>

          <p className={styles.description}>
            Mood News — приложение для просмотра реальных новостей и их
            переписывания в разных эмоциональных стилях. Выберите настроение, а
            AI изменит подачу текста, сохраняя факты оригинальной публикации.
          </p>

          <Link href="/news" className={styles.button}>
            Смотреть новости
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <section className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureNumber}>01</span>
            <h2>Реальные новости</h2>
            <p>
              Новости получаются из открытого источника и сохраняются в базе
              данных.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureNumber}>02</span>
            <h2>Четыре настроения</h2>
            <p>
              Happy, sad, neutral и ironic — одна новость может звучать
              совершенно по-разному.
            </p>
          </div>

          <div className={styles.feature}>
            <span className={styles.featureNumber}>03</span>
            <h2>Факты под защитой</h2>
            <p>
              AI-валидатор проверяет сохранение чисел, имён, дат, цитат и других
              важных фактов.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
