import { Link } from "react-router-dom";
import { FiArrowRight, FiFeather, FiGlobe, FiHeart } from "react-icons/fi";
import ProductImage from "../components/ProductImage";
import SectionHeading from "../components/SectionHeading";

const VALUES = [
  {
    icon: FiFeather,
    title: "Considered Craft",
    text: "Every piece is developed over multiple seasons with mills and makers we've worked with for years.",
  },
  {
    icon: FiGlobe,
    title: "Responsible Sourcing",
    text: "We prioritize natural fibers, low-impact dyes, and manufacturing partners who share our standards.",
  },
  {
    icon: FiHeart,
    title: "Made to Last",
    text: "We design for longevity — timeless silhouettes over trend, quality over quantity.",
  },
];

export default function About() {
  return (
    <div>
      <section className="relative bg-forest">
        <div className="container-app py-20 md:py-28 text-center">
          <p className="eyebrow text-gold-light mb-4">Our Story</p>
          <h1 className="font-serif text-4xl md:text-6xl text-ivory max-w-3xl mx-auto leading-tight">
            Fashion, Made With Intention
          </h1>
        </div>
      </section>

      <section className="container-app py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="aspect-[4/5]">
          <ProductImage seed="about-studio" className="w-full h-full" iconSize={56} />
        </div>
        <div>
          <p className="eyebrow mb-4">Since 2016</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
            Built on the belief that style shouldn't cost the earth — or your wardrobe's longevity.
          </h2>
          <p className="text-charcoal/65 leading-relaxed mb-5">
            Maison Noir began in a small studio with a simple idea: create clothing that
            feels as good as it looks, built from fabrics chosen for how they age, not
            just how they photograph.
          </p>
          <p className="text-charcoal/65 leading-relaxed">
            A decade later, that idea still guides every collection — considered silhouettes,
            natural materials, and a quiet, confident aesthetic that moves easily from
            day to evening, season to season.
          </p>
        </div>
      </section>

      <section className="bg-beige/40 py-16 md:py-24">
        <div className="container-app">
          <SectionHeading
            eyebrow="What We Stand For"
            title="Our Values"
            subtitle="The principles that shape every decision, from fabric sourcing to final stitch."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {VALUES.map((v) => (
              <div key={v.title} className="text-center">
                <div className="w-14 h-14 rounded-full bg-softwhite flex items-center justify-center mx-auto mb-5">
                  <v.icon className="text-forest" size={22} />
                </div>
                <h3 className="font-serif text-xl mb-3">{v.title}</h3>
                <p className="text-charcoal/60 text-sm leading-relaxed max-w-xs mx-auto">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-16 md:py-24 grid lg:grid-cols-2 gap-12 items-center">
        <div className="order-2 lg:order-1">
          <p className="eyebrow mb-4">Our Promise</p>
          <h2 className="font-serif text-3xl md:text-4xl mb-6 leading-tight">
            Quality You Can Feel, From the First Wear to the Hundredth
          </h2>
          <p className="text-charcoal/65 leading-relaxed mb-8">
            We test every fabric for durability, softness, and drape before it earns a place
            in our collections. If it doesn't meet our standard, it doesn't make the cut.
          </p>
          <Link to="/shop" className="btn-primary">
            Explore The Collection <FiArrowRight size={14} />
          </Link>
        </div>
        <div className="aspect-[4/5] order-1 lg:order-2">
          <ProductImage seed="about-quality" className="w-full h-full" iconSize={56} />
        </div>
      </section>
    </div>
  );
}
