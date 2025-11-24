import styled from "styled-components";

import { theme } from "@/styles/theme";

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
  transition: 0.05s all;
  opacity: 0;
  &.active {
    opacity: 1;
  }
`;

export const AdminText = styled.p`
  color: var(--text-secondary-color);
`;

export const UserName = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserNameWrapper = styled.div`
  display: flex;
  justify-items: center;
  align-items: baseline;
  gap: 8px;
`;

export const UserTag = styled.p`
  font-size: 18px;
  opacity: ${theme.opacity};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const UserLine = styled.div`
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

export const SearchedUsers = styled.div`
  margin: 20px 0;
  white-space: nowrap;
  &.freeze {
    pointer-events: none;
    filter: brightness(0.69);
  }
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

  padding: 0 5px;
  border-radius: 50px;
  transition: 0.05s all;

  &.selected {
    img {
      border: 3px solid var(--primary-color);
      transition: 0.05s all;
    }
  }
  &.clickable {
    cursor: pointer;
    &:hover {
      background-color: var(--secondary-color);
    }
  }
`;

export const RemoveButton = styled.button`
  flex-shrink: 0;
  width: 50px;
  height: 50px;
  border-radius: 50px;
  border: 0;
  cursor: pointer;
  margin-left: auto;
  background-color: transparent;
  transition: 0.05s all;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 42px;
  font-weight: 300;
  rotate: 45deg;
  opacity: 0.3;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  &:hover {
    opacity: 1;
    background-color: var(--primary-color);
  }
`;
