import styled from "styled-components";

import { theme } from "@/styles/theme";

export const ProfileWrapper = styled.div`
  border-top: none;
`;

export const ProfileBody = styled.div`
  padding: 80px 25px 50px 25px;
  border-bottom: var(--border-gray);
  position: relative;
`;

export const ProfileBodyName = styled.p`
  font-weight: 700;
  font-size: 24px;
`;

export const ProfileBodyTag = styled.p`
  opacity: ${theme.opacity};
  margin-top: 5px;
`;

export const ProfileBodyStatus = styled.p`
  font-size: 18px;
  margin-top: 15px;
`;

export const ProfileBackgroundImageWrapperWithChange = styled.div`
  position: relative;
  &:hover {
    :first-child {
      filter: brightness(0.69);
    }
    :last-child {
      opacity: 1;
    }
  }
`;

export const AvatarWrapper = styled.div`
  position: absolute;
  width: 150px;
  height: 150px;
  top: -75px;
  left: 10px;
`;

export const AvatarWrapperWithChange = styled(AvatarWrapper)`
  &:hover {
    :first-child {
      filter: brightness(0.69);
    }
    :last-child {
      opacity: 1;
    }
  }
`;

export const ImageUpload = styled.img`
  position: absolute;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 25px;
  height: 25px;
  transition: 0.2s all;
  cursor: pointer;
`;

export const EditButtonWrapper = styled.div`
  position: absolute;
  right: 20px;
  top: 20px;
`;
