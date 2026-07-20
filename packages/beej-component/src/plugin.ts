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
          primary: "var(--color-primary, #943ccc)",
          "primary-dark": "var(--color-primary-dark, #752ba6)",

          secondary: "var(--color-secondary, #179299)",
          "secondary-dark": "var(--color-secondary-dark, #106469)",

          danger: "var(--color-danger, #d20f39)",
          "danger-darker": "var(--color-gray-darker, #9f0b2b)",

          success: "var(--color-success, #38c172)",
          "success-darker": "var(--color-gray-darker, #2c9659)",

          neutral: "var(--color-neutral, #3d4451)",
          "neutral-darker": "var(--color-gray-darker, #252932)",
        },
      },
    },
  },
);

export default beejPlugin;
