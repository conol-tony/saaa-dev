import { defineConfig } from '@tanstack/react-start/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  srcDirectory: 'app',
  vite: {
    plugins: [tailwindcss()],
  },
  server: {
    preset: 'cloudflare-workers',
  },
})
