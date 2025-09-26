import { FC, MouseEventHandler, useId } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import { ModalProps } from '../types';

const ModalOverlay: FC<ModalProps> = ({ children, modalSwitcher }) => {
  const modalId = useId();

  const handleClick: MouseEventHandler<HTMLSpanElement> = e => {    
    const target = e.target as HTMLElement;

    if(target.id === modalId){
      e.stopPropagation();
      modalSwitcher();
    }
  }

  return (
    <span className={modalOverlayStyles.wrapper} onClick={handleClick} id={modalId}>
      {children}
    </span>
  );
}

export default ModalOverlay;