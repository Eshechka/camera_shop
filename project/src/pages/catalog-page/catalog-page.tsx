import React, { useEffect, useState } from 'react';
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
import { AppRoute, MAX_PAGINATION_ELEMS, pageUrlText } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsAction, fetchPromoAction } from '../../store/api-actions';
import { getLoadingDataStatus, getProducts, getPromo } from '../../store/data-catalog/selectors';


type catalogPageProps = {
  maxPages: number|null;
}

function CatalogPage({
  maxPages,
}: catalogPageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const [modalShow, setModalShow] = useState(false);

  const products = useAppSelector(getProducts);
  const promo = useAppSelector(getPromo);
  const isDataLoading = useAppSelector(getLoadingDataStatus);

  const [currentPage, setCurrentPage] = useState(1);
  const [noPage, setNoPage] = useState(false);

  const changePageHandle = (page: number) => {
    const start = MAX_PAGINATION_ELEMS * (page - 1);
    const end = start + MAX_PAGINATION_ELEMS;
    dispatch(fetchProductsAction(`_start=${start}&_end=${end}`));
    navigate(`${AppRoute.Catalog}${pageUrlText}${page}`);
  };

  useEffect(() => {
    if (maxPages) {
      if (location.pathname === AppRoute.Catalog) {
        navigate(`${AppRoute.Catalog}${pageUrlText}1`);
      }
      if (location.pathname.startsWith(`${AppRoute.Catalog}${pageUrlText}`)) {
        const pageNumber = parseInt(location.pathname.slice(AppRoute.Catalog.length + pageUrlText.length), 10);

        if (pageNumber && pageNumber <= maxPages) {
          changePageHandle(pageNumber);
          setCurrentPage(pageNumber);
        } else {
          setNoPage(true);
        }
      }
    }
  }, [location.pathname, maxPages]); // eslint-disable-line react-hooks/exhaustive-deps

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
                    <Aside/>
                    <div className="catalog__content">
                      <div className="catalog-sort">
                        <form action="#">
                          <div className="catalog-sort__inner">
                            <p className="title title--h5">Сортировать:</p>
                            <div className="catalog-sort__type">
                              <div className="catalog-sort__btn-text">
                                <input type="radio" id="sortPrice" name="sort" />
                                <label htmlFor="sortPrice">по цене</label>
                              </div>
                              <div className="catalog-sort__btn-text">
                                <input type="radio" id="sortPopular" name="sort" />
                                <label htmlFor="sortPopular">по популярности</label>
                              </div>
                            </div>
                            <div className="catalog-sort__order">
                              <div className="catalog-sort__btn catalog-sort__btn--up">
                                <input type="radio" id="up" name="sort-icon" aria-label="По возрастанию" />
                                <label htmlFor="up">
                                  <svg width="16" height="14" aria-hidden="true">
                                    <use xlinkHref="#icon-sort"></use>
                                  </svg>
                                </label>
                              </div>
                              <div className="catalog-sort__btn catalog-sort__btn--down">
                                <input type="radio" id="down" name="sort-icon" aria-label="По убыванию" />
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
