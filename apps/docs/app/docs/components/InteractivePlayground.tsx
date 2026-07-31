"use client";

import React, { useState } from "react";

export type ControlConfig =
  | {
      type: "select";
      name: string;
      label: string;
      options: string[];
      defaultValue: string;
    }
  | { type: "boolean"; name: string; label: string; defaultValue: boolean }
  | { type: "text"; name: string; label: string; defaultValue: string };

interface PlaygroundProps {
  component: React.ElementType;
  componentName: string;
  staticProps?: Record<string, any>;
  controls?: ControlConfig[];
  hidePadding?: boolean;
}

export function BaseInteractivePlayground({
  component: Component,
  componentName,
  staticProps = {},
  controls = [],
  hidePadding = false,
}: PlaygroundProps) {
  const [colorscheme, setColorScheme] = useState("primary");
  const [padding, setPadding] = useState("base");

  const [customValues, setCustomValues] = useState<Record<string, any>>(() => {
    const initial: Record<string, any> = {};
    controls.forEach((ctrl) => {
      initial[ctrl.name] = ctrl.defaultValue;
    });
    return initial;
  });

  const handleCustomChange = (name: string, value: any) => {
    setCustomValues((prev) => ({ ...prev, [name]: value }));
  };

  const allProps = {
    colorscheme,
    ...(!hidePadding ? { padding } : {}),
    ...staticProps,
    ...customValues,
  };

  const formatProp = (key: string, value: any): string => {
    if (typeof value === "boolean") {
      return value ? ` ${key} ` : "";
    }
    if (typeof value === "string") {
      return value.length > 0 ? ` ${key}="${value}"` : "";
    }

    return ` ${key}=${JSON.stringify(value)}`;
  };

  const propStrings = Object.entries(allProps)
    .map(([key, value]) => formatProp(key, value))
    .filter(Boolean)
    .join("\n");

  const generatedCode = `<${componentName}\n${propStrings}\n/>`;

  const selectControls = controls.filter(
    (c) => c.type === "select" || c.type === "text",
  );
  const booleanControls = controls.filter((c) => c.type === "boolean");

  return (
    <div className="flex flex-col gap-6 my-6 border rounded-xl p-6 bg-background border-border">
      {/* Live Preview Canvas */}
      <div className="flex flex-col items-center justify-center p-8 bg-muted/40 rounded-lg border border-dashed border-border min-h-40 w-full">
        <div className="w-full max-w-sm flex justify-center">
          <Component {...allProps} />
        </div>
      </div>

      {/* Control Panel - Dropdowns & Text Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 text-sm">
        {/* Built-in Common Control: Color Scheme */}
        <div className="flex flex-col gap-1.5">
          <label className="font-semibold text-foreground">Color Scheme</label>
          <select
            value={colorscheme}
            onChange={(e) => setColorScheme(e.target.value)}
            className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="primary">primary (#943ccc)</option>
            <option value="secondary">secondary (#179299)</option>
            <option value="danger">danger (#d20f39)</option>
            <option value="success">success (#38c172)</option>
            <option value="neutral">neutral (#3d4451)</option>
          </select>
        </div>

        {/* Built-in Common Control: Padding */}
        {!hidePadding && (
          <div className="flex flex-col gap-1.5">
            <label className="font-semibold text-foreground">
              Padding / Size
            </label>
            <select
              value={padding}
              onChange={(e) => setPadding(e.target.value)}
              className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="sm">sm</option>
              <option value="base">base</option>
              <option value="lg">lg</option>
            </select>
          </div>
        )}

        {/* Pluggable Select & Text Controls */}
        {selectControls.map((ctrl) => (
          <div key={ctrl.name} className="flex flex-col gap-1.5">
            <label className="font-semibold text-foreground">
              {ctrl.label}
            </label>
            {ctrl.type === "select" ? (
              <select
                value={customValues[ctrl.name]}
                onChange={(e) => handleCustomChange(ctrl.name, e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {ctrl.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={customValues[ctrl.name]}
                onChange={(e) => handleCustomChange(ctrl.name, e.target.value)}
                className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            )}
          </div>
        ))}
      </div>

      {/* Pluggable Boolean Checkboxes */}
      {booleanControls.length > 0 && (
        <div className="flex flex-wrap items-center gap-6 pt-3 border-t border-border/60">
          {booleanControls.map((ctrl) => (
            <label
              key={ctrl.name}
              className="flex items-center gap-2 cursor-pointer select-none text-sm font-medium"
            >
              <input
                type="checkbox"
                checked={!!customValues[ctrl.name]}
                onChange={(e) =>
                  handleCustomChange(ctrl.name, e.target.checked)
                }
                className="h-4 w-4 rounded border-input text-primary focus:ring-primary"
              />
              {ctrl.label}
            </label>
          ))}
        </div>
      )}

      {/* Live JSX Code Preview Block */}
      <div className="flex flex-col gap-1 mt-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Live JSX Code
        </span>
        <pre className="p-4 rounded-lg bg-zinc-950 text-zinc-100 text-xs font-mono overflow-x-auto border border-zinc-800">
          <code>{generatedCode}</code>
        </pre>
      </div>
    </div>
  );
}
