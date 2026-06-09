import { promises as fs } from "node:fs";
import path from "node:path";
import { DependencyConfig } from "./manifest.js";
import { fileURLToPath } from "node:url";

/**
 * Recursively copies a directory's contents to a destination in parallel.
 * @param src The source template directory path
 * @param dest The target project directory path
 */
export async function copyTemplateFiles(
  src: string,
  dest: string,
): Promise<void> {
  await fs.mkdir(dest, { recursive: true });

  const entries = await fs.readdir(src, { withFileTypes: true });

  await Promise.all(
    entries.map(async (entry) => {
      const srcPath = path.join(src, entry.name);
      const destPath = path.join(dest, entry.name);

      if (entry.isDirectory()) {
        await copyTemplateFiles(srcPath, destPath);
      } else {
        await fs.copyFile(srcPath, destPath);
      }
    }),
  );
}

/**
 * Safely updates a target package.json file with new dependencies
 * @param targetPath Path to the generated project package.json
 * @param config Key-value object mapping library names to versions
 */
export async function extendPackageJson(
  targetPath: string,
  config: DependencyConfig,
): Promise<void> {
  const content = await fs.readFile(targetPath, "utf-8");
  const pkg = JSON.parse(content);

  if (config.dependencies) {
    pkg.dependencies = {
      ...(pkg.dependencies || {}),
      ...config.dependencies,
    };
  }

  if (config.devDependencies) {
    pkg.devDependencies = {
      ...(pkg.devDependencies || {}),
      ...config.devDependencies,
    };
  }

  await fs.writeFile(targetPath, JSON.stringify(pkg, null, 2), "utf-8");
}

export function getInternalTemplatePath(relativeTemplatePath: string): string {
  const __dirname = path.dirname(fileURLToPath(import.meta.url));

  return path.resolve(__dirname, "../templates", relativeTemplatePath);
}
