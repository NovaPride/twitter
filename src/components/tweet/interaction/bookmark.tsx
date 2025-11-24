import { doc, updateDoc } from "firebase/firestore";
import { SyntheticEvent, useEffect, useState } from "react";

import { LIKE_DEBOUNCE_DELAY_MS } from "@/constants/constants";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { PostData } from "@/types";

import {
  InteractionButton,
  InteractionSVGInner,
  InteractionSVGOuter,
  InteractionWrapper,
} from "./styled";

type BoomarkData = {
  bookmarked: boolean | null;
};

const Bookmark = ({
  uid,
  bookmarkedByUsers,
}: Pick<PostData, "uid" | "bookmarkedByUsers">) => {
  const user = useAppSelector(getUserSelector);
  const [timer, setTimer] = useState<ReturnType<typeof setTimeout> | null>(
    null
  );
  const [bookmarkData, setBookmarkData] = useState<BoomarkData>({
    bookmarked: null,
  });

  useEffect(() => {
    setBookmarkData((prev) => {
      return {
        ...prev,
        bookmarked: bookmarkedByUsers.includes(user.uid),
      };
    });
  }, [bookmarkedByUsers, user.uid]);

  useEffect(() => {
    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [timer]);

  const increment = (event: SyntheticEvent) => {
    event.stopPropagation();
    setBookmarkData((prev) => {
      return {
        ...prev,
        bookmarked: !prev.bookmarked,
      };
    });

    if (timer) clearTimeout(timer);

    const newTimer = setTimeout(() => {
      sendToServer(!bookmarkData.bookmarked);
    }, LIKE_DEBOUNCE_DELAY_MS);

    setTimer(newTimer);
  };

  const sendToServer = async (isBookmarked: boolean) => {
    const wasBookmarkedBefore = bookmarkedByUsers.includes(user.uid);

    if (user.uid && wasBookmarkedBefore !== isBookmarked) {
      let newBookmarkedByUsers: string[] = [];

      if (wasBookmarkedBefore) {
        newBookmarkedByUsers = bookmarkedByUsers.filter(
          (uid: string) => uid !== uid
        );
      } else {
        newBookmarkedByUsers = [...bookmarkedByUsers, user.uid];
      }

      const postRef = doc(db, "posts", uid!);
      updateDoc(postRef, {
        bookmarkedByUsers: newBookmarkedByUsers,
      });
    }
  };

  return (
    <>
      <InteractionWrapper onClick={increment} className="bookmark">
        <InteractionButton />
        <InteractionSVGInner
          viewBox="0 0 18 21"
          className={bookmarkData.bookmarked ? "bookmarked" : "not_bookmarked"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M16.8998 20.2681C16.6998 20.2681 16.5998 20.2681 16.4998 20.1681L8.9998 14.6681L1.4998 20.0681C1.2998 20.2681 0.999799 20.2681 0.699799 20.1681C0.499799 20.0681 0.299805 19.7681 0.299805 19.4681V2.3681C0.299805 1.1681 1.2998 0.168091 2.4998 0.168091H15.2998C16.4998 0.168091 17.4998 1.1681 17.4998 2.3681V19.4681C17.4998 19.7681 17.2998 19.9681 17.0998 20.1681C17.0998 20.2681 16.9998 20.2681 16.8998 20.2681Z"
              fill="currentColor"
            />
          </g>
        </InteractionSVGInner>
        <InteractionSVGOuter
          viewBox="0 0 24 25"
          className={bookmarkData.bookmarked ? "bookmarked" : "not_bookmarked"}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g>
            <path
              d="M19.55 22.9181C19.393 22.9181 19.238 22.8681 19.108 22.7741L11.65 17.3461L4.192 22.7761C3.964 22.9401 3.66199 22.9661 3.40999 22.8361C3.15999 22.7091 3 22.4511 3 22.1691V5.01807C3 3.77807 4.01 2.76807 5.25 2.76807H18.048C19.288 2.76807 20.298 3.77807 20.298 5.01807V22.1681C20.298 22.4501 20.14 22.7081 19.888 22.8361C19.782 22.8911 19.665 22.9181 19.548 22.9181H19.55ZM11.65 15.6681C11.805 15.6681 11.96 15.7161 12.09 15.8121L18.8 20.6951V5.01807C18.8 4.60607 18.463 4.26807 18.05 4.26807H5.25C4.837 4.26807 4.5 4.60607 4.5 5.01807V20.6951L11.21 15.8121C11.34 15.7161 11.495 15.6681 11.65 15.6681Z"
              fill="currentColor"
            />
          </g>
        </InteractionSVGOuter>
      </InteractionWrapper>
    </>
  );
};

export default Bookmark;
