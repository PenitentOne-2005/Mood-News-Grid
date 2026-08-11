import { NextResponse } from "next/server";
import type { MoodRequest } from "./interface";
import { moodService, newsService } from "@/features/news";

export async function POST(request: Request) {
  try {
    const body: MoodRequest = await request.json();

    const news = await newsService.getNewsById(body.newsId);

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const content = await moodService.rewrite(news.content, body.mood);

    return NextResponse.json({
      newsId: news.id,
      mood: body.mood,
      content,
    });
  } catch (error) {
    console.error("Failed to process mood:", error);

    return NextResponse.json(
      { error: "Failed to process mood" },
      { status: 500 },
    );
  }
}
