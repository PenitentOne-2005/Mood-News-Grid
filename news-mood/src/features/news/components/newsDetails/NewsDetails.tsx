import type { NewsDetailProps } from "./interface";
import { MoodNews } from "./components";
import classes from "./NewsDetails.module.css";

const NewsDetails = ({ news }: NewsDetailProps) => {
  return (
    <main className={classes.page}>
      <header className={classes.header}>
        <p className={classes.source}>
          {news.sourceName} · {news.publishedAt.toLocaleDateString("ru-RU")}
        </p>

        <h1 className={classes.title}>{news.title}</h1>
      </header>

      {news.imageUrl ? (
        <img className={classes.image} src={news.imageUrl} alt={news.title} />
      ) : null}

      <section className={classes.content}>
        <article className={classes.original}>
          <div className={classes.sectionHeader}>
            <span className={classes.badge}>Оригинал</span>
          </div>

          <p className={classes.text}>{news.content}</p>
        </article>

        <article className={classes.mood}>
          <div className={classes.sectionHeader}>
            <span className={classes.badge}>Эмоциональная версия</span>
          </div>

          <MoodNews content={news.content} />
        </article>
      </section>

      <a
        className={classes.sourceLink}
        href={news.articleUrl}
        target="_blank"
        rel="noopener noreferrer"
      >
        Читать оригинал на {news.sourceName}
        <span aria-hidden="true"> →</span>
      </a>
    </main>
  );
};

export default NewsDetails;
