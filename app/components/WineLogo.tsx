export default function WineLogo() {
  return (
    <svg viewBox="0 0 48 56" className="w-10 h-12">
      <path
        d="M18 4 C18 4 16 6 16 10 L16 14 C14 16 14 20 14 22 L14 50 C14 53 16 54 20 54 L28 54 C32 54 34 53 34 50 L34 22 C34 20 34 16 32 14 L32 10 C32 6 30 4 30 4 Z"
        fill="#4B1D7B"
      />
      <rect x="17" y="32" width="14" height="16" fill="#fff" stroke="#4B1D7B" strokeWidth="1" />
      <text x="24" y="43" textAnchor="middle" fill="#4B1D7B" fontSize="10" fontWeight="bold" fontFamily="serif">Z</text>
      <g transform="translate(36, 4)">
        <circle cx="4" cy="6" r="3" fill="#7E3DB5" />
        <circle cx="8" cy="4" r="3" fill="#7E3DB5" />
        <circle cx="12" cy="6" r="3" fill="#7E3DB5" />
        <circle cx="6" cy="10" r="3" fill="#7E3DB5" />
        <circle cx="10" cy="10" r="3" fill="#7E3DB5" />
        <circle cx="8" cy="14" r="3" fill="#7E3DB5" />
        <path d="M8 2 Q10 0 12 2" stroke="#2E1054" strokeWidth="1.5" fill="none" />
        <path d="M10 1 L12 -1" stroke="#2E1054" strokeWidth="1.5" fill="none" />
      </g>
    </svg>
  );
}
