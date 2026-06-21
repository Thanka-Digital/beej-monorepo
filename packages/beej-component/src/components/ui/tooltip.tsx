import { cn } from "../../utils/cn";
import {
  arrow,
  autoPlacement,
  FloatingArrow,
  offset,
  useFloating,
  useHover,
  useInteractions,
} from "@floating-ui/react";
import { ComponentType, PropsWithChildren, useRef, useState } from "react";

const FloatingArrowComponent = FloatingArrow as ComponentType<any>;

interface ITooltipProps
  extends Pick<FormComponentVariantProps, "bgColor" | "textColor"> {
  message: string;
  className?: string;
}

export default function Tooltip(props: PropsWithChildren<ITooltipProps>) {
  const {
    children,
    message,
    bgColor = "bg-black",
    textColor = "text-white",
    className = "",
  } = props;
  const [open, setOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement | null>(null);
  const { floatingStyles, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      autoPlacement(),
      arrow({
        element: arrowRef,
      }),
      offset(8),
    ],
  });
  const hover = useHover(context, {
    mouseOnly: true,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  return (
    <>
      <div
        className={cn("w-fit", className)}
        ref={refs.setReference}
        {...getReferenceProps()}
      >
        {children}
        {open && (
          <div
            ref={refs.setFloating}
            // style={floatingStyles}
            className={cn(
              "px-2 py-1 text-xs rounded-md w-max",
              bgColor,
              textColor,
            )}
            {...getFloatingProps()}
          >
            {/* TODO: Color for floating arrow */}
            <FloatingArrowComponent ref={arrowRef} context={context} />
            {message}
          </div>
        )}
      </div>
    </>
  );
}
