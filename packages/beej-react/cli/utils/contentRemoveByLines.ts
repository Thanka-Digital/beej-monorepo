import { readFileSync } from "node:fs";

export const contentRemoveByLines = (contentPath: string, linesToRemove: number[]) => {
  const content = readFileSync(contentPath, "utf-8");
  let contentAfterRemoval = "";
  const contentByLines = content.split(/\r\n|\r|\n/);

  for (let index = 0; index < contentByLines.length; index++) {
    if (!linesToRemove.includes(index)) {
      contentAfterRemoval += contentByLines[index] + "\n";
    }
  }

  return contentAfterRemoval;
}
