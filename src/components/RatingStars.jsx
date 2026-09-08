import { FiStar } from "react-icons/fi";

export default function RatingStars({ rating = 0, reviews, size = 13, showValue = false }) {
  const rounded = Math.round(rating * 2) / 2;
  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
        {[1, 2, 3, 4, 5].map((i) => (
          <FiStar
            key={i}
            size={size}
            className={i <= rounded ? "fill-gold text-gold" : "text-charcoal/20"}
          />
        ))}
      </div>
      {showValue && <span className="text-xs text-charcoal/70">{rating.toFixed(1)}</span>}
      {reviews !== undefined && (
        <span className="text-xs text-charcoal/50">({reviews})</span>
      )}
    </div>
  );
}
