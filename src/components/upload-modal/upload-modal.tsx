import { zodResolver } from "@hookform/resolvers/zod";
import { doc, updateDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { db } from "@/firebase";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useImageInput } from "@/hooks/use-image-input";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { updateUser } from "@/redux/slices/user-slice";
import { Button } from "@/ui/buttons";
import { queryUserEqualByValue } from "@/utils/firebase/helpers";

import { schema } from "./form-schema";
import {
  ConfirmationButtonsWrapper,
  PlaceholderText,
  PreviewImage,
  UploadButton,
  UploadInput,
  Wrapper,
} from "./styled";

type UploadTypes = "background" | "avatar" | "image";
type TableTypes = "chats" | "posts" | "users";

type UploadModalProps = {
  handleModalClose: () => void;
  placeholder?: string;
  toastMessage?: string;
  uploadType: UploadTypes;
  table?: TableTypes;
  id?: string;
};

type Data = {
  image: FileList | null;
};

export function UploadModal({
  handleModalClose,
  placeholder,
  toastMessage,
  uploadType,
  table = "users",
  id,
}: UploadModalProps) {
  const user = useAppSelector(getUserSelector);
  const {
    previewImage,
    clearPreview,
    handleFileInputChange,
    getUploadedImageName,
  } = useImageInput();
  const dispatch = useAppDispatch();

  const { register, handleSubmit, reset } = useForm<Data>({
    defaultValues: {
      image: null,
    },
    resolver: zodResolver(schema),
  });

  const sendData = async (formData: Data) => {
    const imageName = await getUploadedImageName(formData.image, "users");
    if (!imageName) {
      toast.error("Something went wrong");
      return;
    }
    let snapshot, ref;

    switch (table) {
      case "users": {
        snapshot = await queryUserEqualByValue("uid", user.uid);
        ref = doc(db, "users", snapshot.docs[0].id);
        dispatch(updateUser({ [uploadType]: imageName }));
        break;
      }
      case "chats": {
        if (!id) {
          console.error("You dont provide chatID!");
          return;
        }
        snapshot = await getDocs(
          query(collection(db, "chats"), where("uid", "==", id))
        );
        ref = doc(db, "chats", snapshot.docs[0].id);
        break;
      }
      default:
        toast.error("Something went wrong");
        return;
    }

    updateDoc(ref, {
      [uploadType]: imageName,
    });
    reset();
    toast.success(toastMessage);
    handleModalClose();
  };

  return (
    <Wrapper onSubmit={handleSubmit(sendData)}>
      {previewImage ? (
        <>
          <PreviewImage
            src={previewImage}
            alt="preview"
            className={uploadType}
          />
          <ConfirmationButtonsWrapper>
            <Button variant="primary" size="medium" type="submit">
              Submit
            </Button>
            <Button variant="secondary" size="medium" onClick={clearPreview}>
              Cancel
            </Button>
          </ConfirmationButtonsWrapper>
        </>
      ) : (
        <>
          <PlaceholderText>{placeholder}</PlaceholderText>
          <UploadButton htmlFor="uploadInput">Upload</UploadButton>
          <UploadInput
            {...register("image", {
              onChange: handleFileInputChange,
            })}
            type="file"
            id="uploadInput"
            accept="image/*"
          />
        </>
      )}
    </Wrapper>
  );
}
