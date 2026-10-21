"use client";

import { useState } from "react";
import { Button, Icon, type IconName, ImageGroup } from "@/components/ui";
import { QuantityStepper } from "@/components/ui/custom/QuantityStepper";
import { RatingStars } from "@/components/ui/rating/RatingStars";
import {
  FREE_SHIPPING_THRESHOLD,
  RETURN_WINDOW_DAYS,
} from "@/packages/configs/commerce.config";
import { useCartStore } from "@/packages/store/cart.store";
import { useWishlistStore } from "@/packages/store/wishlist.store";
import { cn } from "@/packages/utils/cn";
import { discountPercent, formatPrice } from "@/packages/utils/format";
import type { Product } from "@/types/product";

const CATEGORY_ICON: Record<Product["category"], string> = {
  fashion: "shirt",
  tech: "cpu",
  literature: "book-open",
  fragrance: "sparkles",
  accessories: "watch",
  wellness: "heart-pulse",
};

const BADGE_LABEL: Record<NonNullable<Product["badge"]>, string> = {
  "best-seller": "Best Seller",
  trending: "Trending",
  new: "New",
  "hot-pick": "Hot Pick",
  popular: "Popular",
};

type ProductDetailInteractiveProps = {
  product: Product;
};

export function ProductDetailInteractive({
  product,
}: ProductDetailInteractiveProps) {
  const addItem = useCartStore((s) => s.addItem);
  const inWishlist = useWishlistStore((s) => s.has(product.id));
  const toggleWishlist = useWishlistStore((s) => s.toggle);

  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<
    Record<string, string>
  >(() => {
    const initial: Record<string, string> = {};
    for (const v of product.variants ?? []) initial[v.name] = v.values[0];
    return initial;
  });
  const [justAdded, setJustAdded] = useState(false);

  const discount =
    product.compareAtPrice != null
      ? discountPercent(product.price, product.compareAtPrice)
      : 0;

  const handleAddToCart = () => {
    addItem(
      product,
      quantity,
      product.variants?.length ? selectedVariants : undefined,
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 1800);
  };

  return (
    <div className="pdp__layout">
      <div className="pdp__gallery">
        {product.image ? (
          <ImageGroup
            images={product.image}
            sizes="(min-width: 1024px) 40vw, 90vw"
            className="pdp__image"
            priority
          />
        ) : (
          <div className="pdp__placeholder" aria-hidden="true">
            <Icon
              name={CATEGORY_ICON[product.category] as IconName}
              className="pdp__placeholder-icon"
            />
          </div>
        )}
        {product.badge && (
          <span className={cn("pdp__badge", `pdp__badge--${product.badge}`)}>
            {BADGE_LABEL[product.badge]}
          </span>
        )}
      </div>

      <div className="pdp__info">
        <p className="pdp__category">
          {product.category[0].toUpperCase() + product.category.slice(1)} ·{" "}
          {product.brand}
        </p>
        <h1 className="pdp__name">{product.name}</h1>
        <RatingStars
          average={product.rating.average}
          count={product.rating.count}
        />

        <div className="pdp__price-row">
          <span className="pdp__price">{formatPrice(product.price)}</span>
          {product.compareAtPrice != null && (
            <>
              <span className="pdp__price-compare">
                {formatPrice(product.compareAtPrice)}
              </span>
              <span className="pdp__discount">{discount}% OFF</span>
            </>
          )}
        </div>
        {product.compareAtPrice != null && (
          <p className="pdp__savings">
            You save {formatPrice(product.compareAtPrice - product.price)}
          </p>
        )}

        <p className="pdp__description">{product.description}</p>

        {product.variants?.map((variant) => (
          <div key={variant.name} className="pdp__variant">
            <p className="pdp__variant-label">
              {variant.name}
              <span className="pdp__variant-selected">
                {" "}
                — {selectedVariants[variant.name]}
              </span>
            </p>
            <div className="pdp__variant-options">
              {variant.values.map((value) => (
                <button
                  key={value}
                  type="button"
                  className={cn(
                    "pdp__variant-btn",
                    selectedVariants[variant.name] === value &&
                      "pdp__variant-btn--active",
                  )}
                  onClick={() =>
                    setSelectedVariants((prev) => ({
                      ...prev,
                      [variant.name]: value,
                    }))
                  }
                >
                  {value}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="pdp__actions">
          <QuantityStepper
            value={quantity}
            onChange={setQuantity}
            max={product.stockCount}
          />
          <Button
            variant="primary"
            size="lg"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="pdp__add-to-cart"
          >
            <Icon name={justAdded ? "circle-check" : "shopping-cart"} />
            {justAdded
              ? "Added to Cart"
              : product.inStock
                ? "Add to Cart"
                : "Out of Stock"}
          </Button>
          <button
            type="button"
            onClick={() => toggleWishlist(product.id)}
            className={cn(
              "pdp__wishlist-btn",
              inWishlist && "pdp__wishlist-btn--active",
            )}
            aria-pressed={inWishlist}
            aria-label={
              inWishlist
                ? `Remove ${product.name} from wishlist`
                : `Add ${product.name} to wishlist`
            }
          >
            <Icon name="heart" />
          </button>
        </div>

        <p className="pdp__stock">
          <Icon
            name={product.inStock ? "circle-check" : "close"}
            className={cn(
              "pdp__stock-icon",
              !product.inStock && "pdp__stock-icon--out",
            )}
          />
          {product.inStock
            ? product.stockCount !== undefined && product.stockCount <= 5
              ? `Only ${product.stockCount} left in stock`
              : "In stock, ready to ship"
            : "Currently out of stock"}
        </p>

        <ul className="pdp__assurances">
          <li>
            <Icon name="truck" size={18} />
            <span>
              {product.price >= FREE_SHIPPING_THRESHOLD
                ? "Free shipping on this order"
                : `Free shipping above ${formatPrice(FREE_SHIPPING_THRESHOLD)}`}
            </span>
          </li>
          <li>
            <Icon name="rotate-ccw" size={18} />
            <span>{RETURN_WINDOW_DAYS}-day easy returns</span>
          </li>
          <li>
            <Icon name="lock" size={18} />
            <span>Secure checkout</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
