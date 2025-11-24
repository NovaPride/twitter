import styled from "styled-components";

export const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
`;

export const ConfirmationButtonsWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  width: 100%;
  & > button {
    flex-grow: 1;
  }
`;

export const PreviewImage = styled.img`
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 100%;
  /* max-height: 200px; */
  object-fit: cover;
  &.avatar {
    aspect-ratio: 1/1;
    border-radius: 100%;
  }
`;

export const PlaceholderText = styled.div`
  text-align: center;
  color: var(--text-secondary-color);
  margin-bottom: 20px;
`;

export const UploadButton = styled.label`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.2s all;
  gap: 10px;
  &:hover {
    transition: 0.2s all;
    background: var(--primary-color);
  }
  color: white;
  background: var(--accents-color);
  border: none;
  min-height: 60px;
  border-radius: 40px;
  font-size: 20px;
  font-weight: 600;
  min-width: 100%;
`;

export const UploadInput = styled.input`
  display: none;
`;
