"use client";

import Link from "next/link";
import { Icon, type IconName, ImageGroup } from "@/components/ui";
import { RatingStars } from "@/components/ui/rating/RatingStars";
import { useCartStore } from "@/packages/store/cart.store";
import { useWishlistStore } from "@/packages/store/wishlist.store";
import { cn } from "@/packages/utils/cn";
import { discountPercent, formatPrice } from "@/packages/utils/format";
import type { Product } from "@/types/product";

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  "best-seller": "Best Seller",
  trending: "Trending",
  new: "New",
  "hot-pick": "Hot Pick",
  popular: "Popular",
};

/** Icon key per category — used as the placeholder art when a
 * product has no photo yet (see products.mock.ts's header: most of the
 * mock catalog doesn't have one). Keeps every card visually consistent
 * instead of mixing real photos with broken image icons. */
const CATEGORY_ICON: Record<Product["category"], string> = {
  fashion: "shirt",
  tech: "cpu",
  literature: "book-open",
  fragrance: "sparkles",
  accessories: "watch",
  wellness: "heart-pulse",
};

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const inWishlist = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const discount =
    product.compareAtPrice != null
      ? discountPercent(product.price, product.compareAtPrice)
      : 0;

  return (
    <article className={cn("product-card", className)}>
      <Link href={`/products/${product.slug}`} className="product-card__media">
        {product.image ? (
          <ImageGroup
            images={product.image}
            sizes="(min-width: 1024px) 20vw, (min-width: 640px) 33vw, 50vw"
            className="product-card__image"
          />
        ) : (
          <span className="product-card__placeholder" aria-hidden="true">
            <Icon
              name={CATEGORY_ICON[product.category] as IconName}
              className="product-card__placeholder-icon"
            />
          </span>
        )}
        {product.badge && (
          <span
            className={cn(
              "product-card__badge",
              `product-card__badge--${product.badge}`,
            )}
          >
            {BADGE_LABEL[product.badge]}
          </span>
        )}
      </Link>

      <button
        type="button"
        onClick={() => toggleWishlist(product.id)}
        className={cn(
          "product-card__wishlist",
          inWishlist && "product-card__wishlist--active",
        )}
        aria-pressed={inWishlist}
        aria-label={
          inWishlist
            ? `Remove ${product.name} from wishlist`
            : `Add ${product.name} to wishlist`
        }
      >
        <Icon name="heart" className="product-card__wishlist-icon" />
      </button>

      <div className="product-card__body">
        <p className="product-card__category">
          {product.category[0].toUpperCase() + product.category.slice(1)}
        </p>
        <Link href={`/products/${product.slug}`} className="product-card__name">
          {product.name}
        </Link>

        <div className="product-card__price-row">
          <span className="product-card__price">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice != null && (
            <>
              <span className="product-card__price-compare">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="product-card__discount">{discount}% OFF</span>
            </>
          )}
        </div>

        <div className="product-card__footer">
          <RatingStars
            average={product.rating.average}
            count={product.rating.count}
            className="product-card__rating"
          />
          <button
            type="button"
            onClick={() => addItem(product)}
            className="product-card__cart-btn"
            aria-label={`Add ${product.name} to cart`}
            disabled={!product.inStock}
          >
            <Icon name="shopping-cart" />
          </button>
        </div>
      </div>
    </article>
  );
}
