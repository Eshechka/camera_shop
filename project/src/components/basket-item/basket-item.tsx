import { useState } from 'react';
import Modal from '../modal/modal';

type basketItemProps = {
  id: number;
  name: string;
  price: number;
  type: string;
  category: string;
  vendorCode: string;
  level: string;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  amount: number | undefined;
  onClickRemoveProduct: (product: number) => void;
  onChangeProductAmount: (productId: number, newAmount: string) => void;
}

function BasketItem({
  id,
  name,
  price,
  type,
  category,
  vendorCode,
  level,
  previewImg,
  previewImg2x,
  previewImgWebp,
  previewImgWebp2x,
  amount,
  onClickRemoveProduct,
  onChangeProductAmount,
}: basketItemProps): JSX.Element {
  const [modalRemoveFromBasketShow, setModalRemoveFromBasketShow] = useState(false);
  const [amountEmpty, setAmountEmpty] = useState(false);

  return (
    <>
      <li className="basket-item">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
            <img src={previewImg} srcSet={previewImg2x} width="140" height="120" alt={name} />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">{name}</p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item"><span className="basket-item__article">Артикул:</span> <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type} {category && (category === 'Фотоаппарат' ? 'фотокамера' : category.toLowerCase())}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
        <p className="basket-item__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
        <div className="quantity">
          <button
            className="btn-icon btn-icon--prev"
            disabled={!amount || amount < 2}
            aria-label="уменьшить количество товара"
            onClick={() => onChangeProductAmount(id, (amount && +amount > 1 ? `${amount - 1}` : '1'))}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter2"></label>
          <input
            type="number"
            id="counter2"
            value={amountEmpty ? '' : amount}
            onChange={(e) => {
              if (e.target.value === '') {
                setAmountEmpty(true);
              } else {
                onChangeProductAmount(id, e.target.value);
                setAmountEmpty(false);
              }
            }}
            onBlur={(e) => {
              if (amountEmpty) {
                setAmountEmpty(false);
              }
            }}
            min="1" max="99"
            aria-label="количество товара"
          />
          <button
            className="btn-icon btn-icon--next"
            disabled={!amount || amount > 98}
            aria-label="увеличить количество товара"
            onClick={() => onChangeProductAmount(id, (amount && +amount < 99 ? `${amount + 1}` : '99'))}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>
        <div className="basket-item__total-price">
          <span className="visually-hidden">Общая цена:</span>
          {amount ? price * amount : ''} ₽
        </div>
        <button
          className="cross-btn"
          type="button"
          aria-label="Удалить товар"
          onClick={() => setModalRemoveFromBasketShow(true)}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </li>
      {modalRemoveFromBasketShow &&
        <Modal
          onClose={() => setModalRemoveFromBasketShow(false)}
        >
          <p className="title title--h4">Удалить этот товар?</p>
          <div className="basket-item basket-item--short">
            <div className="basket-item__img">
              <picture>
                <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
                <img src={previewImg} srcSet={`${previewImg} 2x`} width="140" height="120" alt={name} />
              </picture>
            </div>
            <div className="basket-item__description">
              <p className="basket-item__title">{name}</p>
              <ul className="basket-item__list">
                <li className="basket-item__list-item">
                  <span className="basket-item__article">Артикул:</span>
                  <span className="basket-item__number">{vendorCode}</span>
                </li>
                <li className="basket-item__list-item">{type} {category === 'Фотоаппарат' ? 'фотокамера' : category.toLowerCase()}</li>
                <li className="basket-item__list-item">{level} уровень</li>
              </ul>
            </div>
          </div>
          <div className="modal__buttons">
            <button
              className="btn btn--purple modal__btn modal__btn--half-width"
              type="button"
              onClick={() => onClickRemoveProduct(id)}
            >
              Удалить
            </button>
            <button
              className="btn btn--transparent modal__btn modal__btn--half-width"
              onClick={() => setModalRemoveFromBasketShow(false)}
            >
              Продолжить покупки
            </button>
          </div>
          <button className="cross-btn" type="button" aria-label="Закрыть попап">
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </Modal>}
    </>
  );
}

export default BasketItem;
