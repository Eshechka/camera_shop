import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import Aside from '../../components/aside/aside';
import Banner from '../../components/banner/banner';
import CardList from '../../components/card-list/card-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Pagination from '../../components/pagination/pagination';
import Spinner from '../../components/spinner/spinner';
import Svgs from '../../components/svgs/svgs';
import { AppRoute, filterCategoryText, filterLevelText, filterMaxPriceText, filterMinPriceText, filterTypeText, MAX_PAGINATION_ELEMS, pageUrlText, SortOrders, sortOrderUrlText, SortTypes, sortTypeUrlText } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsAction, fetchPromoAction } from '../../store/api-actions';
import { getLoadingDataStatus, getProducts, getPromo } from '../../store/data-catalog/selectors';
import { Product } from '../../types/product';
import { addProductToBasket } from '../../store/data-basket/data-basket';
import { getBasketProducts } from '../../store/data-basket/selectors';


type catalogPageProps = {
  maxPages: number|null;
  setParams: (params: string | null) => void;
}

function CatalogPage({
  maxPages,
  setParams,
}: catalogPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);
  const [sortType, setSortType] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('');
  const [filterCategory, setFilterCategory] = useState<string[]>([]);
  const [filterLevel, setFilterLevel] = useState<string[]>([]);
  const [filterType, setFilterType] = useState<string[]>([]);
  const [filterMinPrice, setFilterMinPrice] = useState<''|number>('');
  const [filterMaxPrice, setFilterMaxPrice] = useState<''|number>('');

  const [fromUrlFilterCategory, setFromUrlFilterCategory] = useState<string[]>([]);
  const [fromUrlFilterLevel, setFromUrlFilterLevel] = useState<string[]>([]);
  const [fromUrlFilterType, setFromUrlFilterType] = useState<string[]>([]);
  const [fromUrlFilterMinPrice, setFromUrlFilterMinPrice] = useState<number|''>('');
  const [fromUrlFilterMaxPrice, setFromUrlFilterMaxPrice] = useState<number|''>('');

  const fetchedProducts = useAppSelector(getProducts);
  const promo = useAppSelector(getPromo);
  const isDataLoading = useAppSelector(getLoadingDataStatus);
  const basketProducts = useAppSelector(getBasketProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [noPage, setNoPage] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [changeSearchParamsByClick, setChangeSearchParamsByClick] = useState(false);

  const [noProductsFound, setNoProductsFound] = useState(false);

  const changePageHandle = (page: number) => {
    const start = MAX_PAGINATION_ELEMS * (page - 1);
    const end = start + MAX_PAGINATION_ELEMS;
    const fCategory = filterCategory.length > 0 ? filterCategory.map((cat) => `&category=${cat}`).join('') : '';
    const fLevel = filterLevel.length > 0 ? filterLevel.map((cat) => `&level=${cat}`).join('') : '';
    const fType = filterType.length > 0 ? filterType.map((cat) => `&type=${cat}`).join('') : '';
    const fMinPrice = (filterMinPrice || filterMinPrice === 0) ? `&price_gte=${filterMinPrice}` : '';
    const fMaxPrice = (filterMaxPrice || filterMaxPrice === 0) ? `&price_lte=${filterMaxPrice}` : '';

    const fetchUrl = `_start=${start}&_end=${end}&_sort=${sortType}&_order=${sortOrder}${fCategory}${fLevel}${fType}${fMinPrice}${fMaxPrice}`;
    dispatch(fetchProductsAction(fetchUrl));

    const navUrl = AppRoute.Catalog + pageUrlText + String(page) +
      (sortType ? sortTypeUrlText + sortType : '') +
      (sortOrder ? sortOrderUrlText + sortOrder : '') +
      (filterCategory.length > 0 ? filterCategoryText + filterCategory.join(',') : '') +
      (filterLevel.length > 0 ? filterLevelText + filterLevel.join(',') : '') +
      (filterType.length > 0 ? filterTypeText + filterType.join(',') : '') +
      ((filterMinPrice || filterMinPrice === 0) ? `${filterMinPriceText}${filterMinPrice}` : '') +
      ((filterMaxPrice || filterMaxPrice === 0) ? `${filterMaxPriceText}${filterMaxPrice}` : '');
    navigate(navUrl);

    setCurrentPage(page);
  };

  const changeSortOrder = (order: string) => {
    if (!sortType) {
      setSortType(SortTypes.Price);
    }
    setSortOrder(order);
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };
  const changeSortType = (type: string) => {
    if (!sortOrder) {
      setSortOrder(SortOrders.Asc);
    }
    setSortType(type);
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };

  const changeFilterCategory = (categories: string[]) => {
    setFilterCategory(categories);
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };
  const changeFilterLevel = (levels: string[]) => {
    setFilterLevel(levels);
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };
  const changeFilterType = (types: string[]) => {
    setFilterType(types);
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };
  const changeFilterMinPrice = (minPrice: number|'') => {
    setFilterMinPrice(minPrice);
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };
  const changeFilterMaxPrice = (maxPrice: number|'') => {
    setFilterMaxPrice(maxPrice);
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };

  const resetFilterAll = () => {
    setFilterCategory([]);
    setFilterLevel([]);
    setFilterType([]);
    setFilterMinPrice('');
    setFilterMaxPrice('');
    if (!changeSearchParamsByClick) {
      setChangeSearchParamsByClick(true);
    }
  };


  useEffect(() => {
    // устанавливаем новые параметры запроса для получения общего количества продуктов (length)
    const fCategory = filterCategory.length > 0 ? filterCategory.map((cat) => `&category=${cat}`).join('') : '';
    const fLevel = filterLevel.length > 0 ? filterLevel.map((cat) => `&level=${cat}`).join('') : '';
    const fType = filterType.length > 0 ? filterType.map((cat) => `&type=${cat}`).join('') : '';
    const fMinPrice = (filterMinPrice || filterMinPrice === 0) ? `&price_gte=${filterMinPrice}` : '';
    const fMaxPrice = (filterMaxPrice || filterMaxPrice === 0) ? `&price_lte=${filterMaxPrice}` : '';

    setParams(`${fCategory}${fLevel}${fType}${fMinPrice}${fMaxPrice}`);

    if (changeSearchParamsByClick) {
      changePageHandle(1);
    } else {
      setFromUrlFilterCategory(filterCategory);
      setFromUrlFilterLevel(filterLevel);
      setFromUrlFilterType(filterType);
      setFromUrlFilterMinPrice(filterMinPrice);
      setFromUrlFilterMaxPrice(filterMaxPrice);
    }
  }, [filterCategory, filterLevel, filterType, filterMinPrice, filterMaxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const search = queryString.parse(location.search);

    // Если сортировка есть и она изменилась, то меням страницу пагинации на 1 и fetch products
    // условия && sortOrder !== search.order нужны при смене maxPages - чтобы не переустанавливать значение sortOrder, которое уже установлено и не менялось
    if (search.order && typeof search.order === 'string' && sortOrder !== search.order) {
      if (!sortType && !search.sort) {
        setSortType(SortTypes.Price);
      }
      setSortOrder(search.order);
    }
    if (search.sort && typeof search.sort === 'string' && sortType !== search.sort) {
      if (!sortOrder && !search.order) {
        setSortOrder(SortOrders.Asc);
      }
      setSortType(search.sort);
    }
    if (search.category && typeof search.category === 'string') {
      setFilterCategory(search.category.split(','));
    }
    if (search.level && typeof search.level === 'string') {
      setFilterLevel(search.level.split(','));
    }
    if (search.type && typeof search.type === 'string') {
      setFilterType(search.type.split(','));
    }
    if (search.price_gte && typeof search.price_gte === 'string') {
      const normalizedPrice = parseInt(search.price_gte, 10);
      setFilterMinPrice(normalizedPrice);
    }
    if (search.price_lte && typeof search.price_lte === 'string') {
      const normalizedPrice = parseInt(search.price_lte, 10);
      setFilterMaxPrice(normalizedPrice);
    }

    if (maxPages) {
      // Редирект на 1 страницу, если зашли без ее указания
      if ((location.pathname === AppRoute.Catalog)
        && !location.search.startsWith(`${pageUrlText.slice(1)}`)) {
        navigate(`${AppRoute.Catalog}${pageUrlText}1`);
      }
      if (location.pathname === `${AppRoute.Catalog}/`) {
        navigate(`${AppRoute.Catalog}`);
      }
      // Проверяем указанный номер страницы, если он больше максимально возможного - показываем уведомление
      if (search.page) {
        const pageNumber = typeof search.page === 'string' ? parseInt(search.page, 10) : 1;

        if (pageNumber && pageNumber <= maxPages) {
          changePageHandle(pageNumber);
        } else {
          setNoPage(true);
        }
      }
    }
  }, [location.pathname, maxPages]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (fetchedProducts) {
      setProducts(fetchedProducts);
    }
  }, [fetchedProducts]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log('basketProducts: ', basketProducts); // eslint-disable-line
  }, [basketProducts]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (modalShow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalShow]);

  useEffect(() => {
    if (changeSearchParamsByClick) {
      changePageHandle(1);
    }
  }, [sortType, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

  const onClickBuyProduct = (productId: number) => {
    setModalShow(true);
    dispatch(addProductToBasket(productId));
    console.log('productId', productId); // eslint-disable-line
  };

  return (
    <React.Fragment>
      <div className="visually-hidden">
        <Svgs />
      </div>
      <div className="wrapper">
        <Header/>
        <main>
          <Banner promo={promo}/>
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
                    <span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                  </li>
                </ul>
              </div>
            </div>
            {!noPage &&
              <section className="catalog">
                <div className="container">
                  <h1 className="title title--h2">Каталог фото- и видеотехники</h1>
                  <div className="page-content__columns">
                    <Aside
                      fromUrlCategories={fromUrlFilterCategory} changeFilterCategory={changeFilterCategory}
                      fromUrlLevels={fromUrlFilterLevel} changeFilterLevel={changeFilterLevel}
                      fromUrlTypes={fromUrlFilterType} changeFilterType={changeFilterType}
                      fromUrlMinPrice={fromUrlFilterMinPrice} changeFilterMinPrice={changeFilterMinPrice}
                      fromUrlMaxPrice={fromUrlFilterMaxPrice} changeFilterMaxPrice={changeFilterMaxPrice}
                      resetFilterAll={resetFilterAll}
                      setClearFilterMinPrice={() => setFilterMinPrice('')}
                      setClearFilterMaxPrice={() => setFilterMaxPrice('')}
                      setNoProductsFound={setNoProductsFound}
                    />
                    <div className="catalog__content">
                      {noProductsFound
                        ? 'по вашему запросу ничего не найдено'
                        :
                        <>
                          <div className="catalog-sort">
                            <form action="#">
                              <div className="catalog-sort__inner">
                                <p className="title title--h5">Сортировать:</p>
                                <div className="catalog-sort__type">
                                  <div className="catalog-sort__btn-text">
                                    <input
                                      type="radio" checked={sortType === SortTypes.Price}
                                      id="sortPrice" name="sort"
                                      onChange={() => changeSortType(SortTypes.Price)}
                                    />
                                    <label htmlFor="sortPrice">
                                      по цене
                                    </label>
                                  </div>
                                  <div className="catalog-sort__btn-text">
                                    <input type="radio" checked={sortType === SortTypes.Popular}
                                      id="sortPopular" name="sort"
                                      onChange={() => changeSortType(SortTypes.Popular)}
                                    />
                                    <label htmlFor="sortPopular">
                                      по популярности
                                    </label>
                                  </div>
                                </div>
                                <div className="catalog-sort__order">
                                  <div className="catalog-sort__btn catalog-sort__btn--up">
                                    <input
                                      type="radio" id="up" checked={sortOrder === SortOrders.Asc}
                                      name="sort-icon"
                                      aria-label="По возрастанию"
                                      onChange={() => changeSortOrder(SortOrders.Asc)}
                                    />
                                    <label htmlFor="up">
                                      <svg width="16" height="14" aria-hidden="true">
                                        <use xlinkHref="#icon-sort"></use>
                                      </svg>
                                    </label>
                                  </div>
                                  <div className="catalog-sort__btn catalog-sort__btn--down">
                                    <input
                                      type="radio" id="down" checked={sortOrder === SortOrders.Desc}
                                      name="sort-icon"
                                      aria-label="По убыванию"
                                      onChange={() => changeSortOrder(SortOrders.Desc)}
                                    />
                                    <label htmlFor="down">
                                      <svg width="16" height="14" aria-hidden="true">
                                        <use xlinkHref="#icon-sort"></use>
                                      </svg>
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                          {isDataLoading
                            ? <Spinner/>
                            :
                            <CardList
                              classname='cards catalog__cards'
                              products={products}
                              onClickBuy={onClickBuyProduct}
                            />}
                          {maxPages && maxPages > 1 &&
                            <Pagination
                              currentPage={currentPage}
                              pages={maxPages}
                              changePage={changePageHandle}
                            />}
                        </>}
                    </div>
                  </div>
                </div>
              </section>}
            {noPage &&
              <section className="catalog">
                <div className="container">
                  <h2 className="title title--h2">Такой страницы не существует</h2>
                </div>
              </section>}
          </div>
          {modalShow &&
            <Modal onClose={() => setModalShow(false)}>
              <p className="title title--h4">Товар успешно добавлен в корзину</p>
              <svg className="modal__icon" width="86" height="80" aria-hidden="true">
                <use xlinkHref="#icon-success"></use>
              </svg>
              <div className="modal__buttons">
                <button
                  className="btn btn--transparent modal__btn"
                  onClick={() => setModalShow(false)}
                >Продолжить покупки
                </button>
                <NavLink className="btn btn--purple modal__btn modal__btn--fit-width" to={AppRoute.Basket}>Перейти в корзину</NavLink>
              </div>
            </Modal>}
        </main>
        <Footer/>
      </div>

    </React.Fragment>
  );
}

export default CatalogPage;
