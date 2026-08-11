"use client";

import { useState } from "react";
import type { Mood, MoodNewsProps } from "./interface";
import { MoodSelector } from "./components";
import classes from "./MoodNews.module.css";

const MoodNews = ({ content }: MoodNewsProps) => {
  const [mood, setMood] = useState<Mood>("neutral");

  return (
    <div className={classes.wrapper}>
      <MoodSelector onChange={setMood} />

      <div className={classes.status}>
        <span className={classes.statusLabel}>Настроение</span>

        <span className={classes.mood}>{mood}</span>
      </div>

      <div className={classes.content}>
        <p>{content}</p>
      </div>
    </div>
  );
};

export default MoodNews;
