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
        const result = await response.json();

        throw new Error(
          result.error || "Не удалось сгенерировать эмоциональную версию.",
        );
      }

      const result = await response.json();

      if (!result.content) {
        throw new Error("EMPTY_CONTENT");
      }

      setMood(newMood);
      setMoodContent(result.content);
    } catch (error) {
      console.error("Failed to generate mood news:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Не удалось сгенерировать эмоциональную версию.",
      );
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
