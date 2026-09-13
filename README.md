# SixTeal --- Design & Implementation Flow

A modern, teal-first e-commerce experience designed from Figma concepts
and implemented as a production-ready web application.

SixTeal focuses on a calm, premium, lifestyle-oriented shopping
experience across collections, products, trends, cart, and checkout.

---

## 1. Project Vision

SixTeal is a curated lifestyle commerce platform covering:

- Fashion
- Tech
- Literature
- Fragrance
- Accessories
- Wellness

The visual direction is intentionally consistent across every page:

> **Modern · Premium · Calm · Teal · Lifestyle-focused**

The interface should feel satisfying and trustworthy rather than overly
aggressive or marketplace-like.

---

## 2. Core User Flow

```text
                    ┌───────────────┐
                    │     Home      │
                    │ Define Style  │
                    └───────┬───────┘
                            │
              ┌─────────────┼─────────────┐
              │             │             │
              ▼             ▼             ▼
          Explore         Trends       Products
          Collections     Trending      Catalog
              │             │             │
              └─────────────┼─────────────┘
                            │
                            ▼
                       Product View
                            │
                            ▼
                         Add Cart
                            │
                            ▼
                           Cart
                            │
                            ▼
                        Checkout
                            │
                            ▼
                       Confirmation
```

### Primary navigation

```text
Home
Explore
Trends
Products
Theme
Login
Cart
```

---

# 3. Page Architecture

## Home

### Goal

Introduce the SixTeal brand and allow users to discover their preferred
lifestyle category.

### Hero

**Headline**

> Define Your Style

**Supporting message**

Discover curated collections that speak to every facet of your
personality.

### Featured categories

```text
Fashion
Tech
Literature
Fragrance
Accessories
Wellness
```

### Supporting sections

- Featured Collections
- Wellness promotional banner
- Trending Now
- Explore by Category
- Customer testimonials
- SixTeal mobile app promotion
- Newsletter
- Footer

---

# 4. Trending Page

### Goal

Show products and lifestyle choices that are currently gaining
popularity.

### Hero

> What's Inspiring Everyone

The page should communicate discovery, community activity, and current
trends.

### Trend filters

```text
All Trends
Fashion
Tech
Literature
Fragrance
Accessories
Wellness
```

### Sections

- Trending This Week
- The Teal Edit
- Rising Fast
- People Are Talking About It
- Trending by Category
- Most Loved This Month
- Newsletter

### Product metadata

Trending products can expose:

- Trend badge
- Category
- Product name
- Price
- Rating
- Review count
- Wishlist
- Add to cart
- Popularity indicator

Example:

```text
↑ 120% in the last week
```

---

# 5. Products Page

### Goal

Provide the complete product catalog with discovery and filtering tools.

### Hero

> Discover Amazing Products

### Category navigation

```text
All Products
Fashion
Tech
Literature
Fragrance
Accessories
Wellness
```

### Product catalog

The catalog should support:

- Product grid
- Category filtering
- Price range
- Brand
- Rating
- Availability
- Sorting
- Pagination
- Wishlist
- Add to cart

### Example filters

```text
Category
□ Fashion
□ Tech
□ Literature
□ Fragrance
□ Accessories
□ Wellness

Price Range
₹0 — ₹10,000

Brand
□ SixTeal
□ Nike
□ Sony
□ Apple
□ Ray-Ban

Rating
★★★★★ & up
★★★★☆ & up
★★★☆☆ & up

Availability
□ In Stock
□ On Sale
```

---

# 6. Product Card

Product cards are one of the most important reusable components.

### Structure

```text
┌────────────────────────────┐
│                            │
│       Product Image        │
│                         ♡  │
├────────────────────────────┤
│ Category                   │
│ Product Name               │
│                            │
│ ₹2,499                     │
│ ★ 4.8 (124)            🛒  │
└────────────────────────────┘
```

### Supported states

- Default
- Hover
- Wishlist active
- Trending
- Best seller
- New
- Discounted
- Out of stock

---

# 7. Cart Page

### Goal

Make the cart feel reassuring and satisfying instead of purely
transactional.

### Hero

> Your Cart

Supporting message:

> Great choices! You're building a better, more inspired you.

### Cart item

Each cart item should support:

```text
Product image
Category
Product name
Variant
Price
Original price
Discount
Quantity controls
Remove
```

### Cart structure

```text
Cart
├── Cart Items
│   ├── Product
│   ├── Product
│   └── Product
│
├── Add Note
│
├── You Might Also Like
│
└── Order Summary
    ├── Subtotal
    ├── Discount
    ├── Shipping
    ├── Total
    └── Checkout
```

