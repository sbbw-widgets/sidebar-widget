import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    build: {
        outDir: './ui',
        emptyOutDir: true,
    },
    server: {
        watch: {
            usePolling: true,
        },
        cors: {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        },
    },
    base: '/sidebar/ui/',
    plugins: [react()],
})
