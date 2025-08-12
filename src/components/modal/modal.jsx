import { useEffect } from "react";
import ModalOverlay from "./modal-overlay/modal-overlay";
import modalStyles from './modal.module.css';
import { createPortal } from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import PropTypes from 'prop-types';

const Modal = ({ children, setIsVisible}) => {
  
  useEffect(() => {
    const handleEscPressed = e => {
      if (e.key === 'Escape') {
        setIsVisible(false);
      }
    }

    document.addEventListener('keydown', handleEscPressed);

    return () => {
      document.removeEventListener('keydown', handleEscPressed);
    }
  })

  const modalElement = document.getElementById('modal');

  return (
    createPortal(
      <ModalOverlay setIsVisible={setIsVisible}>
        <span className={modalStyles.wrapper}>
          <span 
            className={`${modalStyles['close-btn']} text text_type_main-large`}
            onClick={e => {
              e.stopPropagation();
              
              setIsVisible(false);
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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  setIsVisible: PropTypes.func.isRequired,
}


export default Modal;