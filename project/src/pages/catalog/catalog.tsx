import React, { useEffect } from 'react';
import Aside from '../../components/aside/aside';
import Banner from '../../components/banner/banner';
import CardList from '../../components/card-list/card-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Spinner from '../../components/spinner/spinner';
import Svgs from '../../components/svgs/svgs';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductsAction } from '../../store/api-actions';
import { getLoadingDataStatus, getProducts } from '../../store/data-catalog/selectors';
// import { Product } from '../../types/product';


function Catalog(): JSX.Element {
  const dispatch = useAppDispatch();

  const products = useAppSelector(getProducts);
  const isDataLoading = useAppSelector(getLoadingDataStatus);

  useEffect(() => {
    dispatch(fetchProductsAction());
  }, []);

  return (
    <React.Fragment>
      <div className="visually-hidden">
        <Svgs />
      </div>
      <div className="wrapper">
        <Header/>
        <main>
          <Banner/>
          <div className="page-content">
            <div className="breadcrumbs">
              <div className="container">
                <ul className="breadcrumbs__list">
                  <li className="breadcrumbs__item">
                    <a className="breadcrumbs__link" href="index.html">Главная
                      <svg width="5" height="8" aria-hidden="true">
                        <use xlinkHref="#icon-arrow-mini"></use>
                      </svg>
                    </a>
                  </li>
                  <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                  </li>
                </ul>
              </div>
            </div>
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
                              <input type="radio" id="sortPrice" name="sort" checked />
                              <label htmlFor="sortPrice">по цене</label>
                            </div>
                            <div className="catalog-sort__btn-text">
                              <input type="radio" id="sortPopular" name="sort" />
                              <label htmlFor="sortPopular">по популярности</label>
                            </div>
                          </div>
                          <div className="catalog-sort__order">
                            <div className="catalog-sort__btn catalog-sort__btn--up">
                              <input type="radio" id="up" name="sort-icon" checked aria-label="По возрастанию" />
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
                      : <CardList products={products} />}
                    <div className="pagination">
                      <ul className="pagination__list">
                        <li className="pagination__item"><a className="pagination__link pagination__link--active" href="1">1</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link" href="2">2</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link" href="3">3</a>
                        </li>
                        <li className="pagination__item"><a className="pagination__link pagination__link--text" href="2">Далее</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
        <Footer/>
      </div>

    </React.Fragment>
  );
}

export default Catalog;
