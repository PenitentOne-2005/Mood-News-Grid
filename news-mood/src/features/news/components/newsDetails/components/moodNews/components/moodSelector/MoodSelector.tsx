"use client";

import { useState } from "react";
import { type MoodSelectorProps } from "./interface";
import { type Mood, MOODS } from "../../interface";
import classes from "./MoodSelector.module.css";

const MoodSelector = ({ onChange }: MoodSelectorProps) => {
  const [selectedMood, setSelectedMood] = useState<Mood>("neutral");

  const handleChange = (mood: Mood) => {
    setSelectedMood(mood);
    onChange?.(mood);
  };

  return (
    <div className={classes.selector}>
      {MOODS.map((mood) => (
        <button
          key={mood.value}
          type="button"
          className={`${classes.option} ${
            selectedMood === mood.value ? classes.active : ""
          }`}
          onClick={() => handleChange(mood.value)}
        >
          <span className={classes.emoji}>{mood.emoji}</span>
          <span>{mood.label}</span>
        </button>
      ))}
    </div>
  );
};

export default MoodSelector;
