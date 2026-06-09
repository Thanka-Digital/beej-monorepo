import { defineConfig } from "tsup";
import { promises as fs } from "node:fs";
import path from "node:path";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  clean: true,
  minify: true,
  shims: true,

  async onSuccess() {
    const srcDir = path.resolve(__dirname, "templates");
    const destDir = path.resolve(__dirname, "dist/templates");

    try {
      await fs.mkdir(destDir, { recursive: true });
      await fs.cp(srcDir, destDir, { recursive: true });
      console.log("⚡ Templates successfully synced to build directory.");
    } catch (err) {
      console.error("❌ Failed to copy templates directory:", err);
    }
  },
});
