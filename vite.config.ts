import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/bussola2/', // Nome do seu repositório entre barras
  plugins: [react()],
})
