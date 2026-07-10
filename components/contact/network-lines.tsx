export default function NetworkLines() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.15]"
      viewBox="0 0 800 600"
      fill="none"
      aria-hidden="true"
    >
      <line x1="60" y1="120" x2="240" y2="60" stroke="#2fb6c9" strokeWidth="1" />
      <line x1="240" y1="60" x2="420" y2="140" stroke="#2fb6c9" strokeWidth="1" />
      <line x1="420" y1="140" x2="600" y2="70" stroke="#e8c468" strokeWidth="1" />
      <line x1="60" y1="120" x2="180" y2="260" stroke="#2fb6c9" strokeWidth="1" />
      <line x1="600" y1="70" x2="740" y2="200" stroke="#2fb6c9" strokeWidth="1" />
      {[
        [60, 120],
        [240, 60],
        [420, 140],
        [600, 70],
        [180, 260],
        [740, 200],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r="3.5" fill="#6fd4e1" />
      ))}
    </svg>
  );
}