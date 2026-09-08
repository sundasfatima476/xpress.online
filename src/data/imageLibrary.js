// Curated, verified Unsplash photo IDs (fetched and confirmed live), mapped
// to the categories and special sections used across the site. Swap any ID
// here to change imagery sitewide without touching component code.

export const PHOTOS = {
  manJacketStudio: "1643308002958-6fc02613aa5c", // moody male fashion portrait, jacket
  manPortraitGrey: "1665436035665-d7dad9086ee2", // male portrait, black jacket
  manSuitPose: "1620122830785-a18b43585b44", // male fashion pose, suit jacket
  womanCoatGreen: "1728318817167-902a85482317", // woman walking, green-toned coat
  womanCoatAutumn: "1643577999708-ec630df73a7b", // woman white coat, scarf, editorial
  flatLayShirtShoes: "1441035844538-e2ce7dba066b", // flat lay: shirt, shoes, accessories
  whiteSneakers: "1676379827610-c380c52db0c6", // white sneakers product shot
  designerHandbags: "1761646238914-2dad041491e2", // handbags, neutral/green background
  fashionStudio: "1753164597544-a2736833357e", // fashion design studio / atelier interior
};

// Category slug -> photo (used directly by CategoryCard, since its seed IS the slug)
export const CATEGORY_IMAGES = {
  men: PHOTOS.manSuitPose,
  women: PHOTOS.womanCoatGreen,
  jackets: PHOTOS.manJacketStudio,
  shirts: PHOTOS.flatLayShirtShoes,
  "t-shirts": PHOTOS.manPortraitGrey,
  pants: PHOTOS.flatLayShirtShoes,
  shoes: PHOTOS.whiteSneakers,
  accessories: PHOTOS.designerHandbags,
};

// Special named seeds used for hero/promo/editorial sections
export const SPECIAL_IMAGES = {
  "hero-campaign": PHOTOS.manJacketStudio,
  "hero-detail": PHOTOS.manJacketStudio,
  "promo-banner": PHOTOS.fashionStudio,
  "promo-1": PHOTOS.womanCoatGreen,
  "promo-2": PHOTOS.manSuitPose,
  "promo-3": PHOTOS.flatLayShirtShoes,
  "about-studio": PHOTOS.fashionStudio,
  "about-quality": PHOTOS.womanCoatAutumn,
  "login-editorial": PHOTOS.manPortraitGrey,
  "signup-editorial": PHOTOS.womanCoatAutumn,
};

// Product image seed -> category fallback, so every product photo resolves
// to a real, thematically-correct image even without a 1:1 product shot.
export const SEED_TO_CATEGORY = {
  "jacket-1": "jackets",
  "leather-jacket-1": "jackets",
  "tshirt-1": "t-shirts",
  "hoodie-1": "t-shirts",
  "sweatshirt-1": "t-shirts",
  "polo-1": "t-shirts",
  "shirt-1": "shirts",
  "shirt-2": "shirts",
  "blouse-1": "women",
  "jeans-1": "pants",
  "trousers-1": "pants",
  "chino-1": "pants",
  "sneaker-1": "shoes",
  "sneaker-2": "shoes",
  "boots-1": "shoes",
  "bag-1": "accessories",
  "belt-1": "accessories",
  "scarf-1": "accessories",
  "dress-1": "women",
  "sweater-1": "women",
};

const ALL_CATEGORY_IMAGES = { ...CATEGORY_IMAGES, women: PHOTOS.womanCoatGreen };

/** Resolve a seed string (category slug, special key, or product seed) to a real photo ID, or null. */
export function resolvePhotoId(seed = "") {
  const base = seed.replace(/-[bcd]$/, ""); // thumbnail variants (-b/-c/-d) share the base photo
  if (SPECIAL_IMAGES[base]) return SPECIAL_IMAGES[base];
  if (ALL_CATEGORY_IMAGES[base]) return ALL_CATEGORY_IMAGES[base];
  if (SEED_TO_CATEGORY[base]) return ALL_CATEGORY_IMAGES[SEED_TO_CATEGORY[base]];
  return null;
}

/** Build a sized, cropped Unsplash CDN URL for a given photo ID. */
export function unsplashUrl(photoId, { w = 800, q = 80 } = {}) {
  return `https://images.unsplash.com/photo-${photoId}?w=${w}&q=${q}&auto=format&fit=crop`;
}
