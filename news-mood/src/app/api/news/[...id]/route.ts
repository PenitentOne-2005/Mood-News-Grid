import { NextResponse } from "next/server";
import { newsService } from "@/features/news/services";

interface RouteParams {
  params: Promise<{
    id: string[];
  }>;
}

export async function GET(_request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const newsId = id.join("/");

    const news = await newsService.getNewsById(newsId);

    if (!news) {
      return NextResponse.json({ error: "News not found" }, { status: 404 });
    }

    return NextResponse.json(news);
  } catch (error) {
    console.error("Failed to fetch news:", error);

    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 },
    );
  }
}
