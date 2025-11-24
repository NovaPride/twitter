import { Link } from "react-router-dom";
import styled from "styled-components";

import { theme } from "@/styles/theme";

export const ChatsContainer = styled.div`
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const ChatWrapper = styled(Link)`
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

export const ChatName = styled.p`
  font-weight: 600;
  font-size: 18px;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ChatTag = styled.p`
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

export const ChatInfoWrapper = styled.div``;
