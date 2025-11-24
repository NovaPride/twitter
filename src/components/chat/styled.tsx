import styled from "styled-components";

export const ChatWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const MessagesListWrapper = styled.main`
  height: 100%;
`;

export const MessageInput = styled.div`
  flex-shrink: 0;
  border-top: var(--border-gray);
  min-height: 56px;
`;
