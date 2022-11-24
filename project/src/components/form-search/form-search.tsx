import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useDebounce from '../../hooks/use-debounce/use-debounce';
import { fetchSearchingProductsAction } from '../../store/api-actions';
import { getSearchingProducts } from '../../store/data-catalog/selectors';


function FormSearch(): JSX.Element {
  const dispatch = useAppDispatch();
  const [searchInput, setSearchInput] = useState('');
  const [focused, setFocused] = useState(false);
  const [moused, setMoused] = useState(false);

  const searchedProducts = useAppSelector(getSearchingProducts);
  const debouncedSearchStr = useDebounce(searchInput, 500);

  const clearSearchInput = () => {
    setSearchInput('');
  };

  useEffect(() => {
    setMoused(false);
  }, []);

  useEffect(() => {
    if (debouncedSearchStr) {
      dispatch(fetchSearchingProductsAction(`name_like=${debouncedSearchStr}`));
    }
  }, [debouncedSearchStr]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="form-search">
      <form>
        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text" autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchInput}
            onChange={(e) => setSearchInput(e.currentTarget.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        </label>
        {(focused || moused) && searchInput && searchedProducts &&
        <ul
          className="form-search__select-list"
          style={{
            visibility: 'unset',
            opacity: 1,
          }}
          onMouseOver={() => setMoused(true)}
          onMouseLeave={() => setMoused(false)}
        >
          {searchedProducts.length === 0 && <li className="form-search__select-item">Ничего не найдено</li>}
          {searchedProducts.map((product) => (
            <li
              key={product.id}
              className="form-search__select-item"
              tabIndex={0}
            >
              <NavLink
                onClick={clearSearchInput}
                to={`${AppRoute.Product}/${product.id}`}
                style={{
                  display: 'inline-flex',
                  width: '100%',
                }}
              >
                {product.name}
              </NavLink>
            </li>
          ))}
        </ul>}
      </form>
      {searchInput &&
        <button
          className="form-search__reset"
          type="reset"
          onClick={clearSearchInput}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
          <span className="visually-hidden">Сбросить поиск</span>
        </button>}
    </div>
  );
}

export default FormSearch;
