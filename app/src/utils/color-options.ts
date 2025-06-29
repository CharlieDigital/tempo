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

export const lighterOption: Record<ItemColor, string> = {
  "yellow-8": "yellow-3",
  "deep-orange": "deep-orange-3",
  orange: "orange-3",
  "red-8": "red-3",
  pink: "pink-3",
  purple: "purple-3",
  indigo: "indigo-3",
  "indigo-10": "indigo-3",
  blue: "blue-3",
  "light-blue-8": "light-blue-3",
  "cyan-8": "cyan-3",
  "teal-8": "teal-3",
  "light-green-9": "light-green-3",
  "lime-8": "lime-3",
  grey: "grey-3",
  "blue-grey-8": "blue-grey-3",
};

export const lightestOption: Record<ItemColor, string> = {
  "yellow-8": "yellow-2",
  "deep-orange": "deep-orange-2",
  orange: "orange-2",
  "red-8": "red-2",
  pink: "pink-2",
  purple: "purple-2",
  indigo: "indigo-2",
  "indigo-10": "indigo-2",
  blue: "blue-2",
  "light-blue-8": "light-blue-2",
  "cyan-8": "cyan-2",
  "teal-8": "teal-2",
  "light-green-9": "light-green-2",
  "lime-8": "lime-2",
  grey: "grey-2",
  "blue-grey-8": "blue-grey-2",
};

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
  | "darken25"
  | "darken75";

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
    darken75: lighten(baseColor, -75),
  };

  return acc;
}, {} as Record<ItemColor, Record<ColorStyle, string>>);
