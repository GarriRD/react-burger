import { FC, useEffect } from "react";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import { ModalProps } from "./types";

const Modal: FC<ModalProps> = ({ children, modalSwitcher}) => {
  useEffect(() => {
    const handleEscPressed = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        modalSwitcher();
      }
    }

    document.addEventListener('keydown', handleEscPressed);

    return () => {
      document.removeEventListener('keydown', handleEscPressed);
    }
  })

  const modalElement = document.getElementById('modal') as HTMLElement;

  return (
    createPortal(
      <ModalOverlay modalSwitcher={modalSwitcher}>
        <span className={modalStyles.wrapper}>
          <span 
            className={`${modalStyles['close-btn']} text text_type_main-large`}
            onClick={e => {
              e.stopPropagation();
              
              modalSwitcher();
            }}
          >
            <CloseIcon type={'primary'} />
            
          </span>
          {children}
        </span>
      </ModalOverlay>,
      modalElement
    )
  );
}


export default Modal;