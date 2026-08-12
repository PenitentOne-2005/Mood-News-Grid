import { moodRewriter } from "@/features/news/ai";
import { factValidator } from "../factValidator";

const MAX_ATTEMPTS = 2;

export const moodService = {
  async rewrite(content: string, mood: string) {
    let rewrittenContent = await moodRewriter.rewrite(content, mood);

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const validation = await factValidator.validate(
        content,
        rewrittenContent,
      );

      if (validation.valid) {
        return rewrittenContent;
      }

      if (attempt === MAX_ATTEMPTS) {
        throw new Error(
          `Mood rewriting failed validation: ${validation.issues.join("; ")}`,
        );
      }

      rewrittenContent = await moodRewriter.rewrite(
        content,
        mood,
        validation.issues,
      );
    }

    throw new Error("Mood rewriting failed");
  },
};
