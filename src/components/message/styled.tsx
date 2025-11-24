import { Link } from "react-router-dom";
import styled from "styled-components";

export const AvatarWrapperLink = styled(Link)`
  width: 40px;
  height: 40px;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  cursor: pointer;
`;

export const Image = styled.img`
  border-radius: 20px;
  margin-top: 15px;
  max-height: 330px;
  width: auto;
  max-width: 100%;
`;

export const MessageText = styled.p`
  margin-top: 5px;
  width: 100%;
  max-width: 400px;
  overflow-wrap: break-word;
  overflow-y: auto;
`;

export const UserInfoWrapperLink = styled(Link)`
  display: flex;
  gap: 10px;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
`;

export const UserName = styled.p`
  font-weight: 400;
  font-size: 16px;
  color: var(--accents-color);
`;

export const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 85px;
  background-color: var(--secondary-color);
  border-radius: 15px;
  border-bottom-left-radius: 0;
  padding: 8px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    bottom: -7px;
    left: -5px;
    border-width: 7px;
    border-style: solid;
    transform: rotate(315deg);
    border-color: var(--secondary-color) transparent transparent transparent;
  }
`;

export const MessageWrapper = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-end;
  &.messageByUser {
    justify-content: flex-end;
    ${AvatarWrapperLink} {
      display: none;
    }
    ${UserName} {
      display: none;
    }
    ${BodyWrapper} {
      background-color: var(--accents-color);
      border-bottom-left-radius: 15px;
      border-bottom-right-radius: 0;
      &::before {
        content: "";
        position: absolute;
        bottom: -7px;
        left: calc(100% - 10px);
        border-width: 7px;
        border-style: solid;
        transform: rotate(45deg);
        border-color: var(--accents-color) transparent transparent transparent;
      }
    }
  }
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const TimeText = styled.div`
  margin-left: auto;
  transform: translateY(6px);
  time {
    font-weight: 300;
    font-size: 14px;
  }
`;
