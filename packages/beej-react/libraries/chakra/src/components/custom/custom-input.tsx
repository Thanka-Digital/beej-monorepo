import { Input, type InputProps } from "@chakra-ui/react";

import { Field, type FieldProps } from "../ui/field";
import { InputGroup, type InputGroupProps } from "../ui/input-group";

interface CustomInputProps
  extends Pick<
      InputGroupProps,
      "startElement" | "endElement" | "startElementProps" | "endElementProps"
    >,
    Pick<
      FieldProps,
      "label" | "helperText" | "invalid" | "required" | "errorText"
    >,
    InputProps {}

export const CustomInput = (props: CustomInputProps) => {
  const {
    startElement,
    endElement,
    startElementProps,
    endElementProps,
    label,
    helperText,
    required = true,
    invalid,
    errorText,
    colorPalette,
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
      <InputGroup
        startElement={startElement}
        endElement={endElement}
        startElementProps={startElementProps}
        endElementProps={endElementProps}
        colorPalette={colorPalette}
        w={"full"}
      >
        <Input {...rest} />
      </InputGroup>
    </Field>
  );
};
