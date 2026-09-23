// A decorative QR-code-style square (not a real QR). Deterministic pattern.
export function QrSquare({ size = 76, seed = 7 }: { size?: number; seed?: number }) {
  const n = 9
  const cells = []
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let y = 0; y < n; y++) {
    for (let x = 0; x < n; x++) {
      const finder =
        (x < 3 && y < 3) || (x > n - 4 && y < 3) || (x < 3 && y > n - 4)
      const on = finder || rand() > 0.5
      if (on) cells.push({ x, y })
    }
  }
  const u = size / n
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rounded-md bg-white p-1" aria-hidden>
      {cells.map((c, i) => (
        <rect key={i} x={c.x * u} y={c.y * u} width={u} height={u} fill="#1F3864" />
      ))}
    </svg>
  )
}
