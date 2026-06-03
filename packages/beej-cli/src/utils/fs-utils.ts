import { promises as fs } from "node:fs";
import path from "node:path";

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
 * @param dependencies Key-value object mapping library names to versions
 */
export async function extendPackageJson(
  targetPath: string,
  dependencies: Record<string, string>,
): Promise<void> {
  const content = await fs.readFile(targetPath, "utf-8");
  const pkg = JSON.parse(content);

  pkg.dependencies = {
    ...(pkg.dependencies || {}),
    ...dependencies,
  };

  await fs.writeFile(targetPath, JSON.stringify(pkg, null, 2), "utf-8");
}
