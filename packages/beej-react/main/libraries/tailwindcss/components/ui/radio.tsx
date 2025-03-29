import { cn } from "../../utils/cn";

interface IRadioProps
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

export default function Radio(props: IRadioProps) {
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
        type="radio"
        name={name}
        className={cn(
          "rounded-md border p-2 disabled:cursor-not-allowed",
          borderColor,
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
  extends Pick<
    FormComponentVariantProps,
    "accentColor" | "textColor" | "borderColor"
  > {
  name: string;
  radioOptions: { label: string; id: string; value: string }[];
  className?: string;
  flexDirection?: "flex-row" | "flex-col";
}

export function RadioGroup(props: IRadioGroupProps) {
  const {
    flexDirection = "flex-row",
    className = "",
    accentColor,
    textColor,
    borderColor,
    name,
    radioOptions,
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
          accentColor={accentColor}
          borderColor={borderColor}
          textColor={textColor}
        />
      ))}
    </div>
  );
}
