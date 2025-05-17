import path from "path";
import fs from "node:fs";
import prompts from "prompts";
import { cyanBright, red, reset, blueBright } from "picocolors";
import minimist from "minimist";
import { fileURLToPath } from "url";
import { testVersion } from "./utils/testVersion";
import { contentRemoveByLines } from "./utils/file_update";
import { writeFileToDest } from "./utils/file_utilities";
import {
  isValidPackageName,
  pkgInfoFromUserAgent,
  providerUpdate,
  toValidPackageName,
  updatePkgJsonDeps,
} from "./utils/package_utilities";
import {
  components,
  COMPONENTS,
  ComponentVariantString,
  Configs,
  states,
  STATES,
  StateVariantString,
} from "./constant";

// Agruments parsed with minimist
const args = minimist<Configs>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: "help", c: "component", s: "state", a: "api", t: "test" },
  string: ["_"],
});
const cwd = process.cwd();

const defaultTargetDir = "beej-app";

export const main = async () => {
  const argTargetDir = args._[0];
  const argComponent = args.component || args.c;
  const argState = args.state || args.s;
  // const argApi = args.api || args.a;
  const isTest = args.test || args.t;

  const environment = process.env.NODE_ENV || "production";

  let targetDir =
    environment === "production"
      ? argTargetDir || defaultTargetDir
      : "__tests__";
  const getProjectName = () => {
    if (environment === "production") {
      return targetDir === "." ? path.basename(path.resolve()) : targetDir;
    }

    return "test-beej-app";
  };

  let result: prompts.Answers<
    | "projectName"
    | "packageName"
    | "component"
    | "state"
    // | "api"
    | "overwrite"
  >;
  try {
    result = await prompts(
      [
        {
          type: argTargetDir || environment !== "production" ? null : "text",
          name: "projectName",
          message: reset("Project Name:"),
          initial: defaultTargetDir,
          onState: (state) => {
            targetDir = formatTargetDir(state.value) || defaultTargetDir;
          },
        },
        {
          type: () =>
            !fs.existsSync(targetDir) || isEmpty(targetDir) ? null : "select",
          name: "overwrite",
          message: () =>
            (targetDir === "."
              ? "Current directory"
              : `Target directory "${targetDir}"`) +
            ` is not empty. Please choose how to proceed:`,
          initial: 0,
          choices: [
            {
              title: "Remove existing files and continue",
              value: "yes",
            },
            {
              title: "Cancel operation",
              value: "no",
            },
            {
              title: "Ignore files and continue",
              value: "ignore",
            },
          ],
        },
        {
          type: (_, { overwrite }: { overwrite?: string }) => {
            if (overwrite === "no") {
              throw new Error(red("✖") + " Operation cancelled");
            }
            return null;
          },
          name: "overwriteChecker",
        },
        {
          type: () => (isValidPackageName(getProjectName()) ? null : "text"),
          name: "packageName",
          message: reset("Package name:"),
          initial: () => toValidPackageName(getProjectName()),
          validate: (dir) =>
            isValidPackageName(dir) || "Invalid package.json name",
        },
        {
          type:
            argComponent && COMPONENTS.includes(argComponent) ? null : "select",
          name: "component",
          message:
            typeof argComponent === "string" &&
              !COMPONENTS.includes(argComponent)
              ? reset(
                `"${argComponent}" isn't available. Please choose from below: `
              )
              : reset("Select a component style:"),
          initial: 0,
          choices: components.map((component) => {
            const componentColor = component.color;
            return {
              title: componentColor(component.displayName || component.name),
              value: component.name,
            };
          }),
        },
        {
          type: argState && STATES.includes(argState) ? null : "select",
          name: "state",
          message:
            typeof argState === "string" && !STATES.includes(argState)
              ? reset(
                `"${argState}" isn't available. Please choose from below: `
              )
              : reset("Select a state preference:"),
          initial: 0,
          choices: states.map((state) => {
            const stateColor = state.color;
            return {
              title: stateColor(state.displayName || state.name),
              value: state.name,
            };
          }),
        },
        // {
        //   type: argApi && APIS.includes(argApi) ? null : "select",
        //   name: "api",
        //   message:
        //     typeof argApi === "string" && !APIS.includes(argApi)
        //       ? reset(`"${argApi}" isn't available. Please choose from below: `)
        //       : reset("Select a API style:"),
        //   initial: 0,
        //   choices: apis.map((api) => {
        //     const apiColor = api.color;
        //     return {
        //       title: apiColor(api.displayName || api.name),
        //       value: api.name,
        //     };
        //   }),
        // },
      ],
      {
        onCancel: () => {
          throw new Error(red("✖") + " Operation cancelled");
        },
      }
    );
  } catch (error: unknown) {
    console.error(red((error as Error).message));
    return;
  }

  // get the prompts result
  const { packageName, component, state, overwrite } = result;

  const templateComponentVariant: ComponentVariantString =
    component || argComponent;
  const templateStateVariant: StateVariantString = state || argState;
  // const templateApiVariant = api || argApi;

  const root = path.join(cwd, targetDir);

  if (overwrite === "yes") {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  const pkgInfo = pkgInfoFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "pnpm";

  console.log(`\n${cyanBright("✨  Creating project in")} ${cyanBright(root)}`);

  // Scaffold the common folder files which contains all the necessary files needed in every setup
  console.log(`\n${blueBright(" Scaffolding common files")}`);
  const commonDir = path.resolve(
    fileURLToPath(import.meta.url),
    `${environment === "production" ? "../../../main" : "../../main"}`
  );
  const filesToIgnore = [
    "App.test.tsx",
    templateComponentVariant !== "tailwindcss" ? "tailwind.css" : "",
  ];
  const filesToCopyFromCommon = fs.readdirSync(commonDir);
  for (const file of filesToCopyFromCommon.filter(
    (f) => f !== "_package.json" && f !== "App.tsx"
  )) {
    writeFileToDest({
      root,
      file,
      templateDir: commonDir,
      filesToIgnore: filesToIgnore,
      foldersToIgnore: isTest
        ? ["libraries", "node_modules"]
        : ["__test__", "libraries", "node_modules"],
    });
  }

  // Scaffold the files according to the component library selected
  console.log(
    `\n${blueBright(` Scaffolding ${templateComponentVariant} files`)}`
  );

  const componentDir = path.resolve(
    fileURLToPath(import.meta.url),
    `${environment === "production" ? "../../../main/libraries/" : "../../main/libraries/"}${templateComponentVariant}`
  );
  const filesToCopyFromComponentDir = fs.readdirSync(componentDir);
  for (const file of filesToCopyFromComponentDir.filter(
    (f) => f !== "_package.json"
  )) {
    // const stat = fs.statSync(file)
    // if (stat.isDirectory()) {
    //  TODO: add target folder src only if folder
    writeFileToDest({
      root,
      file,
      templateDir: componentDir,
      targetFolder: "src",
    });
    // } else {
    //   write({ file, templateDir: componentDir });
    // }
  }

  if (templateComponentVariant !== "tailwindcss") {
    writeFileToDest({
      root,
      file: "main.tsx",
      content: contentRemoveByLines(commonDir + "/src/main.tsx", [3]),
      templateDir: commonDir + "/src",
      targetFolder: "src",
    });
    writeFileToDest({
      root,
      file: "vite.config.ts",
      content: contentRemoveByLines(commonDir + "/vite.config.ts", [3, 10]),
    });
  }

  // Scaffold the files according to the component library selected
  console.log(`\n${blueBright(` Scaffolding ${templateStateVariant} files`)}`);

  const stateDir = path.resolve(
    fileURLToPath(import.meta.url),
    `${environment === "production" ? "../../../main/libraries/" : "../../main/libraries/"}${templateStateVariant}`
  );
  const filesToCopyFromStateDir = fs.readdirSync(stateDir);
  for (const file of filesToCopyFromStateDir) {
    writeFileToDest({ root, file, templateDir: stateDir, targetFolder: "src" });
  }

  const newAppContent = providerUpdate(
    templateComponentVariant,
    templateStateVariant,
    commonDir + "/src/App.tsx"
  );
  writeFileToDest({
    root,
    file: "App.tsx",
    content: newAppContent,
    templateDir: commonDir + "/src",
    targetFolder: "/src",
  });

  const pkg = updatePkgJsonDeps(commonDir, [component, state]);
  pkg.name = packageName || getProjectName();

  writeFileToDest({
    root,
    file: "package.json",
    content: JSON.stringify(pkg, null, 2) + "\n",
  });
  if (isTest) {
    writeFileToDest({
      root,
      file: "App.tsx",
      content: testVersion(commonDir + "/__test__/App.test.tsx") + "\n",
      templateDir: commonDir + "/src",
      targetFolder: "src",
    });
  }

  const cdProjectRelativePath = path.relative(cwd, root);
  console.log(
    `\n${cyanBright("🎉  Successfully created project")} Get started by running:`
  );

  if (cdProjectRelativePath) {
    console.log(
      `   cd ${cdProjectRelativePath.includes(" ") ? `"${cdProjectRelativePath}"` : cdProjectRelativePath}`
    );
  }

  switch (pkgManager) {
    case "yarn":
      console.log(`   yarn`);
      console.log(`   yarn dev`);
      break;
    default:
      console.log(`   ${pkgManager} install`);
      console.log(`   ${pkgManager} run dev`);
      break;
  }

  console.log();
};

function formatTargetDir(targetDir: string | undefined) {
  return targetDir?.trim().replace(/\/+$/g, "");
}

function isEmpty(path: string) {
  const files = fs.readdirSync(path);
  return files.length === 0 || (files.length === 1 && files[0] === ".git");
}

function emptyDir(dir: string) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    if (file === ".git") {
      continue;
    }
    fs.rmSync(path.resolve(dir, file), { recursive: true, force: true });
  }
}

main();
