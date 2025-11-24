import styled from "styled-components";

import { theme } from "@/styles/theme";

export const StyledHeader = styled.div`
  min-height: 50px;
  padding: 20px;
  border-bottom: var(--border-gray);
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const SwitchWrapper = styled.div`
  margin-left: auto;
`;

export const Title = styled.div`
  font-size: 24px;
  font-weight: 700;
`;

export const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  &.pointerTitle{
    cursor: pointer;
  }
`;

export const NavigationMobileWrapper = styled.div`
  display: none;
  @media ${theme.device.sm} {
    display: block;
  }
`;

export const Description = styled.div`
  font-weight: 300;
  color: var(--text-secondary-color);
`;
