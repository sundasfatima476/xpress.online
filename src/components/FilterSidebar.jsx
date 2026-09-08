import { useState } from "react";
import { FiChevronDown, FiX } from "react-icons/fi";
import { categories } from "../data/categories";

const SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const COLORS = [
  { name: "Forest", hex: "#173B32" },
  { name: "Charcoal", hex: "#252823" },
  { name: "Sand", hex: "#CDBB9A" },
  { name: "Ivory", hex: "#F7F3EA" },
  { name: "Gold", hex: "#B89A62" },
];
const COLLECTIONS = ["New Arrivals", "Best Sellers", "Seasonal Sale"];

function FilterGroup({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-charcoal/10 py-5">
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between text-sm font-medium text-charcoal"
      >
        {title}
        <FiChevronDown className={`transition-transform ${open ? "rotate-180" : ""}`} size={15} />
      </button>
      {open && <div className="mt-4">{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ filters, setFilters, resultCount }) {
  const toggleArrayFilter = (key, value) => {
    setFilters((prev) => {
      const arr = prev[key] || [];
      return {
        ...prev,
        [key]: arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value],
      };
    });
  };

  const clearAll = () =>
    setFilters({ category: [], size: [], color: [], collection: [], maxPrice: 500, inStock: false, minRating: 0 });

  const hasActive =
    filters.category.length ||
    filters.size.length ||
    filters.color.length ||
    filters.collection.length ||
    filters.inStock ||
    filters.minRating > 0 ||
    filters.maxPrice < 500;

  return (
    <div className="lg:w-64 shrink-0">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-serif text-lg">Filters</h3>
        {hasActive && (
          <button onClick={clearAll} className="text-xs text-forest underline underline-offset-2 flex items-center gap-1">
            <FiX size={12} /> Clear all
          </button>
        )}
      </div>
      {resultCount !== undefined && (
        <p className="text-xs text-charcoal/50 mb-2">{resultCount} results</p>
      )}

      <FilterGroup title="Category">
        <div className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <label key={c.slug} className="flex items-center gap-2.5 text-sm text-charcoal/75 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.category.includes(c.slug)}
                onChange={() => toggleArrayFilter("category", c.slug)}
                className="accent-forest w-3.5 h-3.5"
              />
              {c.name}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Size">
        <div className="flex flex-wrap gap-2">
          {SIZES.map((s) => (
            <button
              key={s}
              onClick={() => toggleArrayFilter("size", s)}
              className={`w-9 h-9 text-xs border transition-colors ${
                filters.size.includes(s)
                  ? "bg-forest text-ivory border-forest"
                  : "border-charcoal/20 text-charcoal/70 hover:border-forest"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Color">
        <div className="flex flex-wrap gap-3">
          {COLORS.map((c) => (
            <button
              key={c.name}
              onClick={() => toggleArrayFilter("color", c.hex)}
              aria-label={c.name}
              className={`w-8 h-8 rounded-full border-2 transition-all ${
                filters.color.includes(c.hex) ? "border-gold scale-110" : "border-charcoal/15"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Price">
        <input
          type="range"
          min="0"
          max="500"
          step="10"
          value={filters.maxPrice}
          onChange={(e) => setFilters((prev) => ({ ...prev, maxPrice: Number(e.target.value) }))}
          className="w-full accent-forest"
        />
        <div className="flex items-center justify-between text-xs text-charcoal/60 mt-2">
          <span>$0</span>
          <span className="font-medium text-forest">Up to ${filters.maxPrice}</span>
        </div>
      </FilterGroup>

      <FilterGroup title="Collection">
        <div className="flex flex-col gap-2.5">
          {COLLECTIONS.map((c) => (
            <label key={c} className="flex items-center gap-2.5 text-sm text-charcoal/75 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.collection.includes(c)}
                onChange={() => toggleArrayFilter("collection", c)}
                className="accent-forest w-3.5 h-3.5"
              />
              {c}
            </label>
          ))}
        </div>
      </FilterGroup>

      <FilterGroup title="Availability">
        <label className="flex items-center gap-2.5 text-sm text-charcoal/75 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStock}
            onChange={() => setFilters((prev) => ({ ...prev, inStock: !prev.inStock }))}
            className="accent-forest w-3.5 h-3.5"
          />
          In Stock Only
        </label>
      </FilterGroup>

      <FilterGroup title="Rating" defaultOpen={false}>
        <div className="flex flex-col gap-2.5">
          {[4, 3, 2].map((r) => (
            <label key={r} className="flex items-center gap-2.5 text-sm text-charcoal/75 cursor-pointer">
              <input
                type="radio"
                name="rating"
                checked={filters.minRating === r}
                onChange={() => setFilters((prev) => ({ ...prev, minRating: r }))}
                className="accent-forest w-3.5 h-3.5"
              />
              {r}+ Stars
            </label>
          ))}
        </div>
      </FilterGroup>
    </div>
  );
}
