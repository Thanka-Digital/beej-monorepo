import { contentRemoveByLines, updateFileByLine } from "./file_update";

export function testVersion(testFilePath: string) {
  let appTestCode = contentRemoveByLines(testFilePath, [0]);
  appTestCode = updateFileByLine(appTestCode, 'import AppTestRouter from "../__test__/AppRoute.test";', 0)
  return appTestCode;
}
