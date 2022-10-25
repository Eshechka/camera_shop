import React, { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import CardList from '../../components/card-list/card-list';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import Modal from '../../components/modal/modal';
import Reviews from '../../components/reviews/reviews';
import StarRating from '../../components/star-rating/star-rating';
import Svgs from '../../components/svgs/svgs';
import Tabs from '../../components/tabs/tabs';
import { AppRoute, PLUS_REVIEW_ELEMS, MAX_SLIDER_ELEMS, sortReviewsDesc } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { fetchProductAction, fetchProductReviewsAction, fetchSimilarProductsAction } from '../../store/api-actions';
import { getProduct, getProductReviews, getSimilarProducts } from '../../store/data-product/selectors';
import { Product } from '../../types/product';
import { Review } from '../../types/review';


function ProductPage(): JSX.Element {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const product = useAppSelector(getProduct);
  const similarProducts = useAppSelector(getSimilarProducts);
  const productReviews = useAppSelector(getProductReviews);

  const [sliderSimilarProducts, setSliderSimilarProducts] = useState<Product[]>([]);
  const [activeIds, setActiveIds] = useState<number[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [maxSlides, setMaxSlides] = useState<number|null>(null);

  const [showedReviews, setShowedReviews] = useState<Review[]>([]);

  const [modalShow, setModalShow] = useState(false);

  const showMore = () => {
    const end = showedReviews.length + PLUS_REVIEW_ELEMS;
    const sortReviews = [...productReviews].sort(sortReviewsDesc);

    setShowedReviews(sortReviews.slice(0, end));
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    dispatch(fetchProductReviewsAction(id));
    dispatch(fetchProductAction(id));
    dispatch(fetchSimilarProductsAction(id));
    setShowedReviews([]);
  }, [id]);

  useEffect(() => {
    if (similarProducts && similarProducts.length > 0) {
      setMaxSlides(similarProducts.length - MAX_SLIDER_ELEMS);
      setSliderSimilarProducts(similarProducts);
      const ids = similarProducts.slice(currentSlide, MAX_SLIDER_ELEMS).map((item) => +item.id);
      setActiveIds(ids);
    }
  }, [similarProducts]);

  useEffect(() => {
    const start = currentSlide;
    const end = currentSlide + MAX_SLIDER_ELEMS;
    const ids = similarProducts.slice(start, end).map((item) => +item.id);
    setActiveIds(ids);
  }, [currentSlide]);

  useEffect(() => {
    if (productReviews && productReviews.length > 0) {
      if (showedReviews.length === 0) {
        showMore();
      }
    }
  }, [productReviews]);

  return (
    <React.Fragment>
      <div className="visually-hidden">
        <Svgs />
      </div>
      <div className="wrapper">
        <Header/>
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
                  <li className="breadcrumbs__item">
                    <span className="breadcrumbs__link breadcrumbs__link--active">{product?.name}</span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="page-content__section">
              {product &&
              <section className="product">
                <div className="container">
                  <div className="product__img">
                    <picture>
                      <source type="image/webp" srcSet={`${product.previewImgWebp}, ${product.previewImgWebp2x} 2x`} />
                      <img src={product.previewImg} srcSet={`${product.previewImg} 2x`} width="560" height="480" alt={product.name} />
                    </picture>
                  </div>
                  <div className="product__content">
                    <h1 className="title title--h3">{product.name}</h1>
                    <div className="rate product__rate">
                      <StarRating rating={product.rating}/>
                      <p className="visually-hidden">Рейтинг: {product.rating}</p>
                      <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{product.reviewCount}</p>
                    </div>
                    <p className="product__price"><span className="visually-hidden">Цена:</span>{product.price} ₽</p>
                    <button className="btn btn--purple" type="button">
                      <svg width="24" height="16" aria-hidden="true">
                        <use xlinkHref="#icon-add-basket"></use>
                      </svg>Добавить в корзину
                    </button>
                    <Tabs tabTitles={['Характеристики', 'Описание']}>
                      <ul className="product__tabs-list">
                        <li className="item-list"><span className="item-list__title">Артикул:</span>
                          <p className="item-list__text">{product.vendorCode}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Категория:</span>
                          <p className="item-list__text">{product.category}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Тип камеры:</span>
                          <p className="item-list__text">{product.type}</p>
                        </li>
                        <li className="item-list"><span className="item-list__title">Уровень:</span>
                          <p className="item-list__text">{product.level}</p>
                        </li>
                      </ul>
                      <div className="product__tabs-text">
                        <p>{product.description}</p>
                      </div>
                    </Tabs>
                  </div>
                </div>
              </section>}
            </div>

            {sliderSimilarProducts && sliderSimilarProducts.length > 0 &&
              <div className="page-content__section">
                <section className="product-similar">
                  <div className="container">
                    <h2 className="title title--h3">Похожие товары</h2>
                    <div className="product-similar__slider">
                      <CardList
                        classname='product-similar__slider-list'
                        products={sliderSimilarProducts}
                        activeIds={activeIds}
                        onClickBuy={() => setModalShow(true)}
                      />
                      <button
                        className="slider-controls slider-controls--prev"
                        type="button"
                        aria-label="Предыдущий слайд"
                        disabled={currentSlide === 0}
                        onClick={() => {
                          if (currentSlide !== 0) {
                            setCurrentSlide(currentSlide - 1);
                          }
                        }}
                      >
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                      <button
                        className="slider-controls slider-controls--next"
                        type="button"
                        aria-label="Следующий слайд"
                        disabled={currentSlide === maxSlides}
                        onClick={() => {
                          if (maxSlides && currentSlide < maxSlides) {
                            setCurrentSlide(currentSlide + 1);
                          }
                        }}
                      >
                        <svg width="7" height="12" aria-hidden="true">
                          <use xlinkHref="#icon-arrow"></use>
                        </svg>
                      </button>
                    </div>
                  </div>
                </section>
              </div>}
            <div className="page-content__section">
              <section className="review-block">
                <div className="container">
                  <Reviews
                    reviews={showedReviews}
                    showMore={showMore}
                    disableBtn={showedReviews.length === productReviews.length}
                  />
                </div>
              </section>
            </div>
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
        <button
          className="up-btn"
          onClick={scrollToTop}
        >
          <svg width="12" height="18" aria-hidden="true">
            <use xlinkHref="#icon-arrow2"></use>
          </svg>
        </button>
        <Footer/>
      </div>
    </React.Fragment>
  );
}

export default ProductPage;
