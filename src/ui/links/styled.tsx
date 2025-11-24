import { Link } from "react-router-dom";
import styled from "styled-components";

type InlineLinkBlueType = {
  $align?: "left" | "right";
};

export const InlineLinkBlue = styled(Link)<InlineLinkBlueType>`
  color: var(--accents-color);
  text-decoration: none;
  text-align: ${(props) => props.$align || "left"};

  &:hover {
    color: var(--accents-color);
    text-decoration: underline;
  }
`;

export const BasicLinkDark = styled(Link)`
  font-size: 14px;
  color: var(--text-primary-color);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
