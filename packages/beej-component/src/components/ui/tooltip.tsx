import {
  getBgColorFromScheme,
  getCssColorFromScheme,
} from "../../utils/helper";
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
import { PropsWithChildren, useCallback, useState } from "react";

interface ITooltipProps {
  message: string;
  className?: string;
  colorScheme?: ColorScheme;
}

export default function Tooltip(props: PropsWithChildren<ITooltipProps>) {
  const { children, message, className = "", colorScheme = "primary" } = props;
  const [open, setOpen] = useState(false);
  const [arrowElement, setArrowElement] = useState<SVGSVGElement | null>(null);
  const arrowColor = getCssColorFromScheme(colorScheme);
  const { floatingStyles, refs, context } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      autoPlacement(),
      arrow({
        element: arrowElement,
      }),
      offset(8),
    ],
  });
  const hover = useHover(context, {
    mouseOnly: true,
  });
  const { getReferenceProps, getFloatingProps } = useInteractions([hover]);

  const setReferenceRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setReference(node);
    },
    [refs],
  );

  const setFloatingRef = useCallback(
    (node: HTMLElement | null) => {
      refs.setFloating(node);
    },
    [refs],
  );

  const setArrowRef = useCallback((node: SVGSVGElement | null) => {
    setArrowElement(node);
  }, []);

  return (
    <>
      <div
        className={cn("w-fit text-neutral", className)}
        ref={setReferenceRef}
        {...getReferenceProps()}
      >
        {children}
        {open && (
          <div
            ref={setFloatingRef}
            style={floatingStyles}
            className={cn(
              "px-2 py-1 text-xs rounded-md w-max text-white",
              getBgColorFromScheme(colorScheme),
            )}
            {...getFloatingProps()}
          >
            <FloatingArrow
              ref={setArrowRef}
              context={context}
              fill={arrowColor}
              stroke={arrowColor}
            />
            {message}
          </div>
        )}
      </div>
    </>
  );
}
