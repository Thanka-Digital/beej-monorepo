import { promises as fs } from "node:fs";
import path from "node:path";
import { DependencyConfig } from "./manifest.js";
import { createRequire } from "node:module";

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

      const targetName =
        entry.name === "_package.json" ? "package.json" : entry.name;
      const destPath = path.join(dest, targetName);

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

/**
 * Resovles the absolute path of the template file hosted inside an external
 * workspace or npm package
 *
 * @param packageName The name of the scoped package e.g. "@thanka-digital/beej-react"
 * @param relativeTemplatePath The relative path that is inside the package
 */
export function getPackageTemplatePath(
  packageName: string,
  relativeTemplatePath: string,
) {
  const require = createRequire(import.meta.url);
  const packageEntryPath = require.resolve(packageName);
  const packageRootDir = path.dirname(path.dirname(packageEntryPath));

  return path.join(packageRootDir, relativeTemplatePath);
}
