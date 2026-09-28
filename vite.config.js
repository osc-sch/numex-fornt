import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '^/api/diagnostic$': {
        target: 'https://osc-sch.app.n8n.cloud',
        changeOrigin: true,
        rewrite: () => '/webhook-test/crear_actividades',
      },
      '^/api/test-correction$': {
        target: 'https://osc-sch.app.n8n.cloud',
        changeOrigin: true,
        rewrite: () => '/webhook-test/corregir_test',
      },
    },
  },
})
