import { Link } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";

export default function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs">
      <ol className="flex items-center flex-wrap gap-1.5 text-charcoal/50">
        <li>
          <Link to="/" className="hover:text-forest transition-colors">
            Home
          </Link>
        </li>
        {items.map((item, idx) => (
          <li key={idx} className="flex items-center gap-1.5">
            <FiChevronRight size={12} />
            {item.to ? (
              <Link to={item.to} className="hover:text-forest transition-colors">
                {item.label}
              </Link>
            ) : (
              <span className="text-charcoal">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
