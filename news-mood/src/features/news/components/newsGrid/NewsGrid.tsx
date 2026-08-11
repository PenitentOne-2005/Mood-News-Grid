import type { NewsGridProps } from "./interface";
import { NewsCard } from "../index";
import classes from "./NewsGrid.module.css";

const NewsGrid = ({ news }: NewsGridProps) => {
  return (
    <section className={classes.grid}>
      {news.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </section>
  );
};

export default NewsGrid;
