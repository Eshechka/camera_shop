import CardItem from '../card-item/card-item';

function CardList(): JSX.Element {
  return (
    <div className="cards catalog__cards">
      <CardItem
        key={1}
        title="Ретрокамера «Das Auge IV»"
        rating={3}
        ratingsAmount={23}
        price="73 450"
        imgSrc={'img/content/img1.jpg'}
        imgSrcSet={'img/content/img1@2x.jpg 2x'}
        sourceSrcSet={'img/content/img1.webp, img/content/img1@2x.webp 2x'}
      />
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x" />
            <img
              src="img/content/img9.jpg"
              srcSet="img/content/img9@2x.jpg 2x"
              width="280" height="240"
              alt="Фотоаппарат FastShot MR-5"
            />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 4</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
          </div>
          <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <a className="btn btn--purple-border product-card__btn product-card__btn--in-cart" href="#">
            <svg width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-basket"></use>
            </svg>В корзине
          </a>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x" />
            <img
              src="img/content/img5.jpg"
              srcSet="img/content/img5@2x.jpg 2x"
              width="280" height="240"
              alt="Фотоаппарат Instaprinter P2"
            />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 5</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
          </div>
          <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x"/>
            <img
              src="img/content/img9.jpg"
              srcSet="img/content/img9@2x.jpg 2x"
              width="280" height="240"
              alt="Фотоаппарат FastShot MR-5"
            />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 4</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
          </div>
          <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x"/>
            <img
              src="img/content/img5.jpg"
              srcSet="img/content/img5@2x.jpg 2x"
              width="280" height="240"
              alt="Фотоаппарат Instaprinter P2"
            />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 5</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
          </div>
          <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x"/>
            <img
              src="img/content/img1.jpg"
              srcSet="img/content/img1@2x.jpg 2x"
              width="280" height="240"
              alt="Ретрокамера «Das Auge IV»"
            />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 3</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
          </div>
          <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img5.webp, img/content/img5@2x.webp 2x" />
            <img src="img/content/img5.jpg" srcSet="img/content/img5@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат Instaprinter P2" />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 5</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>849</p>
          </div>
          <p className="product-card__title">Фотоаппарат Instaprinter P2</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>8 430 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x" />
            <img src="img/content/img1.jpg" srcSet="img/content/img1@2x.jpg 2x" width="280" height="240" alt="Ретрокамера «Das Auge IV»" />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 3</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>23</p>
          </div>
          <p className="product-card__title">Ретрокамера «Das Auge IV»</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>73 450 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
      <div className="product-card">
        <div className="product-card__img">
          <picture>
            <source type="image/webp" srcSet="img/content/img9.webp, img/content/img9@2x.webp 2x" />
            <img src="img/content/img9.jpg" srcSet="img/content/img9@2x.jpg 2x" width="280" height="240" alt="Фотоаппарат FastShot MR-5" />
          </picture>
        </div>
        <div className="product-card__info">
          <div className="rate product-card__rate">
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>
            <svg width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>
            <p className="visually-hidden">Рейтинг: 4</p>
            <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>12</p>
          </div>
          <p className="product-card__title">Фотоаппарат FastShot MR-5</p>
          <p className="product-card__price"><span className="visually-hidden">Цена:</span>18 970 ₽
          </p>
        </div>
        <div className="product-card__buttons">
          <button className="btn btn--purple product-card__btn" type="button">Купить
          </button>
          <a className="btn btn--transparent" href="#">Подробнее
          </a>
        </div>
      </div>
    </div>
  );
}

export default CardList;
