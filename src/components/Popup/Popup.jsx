import { useEffect } from 'react';
import './Popup.scss';

function Popup({
  title,
  name,
  children,
  onSubmit,
  isOpen,
  onClose,
  showCloseButton = true,
  size = 'medium',
  customClassName = '',
  overlayClickClose = true
}) {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleEscClose);
    }
    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, [isOpen]);

  function handleEscClose(evt) {
    if (evt.key === 'Escape') {
      onClose(); // ✅ Используем переданный onClose
    }
  }

  function handleOverlayClick(evt) {
    if (overlayClickClose && evt.target.classList.contains('popup__container')) {
      onClose(); // ✅ Используем переданный onClose
    }
  }

  const sizeClasses = {
    small: 'popup__content_size_small',
    medium: 'popup__content_size_medium',
    large: 'popup__content_size_large'
  };

  return (
    <div 
      className={`popup popup_form_${name} ${isOpen ? "popup_opened" : ""} ${customClassName}`}
      onMouseDown={handleOverlayClick}
    >
      <div className="popup__container">
        <form
          action="#"
          noValidate
          name={name}
          onSubmit={onSubmit}
          className={`popup__content ${sizeClasses[size]}`}
        >
          <div className="popup__header">
            <h3 className="popup__title">{title}</h3>
            {showCloseButton && (
              <button 
                type="button" 
                className="popup__close"
                onClick={onClose} // ✅ Используем переданный onClose
                aria-label="Закрыть"
              >
                <span className="popup__close-icon">×</span>
              </button>
            )}
          </div>
          
          <div className="popup__body">
            {children}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Popup;