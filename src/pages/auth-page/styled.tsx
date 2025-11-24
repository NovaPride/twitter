import styled from "styled-components";

import twitterBackground from "@/assets/imgs/back-twitter.webp";
import xBackground from "@/assets/imgs/back-x.webp";
import { theme } from "@/styles/theme";

export const ProfileWrapper = styled.main`
  position: relative;
  display: flex;
  justify-content: center;
  max-width: 1520px;
  margin: 0 auto;
`;

export const Wrapper = styled.section`
  grid-area: main-section;
  overflow-y: auto;
  position: relative;
  border-radius: 20px;
  background-color: rgba(var(--bg-primary-rgb), 0.88);
  display: flex;
  height: calc(100vh);
  justify-content: center;
  @media ${theme.device.xs} {
    padding: 0 20px;
  }
`;

export const AuthFooterWrapper = styled.div`
  color: black;
  grid-area: footer;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  height: 50px;

  @media ${theme.device.xl} {
    padding: 0 20px;
  }

  @media ${theme.device.lg} {
    padding-top: 10px;
    flex-wrap: wrap;
    margin-top: 50px;
  }
`;

type BackgroundProps = {
  $bgname: string;
};

export const Background = styled.div<BackgroundProps>`
  background: ${({ $bgname }) => {
    switch ($bgname) {
      case "light":
        return `url(${twitterBackground}) center center / cover no-repeat`;
      case "dark":
        return `url(${xBackground}) center center / cover no-repeat`;
      default:
        return "pink";
    }
  }};
  filter: blur(8px) brightness(80%);
  transform: scale(1.1);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -666;
`;

export const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

export const AuthWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 50px;

  @media ${theme.device.lg} {
    margin: 0;
    padding: 0 20px;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 25px;
`;

export const Header1 = styled.h1`
  font-weight: 900;
  font-size: 84px;
  margin-top: 55px;
  text-align: center;

  @media ${theme.device.xl} {
    font-size: 42px;
    margin-top: 20px;
  }
`;

export const Header2 = styled.h2`
  font-weight: 900;
  font-size: 42px;
  margin-top: 45px;
  text-align: center;

  @media ${theme.device.xl} {
    font-size: 30px;
    margin-top: 20px;
  }
`;

export const PolicyText = styled.p`
  max-width: 370px;
  font-size: 14px;
  margin-top: 30px;
  line-height: 143%;
`;

export const LoginText = styled.p`
  margin-top: 20px;
`;
