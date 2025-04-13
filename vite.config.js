import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        allowedHosts: [
            "d3b3-41-186-100-174.ngrok-free.app",
            "18c9-41-186-100-174.ngrok-free.app",
        ],
    },
});
