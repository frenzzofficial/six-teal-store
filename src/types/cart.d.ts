export type cartItem = {
  uid: string;
  productName: string;
  currentPrice: number;
  maxQuantity: number;
  quantity: number;
  sellerPrice?: number;
  thumbImage?: string;
  thumbImageAlt?: string;
};
