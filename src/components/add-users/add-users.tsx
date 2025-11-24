import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { User } from "@/components/add-users/user";
import { SearchInput } from "@/components/search-input/search-input";
import { DEBOUNCE_DELAY_MS } from "@/constants/constants";
import { MAX_ADD_USER_SHOW } from "@/constants/constants";
import { useAppSelector } from "@/hooks/redux";
import { Loader } from "@/loader/loader";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { UsersList, UserType } from "@/types";
import { searchUsers } from "@/utils/firebase/helpers";

import { SearchedUsers } from "./styled";

type AddUsersProps = {
  handleCollectChildData?: Function;
  showOnly?: string[];
  exclude?: string[];
  activeChilds?: string[];
  usersFilter?: (user: UserType) => boolean;
  adminId?: string;
  ignoreAuthor?: boolean;
  clickable?: boolean;
  freeze?: boolean;
  remove?: (uid: string, displayname: string) => void;
  style?: Object;
  onUserClick?: (uid: string, displayname: string) => void;
};

export function AddUsers({
  handleCollectChildData,
  showOnly,
  exclude,
  activeChilds,
  usersFilter = () => true,
  remove = () => {},
  adminId,
  ignoreAuthor = false,
  clickable = false,
  freeze = false,
  style,
  onUserClick,
}: AddUsersProps) {
  const user = useAppSelector(getUserSelector);
  const [list, setList] = useState<UsersList>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText] = useDebounce(searchText, DEBOUNCE_DELAY_MS);
  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);
    searchUsers(debouncedSearchText).then((searchResults) => {
      setList(searchResults || []);
      setIsLoading(false);
    });
  }, [debouncedSearchText, pathname, user.uid]);

  return (
    <>
      <SearchInput
        value={searchText}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchText(e.target.value)
        }
        placeholder={"Search users"}
      />
      <SearchedUsers style={style} className={freeze ? "freeze" : ""}>
        {isLoading && searchText ? (
          <Loader />
        ) : (
          list
            .filter((elem) => !ignoreAuthor || elem.uid !== user.uid)
            .filter(
              showOnly ? (elem) => showOnly.includes(elem.uid) : () => true
            )
            .filter(
              exclude ? (elem) => !exclude.includes(elem.uid) : () => true
            )
            .filter(usersFilter)
            .sort((a) => (adminId && a.uid === adminId ? -1 : 1))
            .slice(0, MAX_ADD_USER_SHOW)
            .map(({ uid, displayName, avatar, email }) => {
              return (
                <User
                  key={uid}
                  clickable={clickable}
                  removable={adminId ? uid !== adminId : false}
                  remove={remove}
                  isAdmin={adminId ? uid === adminId : false}
                  isActive={!!activeChilds && activeChilds.includes(uid)}
                  handleCollectChildData={handleCollectChildData}
                  uid={uid}
                  displayName={displayName}
                  email={email}
                  avatar={avatar}
                  onUserClick={onUserClick}
                />
              );
            })
        )}
      </SearchedUsers>
    </>
  );
}
