import { promises as fs } from "node:fs";
import * as recast from "recast";
import * as tsBabelParser from "recast/parsers/babel-ts.js";
import { builders as b } from "ast-types";

/**
 * Shared helper to abstract the file-to-AST lifecycle.
 */
async function transformFile(
  filePath: string,
  transformFn: (ast: any) => void,
): Promise<void> {
  const code = await fs.readFile(filePath, "utf-8");
  const ast = recast.parse(code, { parser: tsBabelParser });

  transformFn(ast);

  const output = recast.print(ast).code;
  await fs.writeFile(filePath, output, "utf-8");
}

export async function addImportDeclaration(
  filePath: string,
  importSource: string,
  specifiers: string[],
): Promise<void> {
  await transformFile(filePath, (ast) => {
    let importExists = false;

    recast.visit(ast, {
      visitImportDeclaration(nodePath) {
        if (nodePath.node.source.value === importSource) {
          importExists = true;
        }
        return false;
      },
    });

    if (!importExists) {
      const importSpecifiers = specifiers.map((spec) =>
        b.importSpecifier(b.identifier(spec), b.identifier(spec)),
      );
      const newImport = b.importDeclaration(
        importSpecifiers,
        b.stringLiteral(importSource),
      );
      ast.program.body.unshift(newImport);
    }
  });
}

export async function wrapJsxElement(
  filePath: string,
  targetElement: string,
  wrapperElement: string,
): Promise<void> {
  await transformFile(filePath, (ast) => {
    let alreadyWrapped = false;

    recast.visit(ast, {
      visitJSXOpeningElement(nodePath) {
        if (nodePath.node.name.name === wrapperElement) {
          alreadyWrapped = true;
        }
        return this.traverse(nodePath);
      },

      visitJSXElement(nodePath) {
        const openingEl = nodePath.node.openingElement;

        if (
          openingEl.name.type === "JSXIdentifier" &&
          openingEl.name.name === targetElement &&
          !alreadyWrapped
        ) {
          const providerOpening = b.jsxOpeningElement(
            b.jsxIdentifier(wrapperElement),
            [],
          );
          const providerClosing = b.jsxClosingElement(
            b.jsxIdentifier(wrapperElement),
          );

          const wrappedElement = b.jsxElement(
            providerOpening,
            providerClosing,
            [nodePath.node],
          );

          nodePath.replace(wrappedElement);
          return false;
        }
        return this.traverse(nodePath);
      },
    });
  });
}

// /**
//  * Modifies a target React entry file to safely append an import and wrap components.
//  * @param filePath Path to the target source file (e.g., src/main.tsx)
//  * @param importSource The library to import from ('jotai' or '@chakra-ui/react')
//  * @param specifiers Array of named imports (e.g., ['Provider'] or ['ChakraProvider'])
//  */
// export async function injectLibraryProvider(
//   filePath: string,
//   importSource: string,
//   specifiers: string[],
// ): Promise<void> {
//   const code = await fs.readFile(filePath, "utf-8");

//   const ast = recast.parse(code, {
//     parser: tsBableParser,
//     // {
//     //   parse(source: string) {
//     //     return parser.parse(source, {
//     //       sourceType: "module",
//     //       plugins: ["typescript", "jsx"],
//     //     });
//     //   },
//     // },
//   });

//   let importExists = false;

//   recast.visit(ast, {
//     visitImportDeclaration(nodePath) {
//       if (nodePath.node.source.value === importSource) {
//         importExists = true;
//       }
//       return false;
//     },
//   });

//   if (!importExists) {
//     const importSpecifiers = specifiers.map((spec) =>
//       b.importSpecifier(b.identifier(spec), b.identifier(spec)),
//     );
//     const newImport = b.importDeclaration(
//       importSpecifiers,
//       b.stringLiteral(importSource),
//     );

//     ast.program.body.unshift(newImport);
//   }

//   const output = recast.print(ast).code;
//   await fs.writeFile(filePath, output, "utf-8");
// }
