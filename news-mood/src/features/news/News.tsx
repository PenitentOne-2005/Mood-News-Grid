import type { NewsProps } from "./types";
import { NewsGrid } from "./components";
import classes from "./News.module.css";

const News = ({ news }: NewsProps) => {
  return (
    <main className={classes.page}>
      <header className={classes.header}>
        <p className={classes.eyebrow}>Mood News</p>

        <h1 className={classes.title}>Новости</h1>

        <p className={classes.description}>
          Реальные новости в разных эмоциональных режимах.
        </p>
      </header>

      <NewsGrid news={news} />
    </main>
  );
};

export default News;
