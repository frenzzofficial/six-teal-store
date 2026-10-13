"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductCard } from "@/components/features/product/ProductCard";
import { Icon } from "@/components/ui";
import { Input } from "@/components/ui/shadcn/input";
import { getProducts } from "@/packages/data/products";
import type { Product } from "@/types/product";

/**
 * Client-rendered rather than a server component like Products/Trending —
 * search is inherently a "type and see results update" interaction, and
 * there's no filter/sort/pagination complexity here that would benefit
 * from URL-driven server rendering the way the Products page does. The
 * query itself still lives in the URL (?q=) so results are linkable/
 * shareable, same principle as the Products page filters.
 */
export function SearchPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "";

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(Boolean(initialQuery));

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const q = initialQuery.trim();
    if (!q) {
      setResults([]);
      setSearched(false);
      return;
    }
    let cancelled = false;
    setLoading(true);
    getProducts({ search: q, limit: 24 }).then((result) => {
      if (cancelled) return;
      setResults(result.items);
      setSearched(true);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(
      trimmed ? `/search?q=${encodeURIComponent(trimmed)}` : "/search",
    );
  };

  return (
    <div className="search-page section-bleed__inner">
      <form onSubmit={handleSubmit} className="search-page__bar">
        <Icon name="search" className="search-page__bar-icon" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for products, categories, brands…"
          className="search-page__bar-input"
          autoFocus={!initialQuery}
        />
      </form>

      {!searched && !loading && (
        <p className="search-page__hint">
          Start typing and press Enter to search the catalog.
        </p>
      )}

      {loading && <p className="search-page__hint">Searching…</p>}

      {searched && !loading && (
        <>
          <p className="search-page__count">
            {results.length > 0
              ? `${results.length} result${results.length === 1 ? "" : "s"} for "${initialQuery}"`
              : `No results for "${initialQuery}"`}
          </p>
          {results.length > 0 ? (
            <div className="products-page__grid">
              {results.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="products-page__empty">
              Try a different search term, or browse{" "}
              <Link href="/products">all products</Link>.
            </p>
          )}
        </>
      )}
    </div>
  );
}
