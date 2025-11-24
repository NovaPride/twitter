import { useEffect, useState } from "react";

import noBackground from "@/assets/imgs/no_background.webp";
import { ImageProps } from "@/types";
import { getImageUrl } from "@/utils/firebase/helpers";

import { ProfileBackgroundImage } from "./styled";

export function BackgroundImage({ src }: ImageProps) {
  const [image, setImage] = useState<string | null>("");

  useEffect(() => {
    if (!src) return;
    getImageUrl(src).then(setImage);
  }, [src]);

  return <ProfileBackgroundImage src={image ? image : noBackground} />;
}
