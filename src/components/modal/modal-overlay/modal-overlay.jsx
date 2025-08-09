import { useId } from 'react';
import modalOverlayStyles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

const ModalOverlay = ({ children, setIsVisible }) => {
  const modalId = useId();

  const handleClick = e => {    
    
    if(e.target.id === modalId){
      e.stopPropagation();
      setIsVisible(false);
    }
  }

  return (
    <span className={modalOverlayStyles.wrapper} onClick={handleClick} id={modalId}>
      {children}
    </span>
  );
}

ModalOverlay.propTypes = {
  setIsVisible: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default ModalOverlay;