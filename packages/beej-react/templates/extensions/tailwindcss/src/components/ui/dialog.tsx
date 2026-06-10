import Button from "./button";
import {
  colorSchemeForButton,
  paddingVariantForButton,
  variantForButton,
} from "../util";
import { cn } from "../../utils/cn";

export interface IDialogProps {
  message: string;
  positive: {
    text: string;
    colorScheme?: keyof typeof colorSchemeForButton;
    variant?: keyof typeof variantForButton;
    padding?: keyof typeof paddingVariantForButton;
    className?: string;
    onClick: () => void;
  };
  negative: {
    text: string;
    colorScheme?: keyof typeof colorSchemeForButton;
    variant?: keyof typeof variantForButton;
    padding?: keyof typeof paddingVariantForButton;
    className?: string;
    onClick: () => void;
  };
  icon?: React.ReactNode;
}

export default function Dialog(props: IDialogProps) {
  const { message, icon, positive, negative } = props;

  return (
    <>
      <div className="fixed top-0 left-0 w-screen h-screen bg-gray-950/60 backdrop-blur-sm"></div>
      <div className="fixed z-20 p-5 transition-all -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
        <div className="flex flex-col justify-center gap-2 py-8 bg-white rounded-md shadow-lg px-7">
          <section className="flex flex-col items-center justify-center gap-5">
            <div className="flex flex-col items-center gap-2">
              {icon}
              <p className="font-semibold text-black">{message}</p>
            </div>
            <div className="flex items-center justify-end w-full gap-2">
              <Button
                className={cn("px-4 py-1 rounded-md", negative.className)}
                colorscheme={negative.colorScheme ?? "danger"}
                padding={negative.padding ?? "base"}
                variant={negative.variant ?? "solid"}
                onClick={negative.onClick}
              >
                {negative.text}
              </Button>
              <Button
                className={cn("px-4 py-1 rounded-md", positive.className)}
                colorscheme={positive.colorScheme ?? "success"}
                padding={positive.padding ?? "base"}
                variant={positive.variant ?? "solid"}
                onClick={positive.onClick}
              >
                {positive.text}
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
