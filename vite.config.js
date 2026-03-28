import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Needed for GitHub Pages project sites: https://<user>.github.io/<repo>/
  base: '/movie-explorer-react/',
  plugins: [react()],
})
