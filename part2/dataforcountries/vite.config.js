import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    // Pass the environment variable to your app
    'process.env.VITE_WEATHER_KEY': JSON.stringify(process.env.VITE_WEATHER_KEY),
  },
})
