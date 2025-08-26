import { useId } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, modalSwitcher }) => {
  const modalId = useId();

  const handleClick = e => {    
    
    if(e.target.id === modalId){
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

ModalOverlay.propTypes = {
  modalSwitcher: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default ModalOverlay;