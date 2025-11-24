import { Fragment, ReactNode } from "react";

import MobileNavigation from "@/components/navigation/mobile-navigation";
import { Switch } from "@/components/switch/switch";

import {
  Description,
  NavigationMobileWrapper,
  StyledHeader,
  SwitchWrapper,
  Title,
  TitleWrapper,
} from "./styled";

type HeaderProps = {
  title?: string;
  description?: string;
  titleOnClick?: () => void;
  childrens?: ReactNode[];
};

export function Header({ title, description, titleOnClick, childrens }: HeaderProps) {
  return (
    <StyledHeader>
      <NavigationMobileWrapper>
        <MobileNavigation />
      </NavigationMobileWrapper>
      <TitleWrapper onClick={titleOnClick} className={titleOnClick && "pointerTitle"}>
        <Title>{title}</Title>
        {description && <Description>{description}</Description>}
      </TitleWrapper>
      {childrens?.map((child, i) => <Fragment key={i}>{child}</Fragment>)}
      <SwitchWrapper>
        <Switch />
      </SwitchWrapper>
    </StyledHeader>
  );
}
