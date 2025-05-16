import path from "path";
import fs from "node:fs";
import { DEPENDENCIES_LIST, DEV_DEPENDENCY_LIST } from "./pkgDependency";
import { updateFileByLine, wrapContentByContent } from "./file_update";

export function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  );
}

export function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

export function pkgInfoFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

export function updatePkgJsonDeps(commonDir: string, selectedOptions: string[]): { [key: string]: string } {
  const pkg = JSON.parse(
    fs.readFileSync(path.join(commonDir, "_package.json"), "utf-8")
  )

  let selectedDependencies = {};
  for (let i = 0; i < selectedOptions.length; i++) {
    const so = selectedOptions[i];
    selectedDependencies = { ...selectedDependencies, ...DEPENDENCIES_LIST[so as keyof typeof DEPENDENCIES_LIST] }
  }

  pkg.dependencies = {
    ...pkg.dependencies,
    ...selectedDependencies
  }
  pkg.devDependencies = DEV_DEPENDENCY_LIST

  return pkg;
}

export function providerUpdate(componentVariant: string, stateVariant: string, appPath: string) {
  let appContent = fs.readFileSync(appPath, "utf-8");

  if (componentVariant !== "tailwindcss") {
    appContent = updateFileByLine(appContent, 'import { Provider as ComponentProvider } from "@/provider/provider";', 0)
    appContent = wrapContentByContent(appContent, "<AppRouter />", {
      startContent: "<ComponentProvider>",
      endContent: "</ComponentProvider>",
    });
  }

  if (stateVariant !== "zustand") {
    let providerName = "ReduxProvider";
    if (stateVariant === "jotai") {
      providerName = "JotaiProvider";
    }
    appContent = updateFileByLine(appContent, `import ${providerName} from "@/provider/${providerName}";`, 0)
    appContent = wrapContentByContent(appContent, "<AppRouter />", {
      startContent: `<${providerName}>`,
      endContent: `</${providerName}>`,
    })
  }

  return appContent;
}
