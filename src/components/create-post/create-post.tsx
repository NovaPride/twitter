import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { updateDoc } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import addMedia from "@/assets/icons/add-media.svg";
import { Avatar } from "@/components/avatar/avatar";
import { ErrorsSummary } from "@/components/errors/errors-summary";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { useImageInput } from "@/hooks/use-image-input";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { PostFormData } from "@/types";
import { Button } from "@/ui/buttons";

import { schema } from "./form-schema";
import {
  AvatarWrapper,
  BasementWrapper,
  CreatePostWrapper,
  ErrorWrapper,
  FileInput,
  FileInputImage,
  FileInputPreviewImage,
  FileInputWrapper,
  FormWrapper,
  Textarea,
  TextareaWrapper,
} from "./styled";

type CreatePostProps = {
  uid?: string;
  type?: "create" | "edit";
  hideAvatar?: boolean;
  defaultContent?: string;
  defaultImage?: string;
  handleModalClose?: () => void;
};

type PostUpdateData = {
  content: string;
  image?: string | null;
};

export function CreatePost({
  uid,
  type = "create",
  hideAvatar = false,
  defaultContent = "",
  defaultImage,
  handleModalClose,
}: CreatePostProps) {
  const user = useAppSelector(getUserSelector);
  const {
    previewImage,
    clearPreview,
    handleFileInputChange,
    getUploadedImageName,
  } = useImageInput(defaultImage);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PostFormData>({
    defaultValues: {
      content: defaultContent,
      image: null,
    },
    resolver: zodResolver(schema),
  });

  const createPost = async (data: PostFormData) => {
    const imageName = await getUploadedImageName(data.image, "posts");
    const postId = uuidv4();

    const newPost = {
      uid: postId,
      content: data.content,
      image: imageName,
      authorUid: user.uid,
      createdAt: new Date(),
      likes: 0,
      likedByUsers: [],
      bookmarkedByUsers: [],
    };

    await setDoc(doc(db, "posts", postId), newPost);

    reset();
    clearPreview();
  };

  const editPost = async (data: PostFormData) => {
    try {
      if (!uid) return;

      const updatedData: PostUpdateData = {
        content: data.content,
      };

      if (data.image) {
        updatedData["image"] = await getUploadedImageName(data.image, "posts");
      }

      const snapshot = await getDocs(
        query(collection(db, "posts"), where("uid", "==", uid))
      );
      const ref = doc(db, "posts", snapshot.docs[0].id);

      updateDoc(ref, updatedData);

      reset();
      clearPreview();
      toast.success("Post updated");
      if (handleModalClose) handleModalClose();
    } catch (error) {
      toast.error("Something went wrong...");
      reset();
      clearPreview();
      if (handleModalClose) handleModalClose();
    }
  };

  const onSubmit = async (data: PostFormData) => {
    switch (type) {
      case "create":
        createPost(data);
        break;
      case "edit":
        editPost(data);
        break;
      default:
        console.error("Unknown type of component");
        break;
    }
  };

  return (
    <CreatePostWrapper>
      {!hideAvatar && (
        <AvatarWrapper>
          <Avatar src={user.avatar} />
        </AvatarWrapper>
      )}

      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <TextareaWrapper>
          <Textarea {...register("content")} placeholder="What's happening?" />
          <ErrorWrapper>
            <ErrorsSummary errors={errors as FieldErrors} />
          </ErrorWrapper>
        </TextareaWrapper>
        <FileInputPreviewImage src={previewImage} />
        <BasementWrapper>
          <FileInputWrapper>
            <label htmlFor={"file-input" + (`_${uid}` || "_base")}>
              <FileInputImage src={addMedia} alt="upload file" />
            </label>
            <FileInput
              {...register("image", {
                onChange: handleFileInputChange,
              })}
              type="file"
              id={"file-input" + (`_${uid}` || "_base")}
              accept="image/*"
            />
          </FileInputWrapper>
          <Button variant="primary" size="small" type="submit">
            Tweet
          </Button>
        </BasementWrapper>
      </FormWrapper>
    </CreatePostWrapper>
  );
}
