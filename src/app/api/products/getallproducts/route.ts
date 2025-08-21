/**
 * Retrieves a list of characters from the characters.json file.
 * @returns {Promise<Object>} A promise that resolves to an object containing the characters data.
 */

import products from "@/data/products.json";
import { NextRequest, NextResponse } from "next/server";
import { allowedOrigins } from "@/libs/configs/config.domain";

export async function GET(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (origin && !allowedOrigins.includes(origin)) {
    return NextResponse.json(
      { error: "Access denied: origin not allowed." },
      { status: 403 }
    );
  }

  return NextResponse.json(
    {
      productsList: products.productsList,
    },
    { status: 200 }
  );
}
