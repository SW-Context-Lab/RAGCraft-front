import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],

  // vite.config.js
  server: {
  proxy: { "/api": "http://ec2-52-79-194-231.ap-northeast-2.compute.amazonaws.com:8080" }
  }
})

