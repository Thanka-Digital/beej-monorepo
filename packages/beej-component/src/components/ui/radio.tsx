import {
  getAccentColorFromScheme,
  getOutlineColorFromScheme,
} from "../../utils/helper";
import { cn } from "../../utils/cn";

interface IRadioProps
  extends Pick<
      FormComponentVariantProps,
      "accentColor" | "outlineColor" | "textColor"
    >,
    React.HTMLProps<HTMLInputElement> {
  className?: string;
  label: string;
  name: string;
  id: string;
}

export default function Radio(props: IRadioProps) {
  const {
    className = "",
    label,
    id,
    name,
    textColor = "text-neutral",
    accentColor = "accent-primary",
    outlineColor = "outline-primary",
    ...rest
  } = props;

  return (
    <div className="flex gap-1">
      <input
        id={id}
        type="radio"
        name={name}
        className={cn(
          "disabled:cursor-not-allowed",
          outlineColor,
          accentColor,
          className,
        )}
        {...rest}
      />
      <label htmlFor={id} className={cn("font-medium", textColor)}>
        {label}
      </label>
    </div>
  );
}

interface IRadioGroupProps
  extends Pick<FormComponentVariantProps, "textColor">,
    React.HTMLProps<HTMLInputElement> {
  name: string;
  radioOptions: { label: string; id: string; value: string | number }[];
  className?: string;
  flexDirection?: "flex-row" | "flex-col";
  colorScheme?: ColorScheme;
}

export function RadioGroup(props: IRadioGroupProps) {
  const {
    flexDirection = "flex-row",
    className = "",
    textColor,
    colorScheme = "primary",
    name,
    radioOptions,
    ...rest
  } = props;

  return (
    <div className={cn("flex gap-2", flexDirection, className)}>
      {radioOptions.map((opt) => (
        <Radio
          key={opt.id}
          label={opt.label}
          id={opt.id}
          name={name}
          value={opt.value}
          accentColor={getAccentColorFromScheme(colorScheme)}
          outlineColor={getOutlineColorFromScheme(colorScheme)}
          textColor={textColor}
          {...rest}
        />
      ))}
    </div>
  );
}
