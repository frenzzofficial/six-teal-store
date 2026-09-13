import appConfig from "./app.config";

export const navigationConfig = {
  logo: {
    src: "/logo.png",
    alt: "SixTeal Store",
    width: 120,
    height: 60,
  },

  navbar: [
    {
      name: "Home",
      href: "/",
      icon: "home",
    },
    {
      name: "Explore",
      href: "/explore",
      icon: "compass",
    },
    {
      name: "Trending",
      href: "/trending",
      icon: "trending-up",
    },
    {
      name: "Products",
      href: "/products",
      icon: "shopping-bag",
    },
  ],

  actions: {
    search: {
      name: "Search",
      href: "/search",
      icon: "search",
    },

    wishlist: {
      name: "Wishlist",
      href: "/wishlist",
      icon: "heart",
    },

    account: {
      name: "Account",
      href: "/account",
      icon: "user",
    },

    cart: {
      name: "Cart",
      href: "/cart",
      icon: "shopping-cart",
    },
  },

  mobile: [
    {
      name: "Home",
      href: "/",
      icon: "home",
    },
    {
      name: "Explore",
      href: "/explore",
      icon: "compass",
    },
    {
      name: "Trending",
      href: "/trending",
      icon: "trending-up",
    },
    {
      name: "Products",
      href: "/products",
      icon: "shopping-bag",
    },
    {
      name: "Cart",
      href: "/cart",
      icon: "shopping-cart",
    },
  ],

  explore: [
    {
      name: "All Products",
      href: "/products",
      icon: "grid-2x2",
    },
    {
      name: "Fashion",
      href: "/products?category=fashion",
      icon: "shirt",
    },
    {
      name: "Tech",
      href: "/products?category=tech",
      icon: "cpu",
    },
    {
      name: "Literature",
      href: "/products?category=literature",
      icon: "book-open",
    },
    {
      name: "Fragrance",
      href: "/products?category=fragrance",
      icon: "sparkles",
    },
    {
      name: "Accessories",
      href: "/products?category=accessories",
      icon: "watch",
    },
    {
      name: "Wellness",
      href: "/products?category=wellness",
      icon: "heart-pulse",
    },
  ],

  footer: {
    shop: {
      title: "Shop",
      links: [
        {
          name: "All Products",
          href: "/products",
        },
        {
          name: "Trending",
          href: "/trending",
        },
        {
          name: "New Arrivals",
          href: "/products?sort=newest",
        },
        {
          name: "Best Sellers",
          href: "/products?sort=popular",
        },
        {
          name: "Deals",
          href: "/products?filter=deals",
        },
      ],
    },

    categories: {
      title: "Categories",
      links: [
        {
          name: "Fashion",
          href: "/products?category=fashion",
        },
        {
          name: "Tech",
          href: "/products?category=tech",
        },
        {
          name: "Literature",
          href: "/products?category=literature",
        },
        {
          name: "Fragrance",
          href: "/products?category=fragrance",
        },
        {
          name: "Accessories",
          href: "/products?category=accessories",
        },
        {
          name: "Wellness",
          href: "/products?category=wellness",
        },
      ],
    },

    company: {
      title: "Company",
      links: [
        {
          name: "About SixTeal",
          href: "/about",
        },
        {
          name: "Our Story",
          href: "/about#story",
        },
        {
          name: "Contact",
          href: "/contact",
        },
        {
          name: "Careers",
          href: "/careers",
        },
        {
          name: "Journal",
          href: "/journal",
        },
      ],
    },

    support: {
      title: "Support",
      links: [
        {
          name: "Help Center",
          href: "/help",
        },
        {
          name: "Shipping & Delivery",
          href: "/shipping",
        },
        {
          name: "Returns & Refunds",
          href: "/returns",
        },
        {
          name: "Track Order",
          href: "/track-order",
        },
        {
          name: "FAQs",
          href: "/faq",
        },
      ],
    },

    legal: {
      title: "Legal",
      links: [
        {
          name: "Privacy Policy",
          href: "/privacy",
        },
        {
          name: "Terms & Conditions",
          href: "/terms",
        },
        {
          name: "Cookie Policy",
          href: "/cookies",
        },
        {
          name: "Refund Policy",
          href: "/refund-policy",
        },
      ],
    },
  },

  social: [
    {
      name: "Instagram",
      href: appConfig.social.instagram,
      icon: "instagram",
    },
    {
      name: "X",
      href: appConfig.social.twitter,
      icon: "twitter",
    },
    {
      name: "LinkedIn",
      href: appConfig.social.linkedin,
      icon: "linkedin",
    },
  ],

  account: {
    authenticated: [
      {
        name: "My Account",
        href: "/account",
        icon: "user",
      },
      {
        name: "My Orders",
        href: "/account/orders",
        icon: "package",
      },
      {
        name: "Wishlist",
        href: "/wishlist",
        icon: "heart",
      },
      {
        name: "Addresses",
        href: "/account/addresses",
        icon: "map-pin",
      },
      {
        name: "Settings",
        href: "/account/settings",
        icon: "settings",
      },
    ],

    guest: [
      {
        name: "Sign In",
        href: "/signin",
        icon: "log-in",
      },
      {
        name: "Create Account",
        href: "/signup",
        icon: "user-plus",
      },
    ],
  },

  checkout: [
    {
      name: "Cart",
      href: "/cart",
      icon: "shopping-cart",
    },
    {
      name: "Shipping",
      href: "/checkout/shipping",
      icon: "truck",
    },
    {
      name: "Payment",
      href: "/checkout/payment",
      icon: "credit-card",
    },
    {
      name: "Confirmation",
      href: "/checkout/confirmation",
      icon: "circle-check",
    },
  ],
} as const;
