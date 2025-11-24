import { useEffect, useState } from "react";

import noAvatar from "@/assets/imgs/no_avatar.png";
import { ImageProps } from "@/types";
import { getImageUrl } from "@/utils/firebase/helpers";

import { StyledAvatar } from "./styled";

export function Avatar({ src }: ImageProps) {
  const [image, setImage] = useState<string | null>("");

  useEffect(() => {
    if (!src) return;
    getImageUrl(src).then(setImage);
  }, [src]);

  return <StyledAvatar src={image ? image : noAvatar} />;
}
