import { Header } from "@/components/header/header";
import { TweetsList } from "@/components/tweets-list/tweets-list";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";

export function BookmarksPage() {
  const { uid } = useAppSelector(getUserSelector);
  return (
    <>
      <Header title="Bookmarks" />
      <TweetsList
        filterFunc={({ bookmarkedByUsers }) => bookmarkedByUsers.includes(uid)}
      />
    </>
  );
}
