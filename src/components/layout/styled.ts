import styled from "styled-components";

import { theme } from "@/styles/theme";

export const ProfileWrapper = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 1520px;
  margin: 0 auto;
`;

export const GridInterface = styled.div`
  display: grid;
  height: 100vh;
  width: 100%;
  grid-template-areas:
    /* "header header header" */
    "aside-left main-section aside-right";
    /* "footer footer footer"; */
  /* grid-template-rows: var(--header-height) 1fr;  */
  grid-template-columns: 1fr 2fr 1fr; 
  transition: 0.2s all;
`;

export const NavigationWrapper = styled.aside`
  grid-area: aside-left;
  padding: ${theme.spacing.s10};

  @media ${theme.device.lg} {
    flex-basis: 0;
  }

  @media ${theme.device.sm} {
    position: absolute;
    transform: translate(-50%, 50%);
  }
`;

export const ContentWrapper = styled.section`
  grid-area: main-section;

  border-left: ${({ theme }) => theme.border.gray};
  border-right: ${({ theme }) => theme.border.gray};

  @media ${theme.device.md} {
    flex-basis: 80%;
  }
`;

export const SearchWrapper = styled.div`
  grid-area: aside-right;
  padding: ${theme.spacing.s20};

  @media ${theme.device.lg} {
    flex-basis: 0;
    padding: ${theme.spacing.s10};
  }

  @media ${theme.device.sm} {
    position: absolute;
    transform: translate(50%, 50%);
  }
`;

export const SearchDesktopWrapper = styled.div`
  @media ${theme.device.lg} {
    display: none;
  }
`;

export const SearchMobileWrapper = styled.div`
  display: none;

  & > button > img {
    filter: ${({ theme }) => theme.svgFill.primary};
  }

  @media ${theme.device.lg} {
    display: block;
  }
`;

export const NavigationMobileWrapper = styled.div`
  display: none;
  @media ${theme.device.md} {
    display: block;
  }
`;

export const NavigationDesktopWrapper = styled.div`
  @media ${theme.device.md} {
    display: none;
  }
`;
