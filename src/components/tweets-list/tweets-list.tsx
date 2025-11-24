import {
  collection,
  getDocs,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { Tweet } from "@/components/tweet/tweet";
import { ROUTES } from "@/constants/routes";
import { db } from "@/firebase";
import { PostData, PostsDataList } from "@/types";

import { NoPost } from "./styled";

type TweetsListProps = {
  filterFunc?: (post: PostData) => boolean;
};

export function TweetsList({
  filterFunc = () => {
    return true;
  },
}: TweetsListProps) {
  const [posts, setPosts] = useState<PostsDataList | null>(null);

  const getPosts = async () => {
    const querySnapshot = await getDocs(
      query(collection(db, "posts"), orderBy("createdAt", "desc"))
    );
    const data = querySnapshot.docs.map((doc) => doc.data() as PostData);
    return data;
  };

  useEffect(() => {
    const q = collection(db, "posts");
    onSnapshot(q, () => {
      getPosts().then((newPosts) => {
        setPosts(newPosts);
      });
    });
  }, []);

  if (posts === null) {
    return <></>;
  }

  const postsToShow = posts.filter(filterFunc);

  return (
    <>
      {postsToShow.length > 0 ? (
        postsToShow.map((post) => <Tweet key={`${post.uid}`} {...post} />)
      ) : (
        <NoPost>
          {(function () {
            switch (window.location.pathname) {
              case ROUTES.HOME:
                return (
                  <>
                    <p>There is no posts yet.</p>
                    <p>You can write first post on this site!</p>
                  </>
                );
              case ROUTES.BOOKMARKS:
                return (
                  <>
                    <p>There is no bookmarks yet.</p>
                    <p>You can add it by pressing bookmark button on posts.</p>
                  </>
                );
              case ROUTES.PERSONA:
                return (
                  <>
                    <p>There is no posts yet.</p>
                    <p>You can write first post here.</p>
                  </>
                );
              default:
                return "No posts yet";
            }
          })()}
        </NoPost>
      )}
    </>
  );
}
