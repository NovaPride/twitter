import { ThemeType } from "@/types";

type State = {
  themeReducer: ThemeType;
};

export const getThemeSelector = (state: State) => state.themeReducer.theme;
