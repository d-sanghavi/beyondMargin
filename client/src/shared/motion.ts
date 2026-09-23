import type { Transition, Variants } from 'framer-motion'

export const EASE_OUT: Transition = { duration: 0.22, ease: [0.16, 1, 0.3, 1] }
export const SPRING_SHEET: Transition = { type: 'spring', stiffness: 380, damping: 34 }

/** Screen slide transitions. `reduce` swaps to a plain fade. */
export function pageVariants(reduce: boolean, dir: 1 | -1 = 1): Variants {
  if (reduce) {
    return {
      initial: { opacity: 0 },
      animate: { opacity: 1, transition: { duration: 0.12 } },
      exit: { opacity: 0, transition: { duration: 0.08 } },
    }
  }
  return {
    initial: { opacity: 0, x: 40 * dir },
    animate: { opacity: 1, x: 0, transition: EASE_OUT },
    exit: { opacity: 0, x: -40 * dir, transition: { duration: 0.16 } },
  }
}

/** Staggered list container + item. */
export function staggerContainer(reduce: boolean, stagger = 0.07): Variants {
  return {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : stagger } },
  }
}

export function staggerItem(reduce: boolean): Variants {
  if (reduce) {
    return { hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.12 } } }
  }
  return {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: EASE_OUT },
  }
}

/** Press feedback for tappable elements. */
export const pressProps = (reduce: boolean) =>
  reduce ? {} : { whileTap: { scale: 0.97 }, transition: { duration: 0.08 } }
