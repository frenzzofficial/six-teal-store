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

  // Get the search query from the URL parameters
  const searchQuery =
    request.nextUrl.searchParams.get("query")?.toLowerCase().trim() || "";

  if (!searchQuery) {
    return NextResponse.json(
      {
        error: "Query parameter is required and cannot be empty.",
      },
      { status: 400 }
    );
  }

  const resultProducts = products.productsList.filter((item) =>
    item.productName.toLowerCase().includes(searchQuery)
  );

  if (resultProducts.length === 0) {
    return NextResponse.json(
      {
        error: "No products found matching the query.",
      },
      { status: 404 }
    );
  }

  return NextResponse.json({
    productsList: resultProducts,
  });
}
