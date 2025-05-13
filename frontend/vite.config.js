import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,  // Permite conexiones externas
    port: 5173,
    proxy: {
      '/api': {  // Todas las rutas que empiecen con "/api"
        target: 'http://backend:5000',  // Nombre del servicio backend en Docker
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  // Opcional: elimina "/api" al enviar la petición
      },
    },
  },
});
