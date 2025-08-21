import layout from "@/data/layout.json"; // Ensure this matches your actual file structure
import { NextRequest, NextResponse } from "next/server";
import { allowedOrigins } from "@/libs/configs/config.domain";

/**
 * Handles GET requests to serve layout JSON data.
 * Validates request origin and returns structured layout.
 *
 * @param request - Incoming Next.js request object
 * @returns JSON response with layout data or error
 */

export async function GET(request: NextRequest): Promise<NextResponse> {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: "Access denied: origin not allowed." },
      { status: 403 }
    );
  }

  return NextResponse.json({ layout: layout.layout }, { status: 200 });
}
