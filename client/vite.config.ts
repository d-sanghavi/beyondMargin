import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// beyondMargin prototype — SIH26091. Client-side only.
export default defineConfig({
  plugins: [react()],
  server: { host: true, port: 5173 },
})
