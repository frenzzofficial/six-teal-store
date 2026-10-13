"use client";

import Link from "next/link";
import { useState } from "react";
import { CartHero } from "@/components/features/cart/CartHero";
import { CartLineItem } from "@/components/features/cart/CartLineItem";
import { OrderSummaryCard } from "@/components/features/cart/OrderSummaryCard";
import { ProductCard } from "@/components/features/product/ProductCard";
import { Icon } from "@/components/ui";
import { useCartStore } from "@/packages/store/cart.store";
import type { Product } from "@/types/product";

type CartPageProps = {
  suggestions: Product[];
};

const CartPage = ({ suggestions }: CartPageProps) => {
  const items = useCartStore((s) => s.items);
  const setQuantity = useCartStore((s) => s.setQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const clear = useCartStore((s) => s.clear);
  const totals = useCartStore((s) => s.totals());
  const [note, setNote] = useState("");

  return (
    <div className="cart-page">
      <CartHero />

      <div className="cart-page__body section-bleed__inner">
        {items.length === 0 ? (
          <div className="cart-page__empty">
            <Icon name="shopping-cart" className="cart-page__empty-icon" />
            <h2 className="cart-page__empty-title">Your cart is empty</h2>
            <p className="cart-page__empty-description">
              Looks like you haven't added anything yet — go find something
              you'll love.
            </p>
            <Link href="/products">
              Browse Products
              <Icon name="arrow-right" />
            </Link>
          </div>
        ) : (
          <div className="cart-page__layout">
            <div className="cart-page__items-panel">
              <div className="cart-page__items-header">
                <h2 className="cart-page__items-title">
                  Cart Items ({items.length})
                </h2>
                <button
                  type="button"
                  className="cart-page__clear"
                  onClick={clear}
                >
                  <Icon name="trash" />
                  Clear Cart
                </button>
              </div>

              <ul className="cart-page__items-list">
                {items.map((item) => (
                  <CartLineItem
                    key={item.id}
                    item={item}
                    onQuantityChange={(q) => setQuantity(item.id, q)}
                    onRemove={() => removeItem(item.id)}
                  />
                ))}
              </ul>

              <label className="cart-page__note">
                <span className="cart-page__note-label">
                  <Icon name="package" />
                  Add a note (optional)
                </span>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Gift wrap, special instructions…"
                  className="cart-page__note-input"
                  rows={2}
                />
              </label>
            </div>

            <div className="cart-page__summary-panel">
              <OrderSummaryCard totals={totals} />
            </div>
          </div>
        )}

        {suggestions.length > 0 && (
          <section className="pdp-related">
            <h2 className="home-section__title">You Might Also Like</h2>
            <p className="home-section__subtitle">
              Complete your vibe with these handpicked essentials.
            </p>
            <div className="pdp-related__grid">
              {suggestions.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CartPage;
