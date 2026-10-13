"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/components/features/product/ProductCard";
import { Icon, Link } from "@/components/ui";
import { getProductsByIds } from "@/packages/data/products";
import { useWishlistStore } from "@/packages/store/wishlist.store";
import type { Product } from "@/types/product";

export function WishlistPage() {
  const ids = useWishlistStore((s) => s.ids);
  const [products, setProducts] = useState<Product[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    getProductsByIds(ids).then((result) => {
      if (!cancelled) setProducts(result);
    });
    return () => {
      cancelled = true;
    };
  }, [ids]);

  return (
    <div className="wishlist-page section-bleed__inner">
      <div className="wishlist-page__header">
        <h1 className="wishlist-page__title">Your Wishlist</h1>
        <p className="wishlist-page__count">
          {ids.length} {ids.length === 1 ? "item" : "items"} saved
        </p>
      </div>

      {products === null ? null : products.length === 0 ? (
        <div className="cart-page__empty">
          <Icon name="heart" className="cart-page__empty-icon" />
          <h2 className="cart-page__empty-title">Your wishlist is empty</h2>
          <p className="cart-page__empty-description">
            Tap the heart on any product to save it here for later.
          </p>
          <Link href="/products">
            Browse Products
            <Icon name="arrow-right" />
          </Link>
        </div>
      ) : (
        <div className="products-page__grid">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
