import { CreatePost } from "@/components/create-post/create-post";
import { Header } from "@/components/header/header";
import { TweetsList } from "@/components/tweets-list/tweets-list";

export function FeedPage() {
  return (
    <>
      <Header title="Home" />
      <CreatePost />
      <TweetsList />
    </>
  );
}
