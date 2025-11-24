import { CreateMessage } from "@/components/create-message/create-message";
import { MessagesList } from "@/components/messages-list/messages-list";

import { ChatWrapper, MessageInput, MessagesListWrapper } from "./styled";

export function Chat() {
  return (
    <ChatWrapper>
      <MessagesListWrapper>
        <MessagesList />
      </MessagesListWrapper>
      <MessageInput>
        <CreateMessage />
      </MessageInput>
    </ChatWrapper>
  );
}
