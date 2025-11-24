import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { MAX_UPLOAD_IMAGE_SIZE_BYTES } from "@/constants/constants";
import { getImageUrl } from "@/utils/firebase/helpers";
import { uploadFile } from "@/utils/firebase/helpers";

export const useImageInput = (defaultImage?: string) => {
  const [previewImage, __setPreviewImage] = useState<string>("");

  useEffect(() => {
    if (defaultImage) {
      getImageUrl(defaultImage)
        .then((url) => __setPreviewImage(url ?? ""))
        .catch(() => __setPreviewImage(""));
    }
  }, []);

  const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (!file.type.startsWith("image")) {
        toast.error("You can upload only images!");
        event.target.value = "";
        return;
      }

      if (file.size > MAX_UPLOAD_IMAGE_SIZE_BYTES) {
        toast.error("File size should not exceed 5MB");
        event.target.value = "";
        return;
      }

      const reader = new FileReader();
      reader.onload = function ({ target }) {
        if (target) {
          __setPreviewImage(target.result as string);
        } else {
          console.error("Bug perhaps, i dunno");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const clearPreview = () => {
    __setPreviewImage("");
  };

  const getUploadedImageName = async (images: FileList | null, address: string) => {
    return images ? await uploadFile(address, images[0]) : null;
  };

  return { previewImage, clearPreview, handleFileInputChange, getUploadedImageName };
};
