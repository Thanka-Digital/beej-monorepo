import { createListCollection, SelectRootProps } from "@chakra-ui/react";
import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../ui/select";

interface CustomSelectProps extends Omit<SelectRootProps, "collection"> {
  label: string;
  placeholder?: string;
  options: { value: string; label: string }[];
}

export const CustomSelect = ({
  label,
  placeholder,
  options,
  ...rest
}: CustomSelectProps) => {
  const collection = createListCollection({
    items: options,
  });

  return (
    <SelectRoot
      {...rest}
      collection={collection}
      // size="sm"
      // width="320px"
      // variant={"subtle"}
    >
      <SelectLabel>{label}</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {collection.items.map((option) => (
          <SelectItem item={option} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
};
