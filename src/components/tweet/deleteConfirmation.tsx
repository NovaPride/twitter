import { SyntheticEvent } from "react";

import {
  ConfirmationButtonsWrapper,
  ConfirmationMainText,
  ConfirmationText,
  NoButton,
  YesButton,
} from "./styled";

type DeleteConfirmationProps = {
  handleModalClose: VoidFunction;
  handleDeleteClick: (e: SyntheticEvent) => Promise<void>;
};

const DeleteConfirmation = ({
  handleModalClose,
  handleDeleteClick,
}: DeleteConfirmationProps) => {
  return (
    <>
      <ConfirmationText>You are about to delete this post</ConfirmationText>
      <ConfirmationMainText>Are you sure?</ConfirmationMainText>
      <ConfirmationButtonsWrapper>
        <YesButton onClick={handleDeleteClick}>Yes</YesButton>
        <NoButton onClick={handleModalClose}>No</NoButton>
      </ConfirmationButtonsWrapper>
    </>
  );
};

export default DeleteConfirmation;
