import { doc, updateDoc } from "firebase/firestore";
import { SyntheticEvent, useEffect, useState } from "react";

import { LIKE_DEBOUNCE_DELAY_MS } from "@/constants/constants";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { PostData } from "@/types";

import {
  InteractionButton,
  InteractionCount,
  InteractionSVGInner,
  InteractionSVGOuter,
  InteractionWrapper,
} from "./styled";

type LikeData = {
  count: number | null;
  liked: boolean | null;
};

const Like = ({
  uid,
  likes,
  likedByUsers,
}: Pick<PostData, "uid" | "likes" | "likedByUsers">) => {
  const user = useAppSelector(getUserSelector);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );

  const [likeData, setLikeData] = useState<LikeData>({
    count: null,
    liked: null,
  });

  useEffect(() => {
    setLikeData((prev) => {
      return {
        ...prev,
        count: likes,
        liked: likedByUsers.includes(user.uid),
      };
    });
  }, [likedByUsers, likes, user.uid]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const increment = (event: SyntheticEvent) => {
    event.stopPropagation();
    const { count, liked } = likeData;
    const newCount = count! + (liked ? -1 : 1);

    setLikeData((prev) => {
      return {
        ...prev,
        count: newCount,
        liked: !prev.liked,
      };
    });

    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      sendToServer(newCount, !liked);
    }, LIKE_DEBOUNCE_DELAY_MS);

    setTimer(newTimer);
  };

  const sendToServer = async (likesCount: number, isLiked: boolean) => {
    const wasLikedBefore = likedByUsers.includes(user.uid);

    if (user.uid && wasLikedBefore !== isLiked) {
      let newLikedByUsers: string[] = [];

      if (wasLikedBefore) {
        newLikedByUsers = likedByUsers.filter(
          (authorUid: string) => authorUid !== user.uid
        );
      } else {
        newLikedByUsers = [...likedByUsers, user.uid];
      }

      const postRef = doc(db, "posts", uid);
      updateDoc(postRef, {
        likes: likesCount,
        likedByUsers: newLikedByUsers,
      });
    }
  };

  return (
    <>
      <InteractionWrapper onClick={increment} className="like">
        <InteractionButton />

        <InteractionSVGInner
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={likeData.liked ? "liked" : "not_liked"}
        >
          <g>
            <path
              d="M20.884 13.19c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z "
              fill="currentColor"
            ></path>
          </g>
        </InteractionSVGInner>
        <InteractionSVGOuter
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={likeData.liked ? "liked" : "not_liked"}
        >
          <g>
            <path
              d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"
              fill="currentColor"
            ></path>
          </g>
        </InteractionSVGOuter>
        <InteractionCount>{likeData.count}</InteractionCount>
      </InteractionWrapper>
    </>
  );
};

export default Like;
