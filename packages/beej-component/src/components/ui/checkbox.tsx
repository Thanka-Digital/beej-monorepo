import {
  getAccentColorFromScheme,
  getOutlineColorFromScheme,
} from "../../utils/helper";
import { cn } from "../../utils/cn";

interface ICheckboxProps
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

export default function Checkbox(props: ICheckboxProps) {
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
        type="checkbox"
        name={name}
        className={cn(
          "rounded-md p-2 disabled:cursor-not-allowed",
          textColor,
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

interface ICheckboxGroupProps
  extends Pick<FormComponentVariantProps, "textColor">,
    React.HTMLProps<HTMLInputElement> {
  name: string;
  checkboxOptions: { label: string; id: string; value: string | number }[];
  className?: string;
  flexDirection?: "flex-row" | "flex-col";
  colorScheme?: ColorScheme;
}

export function CheckboxGroup(props: ICheckboxGroupProps) {
  const {
    flexDirection = "flex-row",
    className = "",
    colorScheme = "primary",
    textColor = "text-neutral",
    name,
    checkboxOptions,
    ...rest
  } = props;

  return (
    <div className={cn("flex gap-2", flexDirection, className)}>
      {checkboxOptions.map((opt) => (
        <Checkbox
          key={opt.id}
          label={opt.label}
          id={opt.id}
          name={name}
          value={opt.value}
          textColor={textColor}
          accentColor={getAccentColorFromScheme(colorScheme)}
          outlineColor={getOutlineColorFromScheme(colorScheme)}
          {...rest}
        />
      ))}
    </div>
  );
}
