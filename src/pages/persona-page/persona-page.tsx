import { CreatePost } from "@/components/create-post/create-post";
import { Profile } from "@/components/profile/profile";
import { TweetsList } from "@/components/tweets-list/tweets-list";
import { auth } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";

export function PersonaPage() {
  const { avatar, displayName, status, uid, background } =
    useAppSelector(getUserSelector);
  
  return (
    <>
      <Profile
        displayName={displayName}
        avatar={avatar}
        background={background}
        status={status}
        email={auth.currentUser!.email!}
        editPermission
      />
      <CreatePost />
      <TweetsList filterFunc={(post) => post.authorUid === uid} />
    </>
  );
}
