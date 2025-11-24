import { Link } from "react-router-dom";
import styled from "styled-components";

import { theme } from "@/styles/theme";

export const WrapperLink = styled(Link)`
  color: var(--text-primary-color);
  text-decoration: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
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
