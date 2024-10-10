import { Switch } from "../switch/switch";
import { StyledHeader, Title, SwitchWrapper } from "./styled";
import MobileNavigation from "../navigation/mobile-navigation";

import { NavigationMobileWrapper } from "./styled";
import { Fragment, ReactNode } from "react";

export function Header({
  title,
  childrens,
}: {
  title: string;
  childrens?: ReactNode[];
}) {
  return (
    <StyledHeader>
      <NavigationMobileWrapper>
        <MobileNavigation />
      </NavigationMobileWrapper>
      <Title>{title}</Title>
      {childrens?.map((child, i) => <Fragment key={i}>{child}</Fragment>)}
      <SwitchWrapper>
        <Switch />
      </SwitchWrapper>
    </StyledHeader>
  );
}
