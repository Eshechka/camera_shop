import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';
import { getBasketProductIdsWAmount } from '../../store/data-basket/selectors';
import FormSearch from '../form-search/form-search';

function Header(): JSX.Element {
  const basketProducts = useAppSelector(getBasketProductIdsWAmount);
  const [basketProductsAmount, setBasketProductsAmount] = useState(0);

  useEffect(() => {
    if (basketProducts) {
      const total = basketProducts.reduce((sum, prodStore) => sum + prodStore.amount, 0);
      setBasketProductsAmount(total);
    }
  }, [basketProducts]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <header className="header" id="header">
      <div className="container">
        <NavLink className="header__logo" to={AppRoute.Root} aria-label="Переход на главную">
          <svg width="100" height="36" aria-hidden="true">
            <use xlinkHref="#icon-logo"></use>
          </svg>
        </NavLink>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item"><NavLink className="main-nav__link" to={AppRoute.Root}>Каталог</NavLink>
            </li>
            <li className="main-nav__item"><NavLink className="main-nav__link" to={AppRoute.Warranty}>Гарантии</NavLink>
            </li>
            <li className="main-nav__item"><NavLink className="main-nav__link" to={AppRoute.Delivery}>Доставка</NavLink>
            </li>
            <li className="main-nav__item"><NavLink className="main-nav__link" to={AppRoute.About}>О компании</NavLink>
            </li>
          </ul>
        </nav>
        <FormSearch />
        <NavLink className="header__basket-link" to={AppRoute.Basket}>
          <svg width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-basket"></use>
          </svg>
          {basketProductsAmount > 0 && <span className="header__basket-count">{basketProductsAmount}</span>}
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
