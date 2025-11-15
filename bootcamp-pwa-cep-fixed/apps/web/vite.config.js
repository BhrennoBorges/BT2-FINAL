import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // caminhos relativos funcionam bem em GitHub Pages (/BT2-FINAL/)
  base: './'
})
