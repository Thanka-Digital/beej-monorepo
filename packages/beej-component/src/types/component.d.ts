interface FormComponentVariantProps {
  textColor?:
    | "text-primary"
    | "text-secondary"
    | "text-danger"
    | "text-success"
    | "text-neutral";
  outlineColor?:
    | "outline-primary"
    | "outline-secondary"
    | "outline-danger"
    | "outline-success"
    | "outline-neutral";
  accentColor?:
    | "accent-primary"
    | "accent-secondary"
    | "accent-danger"
    | "accent-success"
    | "accent-neutral";
  bgColor?:
    | "bg-primary"
    | "bg-secondary"
    | "bg-danger"
    | "bg-success"
    | "bg-neutral";
}

type ColorScheme = "primary" | "secondary" | "danger" | "success" | "neutral";
