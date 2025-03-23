import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";

import { cn } from "../../utils/cn";
import {
  colorSchemeForTextFields,
  paddingVariantForTextFields,
  variantForTextFields,
} from "../util";

const selectStyles = cva(
  [
    "w-full disabled:cursor-not-allowed disabled:text-gray-400 disabled:bg-gray-200",
  ],
  {
    variants: {
      variant: variantForTextFields,
      padding: paddingVariantForTextFields,
      colorscheme: colorSchemeForTextFields,
    },
    defaultVariants: {
      variant: "default",
      padding: "base",
      colorscheme: "gray",
    },
  },
);

interface ISelectProps {
  className?: string;
  options?: { label: string; value: string }[];
  label?: string;
  id?: string;
}

type SelectProps = ComponentProps<"select"> &
  ISelectProps &
  VariantProps<typeof selectStyles>;

export default forwardRef<HTMLSelectElement, SelectProps>(
  function Select(props, ref) {
    const {
      className = "",
      label = "",
      id = "",
      options = [],
      variant,
      colorscheme,
      padding,
      disabled,
      required,
      ...rest
    } = props;

    return (
      <div className="flex flex-col w-full gap-1">
        <label htmlFor={id} className="font-medium">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <select
          ref={ref}
          id={id}
          required={required}
          disabled={disabled}
          aria-disabled={disabled}
          className={cn(
            selectStyles({ variant, padding, colorscheme, className }),
          )}
          {...rest}
        >
          {options.map((opt) => (
            <option value={opt.value} key={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  },
);
