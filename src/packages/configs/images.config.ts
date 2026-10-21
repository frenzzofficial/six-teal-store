import notFoundAside from "@/assets/images/hero/not-found-aside.png";
import sixtealCart from "@/assets/images/hero/sixteal-cart.png";
import sixtealLeavesSide from "@/assets/images/hero/sixteal-leaves-side.png";
import sixtealPhone from "@/assets/images/hero/sixteal-phone.png";
import sixtealProductsHero from "@/assets/images/hero/sixteal-products-hero.png";
import sixtealTrendingHero from "@/assets/images/hero/sixteal-trending-hero.png";
import ImageNotFound from "@/assets/images/misc/not-found-image.png";
import accessories_mint_sunglasses_case from "@/assets/images/products/accessories-mint-sunglasses-case.png";
import accessories_premium_wallet from "@/assets/images/products/accessories-premium-wallet.png";
import accessories_teal_leather_tote from "@/assets/images/products/accessories-teal-leather-tote.png";
import fashion_classic_white_shirt from "@/assets/images/products/fashion-classic-white-shirt.png";
import fashion_mint_sole_sneakers from "@/assets/images/products/fashion-mint-sole-sneakers.png";
import fashion_teal_satin_overshirt from "@/assets/images/products/fashion-teal-satin-overshirt.png";
import fashion_urban_sneakers from "@/assets/images/products/fashion-urban-sneakers.png";
import fragrance_aqua_perfume_bottle from "@/assets/images/products/fragrance-aqua-perfume-bottle.png";
import fragrance_aroma_diffuser from "@/assets/images/products/fragrance-aroma-diffuser.png";
import fragrance_mint_reed_diffuser from "@/assets/images/products/fragrance-mint-reed-diffuser.png";
import fragrance_sixteal_signature from "@/assets/images/products/fragrance-sixteal-signature.png";
import literature_gratitude_journal from "@/assets/images/products/literature-gratitude-journal.png";
import literature_modern_book_stack from "@/assets/images/products/literature-modern-book-stack.png";
import literature_sixteal_hardcover from "@/assets/images/products/literature-sixteal-hardcover.png";
import literature_teal_hardcover_journal from "@/assets/images/products/literature-teal-hardcover-journal.png";
import tech_aerobuds_pro from "@/assets/images/products/tech-aerobuds-pro.png";
import tech_mechanical_keyboard from "@/assets/images/products/tech-mechanical-keyboard.png";
import tech_mint_wireless_earbuds from "@/assets/images/products/tech-mint-wireless-earbuds.png";
import tech_nova_smartwatch from "@/assets/images/products/tech-nova-smartwatch.png";
import tech_teal_smartwatch from "@/assets/images/products/tech-teal-smartwatch.png";
import wellness_adjustable_dumbbells from "@/assets/images/products/wellness-adjustable-dumbbells.png";
import wellness_mint_yoga_mat from "@/assets/images/products/wellness-mint-yoga-mat.png";
import wellness_teal_skincare_set from "@/assets/images/products/wellness-teal-skincare-set.png";
import wellness_yoga_essentials_kit from "@/assets/images/products/wellness-yoga-essentials-kit.png";

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

  productImages: [
    {
      id: "productImage000",
      src: ImageNotFound.src,
      alt: "Image Not Found",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage001",
      src: accessories_mint_sunglasses_case.src,
      alt: "Mint sunglasses case",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage002",
      src: accessories_premium_wallet.src,
      alt: "Premium wallet",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage003",
      src: accessories_teal_leather_tote.src,
      alt: "Teal leather tote bag",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage004",
      src: fashion_classic_white_shirt.src,
      alt: "Classic white shirt",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage005",
      src: fashion_mint_sole_sneakers.src,
      alt: "Sneakers with mint soles",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage006",
      src: fashion_teal_satin_overshirt.src,
      alt: "Teal satin overshirt",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage007",
      src: fashion_urban_sneakers.src,
      alt: "Urban sneakers",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage008",
      src: fragrance_aqua_perfume_bottle.src,
      alt: "Aqua perfume bottle",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage009",
      src: fragrance_aroma_diffuser.src,
      alt: "Aroma diffuser",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage010",
      src: fragrance_mint_reed_diffuser.src,
      alt: "Mint reed diffuser",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage011",
      src: fragrance_sixteal_signature.src,
      alt: "SixTeal signature fragrance",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage012",
      src: literature_gratitude_journal.src,
      alt: "Gratitude journal",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage013",
      src: literature_modern_book_stack.src,
      alt: "Stack of modern books",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage014",
      src: literature_sixteal_hardcover.src,
      alt: "SixTeal hardcover book",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage015",
      src: literature_teal_hardcover_journal.src,
      alt: "Teal hardcover journal",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage016",
      src: tech_aerobuds_pro.src,
      alt: "AeroBuds Pro earbuds",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage017",
      src: tech_mechanical_keyboard.src,
      alt: "Mechanical keyboard",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage018",
      src: tech_mint_wireless_earbuds.src,
      alt: "Mint wireless earbuds",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage019",
      src: tech_nova_smartwatch.src,
      alt: "Nova smartwatch",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage020",
      src: tech_teal_smartwatch.src,
      alt: "Teal smartwatch",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage021",
      src: wellness_adjustable_dumbbells.src,
      alt: "Adjustable dumbbells",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage022",
      src: wellness_mint_yoga_mat.src,
      alt: "Mint yoga mat",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage023",
      src: wellness_teal_skincare_set.src,
      alt: "Teal skincare set",
      height: "1254",
      width: "1254",
    },
    {
      id: "productImage024",
      src: wellness_yoga_essentials_kit.src,
      alt: "Yoga essentials kit",
      height: "1254",
      width: "1254",
    },
  ],
};
