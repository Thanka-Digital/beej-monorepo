import { ComponentProps, forwardRef } from "react";
import { cva, VariantProps } from "class-variance-authority";

import { cn } from "../../utils/cn";
import {
  colorSchemeForButton,
  paddingVariantForButton,
  variantForButton,
} from "../util";

const buttonStyles = cva(
  [
    "flex cursor-pointer rounded-md gap-2 items-center outline-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-gray-400 disabled:text-gray-800 disabled:border-gray-400 disabled:hover:bg-gray-400 disabled:hover:text-gray-800 disabled:hover:border-gray-400",
  ],
  {
    variants: {
      variant: variantForButton,
      padding: paddingVariantForButton,
      colorscheme: colorSchemeForButton,
    },
    compoundVariants: [
      // SOLID variant combination
      {
        variant: "solid",
        colorscheme: "primary",
        className: "bg-primary hover:bg-primary-dark text-white",
      },
      {
        variant: "solid",
        colorscheme: "secondary",
        className: "bg-secondary hover:bg-secondary-dark text-white",
      },
      {
        variant: "solid",
        colorscheme: "success",
        className: "bg-success hover:bg-success-dark text-white",
      },
      {
        variant: "solid",
        colorscheme: "danger",
        className: "bg-danger hover:bg-danger-dark text-white",
      },
      {
        variant: "solid",
        colorscheme: "neutral",
        className: "bg-neutral hover:bg-neutral-dark",
      },

      // OUTLINE variant combination
      {
        variant: "outline",
        colorscheme: "primary",
        className:
          "text-primary border-primary hover:bg-primary/20 dark:hover:bg-primary/40",
      },
      {
        variant: "outline",
        colorscheme: "secondary",
        className:
          "text-secondary border-secondary hover:bg-secondary/20 dark:hover:bg-secondary/40",
      },
      {
        variant: "outline",
        colorscheme: "success",
        className:
          "text-success border-success hover:bg-success/20 dark:hover:bg-success/40",
      },
      {
        variant: "outline",
        colorscheme: "danger",
        className:
          "text-danger border-danger hover:bg-danger/20 dark:hover:bg-danger/40",
      },
      {
        variant: "outline",
        colorscheme: "neutral",
        className:
          "text-neutral border-neutral hover:bg-neutral/20 dark:hover:bg-neutral/40",
      },

      // GHOSTS variant combination
      {
        variant: "ghost",
        colorscheme: "primary",
        className: "text-primary hover:bg-primary/20 dark:hover:bg-primary/40",
      },
      {
        variant: "ghost",
        colorscheme: "secondary",
        className:
          "text-secondary hover:bg-secondary/20 dark:hover:bg-secondary/40",
      },
      {
        variant: "ghost",
        colorscheme: "neutral",
        className: "text-neutral hover:bg-neutral/20 dark:hover:bg-neutral/40",
      },
      {
        variant: "ghost",
        colorscheme: "success",
        className: "text-success hover:bg-success/20 dark:hover:bg-success/40",
      },
      {
        variant: "ghost",
        colorscheme: "danger",
        className: "text-danger hover:bg-danger/20 dark:hover:bg-danger/40",
      },
    ],
    defaultVariants: {
      variant: "solid",
      colorscheme: "primary",
      padding: "base",
    },
  },
);

interface IButtonProps {
  children: React.ReactNode | string;
  className?: string;
  processing?: boolean;
  processingText?: string;
}

type ButtonProps = ComponentProps<"button"> &
  IButtonProps &
  VariantProps<typeof buttonStyles>;

export default forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(props, ref) {
    const {
      type = "button",
      onClick,
      disabled = false,
      processing = false,
      processingText = "Processing...",
      className = "",
      children,
      variant,
      padding,
      colorscheme,
      ...rest
    } = props;

    return (
      <button
        ref={ref}
        aria-disabled={disabled}
        role="button"
        disabled={disabled}
        type={type}
        onClick={onClick}
        className={cn(
          buttonStyles({ variant, colorscheme, padding, className }),
        )}
        {...rest}
      >
        {processing ? processingText : children}
      </button>
    );
  },
);
