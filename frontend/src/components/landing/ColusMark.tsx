interface ColusMarkProps {
  className?: string;
  compact?: boolean;
}

export function ColusMark({ className = "", compact = false }: ColusMarkProps) {
  return (
    <svg
      viewBox="0 0 320 260"
      role="img"
      aria-label="Símbolo derivado da identidade COLUS"
      className={className}
    >
      <g fill="#F18136">
        {[44, 83, 128, 192, 237, 276].map((x, index) => (
          <circle key={x} cx={x} cy={58 + (index % 3) * 12} r={compact ? 5 : 7} />
        ))}
        <circle cx="160" cy="94" r={compact ? 24 : 31} />
        <rect x="150" y="116" width="20" height={compact ? 48 : 58} rx="10" />
      </g>
      <path
        d="M28 172 C72 150 112 153 154 180 C116 182 83 195 48 222 C39 206 32 190 28 172 Z"
        fill="#0C5898"
      />
      <path
        d="M292 172 C248 150 208 153 166 180 C204 182 237 195 272 222 C281 206 288 190 292 172 Z"
        fill="#1274B8"
      />
    </svg>
  );
}
