import { ComponentProps, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import {
  colorSchemeForTextFields,
  paddingVariantForTextFields,
  variantForTextFields,
} from "../util";

const inputStyles = cva(
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

interface IInputProps {
  className?: string;
  label?: string;
  id?: string;
}

type InputProps = ComponentProps<"input"> &
  IInputProps &
  VariantProps<typeof inputStyles>;

export default forwardRef<HTMLInputElement, InputProps>(
  function Input(props, ref) {
    const {
      className = "",
      label = "",
      id = "",
      variant,
      padding,
      colorscheme,
      required,
      disabled,
      ...rest
    } = props;

    return (
      <div className="flex flex-col w-full gap-1">
        <label htmlFor={id} className="font-medium">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <input
          ref={ref}
          id={id}
          className={cn(
            inputStyles({
              variant,
              padding,
              colorscheme,
              className,
            }),
          )}
          required={required}
          disabled={disabled}
          aria-disabled={disabled}
          {...rest}
        />
      </div>
    );
  },
);
