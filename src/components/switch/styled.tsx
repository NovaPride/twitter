import styled from "styled-components";

export const StyledSwitch = styled.label`
  position: relative;
  display: inline-block;
  width: 50px;
  height: 30px;

  &:hover {
    .switch-slider {
      border: var(--border-gray);
      border-width: 2px;

      &:before {
        border: var(--border-gray);
        border-width: 2px;
      }
    }
  }
`;

export const SwitchInput = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + .switch-slider {
    &:before {
      transform: translateX(20px);
    }
  }
`;

export const SwitchSpan = styled.span`
  position: absolute;

  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  border: var(--border-gray);
  border-width: 2px;
  border-radius: 34px;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: -2px;
    bottom: -2px;
    border: var(--border-gray);
    border-width: 2px;
    border-radius: 50%;
    background-color: var(--secondary-color);
  }
  &.switch-slider_loaded {
    transition: 0.4s;
    &:before {
      transition: 0.4s;
    }
  }
`;
