import { ImageProps } from "@/types/app";
import { FeaturedCategory, ProductDetails } from "@/types/products";

interface HeroProducts {
  uid: number;
  tag: string;
  label: string;
  css: string;
  image?: ImageProps;
  color?: string;
  category: FeaturedCategory[];
}

const newHeroProducts: Array<HeroProducts> = [
  {
    uid: 1,
    label: "Fashion",
    css: "bg-gradient-to-br from-teal-100 to-teal-200",
    tag: "Express Yourself",
    category: ["apparel"],
  },
  {
    uid: 2,
    label: "Tech",
    css: "bg-gradient-to-br from-slate-100 to-slate-200",
    tag: "Stay Connected",
    category: ["electronics"],
  },
  {
    uid: 3,
    label: "Literature",
    css: "bg-gradient-to-br from-amber-100 to-amber-200",
    tag: "Feed your mind",
    category: ["books"],
  },
  {
    uid: 4,
    label: "Fragrance",
    css: "bg-gradient-to-br from-rose-100 to-rose-200",
    tag: "Leave an impression",
    category: ["fragrance"],
  },
  {
    uid: 5,
    label: "Accessories",
    css: "bg-gradient-to-br from-purple-100 to-purple-200",
    tag: "Perfect Details",
    category: ["accessories"],
  },
  {
    uid: 6,
    label: "Wellness",
    css: "bg-gradient-to-br from-pink-100 to-pink-200",
    tag: "Nurture yourself",
    category: ["wellness"],
  },
];

export const HeroItems = (productsList: ProductDetails[]) => {
  return newHeroProducts.map((item) => {
    const firstProduct = productsList.find((prod) =>
      item.category.some((cat) => prod.Category.includes(cat))
    );
    return {
      ...item,
      color: firstProduct?.color,
      image: firstProduct?.images,
    };
  });
};
