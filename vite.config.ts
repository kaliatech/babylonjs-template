import { defineConfig } from "vite";

import viteBasicSslPlugin from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteBasicSslPlugin(),
  ],  
  server: {
    port: 3443,
    https: true,
    // Uncomment to allow access from network
    // (or use `npm run dev -- -- host=0.0.0.0`)
    //host: "0.0.0.0",
  }
});
