# Maison Noir — Fashion E-Commerce Frontend

A production-quality, fully responsive clothing & fashion e-commerce frontend built with React, Vite, Tailwind CSS, and React Router.

## Design System
- Deep Forest Green `#173B32`, Ivory `#F7F3EA`, Soft Beige `#E8DFD0`, Warm Sand `#CDBB9A`,
  Muted Champagne Gold `#B89A62`, Charcoal `#252823`, Soft White `#FCFBF8`
- Serif display type (Cormorant Garamond) + clean sans body type (Jost)

## Getting Started
```bash
npm install
npm run dev       # start dev server
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Project Structure
```
src/
├── components/    # Reusable UI: ProductCard, Header, Footer, FilterSidebar, OrderTimeline, Modal, etc.
├── pages/         # Route-level pages (Home, Shop, Category, ProductDetail, Cart, Checkout, TrackOrder, Account*, ...)
├── layouts/        # MainLayout (header/footer shell), AccountLayout (account sidebar)
├── data/          # products.js, categories.js, orders.js — swap with a real API later
├── context/       # CartContext, WishlistContext, AuthContext, ToastContext (all localStorage-persisted where relevant)
└── utils/         # formatting helpers
```

## What's New (v2)
- Recolored brand logomark (`components/Logo.jsx`) in Forest Green / Champagne Gold, used in header, footer, and favicon.
- Real Unsplash photography wired in via `data/imageLibrary.js` — verified, permanent CDN URLs mapped by category and by special seeds (hero, promo, about, login/signup), with automatic fallback to the gradient placeholder if a URL ever fails.
- Reset Password page (`/reset-password`) completing the Forgot → Reset → Success flow.
- Floating WhatsApp chat widget (global) with quick shortcuts to Track Order, Availability, Size Guide, and Returns.
- Order History status tabs (All / Processing / Shipped / Delivered / Cancelled).
- Out-of-Stock states: badge + disabled Add to Cart on both product cards and the product detail page.
- "You May Also Like" recommendations added to the 404 page.
- Social icons added to the Contact page info panel.

## Notable Features
- Full routing: Home, Shop, Category (dynamic), Product Detail, Search, Cart, Checkout (4-step),
  Order Success, Track Order (with all status states + not-found state), Login, Signup, Forgot Password,
  Account (Overview/Orders/Addresses/Payment/Profile/Settings), Wishlist, About, Contact, FAQ,
  Shipping & Returns, Size Guide, Privacy Policy, Terms, 404.
- Cart & wishlist persist via localStorage.
- Track Order is a first-class feature: header top bar, mobile menu, footer, account sidebar,
  and the order confirmation page all link to `/track-order`.
- Product imagery uses a deterministic, brand-colored placeholder system (`ProductImage.jsx`) —
  swap in real photography by replacing that component's rendering with `<img>` tags.
