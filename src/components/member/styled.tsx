import { Link } from "react-router-dom";
import styled from "styled-components";

import { theme } from "@/styles/theme";

export const Wrapper = styled.div`
  color: var(--text-primary-color);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
`;

export const MemberNameLink = styled(Link)`
  font-weight: 600;
  font-size: 18px;
  margin-top: 15px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MemberTag = styled.p`
  font-size: 18px;
  max-height: 150px;
  margin-bottom: 15px;
  border-bottom: var(--border-gray);
  opacity: ${theme.opacity};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const KickButt = styled.button`
  border: 0;
  border-radius: 5px;
  font-weight: 500;
  background-color: var(--primary-color);
  color: white;
  cursor: pointer;
  transition: 0.3s all;
  position: absolute;
  right: 0;
  top: 0;
  height: 22px;
  width: 22px;
  transform: translateY(30%);
  &:hover {
    background-color: var(--error-color);
  }
`;

export const AdminPanel = styled.div`
  display: flex;
  gap: 15px;
  align-items: flex-end;
  padding: 5px 0 10px;
  border-bottom: var(--border-gray);
`;
