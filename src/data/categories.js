export const categories = [
  {
    slug: "men",
    name: "Men's Fashion",
    icon: "shirt",
    description: "Tailored essentials for the modern man.",
  },
  {
    slug: "women",
    name: "Women's Fashion",
    icon: "dress",
    description: "Effortless elegance, redefined.",
  },
  {
    slug: "shirts",
    name: "Shirts",
    icon: "shirt",
    description: "Crisp, refined shirting.",
  },
  {
    slug: "t-shirts",
    name: "T-Shirts",
    icon: "tshirt",
    description: "Everyday premium basics.",
  },
  {
    slug: "jackets",
    name: "Jackets",
    icon: "jacket",
    description: "Structured outerwear staples.",
  },
  {
    slug: "pants",
    name: "Pants",
    icon: "pants",
    description: "Tailored fits for every day.",
  },
  {
    slug: "shoes",
    name: "Shoes",
    icon: "shoe",
    description: "Footwear crafted to last.",
  },
  {
    slug: "accessories",
    name: "Accessories",
    icon: "bag",
    description: "The finishing details.",
  },
];

export const getCategoryBySlug = (slug) =>
  categories.find((c) => c.slug === slug);
