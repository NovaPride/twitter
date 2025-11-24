import { BLUE_SVG, DARK_SVG } from "@/constants/svg-colors";

import { device } from "./media";

export const theme = {
  colorScheme: "light",
  svgFill: {
    primary: DARK_SVG,
    active: BLUE_SVG,
  },
  layers: {
    l1: 1,
    l2: 10,
  },
  opacity: 0.6,
  blur: "6px",
  device,
};

export const themeBase: typeof theme = {
  ...theme,
};
