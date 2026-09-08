import { useState } from "react";
import {
  GiPolarStar,
  GiClothes,
  GiBackpack,
  GiConverseShoe,
} from "react-icons/gi";
import { LuShirt } from "react-icons/lu";
import { resolvePhotoId, unsplashUrl } from "../data/imageLibrary";

// Deterministic gradient/icon pairing per product "seed" string so every
// card, thumbnail and gallery view of the same product looks identical
// when no real photo is mapped for it.
const PALETTES = [
  ["#E8DFD0", "#CDBB9A"],
  ["#173B32", "#20493F"],
  ["#CDBB9A", "#B89A62"],
  ["#F7F3EA", "#E8DFD0"],
  ["#252823", "#173B32"],
  ["#B89A62", "#9B7F4C"],
];

function hashSeed(seed = "") {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h << 5) - h + seed.charCodeAt(i);
  return Math.abs(h);
}

function pickIcon(seed = "") {
  if (seed.includes("shoe") || seed.includes("sneaker") || seed.includes("boot")) return GiConverseShoe;
  if (seed.includes("bag")) return GiBackpack;
  if (seed.includes("scarf") || seed.includes("belt")) return GiPolarStar;
  if (seed.includes("dress") || seed.includes("blouse")) return GiClothes;
  return LuShirt;
}

function GradientFallback({ seed, label, className, iconSize }) {
  const idx = hashSeed(seed) % PALETTES.length;
  const [from, to] = PALETTES[idx];
  const dark = idx === 1 || idx === 4 || idx === 5;
  const Icon = pickIcon(seed);

  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      style={{ background: `linear-gradient(150deg, ${from} 0%, ${to} 100%)` }}
      role="img"
      aria-label={label || "Product image placeholder"}
    >
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0, currentColor 1px, transparent 1px, transparent 14px)",
          color: dark ? "#F7F3EA" : "#173B32",
        }}
      />
      <Icon size={iconSize} className={dark ? "text-ivory/70" : "text-forest/40"} />
    </div>
  );
}

export default function ProductImage({ seed = "product", className = "", label, iconSize = 42 }) {
  const [errored, setErrored] = useState(false);
  const photoId = resolvePhotoId(seed);

  if (photoId && !errored) {
    return (
      <img
        src={unsplashUrl(photoId, { w: 900, q: 80 })}
        alt={label || "Product photo"}
        loading="lazy"
        onError={() => setErrored(true)}
        className={`object-cover ${className}`}
      />
    );
  }

  return <GradientFallback seed={seed} label={label} className={className} iconSize={iconSize} />;
}
