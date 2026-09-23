import { useEffect, useRef, useState } from 'react'
import { useApp } from '../store/useApp'

/** Simulated network/AI delay — the prototype never hits a real API. */
export function delay(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms))
}

/** Read the global reduce-motion flag. */
export function useReduceMotion(): boolean {
  return useApp((s) => s.reduceMotion)
}

/** Animate a number from a previous value to `value`. Snaps instantly when reduce-motion is on. */
export function useAnimatedNumber(value: number, duration = 700): number {
  const reduce = useReduceMotion()
  const [display, setDisplay] = useState(value)
  const fromRef = useRef(value)
  const rafRef = useRef<number>()

  useEffect(() => {
    if (reduce) {
      setDisplay(value)
      fromRef.current = value
      return
    }
    const from = fromRef.current
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - t, 3) // easeOutCubic
      setDisplay(from + (value - from) * eased)
      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        fromRef.current = value
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      fromRef.current = value
    }
  }, [value, duration, reduce])

  return display
}

/** Run an async "loading" phase that resolves after ms, returning a boolean loading flag. */
export function useSimulatedLoad(ms: number, deps: unknown[] = []): boolean {
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    let alive = true
    setLoading(true)
    const id = setTimeout(() => alive && setLoading(false), ms)
    return () => {
      alive = false
      clearTimeout(id)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
  return loading
}
