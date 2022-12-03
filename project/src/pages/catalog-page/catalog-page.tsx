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
import { AppRoute, filterCategoryText, MAX_PAGINATION_ELEMS, pageUrlText, SortOrders, sortOrderUrlText, SortTypes, sortTypeUrlText } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsAction, fetchPromoAction } from '../../store/api-actions';
import { getLoadingDataStatus, getProducts, getPromo } from '../../store/data-catalog/selectors';
import { Product } from '../../types/product';


type catalogPageProps = {
  maxPages: number|null;
  setParams: (params: string) => void;
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

  const fetchedProducts = useAppSelector(getProducts);
  const promo = useAppSelector(getPromo);
  const isDataLoading = useAppSelector(getLoadingDataStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [noPage, setNoPage] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  const changePageHandle = (page: number) => {
    const start = MAX_PAGINATION_ELEMS * (page - 1);
    const end = start + MAX_PAGINATION_ELEMS;
    const fetchUrl = `_start=${start}&_end=${end}&_sort=${sortType}&_order=${sortOrder}${filterCategory.length > 0 ? filterCategory.map((cat) => `&category=${cat}`).join('') : ''}`;
    dispatch(fetchProductsAction(fetchUrl));
    const navUrl = AppRoute.Catalog + pageUrlText + String(page) +
      (sortType ? sortTypeUrlText + sortType : '') +
      (sortOrder ? sortOrderUrlText + sortOrder : '') +
      (filterCategory.length > 0 ? filterCategoryText + filterCategory.join(',') : '');
    navigate(navUrl);
    setCurrentPage(page);
  };

  const changeSortOrder = (order: string) => {
    if (!sortType) {
      setSortType(SortTypes.Price);
    }
    setSortOrder(order);
  };
  const changeSortType = (type: string) => {
    if (!sortOrder) {
      setSortOrder(SortOrders.Asc);
    }
    setSortType(type);
  };


  useEffect(() => {
    setParams(`${filterCategory.length > 0 ? filterCategory.map((cat) => `&category=${cat}`).join('') : ''}`);
    changePageHandle(1);
  }, [filterCategory]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const search = queryString.parse(location.search);

    if (search.order && typeof search.order === 'string') {
      changeSortOrder(search.order);
    }
    if (search.type && typeof search.type === 'string') {
      changeSortType(search.type);
    }


    if (maxPages) {
      // Редирект на 1 страницу, если зашли без ее указания
      if ((location.pathname === AppRoute.Catalog || location.pathname === `${AppRoute.Catalog}/`)
        && !location.search.startsWith(`${pageUrlText.slice(1)}`)) {
        navigate(`${AppRoute.Catalog}${pageUrlText}1`);
      }
      // Проверяем указанный номер страницы, если он больше максимально возможного - показываем уведомление
      // if (location.search.startsWith(`${pageUrlText.slice(1)}`)) {
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
    changePageHandle(1);
  }, [sortType, sortOrder]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <Aside setFilterCategory={setFilterCategory}/>
                    <div className="catalog__content">
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
                          onClickBuy={() => setModalShow(true)}
                        />}
                      {maxPages && maxPages > 1 &&
                        <Pagination
                          currentPage={currentPage}
                          pages={maxPages}
                          changePage={changePageHandle}
                        />}
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
