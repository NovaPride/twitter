import styled from "styled-components";

export const FileInputPreviewImage = styled.img`
  margin-top: 10px;
  margin-bottom: 10px;
  max-width: 100%;
  max-height: 200px;
`;

export const CreatePostWrapper = styled.div`
  background-color: var(--bg-primary-color);
  position: relative;
  display: flex;
  gap: 15px;
  padding: 20px;
  border-bottom: var(--border-gray);
  ::-webkit-scrollbar {
    width: 5px;
  }
`;

export const AvatarWrapper = styled.div`
  flex-shrink: 0;
  width: var(--avatar-image-size);
  height: var(--avatar-image-size);
`;

export const FormWrapper = styled.form`
  flex-grow: 1;
  position: relative;
`;

export const Textarea = styled.textarea`
  width: 100%;
  border: none;
  resize: none;
  height: 100px;
  font-size: 18px;
  margin-bottom: 10px;
  background-color: var(--bg-primary-color);



  &:focus {
    transition: 0s all;
    outline: none;
    border-bottom: 1px solid var(--accents-color);
  }

  &::placeholder {

    font-size: 22px;
    color: #828282;
  }
`;

export const TextareaWrapper = styled.div`
`;

export const ErrorWrapper = styled.div`
`;

export const FileInputWrapper = styled.div`
  cursor: pointer;
`;

export const FileInputImage = styled.img`
  width: 25px;
  height: 25px;
  cursor: pointer;
`;

export const FileInput = styled.input`
  display: none;
`;

export const BasementWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;


