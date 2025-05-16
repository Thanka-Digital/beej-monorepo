import { cyanBright, greenBright, yellowBright, blueBright } from "picocolors";

export type Configs = {
  component?: "tailwind" | "chakra" | "mantine";
  state?: "context" | "redux" | "jotai" | "zustand";
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

const COMPONENT_LIBRARIES = {
  chakra: "chakra",
  mantine: "maintine",
  tailwindcss: "tailwindcss",
};
const STATE_LIBRARIES = {
  context: "context",
  redux: "redux",
  jotai: "jotai",
  zustand: "zustand",
};
const API_LIBRARIES = {
  fetch: "fetch",
  rtk: "rtk",
  tanstack: "tanstack",
};

export const COMPONENTS = Object.values(COMPONENT_LIBRARIES);
export const STATES = Object.values(STATE_LIBRARIES);
export const APIS = Object.values(API_LIBRARIES);

export type ComponentVariantString = keyof typeof COMPONENT_LIBRARIES;
export type StateVariantString = keyof typeof STATE_LIBRARIES;
export type ApiVariantString = keyof typeof API_LIBRARIES;

export const components: ComponentVariant[] = [
  {
    name: COMPONENT_LIBRARIES.chakra,
    displayName: "Chakra UI",
    color: greenBright,
  },
  {
    name: COMPONENT_LIBRARIES.mantine,
    displayName: "Mantine",
    color: yellowBright,
  },
  {
    name: COMPONENT_LIBRARIES.tailwindcss,
    displayName: "Tailwind",
    color: cyanBright,
  },
];
export const states: StateVariant[] = [
  {
    name: STATE_LIBRARIES.context,
    displayName: "Context API",
    color: cyanBright,
  },
  {
    name: STATE_LIBRARIES.jotai,
    displayName: "Jotai",
    color: yellowBright,
  },
  {
    name: STATE_LIBRARIES.redux,
    displayName: "Redux",
    color: greenBright,
  },
  {
    name: STATE_LIBRARIES.zustand,
    displayName: "Zustand",
    color: blueBright,
  },
];
export const apis: ApiVariant[] = [
  {
    name: API_LIBRARIES.fetch,
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
