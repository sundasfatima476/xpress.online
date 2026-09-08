export default function SectionHeading({ eyebrow, title, subtitle, align = "center", light = false }) {
  return (
    <div className={`max-w-2xl mb-10 md:mb-14 ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <p className={`eyebrow mb-3 ${light ? "text-gold-light" : ""}`}>{eyebrow}</p>
      )}
      <h2 className={`text-3xl md:text-[2.6rem] leading-tight ${light ? "text-ivory" : "text-charcoal"}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`mt-4 text-sm md:text-base ${light ? "text-ivory/70" : "text-charcoal/60"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
