import plugin from "tailwindcss/plugin";

type TailwindPlugin = ReturnType<typeof plugin>;

const beejPlugin: TailwindPlugin = plugin(
  function ({ addComponents }) {
    addComponents({});
  },
  {
    theme: {
      extend: {
        colors: {
          primary: "var(--color-primary, #475199)",
          "primary-dark": "var(--color-primary-dark, #333D79)",
          "primary-subtle": "var(--color-primary-subtle, #F1F2F9)",
          "primary-light": "var(--color-primary-light, #DFE1EC)",
          "primary-fg": "var(--color-primary-fg, #FFFFFF)",

          secondary: "var(--color-secondary, #E7202C)",
          "secondary-dark": "var(--color-secondary-dark, #CD1220)",
          "secondary-subtle": "var(--color-secondary-subtle, #FFE9EB)",
          "secondary-light": "var(--color-secondary-light, #FFD2D5)",
          "secondary-fg": "var(--color-secondary-fg, #FFFFFF)",

          "gray-lighter": "var(--color-gray-lighter, #DADADA)",
          "gray-darker": "var(--color-gray-darker, #9C9B9B)",

          accent: "var(--color-accent, #ff3860)",
          danger: "var(--color-danger, #e3342f)",
          success: "var(--color-success, #38c172)",
          warning: "var(--color-warning, #f6993f)",
          info: "var(--color-info, #6cb2eb)",
          neutral: "var(--color-neutral, #3d4451)",
        },
      },
    },
  },
);

export default beejPlugin;
