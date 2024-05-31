import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';

import 'dotenv/config';
const port = process.env.PORT || 5001;

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port,
    },
});
