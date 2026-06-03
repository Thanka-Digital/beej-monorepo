#!/usr/bin/env node

import { intro, outro, text, select, spinner, note } from "@clack/prompts";
import color from "picocolors";
import { Command } from "commander";

import path from "node:path";
import { fileURLToPath } from "node:url";
import { copyTemplateFiles } from "./utils/fs-ulits.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  const program = new Command();
  program
    .name("beej")
    .description("Scaffold a pre-configured frontend project in seconds")
    .version("0.2.0");

  program.parse(process.argv);

  console.log("");
  intro(color.bgCyan(color.black("  beej-cli  ")));

  const projectName = await text({
    message: "Project Name",
    placeholder: "beej-app",
    validate(value) {
      if (/[A-Z]/.test(value)) return "Project name must be lowercase.";
    },
  });

  if (typeof projectName === "symbol") {
    outro(color.red("❌ Operation cancelled."));
    process.exit(0);
  }

  const framework = await select({
    message: "Select a framework",
    options: [
      { value: "react-base", label: "React (vite)" },
      { value: "nextjs-base", label: "Next.js" },
      { value: "vue-base", label: "Vue" },
      { value: "nuxt-base", label: "Nuxt" },
    ],
  });

  if (typeof framework === "symbol") {
    outro(color.red("❌ Operation cancelled."));
    process.exit(0);
  }

  const uiLibrary = await select({
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

  const stateManagement = await select({
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

  const apiLibrary = await select({
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

  // Scaffolding
  const targetDir = path.resolve(process.cwd(), projectName as string);
  const templateDir = path.resolve(
    __dirname,
    "../../templates",
    framework as string,
  );

  const s = spinner();
  s.start("Scaffolding your project...");

  try {
    await copyTemplateFiles(templateDir, targetDir);
    console.log(color.green("Base template files scaffolded successfully!"));
  } catch (error: any) {
    s.stop("Scaffolding failed.");
    console.error(color.red(`\nError writing files: ${error.message}`));
    process.exit(1);
  }
  await new Promise((resolve) => setTimeout(resolve, 1500));

  s.stop("Successfully created!");

  note(
    `cd ${projectName}\npnpm install\npnpm dev`,
    "Next Steps to get started:",
  );

  outro(color.green("🚀 Your project is ready to go!"));
}

main().catch((err) => {
  console.error(color.red(`An unexpected error occurred: ${err.message}`));
  process.exit(1);
});
