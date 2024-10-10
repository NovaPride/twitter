import styled from "styled-components";

import { theme } from "@/styles/theme";

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
  &:hover {
    background-color: var(--accents-color);
  }
`;

export const CreateChatModalWrapper = styled.div``;

export const FormWrapper = styled.form``;

// export const Textarea = styled.textarea`
//   width: 100%;
//   border: none;
//   resize: none;
//   height: 100px;
//   font-size: 18px;
//   margin-bottom: 10px;
//   background-color: var(--bg-primary-color);
//   &:focus {
//     transition: 0s all;
//     outline: none;
//     border-bottom: 1px solid var(--accents-color);
//   }

//   &::placeholder {
//     font-size: 22px;
//     color: #828282;
//   }
// `;

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

export const SearchedTweets = styled.div`
  margin: 20px 0;
  white-space: nowrap;
`;

export const Wrapper = styled.div`
  color: var(--text-primary-color);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  padding: 0 5px;
  border-radius: 50px;
  transition: 0.15s all;
  &:hover {
    background-color: var(--secondary-color);
  }
  &.selected {
    img {
      border: 3px solid var(--primary-color);
      transition: 0.15s all;
    }
  }
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  position: relative;
`;

export const Checkmark = styled.svg`
  display: block;
  position: absolute;
  width: 25px;
  height: 25px;
  border-radius: 200px;
  border: 1px solid var(--secondary-color);
  background-color: var(--primary-color);
  color: #fff;
  padding: 5px;
  bottom: -10%;
  right: -10%;
  transition: 0.15s all;
  opacity: 0;
  &.active{
    opacity: 1;
  }
`;

export const UserName = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserTag = styled.p`
  font-size: 18px;
  opacity: ${theme.opacity};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserText = styled.p`
  font-size: 18px;
  max-height: 150px;
  margin-bottom: 15px;
  border-bottom: var(--border-gray);
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
