import { Avatar } from "@/components/avatar/avatar";
import { ROUTES } from "@/constants/routes";
import { ChatData, ChatsDataList } from "@/types";

import {
  AvatarWrapper,
  ChatInfoWrapper,
  ChatName,
  ChatsContainer,
  ChatTag,
  ChatWrapper,
} from "./styled";

type ChatsListProps = {
  chats: ChatsDataList;
};

export const ChatsList = ({ chats }: ChatsListProps) => {
  return (
    <ChatsContainer>
      {chats.map(({ image, members, name, uid }: ChatData, i) => (
        <ChatWrapper key={i} to={`${ROUTES.CHAT}/${uid}`}>
          <AvatarWrapper>
            <Avatar src={image} />
          </AvatarWrapper>
          <ChatInfoWrapper>
            <ChatName>{name}</ChatName>
            <ChatTag>
              {members.length} {members.length > 1 ? "members" : "member"}
            </ChatTag>
          </ChatInfoWrapper>
        </ChatWrapper>
      ))}
    </ChatsContainer>
  );
};
