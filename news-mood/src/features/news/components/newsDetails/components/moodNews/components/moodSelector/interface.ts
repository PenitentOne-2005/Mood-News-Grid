import type { Mood } from "../../interface";

export interface MoodSelectorProps {
  onChange?: (mood: Mood) => void;
}
