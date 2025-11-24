import styled, { css } from "styled-components";

import { theme } from "@/styles/theme";

const Button = css`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all;
  gap: 10px;
  &:hover {
    transition: 0.2s all;
  }
`;

const primaryStyles = css`
  color: white;
  background: var(--accents-color);
  border: none;
  &:hover {
    background: var(--primary-color);
  }

  &:disabled {
    opacity: ${theme.opacity};
  }
`;

const outlinedStyles = css`
  border: var(--border-gray);
  background-color: transparent;
`;

const secondaryStyles = css`
  border: none;
  color: var(--text-secondary-color);
  background-color: var(--secondary-color);
`;

const extraSmallStyles = css`
  min-height: 45px;
  min-width: 45px;

  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
`;

const smallStyles = css`
  min-height: 40px;
  min-width: 120px;

  border-radius: 50px;
  font-size: 18px;
  font-weight: 700;
`;

const mediumStyles = css`
  min-height: 50px;
  /* min-width: 150px; */
  border-radius: 25px;

  font-size: 18px;
  font-weight: 700;
  @media ${theme.device.md} {
    font-size: 15px;
    min-height: 40px;
  }
`;

const largeStyles = css`
  min-height: 60px;
  border-radius: 40px;

  font-size: 20px;
  font-weight: 600;

  min-width: 100%;
`;

type StyledButtonType = {
  $variant: "primary" | "outlined" | "secondary";
  $size: "extra-small" | "small" | "medium" | "large";
};

export const StyledButton = styled.button<StyledButtonType>`
  ${Button}

  ${({ $variant }) => $variant === "primary" && primaryStyles}
  ${({ $variant }) => $variant === "outlined" && outlinedStyles}
  ${({ $variant }) => $variant === "secondary" && secondaryStyles}
  
  ${({ $size }) => $size === "extra-small" && extraSmallStyles}
  ${({ $size }) => $size === "small" && smallStyles}
  ${({ $size }) => $size === "medium" && mediumStyles}
  ${({ $size }) => $size === "large" && largeStyles}
`;

export const Image = styled.img`
  width: 30px;
  height: 30px;
`;
