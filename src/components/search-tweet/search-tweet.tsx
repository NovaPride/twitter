import { UserType } from "@/types";

import { UserName, UserTag, UserText, WrapperLink } from "./styled";

type SearchTweetProps = Partial<UserType> & {
  name: string;
  email: string;
  link?: string;
};

export function SearchTweet({ name, email, link = "#" }: SearchTweetProps) {
  return (
    <WrapperLink to={link}>
      <UserName>{name}</UserName>
      <UserTag>{email}</UserTag>
      <UserText />
    </WrapperLink>
  );
}
