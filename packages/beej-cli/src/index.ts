#!/usr/bin/env node

import { intro, outro, text, select, spinner, note } from "@clack/prompts";
import color from "picocolors";
import { Command } from "commander";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { promises as fs } from "node:fs";
import {
  copyTemplateFiles,
  extendPackageJson,
  getPackageTemplatePath,
} from "./utils/fs-utils.js";
import { addImportDeclaration, wrapJsxElement } from "./utils/ast-utils.js";
import { PACKAGE_MANIFEST } from "./utils/manifest.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Main function to start the cli
 */
async function main() {
  // Creating a command program for terminal result parsing
  const program = new Command();
  program
    .name("beej")
    .description("Scaffold a pre-configured frontend project in seconds")
    .version("0.2.0");

  program.parse(process.argv);

  console.log("");
  intro(color.bgCyan(color.black("  beej-cli  ")));

  // Prompting user for project name
  const projectName = await text({
    message: "Project Name",
    placeholder: "beej-app",
    defaultValue: "beej-app",
    validate(value) {
      if (/[A-Z]/.test(value)) return "Project name must be lowercase.";
    },
  });

  if (typeof projectName === "symbol") {
    outro(color.red("❌ Operation cancelled."));
    process.exit(0);
  }

  // Selecting framework
  const framework: string | symbol = await select({
    message: "Select a framework",
    options: [
      { value: "@thanka-digital/beej-react", label: "React (vite)" },
      { value: "@thanka-digital/beej-nextjs", label: "Next.js" },
      { value: "@thanka-digital/beej-vue", label: "Vue" },
      { value: "@thanka-digital/beej-nuxt", label: "Nuxt" },
    ],
  });

  if (typeof framework === "symbol") {
    outro(color.red("❌ Operation cancelled."));
    process.exit(0);
  }

  // Selecting the UI library
  const uiLibrary: string | symbol = await select({
    message: "Select UI library",
    options: [
      { value: "chakra", label: "Chakra UI" },
      { value: "tailwindcss", label: "Tailwind Css" },
      { value: "mantine", label: "Mantine" },
    ],
  });

  if (typeof uiLibrary === "symbol") {
    outro(color.red("❌ Operation cancelled."));
    process.exit(0);
  }

  // Selecting the state management library
  const stateManagement: string | symbol = await select({
    message: "Select a state management library:",
    options: [
      { value: "none", label: "React Context" },
      { value: "zustand", label: "Zustand" },
      { value: "jotai", label: "Jotai" },
      { value: "redux", label: "Redux" },
    ],
  });

  if (typeof stateManagement === "symbol") {
    outro(color.red("Operation cancelled."));
    process.exit(0);
  }

  // Selecting the API management library
  const apiLibrary: string | symbol = await select({
    message: "Select an API management library:",
    options: [
      { value: "axios", label: "Axios" },
      { value: "react-query", label: "TanStack Query (React Query)" },
    ],
  });

  if (typeof apiLibrary === "symbol") {
    outro(color.red("Operation cancelled."));
    process.exit(0);
  }

  // * Scaffolding
  const targetDir = path.resolve(process.cwd(), projectName as string);

  let directoryExists = false;
  try {
    await fs.access(targetDir);
    directoryExists = true;
  } catch {
    directoryExists = false;
  }

  if (directoryExists) {
    const existingFolderAction = await select({
      message: `Directory "${projectName}" already exists. How would you like to proceed?`,
      options: [
        {
          value: "overwrite",
          label:
            "Overwrite (Delete existing folder and start completely fresh)",
        },
        {
          value: "merge",
          label: "Merge (Add template into the folder as it is)",
        },
        {
          value: "cancel",
          label: "Cancel",
        },
      ],
    });

    if (
      existingFolderAction === "cancel" ||
      typeof existingFolderAction === "symbol"
    ) {
      outro(color.red("❌ Operation cancelled."));
      process.exit(0);
    }

    if (existingFolderAction === "overwrite") {
      const cleanSpinner = spinner();
      cleanSpinner.start("Clearing existing directory structure...");

      try {
        await fs.rm(targetDir, { recursive: true, force: true });
        cleanSpinner.stop("Existing directory cleared successfully!");
      } catch (err: any) {
        cleanSpinner.stop("Failed to clear directory.");
        console.error(color.red(`Error removing folder: ${err.message}`));
        process.exit(1);
      }
    }
  }

  const templateDir = getPackageTemplatePath(framework, "templates");

  const s = spinner();
  s.start("Scaffolding your project...");

  try {
    // * Copying the base framework template
    await copyTemplateFiles(`${templateDir}/base`, targetDir);
    s.message("Base template files scaffolded successfully!");

    const targetPackageJson = path.join(targetDir, "package.json");
    const targetMainTsx = path.join(targetDir, "src", "main.tsx");

    // * Check for state managment option and apply files accordingly
    if (stateManagement !== "none") {
      await copyTemplateFiles(
        `${templateDir}/extensions/${stateManagement}`,
        targetDir,
      );
    }

    if (stateManagement === "jotai") {
      s.message("Configuring Jotai state management...");

      await addImportDeclaration(targetMainTsx, "./provider/JotaiProvider", [
        "JotaiProvider",
      ]);
      await wrapJsxElement(targetMainTsx, "App", "JotaiProvider");
    } else if (stateManagement === "zustand") {
      s.message("Configuring Zustand...");
    } else if (stateManagement === "redux") {
      s.message("Configuring Zustand...");

      await addImportDeclaration(targetMainTsx, "./provider/ReduxProvider", [
        "ReduxProvider",
      ]);
      await wrapJsxElement(targetMainTsx, "App", "ReduxProvider");
    }

    if (stateManagement !== "none") {
      await extendPackageJson(
        targetPackageJson,
        PACKAGE_MANIFEST[stateManagement],
      );
    }

    // * Copying files as per the UI library option selection
    await copyTemplateFiles(
      `${templateDir}/extensions/${uiLibrary}`,
      targetDir,
    );
    if (uiLibrary === "mantine") {
      s.message("Configuring Mantine UI Library...");

      await addImportDeclaration(targetMainTsx, "./provider/MantineProvider", [
        "MProvider",
      ]);
      await wrapJsxElement(targetMainTsx, "App", "MProvider");
    } else if (uiLibrary === "chakra") {
      s.message("Configuring Chakra UI Library...");

      await addImportDeclaration(targetMainTsx, "./provider/ChakraProvider", [
        "CProvider",
      ]);
      await wrapJsxElement(targetMainTsx, "App", "CProvider");
    }
    await extendPackageJson(targetPackageJson, PACKAGE_MANIFEST[uiLibrary]);

    if (apiLibrary === "axios") {
      s.message("Configuring Axios API clients...");
    }

    await extendPackageJson(targetPackageJson, PACKAGE_MANIFEST[apiLibrary]);

    s.stop("Successfully created!");
  } catch (error: any) {
    s.stop("Scaffolding failed.");
    console.error(color.red(`\nError writing files: ${error.message}`), error);
    process.exit(1);
  }

  note(
    `cd ${projectName}\npnpm install\npnpm dev`,
    "Next Steps to get started:",
  );

  outro(color.green("🚀 Your project is ready to go!"));
}

main().catch((err) => {
  console.error(color.red(`An unexpected error occurred: ${err.message}`), err);
  process.exit(1);
});
