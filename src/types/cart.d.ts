import type { ImageProps } from "./app";

/**
 * A cart line stores a snapshot of product information at add-to-cart time.
 */
export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  category: string;
  image?: ImageProps | Array<ImageProps>;
  price: number;
  compareAtPrice?: number;
  quantity: number;
  maxQuantity?: number;
  selectedVariants?: Record<string, string>;
}

export interface CartTotals {
  itemCount: number;
  subtotal: number;
  discount: number;
  couponDiscount: number;
  couponCode?: string;
  tax: number;
  shipping: number;
  total: number;
}

// export function pickCartItem(
//   product: Product,
//   selectedVariants?: Record<string, string>,
// ): Omit<CartItem, "id" | "quantity"> {
//   return {
//     productId: product.id,
//     slug: product.slug,
//     name: product.name,
//     category: product.category,
//     image: product.image,
//     price: product.price,
//     compareAtPrice: product.compareAtPrice,
//     maxQuantity: product.stockCount,
//     selectedVariants,
//   };
// }

interface pickCartItemProps {
  product: Product;
  selectedVariants?: Record<string, string>;
}
export const pickCartItem = ({
  product,
  selectedVariants,
}: pickCartItemProps) => {
  return {
    productId: product.id,
    slug: product.slug,
    name: product.name,
    category: product.category,
    image: product.image,
    price: product.price,
    compareAtPrice: product.compareAtPrice,
    maxQuantity: product.stockCount,
    selectedVariants,
  } as Omit<CartItem, "id" | "quantity">;
};
