import { ImageProps } from "./app";
export interface ProductDetails {
  uid: number;
  Category: Array<productCategories>;
  isTrending: boolean;
  productName: string;
  description: string;
  currentPrice: number;
  sellerPrice: number;
  currentRating: number;
  totalRating: number;
  totalReview: number;
  availableQuantity?: number;
  color?: string;
  images: Array<ImageProps>;
  details: specificationDetails;
}
export interface ProductsJson {
  version: string;
  lastUpdated: string;
  productsList: ProductDetails[];
}
export interface ItemFeatures {
  weights?: string[];
}

export interface specificationDetails {
  sizes?: string[];
  colors?: string[];
  material?: string[];
  pages?: number;
  features?: Array<ItemFeatures>;
}

// featured categories
export type apparel = "apparel";
export type electronics = "electronics";
export type books = "books";
export type accessories = "accessories";
export type fragrance = "fragrance";
export type wellness = "wellness";

//extended categories
export type footwear = "footwear";
export type sportsOutdoors = "sports & outdoors";
export type beautyPersonalCare = "beauty & personal care";
export type homeKitchen = "home & kitchen";

//user categories
export type men = "men";
export type women = "women";
export type kids = "kids";

// 🎯 Base Category Types
export type UserCategory = "men" | "women" | "kids";

export type FeaturedCategory =
  | "apparel"
  | "electronics"
  | "books"
  | "fragrance"
  | "accessories"
  | "wellness";

// 🧩 Combined Category Types
export type FilteredCategory =
  | FeaturedCategory
  | "footwear"
  | "sports & outdoors"
  | "beauty & personal care"
  | "home & kitchen";

export type productCategories = UserCategory | FilteredCategory;
