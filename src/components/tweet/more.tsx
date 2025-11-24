import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { SyntheticEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { CreatePost } from "@/components/create-post/create-post";
import { Modal } from "@/components/modal/modal";
import { ModalPortal } from "@/components/modal/modal-portal";
import { ROUTES } from "@/constants/routes";
import { db, storage } from "@/firebase";
import { useAppSelector } from "@/hooks/redux";
import { useModalControls } from "@/hooks/use-modal-controls";
import { getUserSelector } from "@/redux/selectors/user-selectors";
import { PostData } from "@/types";

import DeleteConfirmation from "./deleteConfirmation";
import { MoreWrapper, MoreWrapperItem, SVGIcon } from "./styled";

const More = ({
  uid,
  image,
  authorUid,
  content,
}: Pick<PostData, "uid" | "image" | "authorUid" | "content" >) => {
  const user = useAppSelector(getUserSelector);
  const { showModal, handleModalShow, handleModalClose } = useModalControls();
  const {
    showModal: showEditModal,
    handleModalShow: handleEditModalShow,
    handleModalClose: handleEditModalClose,
  } = useModalControls();

  const location = useLocation();
  const navigate = useNavigate();
  const [opened, setOpened] = useState(false);

  const handleDeleteClick = async (e: SyntheticEvent) => {
    e.stopPropagation();
    handleModalClose();
    if (image) {
      const desertRef = ref(storage, image);
      await deleteObject(desertRef);
    }
    await deleteDoc(doc(db, "posts", uid));
    if (location.pathname.includes(ROUTES.POST)) {
      navigate(ROUTES.HOME);
    }
  };

  return (
    <>
      <MoreWrapper className={opened ? "opened" : ""}>
        <MoreWrapperItem>
          <SVGIcon
            viewBox="0 0 24 24"
            onClick={() => {
              setOpened((prev) => !prev);
            }}
          >
            <g>
              <path
                d="M3 12c0-1.1.9-2 2-2s2 .9 2 2-.9 2-2 2-2-.9-2-2zm9 2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm7 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"
                fill="currentColor"
              ></path>
            </g>
          </SVGIcon>
        </MoreWrapperItem>
        <MoreWrapperItem>
          <SVGIcon
            viewBox="0 0 50 50"
            onClick={() => {
              setOpened((prev) => !prev);
            }}
          >
            <g>
              <path
                d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z"
                fill="currentColor"
              ></path>
            </g>
          </SVGIcon>
        </MoreWrapperItem>
        {user.uid === authorUid && (
          <>
            <MoreWrapperItem>
              <SVGIcon viewBox="0 0 41.336 41.336" onClick={handleModalShow}>
                <g>
                  <path
                    d="M36.335,5.668h-8.167V1.5c0-0.828-0.672-1.5-1.5-1.5h-12c-0.828,0-1.5,0.672-1.5,1.5v4.168H5.001c-1.104,0-2,0.896-2,2
		s0.896,2,2,2h2.001v29.168c0,1.381,1.119,2.5,2.5,2.5h22.332c1.381,0,2.5-1.119,2.5-2.5V9.668h2.001c1.104,0,2-0.896,2-2
		S37.438,5.668,36.335,5.668z M14.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
		s1.5,0.672,1.5,1.5V35.67z M22.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21c0-0.828,0.672-1.5,1.5-1.5
		s1.5,0.672,1.5,1.5V35.67z M25.168,5.668h-9V3h9V5.668z M30.168,35.67c0,0.828-0.672,1.5-1.5,1.5s-1.5-0.672-1.5-1.5v-21
		c0-0.828,0.672-1.5,1.5-1.5s1.5,0.672,1.5,1.5V35.67z"
                    fill="currentColor"
                  />
                </g>
              </SVGIcon>
            </MoreWrapperItem>
            <MoreWrapperItem>
              <SVGIcon
                viewBox="0 0 494.936 494.936"
                onClick={handleEditModalShow}
              >
                <g>
                  <path
                    d="M389.844,182.85c-6.743,0-12.21,5.467-12.21,12.21v222.968c0,23.562-19.174,42.735-42.736,42.735H67.157
			c-23.562,0-42.736-19.174-42.736-42.735V150.285c0-23.562,19.174-42.735,42.736-42.735h267.741c6.743,0,12.21-5.467,12.21-12.21
			s-5.467-12.21-12.21-12.21H67.157C30.126,83.13,0,113.255,0,150.285v267.743c0,37.029,30.126,67.155,67.157,67.155h267.741
			c37.03,0,67.156-30.126,67.156-67.155V195.061C402.054,188.318,396.587,182.85,389.844,182.85z"
                    fill="currentColor"
                  />
                  <path
                    d="M483.876,20.791c-14.72-14.72-38.669-14.714-53.377,0L221.352,229.944c-0.28,0.28-3.434,3.559-4.251,5.396l-28.963,65.069
			c-2.057,4.619-1.056,10.027,2.521,13.6c2.337,2.336,5.461,3.576,8.639,3.576c1.675,0,3.362-0.346,4.96-1.057l65.07-28.963
			c1.83-0.815,5.114-3.97,5.396-4.25L483.876,74.169c7.131-7.131,11.06-16.61,11.06-26.692
			C494.936,37.396,491.007,27.915,483.876,20.791z M466.61,56.897L257.457,266.05c-0.035,0.036-0.055,0.078-0.089,0.107
			l-33.989,15.131L238.51,247.3c0.03-0.036,0.071-0.055,0.107-0.09L447.765,38.058c5.038-5.039,13.819-5.033,18.846,0.005
			c2.518,2.51,3.905,5.855,3.905,9.414C470.516,51.036,469.127,54.38,466.61,56.897z"
                    fill="currentColor"
                  />
                </g>
              </SVGIcon>
            </MoreWrapperItem>
          </>
        )}
      </MoreWrapper>
      {showModal && (
        <ModalPortal
          children={
            <Modal onClose={handleModalClose}>
              <DeleteConfirmation
                handleModalClose={handleModalClose}
                handleDeleteClick={handleDeleteClick}
              />
            </Modal>
          }
        />
      )}
      {showEditModal && (
        <ModalPortal
          children={
            <Modal onClose={handleEditModalClose}>
              <CreatePost
                uid={uid}
                type="edit"
                hideAvatar
                defaultContent={content}
                defaultImage={image}
                handleModalClose={handleEditModalClose}
              />
            </Modal>
          }
        />
      )}
    </>
  );
};

export default More;
