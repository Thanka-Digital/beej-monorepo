import { Textarea, type TextareaProps } from "@chakra-ui/react";
import { Field, type FieldProps } from "../ui/field";

interface CustomTextAreaProps
  extends Pick<
      FieldProps,
      "label" | "helperText" | "invalid" | "required" | "errorText"
    >,
    TextareaProps {}

export const CustomTextArea = (props: CustomTextAreaProps) => {
  const {
    label,
    helperText,
    invalid,
    required = true,
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
      <Textarea {...rest} />
    </Field>
  );
};
