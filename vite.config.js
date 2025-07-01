import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss(),],
  define: {
    // Define the API base URL for the application
    __API_BASE_URL__: JSON.stringify(process.env.VITE_API_BASE_URL || 'http://192.168.1.109:8000/api'),
  },
  server:{
    proxy:{
      '/api': {
        target: 'http://192.168.1.150:8000/',
        changeOrigin: true,
        headers:{
          Accept: 'application/json',
          "Content-Type": 'application/json',
        }
      }
    }
  }
})
