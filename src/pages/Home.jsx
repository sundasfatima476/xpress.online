import { Link } from "react-router-dom";
import { FiArrowRight, FiTruck, FiShield, FiRefreshCw, FiHeadphones } from "react-icons/fi";
import ProductImage from "../components/ProductImage";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import SectionHeading from "../components/SectionHeading";
import Newsletter from "../components/Newsletter";
import { categories } from "../data/categories";
import { products } from "../data/products";

const BENEFITS = [
  { icon: FiTruck, title: "Free Shipping", text: "On all orders over $50" },
  { icon: FiShield, title: "Secure Payment", text: "100% protected checkout" },
  { icon: FiRefreshCw, title: "Easy Returns", text: "30-day return window" },
  { icon: FiHeadphones, title: "24/7 Support", text: "Here whenever you need us" },
];

export default function Home() {
  const featured = products.filter((p) => p.bestSeller).slice(0, 8);
  const newArrivals = products.filter((p) => p.isNew).slice(0, 4);

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-forest overflow-hidden">
        <div className="container-app grid lg:grid-cols-2 items-center gap-10 py-16 md:py-24 lg:py-28">
          <div className="relative z-10 order-2 lg:order-1">
            <p className="eyebrow text-gold-light mb-4">Fall / Winter Collection</p>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif text-ivory leading-[1.08] mb-6">
              Elevate Your <br className="hidden sm:block" /> Everyday Style
            </h1>
            <p className="text-ivory/70 text-base md:text-lg max-w-md mb-9 leading-relaxed">
              Considered wardrobe staples cut from premium fabrics — designed to move
              through your day with quiet, effortless confidence.
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <Link to="/shop" className="btn-gold">
                Shop Now <FiArrowRight size={14} />
              </Link>
              <Link to="/about" className="btn text-ivory border border-ivory/30 hover:bg-ivory/10">
                Our Story
              </Link>
            </div>
          </div>
          <div className="relative order-1 lg:order-2">
            <div className="aspect-[4/5] max-w-md mx-auto lg:ml-auto lg:mr-0 relative">
              <ProductImage seed="hero-campaign" className="w-full h-full" iconSize={64} />
              <div className="absolute -bottom-5 -left-5 bg-softwhite p-4 shadow-soft hidden sm:flex items-center gap-3 max-w-[220px]">
                <ProductImage seed="hero-detail" className="w-14 h-14 shrink-0" iconSize={20} />
                <div>
                  <p className="text-xs font-medium text-charcoal">Classic Oversized Jacket</p>
                  <p className="text-xs text-forest font-medium mt-0.5">$189.00</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-charcoal/10">
        <div className="container-app py-10 md:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex flex-col items-center text-center md:flex-row md:text-left gap-3">
                <div className="w-11 h-11 rounded-full bg-beige flex items-center justify-center shrink-0">
                  <b.icon className="text-forest" size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal">{b.title}</p>
                  <p className="text-xs text-charcoal/55 mt-0.5">{b.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by category */}
      <section className="container-app py-16 md:py-24">
        <SectionHeading
          eyebrow="Curated Edits"
          title="Shop By Category"
          subtitle="Explore our edit of tailored essentials, organized for effortless discovery."
        />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((c) => (
            <CategoryCard key={c.slug} category={c} />
          ))}
        </div>
      </section>

      {/* Promo Banner */}
      <section className="bg-charcoal relative overflow-hidden">
        <div className="container-app grid lg:grid-cols-2 items-center gap-10 py-16 md:py-20">
          <div className="aspect-[4/3] order-2 lg:order-1">
            <ProductImage seed="promo-banner" className="w-full h-full" iconSize={56} />
          </div>
          <div className="order-1 lg:order-2 text-ivory">
            <p className="eyebrow text-gold-light mb-4">Limited Edition</p>
            <h2 className="text-3xl md:text-4xl font-serif mb-5 leading-tight">
              The Winter Layering Edit
            </h2>
            <p className="text-ivory/65 mb-8 max-w-md leading-relaxed">
              Considered outerwear and knitwear built for the season ahead — refined
              silhouettes, natural fibers, made to last well beyond one winter.
            </p>
            <Link to="/shop?filter=new" className="btn-gold">
              Explore Collection <FiArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-app py-16 md:py-24">
        <SectionHeading
          eyebrow="Best Sellers"
          title="Featured Products"
          subtitle="Our most-loved pieces, chosen by our community for their fit, feel and finish."
        />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Link to="/shop" className="btn-outline">
            View All Products <FiArrowRight size={14} />
          </Link>
        </div>
      </section>

      {/* Promotional cards */}
      <section className="container-app pb-16 md:pb-24">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            { title: "New Collection", text: "Just landed", to: "/shop?filter=new", seed: "promo-1" },
            { title: "Best Sellers", text: "Community favorites", to: "/shop?filter=bestsellers", seed: "promo-2" },
            { title: "Seasonal Sale", text: "Up to 25% off", to: "/shop?filter=sale", seed: "promo-3" },
          ].map((p) => (
            <Link key={p.title} to={p.to} className="group relative block overflow-hidden aspect-[5/3]">
              <ProductImage seed={p.seed} className="w-full h-full transition-transform duration-500 group-hover:scale-105" iconSize={32} />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-5">
                <p className="eyebrow text-gold-light mb-1">{p.text}</p>
                <h3 className="font-serif text-xl text-ivory">{p.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* New Arrivals strip */}
      {newArrivals.length > 0 && (
        <section className="bg-beige/40">
          <div className="container-app py-16 md:py-24">
            <SectionHeading
              eyebrow="Just In"
              title="New Arrivals"
              subtitle="Fresh silhouettes and fabrics, added to the edit this week."
            />
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-10 md:gap-x-6 md:gap-y-14">
              {newArrivals.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      <Newsletter />
    </div>
  );
}
