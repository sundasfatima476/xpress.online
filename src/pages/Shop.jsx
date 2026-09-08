import { useMemo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { FiFilter, FiX } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import FilterSidebar from "../components/FilterSidebar";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";

const DEFAULT_FILTERS = {
  category: [],
  size: [],
  color: [],
  collection: [],
  maxPrice: 500,
  inStock: false,
  minRating: 0,
};

const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
  { value: "newest", label: "Newest" },
];

export default function Shop() {
  const [searchParams] = useSearchParams();
  const urlFilter = searchParams.get("filter");
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("featured");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  useEffect(() => {
    if (urlFilter === "new") setFilters((f) => ({ ...f, collection: ["New Arrivals"] }));
    else if (urlFilter === "bestsellers") setFilters((f) => ({ ...f, collection: ["Best Sellers"] }));
    else if (urlFilter === "sale") setFilters((f) => ({ ...f, collection: ["Seasonal Sale"] }));
  }, [urlFilter]);

  const filtered = useMemo(() => {
    let result = products.filter((p) => {
      if (filters.category.length && !filters.category.includes(p.category) && !filters.category.includes(p.gender)) return false;
      if (filters.size.length && !p.sizes.some((s) => filters.size.includes(s))) return false;
      if (filters.color.length && !p.colors.some((c) => filters.color.includes(c))) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStock && p.stock <= 0) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      if (filters.collection.length) {
        const matchesNew = filters.collection.includes("New Arrivals") && p.isNew;
        const matchesBest = filters.collection.includes("Best Sellers") && p.bestSeller;
        const matchesSale = filters.collection.includes("Seasonal Sale") && p.discount > 0;
        if (!matchesNew && !matchesBest && !matchesSale) return false;
      }
      return true;
    });

    switch (sort) {
      case "price-asc":
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = [...result].sort((a, b) => (b.isNew === a.isNew ? 0 : b.isNew ? 1 : -1));
        break;
      default:
        break;
    }
    return result;
  }, [filters, sort]);

  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Shop" }]} />
      <div className="flex flex-wrap items-end justify-between gap-4 mt-3 mb-8">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl">All Products</h1>
          <p className="text-charcoal/55 text-sm mt-2">{filtered.length} products</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileFiltersOpen(true)}
            className="lg:hidden btn-ghost !px-4 !py-2.5"
          >
            <FiFilter size={14} /> Filters
          </button>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="input-field !py-2.5 !w-auto text-xs uppercase tracking-wide cursor-pointer"
            aria-label="Sort products"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                Sort: {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex gap-10">
        <div className="hidden lg:block">
          <FilterSidebar filters={filters} setFilters={setFilters} resultCount={filtered.length} />
        </div>

        <div className="flex-1 min-w-0">
          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-serif text-2xl mb-2">No products found</p>
              <p className="text-charcoal/55 text-sm">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-[70] lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setMobileFiltersOpen(false)} />
          <div className="absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-softwhite overflow-y-auto animate-slide-in p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-serif text-xl">Filters</h3>
              <button onClick={() => setMobileFiltersOpen(false)} aria-label="Close filters">
                <FiX size={20} />
              </button>
            </div>
            <FilterSidebar filters={filters} setFilters={setFilters} resultCount={filtered.length} />
            <button onClick={() => setMobileFiltersOpen(false)} className="btn-primary w-full mt-4">
              Show {filtered.length} Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
