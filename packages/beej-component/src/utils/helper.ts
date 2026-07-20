export function getAccentColorFromScheme(scheme: ColorScheme) {
  let accentColor: FormComponentVariantProps["accentColor"];

  switch (scheme) {
    case "primary":
      accentColor = "accent-primary";
      break;
    case "secondary":
      accentColor = "accent-secondary";
      break;
    case "danger":
      accentColor = "accent-danger";
      break;
    case "success":
      accentColor = "accent-success";
      break;
    default:
      accentColor = "accent-neutral";
      break;
  }

  return accentColor;
}

export function getOutlineColorFromScheme(scheme: ColorScheme) {
  let outlineColor: FormComponentVariantProps["outlineColor"];

  switch (scheme) {
    case "primary":
      outlineColor = "outline-primary";
      break;
    case "secondary":
      outlineColor = "outline-secondary";
      break;
    case "danger":
      outlineColor = "outline-danger";
      break;
    case "success":
      outlineColor = "outline-success";
      break;
    default:
      outlineColor = "outline-neutral";
      break;
  }

  return outlineColor;
}

export function getBgColorFromScheme(scheme: ColorScheme) {
  let bgColor: FormComponentVariantProps["bgColor"];

  switch (scheme) {
    case "primary":
      bgColor = "bg-primary";
      break;
    case "secondary":
      bgColor = "bg-secondary";
      break;
    case "danger":
      bgColor = "bg-danger";
      break;
    case "success":
      bgColor = "bg-success";
      break;
    default:
      bgColor = "bg-neutral";
      break;
  }

  return bgColor;
}

export function getCssColorFromScheme(scheme: ColorScheme) {
  switch (scheme) {
    case "primary":
      return "var(--color-primary)";
    case "secondary":
      return "var(--color-secondary)";
    case "danger":
      return "var(--color-danger)";
    case "success":
      return "var(--color-success)";
    default:
      return "var(--color-neutral)";
  }
}
