import { Header } from "@/components/header/header";
import { CreateChat } from "@/components/create-chat/create-chat";
import { TweetsList } from "@/components/tweets-list/tweets-list";

export function MessagesPage() {
  return (
    <>
      <Header title="Messages" childrens={[<CreateChat type="header"/>]}/>
      <CreateChat />
      
      {/* <TweetsList /> */}
    </>
  );
}
