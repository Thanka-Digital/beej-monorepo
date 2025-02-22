import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps, forwardRef } from "react";
import { cn } from "../../utils/cn";
import {
  colorSchemeForTextFields,
  paddingVariantForTextFields,
  variantForTextFields,
} from "../util";

const textareaStyles = cva(
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
  }
);

interface ITextareaProps {
  label?: string;
  className?: string;
  id?: string;
}

type TextareaProps = ComponentProps<"textarea"> &
  ITextareaProps &
  VariantProps<typeof textareaStyles>;

export default forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(props, ref) {
    const {
      className = "",
      label = "",
      id = "",
      required,
      disabled,
      variant,
      colorscheme,
      padding,
      ...rest
    } = props;

    return (
      <div className="flex flex-col w-full gap-1">
        <label htmlFor={id} className="font-medium">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        <textarea
          id={id}
          ref={ref}
          required={required}
          disabled={disabled}
          aria-disabled={disabled}
          className={cn(
            textareaStyles({ variant, padding, colorscheme, className })
          )}
          {...rest}
        />
      </div>
    );
  }
);
