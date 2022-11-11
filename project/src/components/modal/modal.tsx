import { useEffect } from 'react';
import cn from 'classnames';
import FocusTrap from 'focus-trap-react';

type modalProps = {
  children: JSX.Element[];
  onClose: () => void;
  classname?: string;
}

function Modal({
  children,
  onClose,
  classname,
}: modalProps): JSX.Element {

  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscapeKey);

    return () => document.removeEventListener('keydown', handleEscapeKey);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <FocusTrap>
      <div className={cn('modal is-active', classname)}>
        <div className="modal__wrapper">
          <div className="modal__overlay" onClick={onClose}></div>
          <div className="modal__content">
            {children}
            <button
              className="cross-btn"
              type="button"
              aria-label="Закрыть попап"
              onClick={onClose}
              tabIndex={-1}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </FocusTrap>);
}

export default Modal;
