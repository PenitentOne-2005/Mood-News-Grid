import { NextResponse } from "next/server";
import { newsService } from "@/features/news/services";

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
