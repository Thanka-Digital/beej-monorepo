import { Field, type FieldProps } from "../ui/field";
import { PinInput, type PinInputProps } from "../ui/pin-input";

interface CustomPasswordInputProps
  extends Pick<
      FieldProps,
      "label" | "helperText" | "invalid" | "required" | "errorText"
    >,
    PinInputProps {}

export const CustomPinInput = (props: CustomPasswordInputProps) => {
  const {
    label,
    helperText,
    required = true,
    invalid,
    errorText,
    ...rest
  } = props;

  return (
    <Field
      label={label}
      helperText={helperText}
      required={required}
      invalid={invalid}
      errorText={errorText}
    >
      <PinInput {...rest} />
    </Field>
  );
};
