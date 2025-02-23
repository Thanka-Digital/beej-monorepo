import { Field, type FieldProps } from "../ui/field";
import { PasswordInput, type PasswordInputProps } from "../ui/password-input";

interface CustomPasswordInputProps
  extends Pick<
      FieldProps,
      "label" | "helperText" | "invalid" | "required" | "errorText"
    >,
    PasswordInputProps {}

export const CustomPasswordInput = (props: CustomPasswordInputProps) => {
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
      <PasswordInput {...rest} />
    </Field>
  );
};
