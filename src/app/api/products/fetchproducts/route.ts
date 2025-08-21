import products from "@/data/products.json";
import { NextRequest, NextResponse } from "next/server";
import { allowedOrigins } from "@/libs/configs/config.domain";

/**
 * Handles GET requests to serve layout JSON data.
 * Validates request origin and returns structured layout.
 *
 * @param request - Incoming Next.js request object
 * @returns JSON response with layout data or error
 */

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: "Access denied: origin not allowed." },
      { status: 403 }
    );
  }

  const productsList: Array<string> = [];
  products.productsList.map((item) => {
    productsList.push(item.productName);
  });

  return NextResponse.json(
    {
      productsList: productsList,
    },
    { status: 200 }
  );
}
