import path from "path";
import fs from "node:fs";
import { red, cyanBright } from "picocolors";

const renameFiles: Record<string, string> = {
  _gitignore: ".gitignore",
  "_package.json": "package.json",
};

export function writeFileToDest({
  root,
  file,
  templateDir,
  content,
  filesToIgnore,
  foldersToIgnore,
  targetFolder,
}: {
  root: string;
  file: string;
  templateDir?: string;
  content?: string;
  filesToIgnore?: string[];
  foldersToIgnore?: string[];
  targetFolder?: string;
}) {
  const targetPath = path.join(
    root,
    targetFolder ?? "",
    renameFiles[file] ?? file,
  );
  if (content) {
    fs.writeFileSync(targetPath, content);
  } else {
    if (!templateDir) {
      throw new Error("Need to pass templateDir");
    }
    copy(
      path.join(templateDir, file),
      targetPath,
      file,
      filesToIgnore,
      foldersToIgnore,
    );
  }
};

function copy(
  src: string,
  dest: string,
  fileDirName: string,
  filesToIgnore?: string[],
  foldersToIgnore?: string[],
) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    if (foldersToIgnore) {
      if (foldersToIgnore.includes(fileDirName)) {
        console.log(`  ${red("Ignoring")} ${fileDirName}`);
      } else {
        copyDir(src, dest, filesToIgnore);
      }
    } else {
      copyDir(src, dest, filesToIgnore);
    }
  } else {
    console.log(`  ${cyanBright("Creating")} ${fileDirName}`);
    fs.copyFileSync(src, dest);
  }
}

function copyDir(srcDir: string, destDir: string, ignoreList?: string[]) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    const destFileSeparated = destFile.split(path.sep)
    const destFileName = destFileSeparated[destFileSeparated.length - 1];

    if (ignoreList) {
      if (ignoreList.includes(destFileName)) {
        console.log(`  ${red("Ignoring")} ${destFileName}`);
      } else {
        copy(srcFile, destFile, destFileName, ignoreList)
      }
    } else {
      copy(srcFile, destFile, destFileName, ignoreList);
    }
  }
}
