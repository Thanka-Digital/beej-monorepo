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
