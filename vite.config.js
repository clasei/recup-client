import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // added to fix issue wit jwt-token, forcing to export default -- works just fine
  optimizeDeps: {
    include: ["jwt-decode"],
  },
})
