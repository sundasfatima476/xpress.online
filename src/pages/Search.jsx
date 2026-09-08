import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { searchProducts, products } from "../data/products";

const DEFAULT_FILTERS = {
  category: [],
  size: [],
  color: [],
  collection: [],
  maxPrice: 500,
  inStock: false,
  minRating: 0,
};

const SUGGESTIONS = ["Jacket", "T-Shirt", "Dress", "Sneakers", "Denim", "Sweater"];

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") || "";
  const [inputValue, setInputValue] = useState(q);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [sort, setSort] = useState("featured");

  useEffect(() => setInputValue(q), [q]);

  const results = useMemo(() => {
    let base = searchProducts(q);
    base = base.filter((p) => {
      if (filters.size.length && !p.sizes.some((s) => filters.size.includes(s))) return false;
      if (filters.color.length && !p.colors.some((c) => filters.color.includes(c))) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStock && p.stock <= 0) return false;
      return true;
    });
    if (sort === "price-asc") base = [...base].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") base = [...base].sort((a, b) => b.price - a.price);
    if (sort === "rating") base = [...base].sort((a, b) => b.rating - a.rating);
    return base;
  }, [q, filters, sort]);

  const recommended = products.filter((p) => p.bestSeller).slice(0, 4);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchParams(inputValue ? { q: inputValue } : {});
  };

  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Search" }]} />
      <form onSubmit={handleSubmit} className="max-w-xl mt-4 mb-8">
        <div className="flex items-center gap-3 border-b-2 border-charcoal/20 focus-within:border-forest pb-2">
          <FiSearch className="text-charcoal/40" size={20} />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Search for products, categories..."
            className="flex-1 bg-transparent text-lg focus:outline-none font-serif"
          />
        </div>
        {!q && (
          <div className="flex flex-wrap gap-2 mt-4">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => {
                  setInputValue(s);
                  setSearchParams({ q: s });
                }}
                className="text-xs px-3.5 py-2 border border-charcoal/15 text-charcoal/70 hover:border-forest hover:text-forest transition-colors"
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </form>

      {q && (
        <>
          <p className="text-charcoal/55 text-sm mb-8">
            {results.length} results for "<span className="text-charcoal">{q}</span>"
          </p>

          {results.length === 0 ? (
            <div className="text-center py-14 mb-14 border-y border-charcoal/10">
              <p className="font-serif text-2xl mb-2">No products found</p>
              <p className="text-charcoal/55 text-sm">
                We couldn't find anything matching "{q}". Try a different search term.
              </p>
            </div>
          ) : (
            <div className="flex gap-10 mb-16">
              <div className="hidden lg:block">
                <FilterSidebar filters={filters} setFilters={setFilters} resultCount={results.length} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-end mb-4">
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="input-field !py-2.5 !w-auto text-xs uppercase tracking-wide"
                  >
                    <option value="featured">Sort: Featured</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
                  {results.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </div>
            </div>
          )}

          {results.length === 0 && (
            <div>
              <h2 className="font-serif text-2xl mb-8">You Might Like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6">
                {recommended.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
