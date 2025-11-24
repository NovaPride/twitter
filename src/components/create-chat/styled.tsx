import styled from "styled-components";

export const CreateChatWrapper = styled.div`
  background-color: var(--bg-primary-color);
  position: relative;
  padding: 20px 50px;
  border-bottom: var(--border-gray);
  ::-webkit-scrollbar {
    width: 5px;
  }
`;

export const MainText = styled.p`
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 20px;
`;

export const DescrText = styled.p`
  font-weight: 300;
  font-size: 20px;
  margin-bottom: 30px;
  color: var(--text-secondary-color);
`;

export const CreateChatHeaderButton = styled.button`
  margin-left: 5px;
  width: 30px;
  height: 30px;
  border: 0;
  font-size: 24px;
  background-color: var(--secondary-color);
  border-radius: 100px;
  transition: 0.25s all;
  cursor: pointer;
  &:hover {
    background-color: var(--accents-color);
  }
`;

export const CreateChatModalWrapper = styled.div``;

export const FormWrapper = styled.form``;

export const NameInput = styled.input`
  height: 100%;
  font-size: 22px;
  margin-bottom: 10px;
  border: none;
  background-color: var(--bg-primary-color);
  &:focus {
    transition: 0s all;
    outline: none;
    border-bottom: 1px solid var(--accents-color);
  }

  &::placeholder {
    font-size: 22px;
    color: #828282;
  }
`;

export const FileInputWrapper = styled.div`
  cursor: pointer;
  background-color: var(--secondary-color);
  flex-shrink: 0;
  width: 60px;
  height: 60px;
  border-radius: 100%;
  filter: brightness(0.69);
  transition: 0.25s all;
  position: relative;

  &:hover {
    filter: brightness(1);
  }
`;

export const FileInputImage = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const FileInputLabel = styled.label`
  cursor: pointer;
  background-color: var(--secondary-color);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
`;

export const InformationWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 70px;
  margin-bottom: 20px;
`;

export const ErrorWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  left: 50px;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: end;
`;
