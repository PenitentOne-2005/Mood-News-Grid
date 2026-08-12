import { NextResponse } from "next/server";
import { moodService, newsService } from "@/features/news/services";

export async function GET() {
  try {
    const news = await newsService.getNews();

    return NextResponse.json(news);
  } catch (error) {
    console.error("Failed to fetch news:", error);

    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const { newsId, mood } = await request.json();

    if (!newsId || !mood) {
      return NextResponse.json(
        { error: "newsId and mood are required" },
        { status: 400 },
      );
    }

    const news = await newsService.getNewsById(newsId);

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    const content = await moodService.rewrite(news.content, mood);

    return NextResponse.json({ content });
  } catch (error) {
    console.error("Failed to process mood:", error);

    const status =
      typeof error === "object" && error !== null && "status" in error
        ? error.status
        : undefined;

    const message = error instanceof Error ? error.message : "";

    if (
      status === 429 ||
      message.includes("rate_limit_exceeded") ||
      message.includes("Rate limit")
    ) {
      return NextResponse.json(
        {
          error: "Лимит AI-сервиса исчерпан. Попробуйте позже.",
        },
        { status: 429 },
      );
    }

    return NextResponse.json(
      {
        error: "Не удалось сгенерировать эмоциональную версию.",
      },
      { status: 500 },
    );
  }
}
