import { colors } from "quasar";

/**
 * The valid place color values.
 */
export type ItemColor =
  | "yellow-8"
  | "deep-orange"
  | "orange"
  | "red-8"
  | "pink"
  | "purple"
  | "indigo"
  | "indigo-10"
  | "blue"
  | "light-blue-8"
  | "cyan-8"
  | "teal-8"
  | "light-green-9"
  | "lime-8"
  | "grey"
  | "blue-grey-8";

/**
 * Color options to use for dropdowns and selectors.
 */
export const colorOptions: { value: ItemColor; label: string }[] = [
  { value: "yellow-8", label: "Yellow" },
  { value: "orange", label: "Orange" },
  { value: "deep-orange", label: "Deep Orange" },
  { value: "red-8", label: "Red" },
  { value: "pink", label: "Pink" },
  { value: "purple", label: "Purple" },
  { value: "indigo", label: "Indigo" },
  { value: "indigo-10", label: "Dark Indigo" },
  { value: "blue", label: "Blue" },
  { value: "light-blue-8", label: "Light Blue" },
  { value: "cyan-8", label: "Cyan" },
  { value: "teal-8", label: "Teal" },
  { value: "light-green-9", label: "Light Green" },
  { value: "lime-8", label: "Lime" },
  { value: "grey", label: "Grey" },
  { value: "blue-grey-8", label: "Blue-Grey" },
];

const { getPaletteColor, lighten } = colors;

export type ColorStyle =
  | "base"
  | "light92"
  | "light85"
  | "light75"
  | "light50"
  | "light25"
  | "darken25";

/**
 * Pre-compute the CSS values for each of the color options as well.
 */
export const colorCssMap: Record<
  ItemColor,
  Record<ColorStyle, string>
> = colorOptions.reduce((acc, color) => {
  const baseColor = getPaletteColor(color.value);

  acc[color.value] = {
    base: baseColor,
    light92: lighten(baseColor, 92),
    light85: lighten(baseColor, 85),
    light75: lighten(baseColor, 75),
    light50: lighten(baseColor, 50),
    light25: lighten(baseColor, 25),
    darken25: lighten(baseColor, -25),
  };

  return acc;
}, {} as Record<ItemColor, Record<ColorStyle, string>>);
