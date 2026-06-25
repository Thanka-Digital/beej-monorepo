# Beej components

Set of tailwindcss powered components for beej with tailwind configuration selected

## Getting Started

Install the package with `pnpm` or `npm`

```bash title=Using pnpm
pnpm install -D @thanka-digital/beej-component@latest
```

```bash title=Using npm
npm install -D @thanka-digital/beej-component@latest
```

### Usage

To get started with using the components simply import the main `style.css` file from the package to your project at the root, and import any components you want to use.

```tsx title=Example usage
import "@thanka-digital/beej-component/style.css";
import { Button } from "@thanka-digital/beej-component";

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <Button colorscheme="primary" variant="ghost" >Beej button</Button>
    </>
  );
}

export default App;
```
