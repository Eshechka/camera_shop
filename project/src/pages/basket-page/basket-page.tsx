import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import BasketItem from '../../components/basket-item/basket-item';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Svgs from '../../components/svgs/svgs';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsByIdsAction } from '../../store/api-actions';
import { clearProductIdsWAmount, changeProductAmountInBasket, removeProductFromBasket } from '../../store/data-basket/data-basket';
import { getBasketProductIdsWAmount, getBasketProducts } from '../../store/data-basket/selectors';
import { Product } from '../../types/product';


function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const [productsToBasket, setProductsToBasket] = useState<Product[]>([]);
  const [productsSum, setProductsSum] = useState<number | null>(null);

  const basketProducts = useAppSelector(getBasketProducts);
  const basketProductsStore = useAppSelector(getBasketProductIdsWAmount);


  useEffect(() => {
    const searchUrl = basketProductsStore.reduce((acc, prodStore) => `${acc}id=${prodStore.id}&`, '');
    searchUrl.slice(-1);
    if (searchUrl !== '') {
      // есть айдишники товаров в корзине
      dispatch(fetchProductsByIdsAction(searchUrl));
    } else {
      // нет айдишникоы товаров в корзине. Оищаем данные айди-количество в сторе
      dispatch(clearProductIdsWAmount());
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
  }, [basketProducts]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickRemoveProduct = (productId: number) => {
    dispatch(removeProductFromBasket(productId));
  };
  const onChangeProductAmount = (productId: number, newAmount: number) => {
    if (newAmount < 1) {
      newAmount = 1;
    }
    if (newAmount > 99) {
      newAmount = 99;
    }
    dispatch(changeProductAmountInBasket({productId, newAmount}));
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
                      <form action="#">
                        <div className="custom-input">
                          <label><span className="custom-input__label">Промокод</span>
                            <input type="text" name="promo" placeholder="Введите промокод" />
                          </label>
                          <p className="custom-input__error">Промокод неверный</p>
                          <p className="custom-input__success">Промокод принят!</p>
                        </div>
                        <button className="btn" type="submit">Применить
                        </button>
                      </form>
                    </div>
                  </div>
                  <div className="basket__summary-order">
                    <p className="basket__summary-item"><span className="basket__summary-text">Всего:</span><span className="basket__summary-value">{productsSum ? productsSum : ''} ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text">Скидка:</span><span className="basket__summary-value basket__summary-value--bonus">0 ₽</span></p>
                    <p className="basket__summary-item"><span className="basket__summary-text basket__summary-text--total">К оплате:</span><span className="basket__summary-value basket__summary-value--total">{productsSum ? productsSum : ''} ₽</span></p>
                    <button className="btn btn--purple" type="submit">Оформить заказ
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </React.Fragment>
  );
}

export default BasketPage;
