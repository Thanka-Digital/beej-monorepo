import { readFileSync } from "node:fs"

export function testVersion(testFilePath: string) {
  const appTestCode = readFileSync(testFilePath, "utf-8");
  return appTestCode;
}
