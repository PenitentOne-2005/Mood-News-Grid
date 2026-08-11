import { NextResponse } from "next/server";
import { factValidator } from "@/features/news";

interface ValidationRequest {
  originalContent: string;
  rewrittenContent: string;
}

export async function POST(request: Request) {
  try {
    const body: ValidationRequest = await request.json();

    const result = await factValidator.validate(
      body.originalContent,
      body.rewrittenContent,
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Failed to validate mood:", error);

    return NextResponse.json(
      { error: "Failed to validate mood" },
      { status: 500 },
    );
  }
}
