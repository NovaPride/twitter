import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { FieldErrors, useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

import addMedia from "@/assets/icons/add-media.svg";
import noAvatar from "@/assets/imgs/no_avatar.svg";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { Button } from "@/ui/buttons";
import { uploadFile } from "@/utils/firebase/helpers";

import { Avatar } from "../avatar/avatar";
import { ErrorsSummary } from "../errors/errors-summary";
import { schema } from "./form-schema";
import {
  AvatarWrapper,
  BasementWrapper,
  CreatePostWrapper,
  ErrorWrapper,
  FileInput,
  FileInputImage,
  FileInputWrapper,
  FormWrapper,
  Textarea,
  FileInputPreviewImage,
} from "./styled";

type Data = {
  content: string;
  image: FileList | null;
};

export function CreatePost() {
  const user = useAppSelector(getUserSelector);

  const [previewImage, setPreviewImage] = useState<string>();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      content: "",
      image: null,
    },
    resolver: zodResolver(schema),
  });

  const getUploadedImageName = async (images: FileList | null) => {
    return images ? await uploadFile("posts", images[0]) : null;
  };

  const onSubmit = async (data: Data) => {
    const imageName = await getUploadedImageName(data.image);
    const postId = uuidv4();

    const newPost = {
      uid: postId,
      content: data.content,
      image: imageName,
      displayName: user?.displayName,
      authorUid: user?.uid,
      email: user?.email,
      createdAt: new Date(),
      likes: 0,
      likedByUsers: [],
    };

    await setDoc(doc(db, "posts", postId), newPost);

    reset();
    setPreviewImage("");
  };

  const handleFileInputChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function ({ target }) {
        if (target) {
          setPreviewImage(target.result as string);
        } else {
          console.error("Bug perhaps, i dunno");
        }
      };
      reader.readAsDataURL(file);
    }
    register("image").onChange(event)
  };

  return (
    <CreatePostWrapper>
      <AvatarWrapper>
        <Avatar src={user.photoURL || noAvatar} />
      </AvatarWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Textarea {...register("content")} placeholder="What's happening?" />
        <FileInputPreviewImage src={previewImage} />
        <BasementWrapper>
          <FileInputWrapper>
            <label htmlFor="file-input">
              <FileInputImage src={addMedia} alt="upload file" />
            </label>
            <FileInput
              {...register("image")}
              type="file"
              id="file-input"
              accept="image/*"
              onChange={handleFileInputChange}
            />
          </FileInputWrapper>
          <Button variant="primary" size="small" type="submit">
            Tweet
          </Button>
        </BasementWrapper>
        <ErrorWrapper>
          <ErrorsSummary errors={errors as FieldErrors} />
        </ErrorWrapper>
      </FormWrapper>
    </CreatePostWrapper>
  );
}
