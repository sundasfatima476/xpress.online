export const formatPrice = (value) =>
  `$${Number(value).toFixed(2).replace(/\.00$/, "")}`;

export const slugify = (str) =>
  str
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-");

export const clamp = (n, min, max) => Math.min(Math.max(n, min), max);
