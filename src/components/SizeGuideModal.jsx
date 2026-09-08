import Modal from "./Modal";

const MEN_SIZES = [
  { size: "S", chest: "36-38", waist: "30-32", hip: "36-38", intl: "EU 46 / UK 36" },
  { size: "M", chest: "39-41", waist: "33-35", hip: "39-41", intl: "EU 48-50 / UK 38" },
  { size: "L", chest: "42-44", waist: "36-38", hip: "42-44", intl: "EU 52 / UK 40" },
  { size: "XL", chest: "45-47", waist: "39-41", hip: "45-47", intl: "EU 54 / UK 42" },
  { size: "XXL", chest: "48-50", waist: "42-44", hip: "48-50", intl: "EU 56 / UK 44" },
];

const WOMEN_SIZES = [
  { size: "XS", chest: "31-32", waist: "24-25", hip: "34-35", intl: "EU 32 / UK 4" },
  { size: "S", chest: "33-34", waist: "26-27", hip: "36-37", intl: "EU 34-36 / UK 6-8" },
  { size: "M", chest: "35-36", waist: "28-29", hip: "38-39", intl: "EU 38 / UK 10" },
  { size: "L", chest: "37-39", waist: "30-32", hip: "40-42", intl: "EU 40-42 / UK 12-14" },
  { size: "XL", chest: "40-42", waist: "33-35", hip: "43-45", intl: "EU 44 / UK 16" },
];

function SizeTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-charcoal/15 text-left">
            <th className="py-2.5 pr-4 font-medium uppercase text-xs tracking-widest2 text-charcoal/60">Size</th>
            <th className="py-2.5 pr-4 font-medium uppercase text-xs tracking-widest2 text-charcoal/60">Chest (in)</th>
            <th className="py-2.5 pr-4 font-medium uppercase text-xs tracking-widest2 text-charcoal/60">Waist (in)</th>
            <th className="py-2.5 pr-4 font-medium uppercase text-xs tracking-widest2 text-charcoal/60">Hip (in)</th>
            <th className="py-2.5 font-medium uppercase text-xs tracking-widest2 text-charcoal/60">Intl.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.size} className="border-b border-charcoal/8">
              <td className="py-2.5 pr-4 font-medium text-forest">{r.size}</td>
              <td className="py-2.5 pr-4 text-charcoal/70">{r.chest}</td>
              <td className="py-2.5 pr-4 text-charcoal/70">{r.waist}</td>
              <td className="py-2.5 pr-4 text-charcoal/70">{r.hip}</td>
              <td className="py-2.5 text-charcoal/70">{r.intl}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SizeGuideContent() {
  return (
    <div className="space-y-10">
      <div>
        <h4 className="eyebrow mb-4">Men's Sizes</h4>
        <SizeTable rows={MEN_SIZES} />
      </div>
      <div>
        <h4 className="eyebrow mb-4">Women's Sizes</h4>
        <SizeTable rows={WOMEN_SIZES} />
      </div>
      <div>
        <h4 className="eyebrow mb-4">How to Measure</h4>
        <ul className="space-y-3 text-sm text-charcoal/70">
          <li>
            <span className="font-medium text-charcoal">Chest — </span>
            Measure around the fullest part of your chest, keeping the tape horizontal.
          </li>
          <li>
            <span className="font-medium text-charcoal">Waist — </span>
            Measure around your natural waistline, at the narrowest point.
          </li>
          <li>
            <span className="font-medium text-charcoal">Hip — </span>
            Measure around the fullest part of your hips, roughly 8" below your waist.
          </li>
        </ul>
      </div>
      <div className="bg-beige p-5 text-sm text-charcoal/70">
        Between sizes, or unsure? Our stylists recommend sizing up for a relaxed fit and down for a tailored fit.
        Reach out via <a href="/contact" className="text-forest underline underline-offset-2">Contact</a> for personal sizing help.
      </div>
    </div>
  );
}

export default function SizeGuideModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Size Guide" maxWidth="max-w-3xl">
      <SizeGuideContent />
    </Modal>
  );
}
