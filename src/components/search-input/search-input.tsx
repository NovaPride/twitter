import search from "@assets/icons/search.svg";

import { SearchbarWrapper, SearchIcon, SearchText } from "./styled";

// TODO: any type
// TODO: routes to enum

export function SearchInput({
  placeholder,
  value,
  onChange,
}: any) {
  return (
    <SearchbarWrapper>
      <SearchIcon src={search} />
      <SearchText value={value} onChange={onChange} placeholder={placeholder} />
    </SearchbarWrapper>
  );
}