### Trust messaging

```text
Secure Checkout
100% safe & encrypted

Free Shipping
On orders above ₹999

Easy Returns
7-day hassle free
```

### Satisfaction principle

The cart should reinforce:

- You're getting value
- You're saving money
- Your order is secure
- Shipping is simple
- Returns are easy
- The products fit the SixTeal lifestyle

---

# 8. Mobile Cart

The mobile experience should not simply be a compressed desktop layout.

It should be redesigned around vertical interaction.

### Mobile structure

```text
Header
↓
Cart Hero
↓
Trust Benefits
↓
Cart Items
↓
Add Note
↓
Recommended Products
↓
Order Summary
↓
Checkout CTA
```

### Mobile priorities

1.  Product visibility
2.  Quantity controls
3.  Total price
4.  Savings
5.  Checkout CTA
6.  Trust information

The checkout CTA should remain highly visible without making the
interface feel intrusive.

---

# 9. Checkout Flow

The checkout flow follows:

```text
Cart
  ↓
Address
  ↓
Payment
  ↓
Confirmation
```

### Checkout progress

```text
① Cart ───── ② Address ───── ③ Payment
```

### Order summary

```text
Subtotal
Discount
Shipping
────────────
Total

You're saving ₹1,198
```

### Payment options

Support visual payment methods such as:

```text
Google Pay
Apple Pay
Paytm
Card
UPI
```

---

# 10. Design System

SixTeal uses a semantic design-token system inspired by shadcn/ui.

## Brand palette

Token Color Purpose

---

Teal 950 `#0B2421` Headings / Footer
Teal 800 `#116C62` Dark brand
Teal 600 `#089E8C` Primary actions
Teal 500 `#32A395` Secondary accents
Teal 200 `#B8F3EB` Highlights
Teal 50 `#E3FBF8` Hero / section backgrounds

## Supporting colors

Token Color Purpose

---

Surface `#FBFEFE` Main surfaces
Card `#F2FBFB` Product cards
Mint `#D4FDF7` Soft backgrounds
Text `#0B2421` Primary text
Muted `#65857F` Secondary text
Border `#DFE1E0` Borders
Success `#155531` Savings / success
Destructive `#E5484D` Delete / error

---

# 11. Shadcn Semantic Tokens

The application should consume semantic tokens instead of hardcoding
colors throughout components.

```css
:root {
  --background: oklch(99% 0.006 180);
  --foreground: oklch(16% 0.035 170);

  --card: oklch(98% 0.008 180);
  --card-foreground: oklch(16% 0.035 170);

  --popover: oklch(99% 0.004 180);
  --popover-foreground: oklch(16% 0.035 170);

  --primary: oklch(55% 0.115 175);
  --primary-foreground: oklch(99% 0.005 180);

  --secondary: oklch(92% 0.055 175);
  --secondary-foreground: oklch(25% 0.06 175);

  --muted: oklch(95% 0.025 180);
  --muted-foreground: oklch(48% 0.035 175);

  --accent: oklch(89% 0.075 175);
  --accent-foreground: oklch(25% 0.06 175);

  --destructive: oklch(62% 0.22 25);
  --destructive-foreground: oklch(99% 0.005 180);

  --border: oklch(88% 0.025 180);
  --input: oklch(88% 0.025 180);
  --ring: oklch(55% 0.115 175);

  --success: oklch(48% 0.12 155);
  --success-foreground: oklch(99% 0.005 180);

  --radius: 0.75rem;
}
```

---

# 12. Visual Language

## Colors

Use teal as the primary visual identity.

Avoid introducing unrelated strong colors unless required for semantic
states.

## Backgrounds

Prefer:

```text
White
Very light mint
Soft teal gradients
```

## Cards

Cards should generally use:

```text
Rounded corners
Very subtle border
Soft shadow
White / near-white surface
```

## Buttons

Primary buttons use the SixTeal brand color.

Example:

```text
Primary
████████████████
Proceed to Checkout →
```

Secondary actions should use lighter mint/teal surfaces.

---

# 13. Typography

The typography should communicate:

```text
Friendly
Modern
Premium
Highly readable
```

### Hierarchy

```text
Hero heading
↓
Section heading
↓
Product heading
↓
Body
↓
Metadata
```

Avoid excessive font weights or overly condensed typography.

---

# 14. Image Direction

Product and lifestyle imagery should maintain the same visual language.

### Image characteristics

- Soft studio lighting
- Teal / mint surroundings
- Premium product photography
- Clean compositions
- Lifestyle context
- Soft shadows
- Minimal visual noise

### Major imagery groups

