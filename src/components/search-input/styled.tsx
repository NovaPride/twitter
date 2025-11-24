import styled from "styled-components";

export const SearchbarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  position: relative;
  background: var(--secondary-color);
  border-radius: 30px;
  min-height: 55px;
  width: 100%;
`;

export const SearchText = styled.input`
  font-size: 18px;
  padding-left: 50px;
  background-color: transparent;
  border: none;
  outline: none;
  width: 100%;

  &::placeholder {
    color: var(--text-secondary-color);
  }
`;

export const SearchIcon = styled.svg`
  width: 20px;
  height: 20px;
  left: 20px;
  position: absolute;
`;
