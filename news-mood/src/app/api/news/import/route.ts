import { NextResponse } from "next/server";
import { newsService } from "@/features/news/services";

export async function GET() {
  try {
    const result = await newsService.importNews();

    return NextResponse.json(result);
  } catch (error) {
    console.error("News import error:", error);

    return NextResponse.json(
      {
        error: "Failed to import news",
      },
      { status: 500 },
    );
  }
}
