// Brand logomark: a circular badge with a crescent swoosh and a shopping
// bag glyph — the same composition style as the brand's reference mark,
// recolored into the site's Forest Green / Champagne Gold palette instead
// of the original orange/navy so it reads as part of this design system.

export default function Logo({ size = 36, className = "" }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      className={className}
      role="img"
      aria-label="Maison Noir logomark"
    >
      <circle cx="32" cy="32" r="31" fill="#FCFBF8" stroke="#E8DFD0" strokeWidth="1" />
      {/* Gold crescent */}
      <path
        d="M42 8a24 24 0 1 0 0 48 24 24 0 0 1 0-48z"
        fill="#B89A62"
        opacity="0.9"
      />
      {/* Forest crescent, offset to create the swoosh overlap */}
      <path
        d="M27 10a22 22 0 1 0 0 44 22 22 0 0 1 0-44z"
        fill="#173B32"
      />
      {/* Shopping bag glyph */}
      <g transform="translate(20.5, 21)">
        <path
          d="M4 6h15l-1.4 15.5A2 2 0 0 1 15.6 23H6.4a2 2 0 0 1-2-1.5L3 6z"
          fill="none"
          stroke="#F7F3EA"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="M7 6V4.5a4.5 4.5 0 0 1 9 0V6"
          fill="none"
          stroke="#F7F3EA"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
