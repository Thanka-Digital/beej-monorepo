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
    "flex gap-2 items-center outline-offset-2 disabled:cursor-not-allowed disabled:pointer-events-none disabled:bg-gray-400 disabled:text-gray-800 disabled:border-gray-400 disabled:hover:bg-gray-400 disabled:hover:text-gray-800 disabled:hover:border-gray-400",
  ],
  {
    variants: {
      variant: variantForButton,
      padding: paddingVariantForButton,
      colorscheme: colorSchemeForButton,
    },
    compoundVariants: [
      {
        variant: "solid",
        colorscheme: "primary",
        className: "bg-primary",
      },
      {
        variant: "solid",
        colorscheme: "secondary",
        className: "bg-secondary",
      },
      {
        variant: "solid",
        colorscheme: "accent",
        className: "bg-accent",
      },
      {
        variant: "solid",
        colorscheme: "success",
        className: "bg-success",
      },
      {
        variant: "solid",
        colorscheme: "danger",
        className: "bg-danger",
      },
      {
        variant: "solid",
        colorscheme: "warning",
        className: "bg-warning",
      },
      {
        variant: "solid",
        colorscheme: "info",
        className: "bg-info",
      },
      {
        variant: "solid",
        colorscheme: "black",
        className: "bg-black",
      },
      {
        variant: "solid",
        colorscheme: "white",
        className: "bg-white",
      },
      {
        variant: "solid",
        colorscheme: "gray",
        className: "bg-gray",
      },
      {
        variant: "outline",
        colorscheme: "primary",
        className: "text-primary border-primary hover:bg-primary/20",
      },
      {
        variant: "outline",
        colorscheme: "secondary",
        className: "text-secondary border-secondary hover:bg-secondary/20",
      },
      {
        variant: "outline",
        colorscheme: "accent",
        className: "text-accent border-accent hover:bg-accent/20",
      },
      {
        variant: "outline",
        colorscheme: "success",
        className: "text-success border-success hover:bg-success/20",
      },
      {
        variant: "outline",
        colorscheme: "danger",
        className: "text-danger border-danger hover:bg-danger/20",
      },
      {
        variant: "outline",
        colorscheme: "warning",
        className: "text-warning border-warning hover:bg-warning/20",
      },
      {
        variant: "outline",
        colorscheme: "info",
        className: "text-info border-info hover:bg-info/20",
      },
      {
        variant: "outline",
        colorscheme: "black",
        className: "text-black border-black hover:bg-black/20",
      },
      {
        variant: "outline",
        colorscheme: "white",
        className: "text-white border-white hover:bg-white/20",
      },
      {
        variant: "outline",
        colorscheme: "gray",
        className: "text-gray border-gray hover:bg-gray/20",
      },
      {
        variant: "ghost",
        colorscheme: "primary",
        className: "text-primary bg-transparent hover:bg-primary/20",
      },
      {
        variant: "ghost",
        colorscheme: "secondary",
        className: "text-secondary bg-transparent hover:bg-secondary/20",
      },
      {
        variant: "ghost",
        colorscheme: "warning",
        className: "text-warning bg-transparent hover:bg-warning/20",
      },
      {
        variant: "ghost",
        colorscheme: "success",
        className: "text-success bg-transparent hover:bg-success/20",
      },
      {
        variant: "ghost",
        colorscheme: "danger",
        className: "text-danger bg-transparent hover:bg-danger/20",
      },
      {
        variant: "ghost",
        colorscheme: "accent",
        className: "text-accent bg-transparent hover:bg-accent/20",
      },
      {
        variant: "ghost",
        colorscheme: "info",
        className: "text-info bg-transparent hover:bg-info/20",
      },
      {
        variant: "ghost",
        colorscheme: "black",
        className: "text-black bg-transparent hover:bg-black/20",
      },
      {
        variant: "ghost",
        colorscheme: "white",
        className: "text-white bg-transparent hover:bg-white/20",
      },
      {
        variant: "ghost",
        colorscheme: "gray",
        className: "text-gray bg-transparent hover:bg-gray/20",
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
