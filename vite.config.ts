import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Verifique se é esse o nome no seu package.json

export default defineConfig({
  plugins: [react()],
  base: '/bussola2/',
})
