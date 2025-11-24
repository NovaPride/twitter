import styled from "styled-components";

export const ChatWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  > :first-child {
    flex-shrink: 0;
  }
`;

export const InformationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  gap: 5px;
`;

export const AvatarWrapper = styled.div`
  height: 65px;
  width: 65px;
`;

export const Name = styled.input`
  font-weight: 700;
  font-size: 22px;
  background-color: transparent;
  border: 0;
  & {
    text-align: center;
  }
`;

export const MembersCount = styled.div`
  color: var(--text-secondary-color);
`;

export const CreatedAt = styled.div`
  color: var(--text-secondary-color);
`;

export const MembersWrapper = styled.div`
  padding: 10px 40px;
`;

export const AddButtonAvatar = styled.div`
  border: 0;
  border-radius: 50px;
  width: 50px;
  height: 50px;
  background-color: var(--secondary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: 300;
  transition: 0.05s all;
`;

export const AddUserButtonWrapper = styled.div`
  padding: 10px 5px;
  gap: 10px;
  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  border-radius: 50px;
  transition: 0.05s all;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    background-color: var(--secondary-color);
    ${AddButtonAvatar} {
      background-color: var(--primary-color);
    }
  }
`;

export const AddButtonText = styled.div`
  border: 0;
  border-radius: 50px;
  display: flex;
  align-items: center;
  font-weight: 700;
  font-size: 18px;
`;

export const AvatarWrapperWithChange = styled.div`
  cursor: pointer;
  position: relative;
  &:hover {
    :first-child {
      filter: brightness(0.69);
    }
    :last-child {
      opacity: 1;
    }
  }
`;

export const ImageUpload = styled.img`
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  transition: 0.2s all;
`;
