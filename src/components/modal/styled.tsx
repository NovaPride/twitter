import styled from "styled-components";

import { theme } from "@/styles/theme";

export const Overlay = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  backdrop-filter: blur(${theme.blur});
  z-index: ${theme.layers.l2};
  height: 100vh;
  overflow-y: auto;
`;

export const StyledModal = styled.main`
  background-color: var(--bg-primary-color);
  max-width: 400px;
  /* width: 1000px; */
  border: var(--border-gray);
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  padding-top: 30px;
  border-radius: 10px;
  &.modal_top {
    top: 0;
    transform: translate(-50%, 0);
  }
`;

export const ModalClose = styled.div`
  position: absolute;
  top: 0px;
  right: 7px;
  font-size: 30px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    transform: scale(1.2);
    transition: 0.3s;
  }
`;
