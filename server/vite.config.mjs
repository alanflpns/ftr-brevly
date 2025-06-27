import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    setupFiles: ["./src/test/global-setup.ts"],
    maxConcurrency: 1,
    isolate: true,
  },
});
