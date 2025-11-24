import { zodResolver } from "@hookform/resolvers/zod";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

import addMedia from "@/assets/icons/add-media.svg";
import { AddUsers } from "@/components/add-users/add-users";
import { ErrorsSummary } from "@/components/errors/errors-summary";
import { db } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { useAddUsersControls } from "@/hooks/use-add-users-controls";
import { useImageInput } from "@/hooks/use-image-input";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { ModalComponentProps } from "@/types";
import { Button } from "@/ui/buttons";

import { schema } from "./form-schema";
import {
  ButtonWrapper,
  CreateChatModalWrapper,
  ErrorWrapper,
  FileInput,
  FileInputImage,
  FileInputLabel,
  FileInputWrapper,
  FormWrapper,
  InformationWrapper,
  NameInput,
} from "./styled";

type Data = {
  name: string;
  image: FileList | null;
};

export function CreateChatModal({ handleModalClose }: ModalComponentProps) {
  const { uid } = useAppSelector(getUserSelector);
  const [currentPage, setCurrentPage] = useState<1 | 2>(1);
  const { getUsersIDs, clearUsers, handleCollectChildData } =
    useAddUsersControls();
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
    trigger,
    formState: { errors },
  } = useForm<Data>({
    defaultValues: {
      name: "",
      image: null,
    },
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: Data) => {
    try {
      const membersData = getUsersIDs();
      const membersDataWithSelf = [...membersData, uid];
      const imageName = await getUploadedImageName(data.image, "chats");
      const chatId = uuidv4();

      const newChat = {
        uid: chatId,
        admin: uid,
        members: membersDataWithSelf,
        image: imageName,
        name: data.name,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "chats", chatId), newChat);
      toast.success("Chat created!");
      reset();
      clearUsers();
      clearPreview();
      handleModalClose();
    } catch (error) {
      toast.error("Something went wrong...");
    }
  };

  return (
    <>
      <CreateChatModalWrapper>
        <FormWrapper onSubmit={handleSubmit(onSubmit)}>
          {
            {
              "1": (
                <>
                  <InformationWrapper>
                    <FileInputWrapper>
                      <FileInputLabel
                        htmlFor="file-input"
                        style={
                          previewImage
                            ? { backgroundImage: `url(${previewImage})` }
                            : {}
                        }
                      >
                        <FileInputImage
                          style={previewImage ? { display: `none` } : {}}
                          src={addMedia}
                          alt="upload file"
                        />
                      </FileInputLabel>
                      <FileInput
                        {...register("image", {
                          onChange: handleFileInputChange,
                        })}
                        type="file"
                        id="file-input"
                        accept="image/*"
                      />
                    </FileInputWrapper>
                    <NameInput
                      {...register("name")}
                      placeholder="Group name"
                      autoComplete="off"
                    />
                  </InformationWrapper>
                  <ButtonWrapper>
                    <Button
                      variant="primary"
                      size="small"
                      onClick={(event) => {
                        event.preventDefault();
                        trigger("name").then((isName) => {
                          if (isName) setCurrentPage(2);
                        });
                      }}
                    >
                      Next
                    </Button>
                  </ButtonWrapper>
                </>
              ),
              "2": (
                <>
                  <AddUsers
                    handleCollectChildData={handleCollectChildData}
                    activeChilds={getUsersIDs()}
                    ignoreAuthor
                    clickable
                  />
                  <ButtonWrapper>
                    <Button variant="primary" size="small" type="submit">
                      Create
                    </Button>
                  </ButtonWrapper>
                </>
              ),
            }[currentPage]
          }
          <ErrorWrapper>
            <ErrorsSummary errors={errors as FieldErrors} />
          </ErrorWrapper>
        </FormWrapper>
      </CreateChatModalWrapper>
    </>
  );
}
