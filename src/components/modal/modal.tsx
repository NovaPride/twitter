import {
  PropsWithChildren,
  ReactNode,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";

import { ModalClose, Overlay, StyledModal } from "./styled";

type ModalProps = {
  onClose: VoidFunction;
  children: PropsWithChildren<ReactNode>;
};

export function Modal({ onClose, children }: ModalProps) {
  const elementRef = useRef<any>(null);
  const childRef = useRef<any>(null);
  const [addStyle, setAddStyle] = useState<boolean>(false);

  useEffect(() => {
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        if (!childRef.current) return;
        const modalHeight = entry.contentRect.height;
        const modalContentHeight = childRef.current.clientHeight;

        setAddStyle(modalContentHeight >= modalHeight);
      }
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const handleCloseClick = (e: SyntheticEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const handleEscapeClick = (e: KeyboardEvent) => {
    if ((e as KeyboardEvent).key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    document.body.addEventListener("keydown", handleEscapeClick);
    return () => {
      document.body.removeEventListener("keydown", handleEscapeClick);
    };
  });

  return (
    <Overlay
      aria-modal="true"
      className="overlay"
      onMouseDown={handleCloseClick}
      ref={elementRef}
    >
      <StyledModal
        className={addStyle ? "modal modal_top" : "modal"}
        ref={childRef}
      >
        <ModalClose
          className="modal__close"
          onClick={handleCloseClick}
          tabIndex={0}
        >
          &times;
        </ModalClose>
        {children}
      </StyledModal>
    </Overlay>
  );
}
