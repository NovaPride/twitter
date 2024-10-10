import { DocumentData } from "firebase/firestore";
import { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { DEBOUNCE_DELAY_MS } from "@/constants/constants";
import { Loader } from "@/loader/loader";
import { searchUsers } from "@/utils/firebase/helpers";

import { SearchInput } from "../search-input/search-input";
import { SearchTweet } from "../search-tweet/search-tweet";
import { SearchedTweets } from "./styled";

export function SearchSidebar() {
  const [list, setList] = useState<DocumentData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText] = useDebounce(searchText, DEBOUNCE_DELAY_MS);
  const { pathname } = useLocation();

  const handleSearchTextChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    setIsLoading(true);
    searchUsers(debouncedSearchText).then((searchResults) => {
      setList(searchResults || []);
      setIsLoading(false);
    });
  }, [debouncedSearchText, pathname]);

  return (
    <>
      <SearchInput
        value={searchText}
        onChange={handleSearchTextChange}
        placeholder={"Search users"}
      />
      <SearchedTweets>
        {isLoading && searchText ? (
          <Loader />
        ) : (
          list.map((item) => (
            <SearchTweet
              key={item.uid}
              name={item.displayName}
              email={item.email}
            />
          ))
        )}
      </SearchedTweets>
    </>
  );
}
