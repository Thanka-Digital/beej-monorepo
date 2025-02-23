import { createSystem, defaultConfig, defineConfig } from "@chakra-ui/react"

const customConfig = defineConfig({
  theme: {
    tokens: {
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
        }
      }
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
      }
    }
  },
})

const customExtendedSystem = createSystem(defaultConfig, customConfig)
export default customExtendedSystem;
