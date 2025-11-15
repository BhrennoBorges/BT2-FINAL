import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// nome exato do repositório no GitHub Pages
const repoName = 'BT2-FINAL'

export default defineConfig({
  plugins: [react()],
  base: `/${repoName}/`
})
