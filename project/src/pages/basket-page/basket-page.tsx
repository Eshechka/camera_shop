import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { toast } from 'react-toastify';
import BasketItem from '../../components/basket-item/basket-item';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Svgs from '../../components/svgs/svgs';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsByIdsAction, fetchPromoDiscountAction, makeOrderAction } from '../../store/api-actions';
import { clearProductIdsWAmount, changeProductAmountInBasket, removeProductFromBasket, clearBasketProducts, clearIsOrderMade, clearDiscountInfo, clearDiscountIsApproved } from '../../store/data-basket/data-basket';
import { getBasketProductIdsWAmount, getBasketProducts, getDiscount, getIsDiscountApproved, getIsOrderMade } from '../../store/data-basket/selectors';
import { Product } from '../../types/product';


function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [productsToBasket, setProductsToBasket] = useState<Product[]>([]);
  const [productsSum, setProductsSum] = useState<number | null>(null);
  const [productsDiscountSum, setProductsDiscountSum] = useState<number | null>(null);
  const [productsTotalSum, setProductsTotalSum] = useState<number | null>(null);
  const [promocode, setPromocode] = useState('');
  const [modalMadeOrderShow, setModalMadeOrderShow] = useState(false);

  const basketProducts = useAppSelector(getBasketProducts);
  const basketProductsStore = useAppSelector(getBasketProductIdsWAmount);
  const isOrderMade = useAppSelector(getIsOrderMade);
  const discount = useAppSelector(getDiscount);
  const isDiscountApproved = useAppSelector(getIsDiscountApproved);


  useEffect(() => {
    const searchUrl = basketProductsStore.reduce((acc, prodStore) => `${acc}id=${prodStore.id}&`, '');

    searchUrl.slice(-1);
    if (searchUrl !== '') {
      // есть айдишники товаров в корзине
      dispatch(fetchProductsByIdsAction(searchUrl));
    } else {
      // нет айдишников товаров в корзине. Очищаем данные айди-количество в сторе
      dispatch(clearBasketProducts());
    }

  }, [basketProductsStore]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const newBasketProducts = basketProducts.map((prod) => {
      let amount = 1;
      const index = basketProductsStore.findIndex((prodStore) => prodStore.id === prod.id);
      if (index !== -1) {
        amount = basketProductsStore[index].amount;
        return {...prod, amount: amount};
      } else {
        return {...prod, amount: amount};
      }
    });

    const newProductsSum = newBasketProducts.reduce((sum, prod) => sum + (prod.amount * prod.price), 0);

    setProductsToBasket(newBasketProducts);
    setProductsSum(newProductsSum);

    if (discount) {
      const newProductsTotalSum = Math.round(newProductsSum / 100 * (100 - +discount));
      setProductsDiscountSum(newProductsSum - newProductsTotalSum);
      setProductsTotalSum(newProductsTotalSum);
    } else {
      setProductsTotalSum(newProductsSum);
      setProductsDiscountSum(null);
    }
  }, [basketProducts]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isOrderMade === true) {
      setModalMadeOrderShow(true);
      setPromocode('');
      dispatch(clearDiscountInfo());
      dispatch(clearProductIdsWAmount());
      dispatch(clearIsOrderMade());
    }
    if (isOrderMade === false) {
      toast.warn('Не удалось отправить заказ. Повторите попытку.');
    }
  }, [isOrderMade]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (discount && productsSum) {
      const newProductsSum = Math.round(productsSum / 100 * (100 - +discount));
      setProductsDiscountSum(productsSum - newProductsSum);
      setProductsTotalSum(newProductsSum);
    }
  }, [discount]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (isDiscountApproved !== null) {
      dispatch(clearDiscountIsApproved());
    }
    document.body.style.overflow = 'unset';
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickRemoveProduct = (productId: number) => {
    dispatch(removeProductFromBasket(productId));
  };
  const onChangeProductAmount = (productId: number, newAmount: string) => {
    if (newAmount !== '') {
      let parsedAmount = parseInt(newAmount, 10);
      if (parsedAmount < 1) {
        parsedAmount = 1;
      }
      if (parsedAmount > 99) {
        parsedAmount = 99;
      }
      dispatch(changeProductAmountInBasket({productId, newAmount: parsedAmount}));
    }
  };
  const onSubmitOrderForm = () => {
    if (discount && promocode) {
      dispatch(makeOrderAction({camerasIds: basketProductsStore.map((prod) => prod.id), coupon: promocode}));
    } else {
      toast.warn('Для заказа нужны товары в корзине и применённый промокод');
    }
  };
  const onSubmitSetPromocode = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchPromoDiscountAction({coupon: promocode}));
  };
  const onChangePromocode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPromocode(e.target.value);
    dispatch(clearDiscountIsApproved());
  };

  return (
    <React.Fragment>
      <div className="visually-hidden">
        <Svgs />
      </div>
      <div className="wrapper">
        <Header />
        <main>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <NavLink className="breadcrumbs__link" to={AppRoute.Root}>Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </NavLink>
                  </li>
                  <li className="breadcrumbs__item">
                    <NavLink className="breadcrumbs__link" to={AppRoute.Root}>Каталог
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </NavLink>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Корзина</span>
                  </li>
                </ul>
              </div>
            </div>
            <section className="basket">
              <div className="container">
                <h1 className="title title--h2">Корзина</h1>
                <ul className="basket__list">
                  {productsToBasket.map((product) => (
                    <BasketItem
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      price={product.price}
                      type={product.type}
                      category={product.category}
                      vendorCode={product.vendorCode}
                      level={product.level}
                      previewImg={product.previewImg}
                      previewImg2x={product.previewImg2x}
                      previewImgWebp={product.previewImgWebp}
                      previewImgWebp2x={product.previewImgWebp2x}
                      amount={product.amount}
                      onClickRemoveProduct={onClickRemoveProduct}
                      onChangeProductAmount={onChangeProductAmount}
                    />)
                  )}

                </ul>
                <div className="basket__summary">
                  <div className="basket__promo">
                    <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                    <div className="basket-form">
                      <form
                        action='#'
                        onSubmit={onSubmitSetPromocode}
                      >
                        <div className={['custom-input', isDiscountApproved === false ? 'is-invalid' : '', isDiscountApproved === true ? 'is-valid' : ''].join(' ')}>
                          <label><span className="custom-input__label">Промокод</span>
                            <input
                              type="text" name="promo"
                              placeholder="Введите промокод"
                              onChange={onChangePromocode}
                              value={promocode}
                            />
                          </label>
                          {isDiscountApproved === false && <p className="custom-input__error">Промокод неверный</p>}
                          {isDiscountApproved && <p className="custom-input__success">Промокод принят!</p>}
                        </div>
                        <button
                          className="btn"
                          type="submit"
                          disabled={!promocode || !promocode.length}
                        >
                          Применить
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span>
                      <span className="basket__summary-value">{productsSum ? productsSum : 0} ₽</span>
                    </p>
                    <p className="basket__summary-item">
                      <span className="basket__summary-text">Скидка:</span>
                      <span className={['basket__summary-value', productsDiscountSum ? 'basket__summary-value--bonus' : ''].join(' ')}>
                        {productsDiscountSum ? productsDiscountSum : 0} ₽
                      </span>
                    </p>
                    <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span>
                      <span className="basket__summary-value basket__summary-value--total">{productsTotalSum ? productsTotalSum : 0} ₽</span>
                    </p>
                    <button
                      className="btn btn--purple"
                      type="submit"
                      onClick={onSubmitOrderForm}
                    >
                      Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
      {modalMadeOrderShow &&
        <Modal
          onClose={() => setModalMadeOrderShow(false)}
          classname="modal--narrow"
        >
          <p className="title title--h4">Спасибо за покупку</p>
          <svg className="modal__icon" width="80" height="78" aria-hidden="true">
            <use xlinkHref="#icon-review-success"></use>
          </svg>
          <div className="modal__buttons">
            <NavLink
              className="btn btn--purple modal__btn modal__btn--fit-width"
              to={AppRoute.Catalog}
              type="button"
            >
              Вернуться к покупкам
            </NavLink>
          </div>
        </Modal>}

    </React.Fragment>
  );
}

export default BasketPage;
