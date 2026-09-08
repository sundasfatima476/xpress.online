import Breadcrumb from "../components/Breadcrumb";
import { SizeGuideContent } from "../components/SizeGuideModal";

export default function SizeGuide() {
  return (
    <div className="container-app py-8 md:py-10">
      <Breadcrumb items={[{ label: "Size Guide" }]} />
      <div className="text-center max-w-xl mx-auto mt-6 mb-14">
        <p className="eyebrow mb-3">Fit Reference</p>
        <h1 className="font-serif text-3xl md:text-4xl mb-4">Size Guide</h1>
        <p className="text-charcoal/60 text-sm">
          Find your perfect fit with our detailed measurements and conversion charts.
        </p>
      </div>
      <div className="max-w-3xl mx-auto">
        <SizeGuideContent />
      </div>
    </div>
  );
}
