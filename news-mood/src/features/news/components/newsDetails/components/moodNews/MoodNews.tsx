"use client";

import { useState } from "react";
import type { MoodNewsProps } from "./interface";
import type { Mood } from "@/features/news";
import { MoodSelector } from "./components";
import classes from "./MoodNews.module.css";

const MoodNews = ({ content, newsId }: MoodNewsProps) => {
  const [mood, setMood] = useState<Mood>("neutral");
  const [moodContent, setMoodContent] = useState(content);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMoodChange = async (newMood: Mood) => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/news/mood", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newsId,
          mood: newMood,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to generate mood news");
      }

      const result = await response.json();

      if (!result.content) {
        throw new Error("Mood API returned empty content");
      }

      setMood(newMood);
      setMoodContent(result.content);
    } catch (error) {
      console.error("Failed to generate mood news:", error);

      setError(
        "Не удалось сгенерировать эмоциональную версию. Попробуйте ещё раз.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <MoodSelector onChange={handleMoodChange} disabled={isLoading} />

      <div className={classes.status}>
        <span className={classes.statusLabel}>Настроение</span>

        <span className={classes.mood}>{mood}</span>
      </div>

      {error ? <div className={classes.error}>{error}</div> : null}

      <div className={classes.content}>
        {isLoading ? (
          <p>Генерация эмоциональной версии...</p>
        ) : (
          <p>{moodContent}</p>
        )}
      </div>
    </div>
  );
};

export default MoodNews;
