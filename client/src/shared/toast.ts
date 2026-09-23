import { create } from 'zustand'

export interface ToastItem {
  id: number
  message: string
  tone?: 'default' | 'success'
}

interface ToastState {
  toasts: ToastItem[]
  show: (message: string, tone?: 'default' | 'success') => void
  remove: (id: number) => void
}

let counter = 0

export const useToast = create<ToastState>((set) => ({
  toasts: [],
  show: (message, tone = 'default') => {
    const id = ++counter
    set((s) => ({ toasts: [...s.toasts, { id, message, tone }] }))
    setTimeout(() => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })), 2600)
  },
  remove: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
