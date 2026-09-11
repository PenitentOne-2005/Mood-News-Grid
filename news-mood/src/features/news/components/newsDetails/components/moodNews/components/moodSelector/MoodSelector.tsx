"use client";

import type { MoodSelectorProps } from "./interface";
import { MOODS } from "@/features/news/types";
import classes from "./MoodSelector.module.css";

const MoodSelector = ({ value, onChange, disabled }: MoodSelectorProps) => {
  return (
    <div
      className={classes.selector}
      role="group"
      aria-label="Выбор настроения"
    >
      {MOODS.map((mood) => (
        <button
          key={mood.value}
          type="button"
          className={classes.option}
          disabled={disabled}
          aria-pressed={value === mood.value}
          onClick={() => onChange?.(mood.value)}
        >
          <span className={classes.emoji}>{mood.emoji}</span>
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
