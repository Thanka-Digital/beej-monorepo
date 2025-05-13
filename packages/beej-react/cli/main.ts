import path from "path";
import fs from "node:fs";
import prompts from "prompts";
import colors from "picocolors";
import minimist from "minimist";
import { fileURLToPath } from "url";
import { DEPENDENCIES_LIST, DEV_DEPENDENCY_LIST } from "./utils/pkgDependency";
import { testVersion } from "./utils/testVersion";

const { cyanBright, greenBright, red, reset, yellowBright, blueBright } =
  colors;

type Configs = {
  component?: "tailwind" | "chakra" | "mantine";
  state?: "context" | "redux" | "jotai";
  api?: "fetch" | "rtk" | "tanstack";
};
type ColorFunc = (str: string | number) => string;

type ComponentVariant = {
  name: string;
  displayName: string;
  color: ColorFunc;
};
type StateVariant = {
  name: string;
  displayName: string;
  color: ColorFunc;
};
type ApiVariant = {
  name: string;
  displayName: string;
  color: ColorFunc;
};

const components: ComponentVariant[] = [
  {
    name: "tailwindcss",
    displayName: "Tailwind",
    color: cyanBright,
  },
  {
    name: "chakra",
    displayName: "Chakra UI",
    color: greenBright,
  },
  {
    name: "mantine",
    displayName: "Mantine",
    color: yellowBright,
  },
];
const states: StateVariant[] = [
  {
    name: "context",
    displayName: "Context API",
    color: cyanBright,
  },
  {
    name: "redux",
    displayName: "Redux",
    color: greenBright,
  },
  {
    name: "zustand",
    displayName: "Zustand",
    color: blueBright,
  },
  {
    name: "jotai",
    displayName: "Jotai",
    color: yellowBright,
  }
];
const apis: ApiVariant[] = [
  {
    name: "fetch",
    displayName: "Fetch",
    color: cyanBright,
  },
  // {
  //   name: "rtk",
  //   displayName: "Redux Toolkit",
  //   color: greenBright,
  // },
  // {
  //   name: "tanstack",
  //   displayName: "Tanstack",
  //   color: yellowBright,
  // },
];

// Agruments parsed with minimist
const args = minimist<Configs>(process.argv.slice(2), {
  default: { help: false },
  alias: { h: "help", c: "component", s: "state", a: "api", t: "test" },
  string: ["_"],
});
const cwd = process.cwd();

const COMPONENTS = ["chakra", "mantine", "tailwindcss"];
const STATES = ["context", "jotai", "redux", "zustand"];
const APIS = ["fetch", "rtk", "tanstack"];

