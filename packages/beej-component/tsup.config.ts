import { defineConfig } from "tsup";
import fs from "fs";
import path from "path";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    button: "src/components/ui/button.tsx",
    checkbox: "src/components/ui/checkbox.tsx",
    radio: "src/components/ui/radio.tsx",
    dialog: "src/components/ui/dialog.tsx",
    tooltip: "src/components/ui/tooltip.tsx",
    input: "src/components/custom/custom-input.tsx",
    select: "src/components/custom/custom-select.tsx",
    textarea: "src/components/custom/custom-textarea.tsx",
    cn: "src/utils/cn.ts",
    plugin: "src/plugin.ts",
  },
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: false,
  splitting: true,
  treeshake: true,
  bundle: true,
  minifyWhitespace: false,
  external: ["react", "react-dom"],
  injectStyle: false,
  onSuccess: async () => {
    const filesToPrefix = [
      "dist/index.js",
      "dist/index.mjs",
      "dist/plugin.js",
      "dist/plugin.mjs",
    ];

    for (const file of filesToPrefix) {
      const filePath = path.resolve(file);
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        if (!content.startsWith('"use client";')) {
          fs.writeFileSync(filePath, `"use client";\n${content}`, "utf8");
        }
      }
    }
  },
});
