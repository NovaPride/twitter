import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { FieldErrors, useForm } from "react-hook-form";

import addMedia from "@/assets/icons/add-media.svg";
import noAvatar from "@/assets/imgs/no_avatar.svg";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { Button } from "@/ui/buttons";
import { uploadImage } from "@/utils/firebase/helpers";

import { Avatar } from "../avatar/avatar";
import ErrorsSummary from "../errors/errors-summary";
import { schema } from "./form-schema";
import {
  AvatarWrapper,
  BasementWrapper,
  CreatePostWrapper,
  FileInput,
  FileInputImage,
  FileInputWrapper,
  FormWrapper,
  Textarea,
} from "./styled";

type Data = {
  content: string;
  image: FileList | null;
};

export function CreatePost() {
  const user = useAppSelector((state) => state.userReducer);
  console.log("user", user);

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

  const onSubmit = async (data: Data) => {
    const imageName = data.image ? await uploadImage(data.image[0]) : null;
    console.log("imageName", imageName);

    const newPost = {
      content: data.content,
      image: imageName || null,
      displayName: user?.displayName,
      authorUid: user?.uid,
      email: user?.email,
      createdAt: new Date(),
      likes: 0,
      likedByUsers: [],
    };

    await addDoc(collection(db, "posts"), newPost);

    reset();
  };

  return (
    <CreatePostWrapper>
      <AvatarWrapper>
        <Avatar src={user.photoURL ? user.photoURL : noAvatar} />
      </AvatarWrapper>
      <FormWrapper onSubmit={handleSubmit(onSubmit)}>
        <Textarea {...register("content")} placeholder="What's happening?" />
        <BasementWrapper>
          <FileInputWrapper>
            <label htmlFor="file-input">
              <FileInputImage src={addMedia} alt="upload file" />
            </label>
            <FileInput
              {...register("image")}
              type="file"
              id="file-input"
              accept="image/png, image/jpeg"
            />
          </FileInputWrapper>
          <Button variant="primary" size="small" type="submit">
            Tweet
          </Button>
        </BasementWrapper>
        <ErrorsSummary errors={errors as FieldErrors} />
      </FormWrapper>
    </CreatePostWrapper>
  );
}
