export interface MoodNewsProps {
  content: string;
}

export type Mood = "happy" | "sad" | "neutral" | "ironic";

export interface MoodOption {
  value: Mood;
  label: string;
  emoji: string;
}

export const MOODS: MoodOption[] = [
  {
    value: "happy",
    label: "Радостно",
    emoji: "😊",
  },
  {
    value: "sad",
    label: "Грустно",
    emoji: "😢",
  },
  {
    value: "neutral",
    label: "Нейтрально",
    emoji: "😐",
  },
  {
    value: "ironic",
    label: "Иронично",
    emoji: "😏",
  },
];
