import { beforeEach, describe, expect, it, vi } from "vitest";
import { Volume } from "memfs";
import { addImportDeclaration, wrapJsxElement } from "./ast-utils.js";

const memoryStorage = vi.hoisted(() => {
  return {
    vol: new Volume(),
  };
});

vi.mock("node:fs", () => {
  return {
    promises: memoryStorage.vol.promises,
    default: memoryStorage.vol,
  };
});

describe("AST Utilities Integration Pipeline", () => {
  const mockPath = "/test-beej/src/main.tsx";

  beforeEach(() => {
    memoryStorage.vol.reset();

    memoryStorage.vol.fromJSON({
      [mockPath]: `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);`,
    });
  });

  it("should cleanly insert a named import and wrap the target JSX element matching the snapshot", async () => {
    await addImportDeclaration(mockPath, "jotai", ["Provider"]);
    await wrapJsxElement(mockPath, "App", "Provider");

    const generateCode = await memoryStorage.vol.promises.readFile(
      mockPath,
      "utf-8",
    );

    expect(generateCode).toMatchInlineSnapshot(`
      "import { Provider } from \\"jotai\\";
      import React from 'react';
      import ReactDOM from 'react-dom/client';
      import App from './App.tsx';

      ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
          <Provider>
            <App />
          </Provider>
        </React.StrictMode>
      );"
      `);
  });
});
