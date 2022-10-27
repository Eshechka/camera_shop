import React from 'react';
import cn from 'classnames';

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
  return (
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
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </div>
      </div>
    </div>);
}

export default Modal;
