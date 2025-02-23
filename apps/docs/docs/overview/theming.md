---
title: "Theming"
---

:::warning

Theming is not fully customizable for all component libraries.

:::

In beej we have kept the theming process as simple as possible for now.

Since there are multiple UI libraries to choose from and they all handle theming differently we have tried to create a central theming file under `theme` folder.

Here are different theme files for different Ui library:

### Chakra

```ts title="theme config file for chakra"
import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react";

const customConfig = defineConfig({
  theme: {
    tokens: {
      // highlight-start
      colors: {
        brand: {
          50: { value: "#faf5ff" },
          100: { value: "#f3e8ff" },
          200: { value: "#e9d5ff" },
          300: { value: "#d8b4fe" },
          400: { value: "#c084fc" },
          500: { value: "#a855f7" },
          600: { value: "#9333ea" },
          700: { value: "#641ba3" },
          800: { value: "#4a1772" },
          900: { value: "#2f0553" },
          950: { value: "#1a032e" },
        },
        secondary: {
          50: { value: "#f0fdfa" },
          100: { value: "#ccfbf1" },
          200: { value: "#99f6e4" },
          300: { value: "#5eead4" },
          400: { value: "#2dd4bf" },
          500: { value: "#14b8a6" },
          600: { value: "#0d9488" },
          700: { value: "#0c5d56" },
          800: { value: "#114240" },
          900: { value: "#032726" },
          950: { value: "#021716" },
        },
      },
    },
    semanticTokens: {
      colors: {
        primary: {
          solid: { value: "{colors.brand.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.brand.700}" },
          muted: { value: "{colors.brand.100}" },
          subtle: { value: "{colors.brand.200}" },
          emphasized: { value: "{colors.brand.300}" },
          focusRing: { value: "{colors.brand.500}" },
        },
        accent: {
          solid: { value: "{colors.secondary.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.secondary.700}" },
          muted: { value: "{colors.secondary.100}" },
          subtle: { value: "{colors.secondary.200}" },
          emphasized: { value: "{colors.secondary.300}" },
          focusRing: { value: "{colors.secondary.500}" },
        },
        danger: {
          solid: { value: "{colors.red.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.red.700}" },
          muted: { value: "{colors.red.100}" },
          subtle: { value: "{colors.red.200}" },
          emphasized: { value: "{colors.red.300}" },
          focusRing: { value: "{colors.red.500}" },
        },
        success: {
          solid: { value: "{colors.green.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.green.700}" },
          muted: { value: "{colors.green.100}" },
          subtle: { value: "{colors.green.200}" },
          emphasized: { value: "{colors.green.300}" },
          focusRing: { value: "{colors.green.500}" },
        },
        info: {
          solid: { value: "{colors.blue.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.blue.700}" },
          muted: { value: "{colors.blue.100}" },
          subtle: { value: "{colors.blue.200}" },
          emphasized: { value: "{colors.blue.300}" },
          focusRing: { value: "{colors.blue.500}" },
        },
        warning: {
          solid: { value: "{colors.yellow.500}" },
          contrast: { value: "{colors.white}" },
          fg: { value: "{colors.yellow.700}" },
          muted: { value: "{colors.yellow.100}" },
          subtle: { value: "{colors.yellow.200}" },
          emphasized: { value: "{colors.yellow.300}" },
          focusRing: { value: "{colors.yellow.500}" },
        },
      },
      // highlight-end
    },
  },
});

const customExtendedSystem = createSystem(defaultConfig, customConfig);
export default customExtendedSystem;
```

You can change the brand and secondary color as per your need in order to effect the `semantic token colors`: **Primary** and **Accent**.

For changing other semantic token colors you can either directly give color values or overwrite the chakra's default colors accordingly.

For more theme configuration [see chakra's docs](https://chakra-ui.com/docs/theming/overview)

### Mantine

```ts title="theme config file for mantine"
import { createTheme } from "@mantine/core";

export const customTheme = createTheme({
  // highlight-start
  colors: {
    primary: [
      "#f3e8ff",
      "#e9d5ff",
      "#d8b4fe",
      "#c084fc",
      "#a855f7",
      "#9333ea",
      "#641ba3",
      "#4a1772",
      "#2f0553",
      "#1a032e",
    ],
    secondary: [
      "#ccfbf1",
      "#99f6e4",
      "#5eead4",
      "#2dd4bf",
      "#14b8a6",
      "#0d9488",
      "#0c5d56",
      "#114240",
      "#032726",
      "#021716",
    ],
  },
  // highlight-end
});
```

You can change the primary and secondary color as per your project need.

See the mantine's [colors generator](https://mantine.dev/colors-generator/) for generating your own color palette from your _brand_ color value.

For more theme configuration [see mantines's docs](https://mantine.dev/theming/theme-object/)

### Tailwind Css

```css title="theme config file for mantine"
/* highlight-start */
@import "tailwindcss";

@theme {
  --color-primary: #3490dc;
  --color-secondary: #ffed4a;
  --color-accent: #ff3860;
  --color-danger: #e3342f;
  --color-success: #38c172;
  --color-warning: #f6993f;
  --color-info: #6cb2eb;
  --color-neutral: #3d4451;
}
/* highlight-end */

....
```

For tailwind theme configuration we are using the `@tailwindcss/vite` package which is the current latest way of integrating tailwind to `vite` projects. They use the new concept of **theme variable** which is used directly in the `css`

For more detial on theme variable [see tailwindcss's docs](https://tailwindcss.com/docs/theme)
