import type { Mood } from "@/features/news";

export interface MoodSelectorProps {
  value: Mood;
  onChange?: (mood: Mood) => void;
  disabled?: boolean;
}
