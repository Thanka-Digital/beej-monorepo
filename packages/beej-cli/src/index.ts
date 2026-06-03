#!/usr/bin/env node

import { intro, outro, text, select, spinner, note } from "@clack/prompts";
import color from "picocolors";
import { Command } from "commander";

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
      { value: "react", label: "React (vite)" },
      { value: "nextjs", label: "Next.js" },
      { value: "vue", label: "Vue" },
      { value: "nuxt", label: "Nuxt" },
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
  const s = spinner();
  s.start("Scaffolding your project...");

  // TODO: change with actual scaffolding
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
