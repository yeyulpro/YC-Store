import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

export default defineConfig({
  build: {
    outDir: "../API/wwwroot",
    chunkSizeWarningLimit: 1024,
    emptyOutDir:true
  },
  server: {
    port: 3004,
    https: true,
  },
  plugins: [react(), mkcert()],
});
