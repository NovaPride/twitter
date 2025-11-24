import { Link } from "react-router-dom";
import styled from "styled-components";

export const LogoContainer = styled(Link)`
  display: block;
  width: 50px;
  height: 50px;
  position: relative;
  svg {
    transition: 0.5s all;
  }
  svg.twitter > path {
    color: var(--accents-color);
  }
  svg.x > path {
    color: var(--text-primary-color);
  }
  &.light {
    svg.x {
      opacity: 0;
      scale: 0;
    }
  }
  &.dark {
    svg.twitter {
      opacity: 0;
      scale: 0;
    }
  }
`;

export const LogoSVG = styled.svg`
  position: absolute;
`;
