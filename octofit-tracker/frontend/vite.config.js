import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const codespaceName = env.VITE_CODESPACE_NAME || env.CODESPACE_NAME || process.env.CODESPACE_NAME || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
    },
  }
})
