import notFoundAside from "@/assets/images/not-found-aside.png";
import sixtealCart from "@/assets/images/sixteal-cart.png";
import sixtealLeavesSide from "@/assets/images/sixteal-leaves-side.png";
import sixtealPhone from "@/assets/images/sixteal-phone.png";
import sixtealProductsHero from "@/assets/images/sixteal-products-hero.png";
import sixtealTrendingHero from "@/assets/images/sixteal-trending-hero.png";

export const imagesConfig = {
  heroImages: {
    name: "Hero Images",
  },

  images: {
    /** 404 page — floating SixTeal shopping bag + signpost illustration. */
    notFoundAside: {
      src: notFoundAside,
      alt: "A SixTeal shopping bag floating beside a signpost pointing to New Arrivals, Best Sellers, Trending, and Mindful Living",
    },
    /** Cart page — SixTeal bag among leaves, for an empty/summary cart state. */
    sixtealCart: {
      src: sixtealCart,
      alt: "A teal SixTeal shopping bag surrounded by leaves",
    },
    /** Decorative corner/edge foliage — reusable across section backgrounds. */
    sixtealLeavesSide: {
      src: sixtealLeavesSide,
      alt: "",
    },
    /** App-promo section — three phone mockups of the SixTeal app. */
    sixtealPhone: {
      src: sixtealPhone,
      alt: "The SixTeal app shown on three phones: category browsing, the home feed, and featured products",
    },
    /** Products page hero — sneaker, fragrance, earbuds, and a book staged together. */
    sixtealProductsHero: {
      src: sixtealProductsHero,
      alt: "A curated still life of SixTeal products: sneakers, fragrance, earbuds, and a book",
    },
    /** Trending page hero — model portrait with trending product callouts. */
    sixtealTrendingHero: {
      src: sixtealTrendingHero,
      alt: "A portrait next to callouts of trending SixTeal products: fragrance, a book, earbuds, and sneakers",
    },
  },
};
