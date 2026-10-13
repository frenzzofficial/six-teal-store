import Image from "next/image";
import Link from "next/link";
import { Icon, type IconName } from "@/components/ui";
import { QuantityStepper } from "@/components/ui/custom/QuantityStepper";
import { discountPercent, formatPrice } from "@/packages/utils/format";
import type { CartItem } from "@/types/cart";

const CATEGORY_ICON: Record<string, string> = {
  fashion: "shirt",
  tech: "cpu",
  literature: "book-open",
  fragrance: "sparkles",
  accessories: "watch",
  wellness: "heart-pulse",
};

type CartLineItemProps = {
  item: CartItem;
  onQuantityChange: (quantity: number) => void;
  onRemove: () => void;
};

export function CartLineItem({
  item,
  onQuantityChange,
  onRemove,
}: CartLineItemProps) {
  const discount =
    item.compareAtPrice != null
      ? discountPercent(item.price, item.compareAtPrice)
      : 0;

  return (
    <li className="cart-line">
      <Link href={`/products/${item.slug}`} className="cart-line__media">
        {item.image ? (
          <Image src={item.image} alt={item.name} fill sizes="6rem" />
        ) : (
          <span className="cart-line__placeholder" aria-hidden="true">
            <Icon
              name={
                (CATEGORY_ICON[item.category] as IconName) ??
                ("package" as IconName)
              }
            />
          </span>
        )}
      </Link>

      <div className="cart-line__details">
        <p className="cart-line__category">
          {item.category[0].toUpperCase() + item.category.slice(1)}
        </p>
        <Link href={`/products/${item.slug}`} className="cart-line__name">
          {item.name}
        </Link>
        {item.selectedVariants && (
          <p className="cart-line__variants">
            {Object.entries(item.selectedVariants)
              .map(([k, v]) => `${k}: ${v}`)
              .join(" · ")}
          </p>
        )}
        <div className="cart-line__price-row">
          <span className="cart-line__price">{formatPrice(item.price)}</span>
          {item.compareAtPrice != null && (
            <>
              <span className="cart-line__price-compare">
                {formatPrice(item.compareAtPrice)}
              </span>
              <span className="cart-line__discount">{discount}% OFF</span>
            </>
          )}
        </div>
      </div>

      <div className="cart-line__actions">
        <QuantityStepper
          value={item.quantity}
          onChange={onQuantityChange}
          max={item.maxQuantity}
        />
        <button
          type="button"
          onClick={onRemove}
          className="cart-line__remove"
          aria-label={`Remove ${item.name} from cart`}
        >
          <Icon name="trash" />
        </button>
      </div>
    </li>
  );
}