```text
Lifestyle
├── Fashion
├── Wellness
└── Technology

Product
├── Shoes
├── Earbuds
├── Fragrance
├── Books
├── Accessories
└── Wellness products

Decorative
├── Tropical leaves
├── Teal shapes
├── Soft gradients
└── Lifestyle textures
```

Transparent cutout assets should be preferred when the image needs to
integrate directly into a hero composition.

---

# 15. Reusable Component Architecture

The UI should be built from reusable components rather than
page-specific markup.

Suggested structure:

```text
components/
├── ui/
│   ├── button
│   ├── card
│   ├── input
│   ├── badge
│   ├── separator
│   └── ...
│
├── layout/
│   ├── Navbar
│   ├── Footer
│   └── Container
│
├── features/commerce/
│   ├── ProductCard
│   ├── ProductGrid
│   ├── CategoryCard
│   ├── WishlistButton
│   ├── QuantityControl
│   ├── CartItem
│   ├── CartSummary
│   └── ProductRecommendations
│
├── features/home/
│   ├── Hero
│   ├── FeaturedCollections
│   ├── TrendingProducts
│   ├── CategoryExplorer
│   ├── Testimonials
│   ├── Newsletter
│   └── AppPromotion
│
└── features/checkout/
    ├── CheckoutProgress
    ├── AddressForm
    ├── PaymentMethods
    └── OrderSummary
```

---

# 16. Component Design Rules

Each reusable component should have a clear responsibility.

For example:

```tsx
<ProductCard product={product} showWishlist showCartAction badge="Trending" />
```

Instead of creating separate implementations for:

```text
TrendingProductCard
ProductPageCard
CartRecommendationCard
FeaturedProductCard
```

Prefer one flexible `ProductCard` with controlled props.

---

# 17. Responsive Strategy

The application must be designed mobile-first.

### Desktop

```text
Large hero
Multi-column product grids
Sidebar filters
Horizontal recommendations
Wide promotional banners
```

### Tablet

```text
Reduced columns
Collapsed filters
Smaller hero
Adjusted spacing
```

### Mobile

```text
Single-column content
Horizontal category scrolling
Stacked cards
Mobile filter sheet
Sticky checkout CTA
Compact navigation
```

---

# 18. Interaction Principles

Interactions should feel smooth and intentional.

### Product

```text
Hover
  → Slight image scale
  → Shadow increase
  → CTA emphasis
```

### Wishlist

```text
♡
 ↓
♥
```

Use subtle animation rather than aggressive motion.

### Add to cart

The action should provide immediate visual feedback.

Example:

```text
Add to Cart
     ↓
Added ✓
```

### Navigation

Active navigation should use the brand teal and a subtle indicator.

---

# 19. Satisfaction-First UX

SixTeal should optimize for perceived satisfaction, not just conversion.

Important emotional signals:

```text
Discovery
      ↓
Confidence
      ↓
Value
      ↓
Anticipation
      ↓
Checkout
      ↓
Reassurance
```

Examples:

### Before purchase

> Good products. Better choices.

### Cart

> You're saving ₹1,198

### Checkout

> Your information is secure.

### After purchase

> Your order is on its way.

The interface should continuously reassure users that they made a good
decision.

---

# 20. Accessibility

All UI should follow accessible interaction patterns.

Requirements:

- Semantic HTML
- Keyboard navigation
- Visible focus states
- Sufficient color contrast
- Accessible button labels
- Accessible form errors
- Alt text for meaningful images
- Decorative imagery marked appropriately
- Touch targets suitable for mobile

Do not rely solely on color to communicate state.

---

# 21. Performance

Images are a major part of SixTeal's visual experience.

Use:

- Responsive images
- Next.js Image optimization
- Lazy loading below the fold
- Proper image dimensions
- WebP / AVIF where appropriate
- Compressed transparent PNG/WebP assets
- Avoid unnecessarily large hero assets

Prioritize the first viewport.

---

# 22. Suggested Route Structure

```text
/
├── /explore
├── /trends
├── /products
├── /products/[slug]
├── /cart
├── /checkout
├── /checkout/address
├── /checkout/payment
└── /order/[id]
```

---

# 23. Data Model Direction

A product should contain enough information to power every UI surface.

Example:

```ts
type Product = {
  id: string;
  slug: string;

  name: string;
  description: string;

  category: Category;
  brand: string;

  price: number;
  compareAtPrice?: number;

  rating: number;
  reviewCount: number;

  images: string[];

  badge?: ProductBadge;

  stock: number;

  variants?: ProductVariant[];
};
```

Avoid creating separate product data structures for Home, Trending,
Products, and Cart.

The same product model should drive all experiences.

