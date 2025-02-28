import { cn } from "../../utils/cn";

interface ICheckboxProps
  extends Pick<
      FormComponentVariantProps,
      "accentColor" | "borderColor" | "textColor"
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
    textColor,
    accentColor,
    // variant,
    borderColor,
    ...rest
  } = props;

  return (
    <div className="flex gap-1">
      <input
        id={id}
        type="checkbox"
        name={name}
        className={cn(
          "rounded-md border p-2 disabled:cursor-not-allowed",
          borderColor,
          accentColor,
          className
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
  extends Pick<
    FormComponentVariantProps,
    "accentColor" | "textColor" | "borderColor"
  > {
  name: string;
  checkboxOptions: { label: string; id: string; value: string }[];
  className?: string;
  flexDirection?: "flex-row" | "flex-col";
}

export function CheckboxGroup(props: ICheckboxGroupProps) {
  const {
    flexDirection = "flex-row",
    className = "",
    accentColor,
    textColor,
    borderColor,
    name,
    checkboxOptions,
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
          accentColor={accentColor}
          borderColor={borderColor}
          textColor={textColor}
        />
      ))}
    </div>
  );
}
