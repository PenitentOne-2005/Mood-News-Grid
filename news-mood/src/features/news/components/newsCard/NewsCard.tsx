import type { NewsCardProps } from "./interface";
import classes from "./NewsCard.module.css";

const NewsCard = ({ news }: NewsCardProps) => {
  return (
    <a className={classes.card} href={`/news/${news.id}`}>
      <article>
        <div className={classes.content}>
          <div className={classes.meta}>
            <span>{news.sourceName}</span>

            <span className={classes.separator}>•</span>

            <time dateTime={news.publishedAt.toISOString()}>
              {news.publishedAt.toLocaleDateString("ru-RU")}
            </time>
          </div>

          <h2 className={classes.title}>{news.title}</h2>

          {news.description ? (
            <p className={classes.description}>{news.description}</p>
          ) : null}
        </div>

        {news.imageUrl ? (
          <div className={classes.imageWrapper}>
            <img
              className={classes.image}
              src={news.imageUrl}
              alt={news.title}
            />
          </div>
        ) : null}
      </article>
    </a>
  );
};

export default NewsCard;
