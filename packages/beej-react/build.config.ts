import path from "node:path";
import url from "node:url";
import { defineBuildConfig } from "unbuild";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

export default defineBuildConfig({
  entries: ["cli/main"],
  clean: true,
  rollup: {
    inlineDependencies: true,
    esbuild: {
      target: "node18",
      minify: true,
    },
  },
  alias: {
    prompts: "prompts/lib/index.js",
  },
  hooks: {
    "rollup:options"(_ctx, options) {
      options.plugins = [options.plugins];
    },
  },
});
