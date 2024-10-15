import { MessagesList } from "@/components/messages-list/messages-list";
import { CreateMessage } from "@/components/create-message/create-message";

import {
  ChatWrapper,
  Members,
  MessagesListWrapper,
  MessageInput,
} from "./styled";

type ChatsData = {
  createAt: Date;
  image: string | null;
  members: string[];
  name: string;
  uid: string;
};

export function Chat({ members }: ChatsData) {

  
  return (
    <ChatWrapper>
      <Members>{members.length} members</Members>
      <MessagesListWrapper>
        <MessagesList />
      </MessagesListWrapper>
      <MessageInput>
        <CreateMessage />
      </MessageInput>
    </ChatWrapper>
  );
}
