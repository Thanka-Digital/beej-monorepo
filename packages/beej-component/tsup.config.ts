import { defineConfig } from "tsup";

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    button: 'src/components/ui/button.tsx',
    checkbox: 'src/components/ui/checkbox.tsx',
    radio: 'src/components/ui/radio.tsx',
    dialog: 'src/components/ui/dialog.tsx',
    tooltip: 'src/components/ui/tooltip.tsx',
    input: 'src/components/custom/custom-input.tsx',
    select: 'src/components/custom/custom-select.tsx',
    textarea: 'src/components/custom/custom-textarea.tsx',
  },
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  minify: true,
  sourcemap: false,
  splitting: true,
  treeshake: true,
  bundle: true,
  minifyWhitespace: false,
  external: ['react', 'react-dom']
})