const defaultTargetDir = "beej-app";
const renameFiles: Record<string, string> = {
  _gitignore: ".gitignore",
  "_package.json": "package.json",
};

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
                `"${argComponent}" isn't available. Please choose from below: `,
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
                `"${argState}" isn't available. Please choose from below: `,
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
      },
    );
  } catch (error: unknown) {
    console.error(red((error as Error).message));
    return;
  }

  // get the prompts result
  const { packageName, component, state, overwrite } = result;

  const templateComponentVariant = component || argComponent;
  const templateStateVariant = state || argState;
  // const templateApiVariant = api || argApi;

  const root = path.join(cwd, targetDir);

  if (overwrite === "yes") {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root, { recursive: true });
  }

  const write = ({
    file,
    templateDir,
    content,
    filesToIgnore,
    foldersToIgnore,
    targetFolder,
  }: {
    file: string;
    templateDir?: string;
    content?: string;
    filesToIgnore?: string[];
    foldersToIgnore?: string[];
    targetFolder?: string;
  }) => {
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

  const pkgInfo = pkgInfoFromUserAgent(process.env.npm_config_user_agent);
  const pkgManager = pkgInfo ? pkgInfo.name : "pnpm";

  console.log(`\n${cyanBright("✨  Creating project in")} ${cyanBright(root)}`);

  // Scaffold the common folder files which contains all the necessary files needed in every setup
  console.log(`\n${blueBright(" Scaffolding common files")}`);
  const commonDir = path.resolve(
    fileURLToPath(import.meta.url),
    `${environment === "production" ? "../../../main" : "../../main"}`,
  );
  const filesToCopyFromCommon = fs.readdirSync(commonDir);
  for (const file of filesToCopyFromCommon.filter(
    (f) => f !== "_package.json" && f !== "App.tsx",
  )) {
    write({
      file,
      templateDir: commonDir,
      filesToIgnore: ["App.test.tsx"],
      foldersToIgnore: isTest ? ["libraries", "node_modules"] : ["__test__", "libraries", "node_modules"],
    });
  }

  // Scaffold the files according to the component library selected
  console.log(
    `\n${blueBright(` Scaffolding ${templateComponentVariant} files`)}`,
  );

  const componentDir = path.resolve(
    fileURLToPath(import.meta.url),
    `${environment === "production" ? "../../../main/libraries/" : "../../main/libraries/"}${templateComponentVariant}`,
  );
  const filesToCopyFromComponentDir = fs.readdirSync(componentDir);
  for (const file of filesToCopyFromComponentDir.filter(
    (f) => f !== "_package.json",
  )) {
    // const stat = fs.statSync(file)
    // if (stat.isDirectory()) {
    //  TODO: add target folder src only if folder
    write({ file, templateDir: componentDir, targetFolder: "src" });
    // } else {
    //   write({ file, templateDir: componentDir });
    // }
  }

  // Scaffold the files according to the component library selected
  console.log(
    `\n${blueBright(` Scaffolding ${templateStateVariant} files`)}`,
  );

  const stateDir = path.resolve(
    fileURLToPath(import.meta.url),
    `${environment === "production" ? "../../../main/libraries/" : "../../main/libraries/"}${templateStateVariant}`,
  )
  const filesToCopyFromStateDir = fs.readdirSync(stateDir);
  for (const file of filesToCopyFromStateDir) {
    write({ file, templateDir: stateDir, targetFolder: "src" });
  }

  const pkg = updatePkgJsonDeps(commonDir, [component, state])
  pkg.name = packageName || getProjectName();

  write({ file: "package.json", content: JSON.stringify(pkg, null, 2) + "\n" });
  if (isTest) {
    write({ file: "App.tsx", content: testVersion(commonDir + "/src/App.test.tsx") + "\n", templateDir: commonDir + "/src", targetFolder: "src" });
  }

  const cdProjectRelativePath = path.relative(cwd, root);
  console.log(
    `\n${cyanBright("🎉  Successfully created project")} Get started by running:`,
  );

  if (cdProjectRelativePath) {
    console.log(
      `   cd ${cdProjectRelativePath.includes(" ") ? `"${cdProjectRelativePath}"` : cdProjectRelativePath}`,
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

function updatePkgJsonDeps(commonDir: string, selectedOptions: string[]): { [key: string]: string } {
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

function isValidPackageName(projectName: string) {
  return /^(?:@[a-z\d\-*~][a-z\d\-*._~]*\/)?[a-z\d\-~][a-z\d\-._~]*$/.test(
    projectName,
  );
}

function toValidPackageName(projectName: string) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/^[._]/, "")
    .replace(/[^a-z\d\-~]+/g, "-");
}

function pkgInfoFromUserAgent(userAgent: string | undefined) {
  if (!userAgent) return undefined;
  const pkgSpec = userAgent.split(" ")[0];
  const pkgSpecArr = pkgSpec.split("/");
  return {
    name: pkgSpecArr[0],
    version: pkgSpecArr[1],
  };
}

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
        copy(srcFile, destFile, destFileName)
      }
    } else {
      copy(srcFile, destFile, destFileName);
    }
  }
}

main();
