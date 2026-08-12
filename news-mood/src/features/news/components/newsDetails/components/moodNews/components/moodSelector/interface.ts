import type { Mood } from "@/features/news";

export interface MoodSelectorProps {
  onChange?: (mood: Mood) => void;
  disabled?: boolean;
}
