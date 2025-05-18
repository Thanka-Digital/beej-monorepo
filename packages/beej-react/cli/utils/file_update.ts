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

export const updateFileByLine = (contentToChange: string, content: string, lineNumberToInsertAfter: number) => {
  let contentAfterUpdate = "";
  const contentByLines = contentToChange.split(/\r\n|\r|\n/);

  for (let index = 0; index < contentByLines.length; index++) {
    contentAfterUpdate += contentByLines[index] + "\n";
    if (index === lineNumberToInsertAfter) {
      contentAfterUpdate += `${content}\n`;
    }
  }

  return contentAfterUpdate;
}

export const wrapContentByContent = (contentToChange: string, contentToLook: string, contentToWrapWith: {
  startContent: string,
  endContent: string,
}) => {
  let contentAfterUpdate = "";
  const contentByLines = contentToChange.split(/\r\n|\r|\n/);

  for (let index = 0; index < contentByLines.length; index++) {
    if (contentByLines[index].trim() === contentToLook) {
      contentAfterUpdate += `${contentToWrapWith.startContent}\n`;
      contentAfterUpdate += contentByLines[index] + "\n";
      contentAfterUpdate += `${contentToWrapWith.endContent}\n`;
    } else {
      contentAfterUpdate += contentByLines[index] + "\n";
    }
  }

  return contentAfterUpdate;
}

export const contentRemoveByLineRange = (content: string, startLine: number, endLine: number) => {
  let contentAfterRemoval = "";
  const contentByLines = content.split(/\r\n|\r|\n/);

  for (let index = 0; index < contentByLines.length; index++) {
    if (index >= startLine && index <= endLine) {
      continue;
    }
    contentAfterRemoval += contentByLines[index] + "\n";
  }

  console.log(contentAfterRemoval);

  return contentAfterRemoval;
}
