import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { UserConfigExport } from 'vite'

// https://vite.dev/config/
const config: UserConfigExport = defineConfig({
  plugins: [react()],
  server:{port:5173}
})

export default config
