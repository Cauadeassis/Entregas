import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import SERVER_PORT from '../backend/src/server'

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/users': `http://localhost:${SERVER_PORT}`,
            '/sessions': `http://localhost:${SERVER_PORT}`,
            '/deliveries': `http://localhost:${SERVER_PORT}`,
        }
    }
})
