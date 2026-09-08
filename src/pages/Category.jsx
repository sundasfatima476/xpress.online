import { useMemo, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumb";
import ProductCard from "../components/ProductCard";
import FilterSidebar from "../components/FilterSidebar";
import { getCategoryBySlug } from "../data/categories";
import { getProductsByCategory } from "../data/products";

const DEFAULT_FILTERS = {
  category: [],
  size: [],
  color: [],
  collection: [],
  maxPrice: 500,
  inStock: false,
  minRating: 0,
};

export default function Category() {
  const { category: slug } = useParams();
  const category = getCategoryBySlug(slug);
  const [filters, setFilters] = useState(DEFAULT_FILTERS);

  const products = useMemo(() => {
    const base = getProductsByCategory(slug);
    return base.filter((p) => {
      if (filters.size.length && !p.sizes.some((s) => filters.size.includes(s))) return false;
      if (filters.color.length && !p.colors.some((c) => filters.color.includes(c))) return false;
      if (p.price > filters.maxPrice) return false;
      if (filters.inStock && p.stock <= 0) return false;
      if (filters.minRating && p.rating < filters.minRating) return false;
      return true;
    });
  }, [slug, filters]);

  if (!category) {
    return (
      <div className="container-app py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Category not found</h1>
        <Link to="/shop" className="btn-primary inline-flex">
          Browse All Products
        </Link>
      </div>
    );
  }

  return (
    <div>
      <section className="bg-forest text-ivory py-14 md:py-16">
        <div className="container-app">
          <p className="eyebrow text-gold-light mb-3">Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl mb-3">{category.name}</h1>
          <p className="text-ivory/65 max-w-lg">{category.description}</p>
        </div>
      </section>

      <div className="container-app py-8 md:py-10">
        <Breadcrumb items={[{ label: "Shop", to: "/shop" }, { label: category.name }]} />
        <p className="text-charcoal/55 text-sm mt-3 mb-8">{products.length} products</p>

        <div className="flex gap-10">
          <div className="hidden lg:block">
            <FilterSidebar filters={filters} setFilters={setFilters} resultCount={products.length} />
          </div>
          <div className="flex-1 min-w-0">
            {products.length === 0 ? (
              <div className="text-center py-24">
                <p className="font-serif text-2xl mb-2">No products found</p>
                <p className="text-charcoal/55 text-sm">Try adjusting your filters to see more results.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
