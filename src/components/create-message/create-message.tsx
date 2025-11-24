import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { ChangeEvent, KeyboardEvent } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import addMedia from "@/assets/icons/add-media.svg";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { useImageInput } from "@/hooks/use-image-input";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { PostFormData } from "@/types";

import { schema } from "./form-schema";
import {
  CreateMessageWrapper,
  FileInput,
  FileInputImage,
  FileInputPreviewImage,
  FileInputWrapper,
  Input,
  InputWrapper,
  Send,
  SendSVG,
} from "./styled";

export function CreateMessage() {
  const { id } = useParams();
  const user = useAppSelector(getUserSelector);
  const {
    previewImage,
    clearPreview,
    handleFileInputChange,
    getUploadedImageName,
  } = useImageInput();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<PostFormData>({
    defaultValues: {
      content: "",
      image: null,
    },
    resolver: zodResolver(schema),
  });

  const sendMessageDataToDB = async (formData: PostFormData) => {
    if (!formData.content.trim().length && !formData.image) return;
    const messageId = uuidv4();
    const imageName = await getUploadedImageName(formData.image, `chats/${id}`);
    const newMessage = {
      uid: messageId,
      authorUid: user.uid,
      content: formData.content,
      image: imageName,
      createdAt: new Date(),
    };
    await setDoc(doc(db, "chats", id!, "messages", messageId), newMessage);

    reset();
    clearPreview();
  };

  const handleKeyDown = ({ key, shiftKey }: KeyboardEvent<HTMLFormElement>) => {
    if (!shiftKey && key === "Enter") {
      handleSubmit(sendMessageDataToDB)();
    }
  };

  return (
    <CreateMessageWrapper
      onSubmit={handleSubmit(sendMessageDataToDB)}
      onKeyDown={handleKeyDown}
    >
      <FileInputWrapper>
        <label htmlFor="file-input">
          <FileInputImage src={addMedia} alt="upload file" />
        </label>
        <FileInput
          {...register("image", {
            onChange: handleFileInputChange,
          })}
          type="file"
          id="file-input"
          accept="image/*"
        />
      </FileInputWrapper>
      <InputWrapper>
        <FileInputPreviewImage src={previewImage} />
        <Input
          {...register("content")}
          className={errors.content ? "error" : ""}
          onInput={({ target }: ChangeEvent<HTMLTextAreaElement>) => {
            //i dont know why, but this kinda works
            target.style.height = `0px`;
            target.style.height = `${target.scrollHeight}px`;
          }}
          placeholder="Write a message...."
          onBlur={() => clearErrors()}
          disabled={isSubmitting}
        ></Input>
      </InputWrapper>

      <Send disabled={isSubmitting}>
        <SendSVG viewBox="0 0 512.001 512.001">
          <path
            d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.024,1.398,80.367l21.593,89.001
				c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915
				c-11.271,6.452-19.491,17.393-22.554,30.015L1.398,431.633c-9.283,38.257,29.507,70.691,65.569,54.534l416.961-186.83
				C521.383,282.554,521.333,229.424,483.927,212.664z M468.609,265.151l-416.96,186.83c-7.618,3.417-15.814-3.398-13.845-11.516
				l21.593-89.001c0.647-2.665,2.383-4.975,4.761-6.337l83.685-47.915c31.857-18.239,31.887-64.167,0-82.423l-83.685-47.916
				c-2.379-1.362-4.115-3.672-4.761-6.337L37.804,71.535c-1.945-8.016,6.128-14.975,13.845-11.514L468.61,246.85
				C476.522,250.396,476.542,261.596,468.609,265.151z"
            fill="currentColor"
          />
          <path
            d="M359.268,238.907l-147.519-66.1c-9.444-4.231-20.523-0.005-24.752,9.435c-4.231,9.44-0.006,20.523,9.434,24.752
				L305.802,256l-109.37,49.006c-9.44,4.231-13.664,15.313-9.434,24.752c4.231,9.443,15.312,13.663,24.752,9.435l147.519-66.101
				C373.996,266.495,374.006,245.51,359.268,238.907z"
            fill="currentColor"
          />
        </SendSVG>
      </Send>
    </CreateMessageWrapper>
  );
}