---

# 24. Design-to-Code Workflow

When implementing a new Figma design:

```text
Figma
  ↓
Identify layout regions
  ↓
Identify reusable patterns
  ↓
Extract design tokens
  ↓
Build primitives
  ↓
Build reusable components
  ↓
Build page sections
  ↓
Compose page
  ↓
Responsive implementation
  ↓
Interaction states
  ↓
Accessibility
  ↓
Visual QA
```

### Do not immediately convert every Figma frame into a component.

First identify:

```text
What is reusable?
What is page-specific?
What is a design token?
What is data?
What is behavior?
```

---

# 25. Figma Analysis Checklist

Before implementation, inspect:

### Layout

- Container width
- Section spacing
- Grid columns
- Card dimensions
- Alignment
- Responsive behavior

### Typography

- Font family
- Font size
- Font weight
- Line height
- Letter spacing

### Color

- Brand colors
- Surface colors
- Text colors
- Border colors
- Semantic colors

### Components

- Buttons
- Cards
- Inputs
- Navigation
- Filters
- Product controls

### States

- Hover
- Focus
- Active
- Disabled
- Loading
- Empty
- Error
- Success

---

# 26. Visual QA Checklist

Every implemented page should be compared against the design at:

```text
Desktop
Tablet
Mobile
```

Check:

- Spacing
- Typography
- Colors
- Image crop
- Border radius
- Shadows
- Alignment
- Responsive behavior
- Interactive states
- Overflow
- Accessibility

The goal is not simply to make the page functional.

The goal is:

> **Figma intent → production-quality UI**

---

# 27. Page Completion Checklist

## Home

- [ ] Navbar
- [ ] Hero
- [ ] Category cards
- [ ] Featured products
- [ ] Wellness banner
- [ ] Trending products
- [ ] Testimonials
- [ ] App promotion
- [ ] Newsletter
- [ ] Footer
- [ ] Responsive

## Trending

- [ ] Hero
- [ ] Trend filters
- [ ] Trending products
- [ ] Editorial section
- [ ] Rising products
- [ ] Community section
- [ ] Category trends
- [ ] Monthly favorites
- [ ] Newsletter
- [ ] Footer
- [ ] Responsive

## Products

- [ ] Hero
- [ ] Categories
- [ ] Filters
- [ ] Sorting
- [ ] Product grid
- [ ] Pagination
- [ ] Product states
- [ ] Trust section
- [ ] Newsletter
- [ ] Footer
- [ ] Responsive

## Cart

- [ ] Cart hero
- [ ] Trust benefits
- [ ] Cart items
- [ ] Quantity controls
- [ ] Remove item
- [ ] Add note
- [ ] Recommendations
- [ ] Order summary
- [ ] Savings indicator
- [ ] Checkout CTA
- [ ] Mobile layout
- [ ] Footer

## Checkout

- [ ] Progress
- [ ] Address
- [ ] Payment
- [ ] Order summary
- [ ] Secure checkout messaging
- [ ] Confirmation
- [ ] Mobile layout

---

# 28. Brand Principles

SixTeal should consistently communicate:

### Curated

Products feel intentionally selected rather than endlessly listed.

### Calm

The teal palette and generous whitespace reduce visual fatigue.

### Premium

Photography, spacing, typography, and subtle shadows create perceived
quality.

### Human

Lifestyle photography and editorial messaging make the store feel
personal.

### Trustworthy

Clear pricing, savings, shipping, returns, and secure checkout messaging
reduce anxiety.

### Inspiring

The website should feel like a lifestyle discovery platform, not only an
online catalog.

---

# 29. Final Design Direction

The entire SixTeal application should feel like one connected
experience:

```text
             SIXTEAL
                │
       ┌────────┴────────┐
       │                 │
   DISCOVER           SHOP
       │                 │
   Explore            Products
       │                 │
   Lifestyle          Catalog
       │                 │
   Trending ──────── Product
       │                 │
       └───────┬─────────┘
               │
              Cart
               │
            Checkout
               │
           Confidence
               │
          Happy Customer
```

The design system should remain consistent even when individual pages
have different purposes.

**One brand. One visual language. One seamless shopping journey.**

---

## Implementation Priority

Recommended development order:

1.  Design tokens
2.  Global layout
3.  Navbar
4.  Footer
5.  Button / Card / Badge primitives
6.  ProductCard
7.  Category components
8.  Home
9.  Products
10. Product details
11. Trending
12. Cart
13. Checkout
14. Responsive refinement
15. Accessibility
16. Performance optimization
17. Visual QA

This order creates a strong component foundation before implementing the
more complex commerce flows.
