import styled from "styled-components";

import { theme } from "@/styles/theme";

export const FormWrapper = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  max-width: 750px;
  margin: 20px auto 0;

  @media ${theme.device.md} {
    gap: 10px;
    padding: 0 20px;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 25px;
  padding-bottom: 20px;
`;

export const LogoWrapper = styled.div`
  margin: 0 auto;
`;

export const SelectWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  select {
    color: black;
    option {
      color: black;
    }
  }

  @media ${theme.device.sm} {
    flex-direction: column;
  }
`;

export const Header1 = styled.h1`
  font-weight: 700;
  font-size: 30px;
  margin-top: 45px;

  @media ${theme.device.md} {
    margin-top: 10px;
    text-align: center;
  }
`;

export const Header2 = styled.h2`
  font-weight: 700;
  font-size: 18px;
`;

export const Text = styled.p`
  line-height: 150%;
  opacity: ${theme.opacity};
`;

export const Background = styled.div`
  background: var(--bg-primary-color);
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: -666;
`;
