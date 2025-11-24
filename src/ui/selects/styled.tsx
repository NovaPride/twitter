import styled from "styled-components";

export const StyledSelect = styled.select`
  width: 100%;
  border: var(--border-gray);
  padding: 20px;
  font-size: 18px;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
  appearance: none;
  color: rgba(116, 117, 127, 255);
  transition: all 0.2s linear;
`;

export const StyledOption = styled.option`
  color: rgba(116, 117, 127, 255);
`;
