import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import crossOriginIsolated from 'vite-plugin-cross-origin-isolation'

// https://vitejs.dev/config/
export default defineConfig({
    // build: {
    //     outDir: './ui',
    //     emptyOutDir: true,
    // },
    server: {
        watch: {
            usePolling: true
        },
        cors: {
            origin: '*',
            allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
        },
    },
    base: '/sidebar/ui/',
    plugins: [
        react(),
        // crossOriginIsolated(),
        {
            name: "configure-response-headers",
            configureServer: (server) => {
                server.middlewares.use((_req, res, next) => {
                    res.setHeader('Access-Control-Allow-Origin', '*')
                    // res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
                    // res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
                    next();
                });
            },
        },
    ]
})
