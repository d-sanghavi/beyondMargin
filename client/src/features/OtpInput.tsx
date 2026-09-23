import { useEffect, useRef, useState } from 'react'

export function OtpInput({
  length = 6,
  onComplete,
}: {
  length?: number
  onComplete?: (code: string) => void
}) {
  const [values, setValues] = useState<string[]>(Array(length).fill(''))
  const refs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    refs.current[0]?.focus()
  }, [])

  const set = (i: number, v: string) => {
    const digit = v.replace(/\D/g, '').slice(-1)
    const next = [...values]
    next[i] = digit
    setValues(next)
    if (digit && i < length - 1) refs.current[i + 1]?.focus()
    if (next.every((d) => d !== '')) onComplete?.(next.join(''))
  }

  const onKey = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !values[i] && i > 0) refs.current[i - 1]?.focus()
  }

  return (
    <div className="flex justify-center gap-2">
      {values.map((v, i) => (
        <input
          key={i}
          ref={(el) => (refs.current[i] = el)}
          value={v}
          inputMode="numeric"
          maxLength={1}
          aria-label={`Digit ${i + 1}`}
          onChange={(e) => set(i, e.target.value)}
          onKeyDown={(e) => onKey(i, e)}
          className="h-14 w-11 rounded-btn border-2 border-rule bg-white text-center text-xl font-bold text-navy outline-none focus:border-saffron"
        />
      ))}
    </div>
  )
}
