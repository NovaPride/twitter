import search from "@assets/icons/search.svg";

import { useModalControls } from "@/hooks/use-modal-controls";
import { Button } from "@/ui/buttons";

import { Modal } from "../modal/modal";
import { ModalPortal } from "../modal/modal-portal";
import { SearchSidebar } from "./search-sidebar";

import { SearchIcon } from "./styled";

export function MobileSearchSidebar() {
  const { showModal, handleModalShow, handleModalClose } = useModalControls();

  return (
    <>
      {/* <Button
        variant="outlined"
        size="extra-small"
        type="button"
        icon={search}
        onClick={handleModalShow}
      >
        {" "}
      </Button> */}
      <SearchIcon
        onClick={handleModalShow}
        width="24"
        height="25"
        viewBox="0 0 24 25"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path
            d="M21.53 21.2381L17.87 17.5781C19.195 16.0081 20 13.9821 20 11.7681C20 6.79807 15.97 2.76807 11 2.76807C6.03 2.76807 2 6.79807 2 11.7681C2 16.7381 6.03 20.7681 11 20.7681C13.215 20.7681 15.24 19.9641 16.808 18.6381L20.468 22.2981C20.615 22.4441 20.808 22.5181 20.998 22.5181C21.188 22.5181 21.383 22.4451 21.528 22.2981C21.823 22.0051 21.823 21.5311 21.53 21.2381ZM3.5 11.7681C3.5 7.63307 6.865 4.26807 11 4.26807C15.135 4.26807 18.5 7.63307 18.5 11.7681C18.5 15.9031 15.135 19.2681 11 19.2681C6.865 19.2681 3.5 15.9031 3.5 11.7681Z"
            fill="currentColor"
          />
        </g>
      </SearchIcon>
      {showModal && (
        <ModalPortal
          children={
            <Modal onClose={handleModalClose}>
              <SearchSidebar />
            </Modal>
          }
        />
      )}
    </>
  );
}
