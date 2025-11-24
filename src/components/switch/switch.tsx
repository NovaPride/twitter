import { useEffect, useState } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { getThemeSelector } from "@/redux/selectors/theme-selectors";
import { toggleTheme } from "@/redux/slices/theme-slice";

import { StyledSwitch, SwitchInput, SwitchSpan } from "./styled";

export function Switch() {
  const dispatch = useAppDispatch();
  const theme = useAppSelector(getThemeSelector);
  const [checked, setChecked] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setChecked(theme === "dark");
  }, [theme]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const handleThemeChange = () => {
    setChecked((prev) => !prev);
    dispatch(toggleTheme());
  };

  return (
    <StyledSwitch className="switch" htmlFor="switch-theme">
      <SwitchInput
        id="switch-theme"
        type="checkbox"
        checked={checked}
        onChange={handleThemeChange}
      />
      <SwitchSpan
        className={
          isLoaded ? "switch-slider switch-slider_loaded" : "switch-slider"
        }
      />
    </StyledSwitch>
  );
}
