"use client";

import { useState } from "react";
import type { MoodNewsProps } from "./interface";
import { moodService, type Mood } from "@/features/news";
import { MoodSelector } from "./components";
import classes from "./MoodNews.module.css";

const MoodNews = ({ content, newsId }: MoodNewsProps) => {
  const [mood, setMood] = useState<Mood>("neutral");

  const handleMoodChange = async (newMood: Mood) => {
    setMood(newMood);

    try {
      const result = await moodService.generateMoodNews({
        newsId,
        mood: newMood,
      });
    } catch (error) {
      console.error("Failed to generate mood news:", error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <MoodSelector onChange={handleMoodChange} />

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
