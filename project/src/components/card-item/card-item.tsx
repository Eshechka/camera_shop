import StarRating from '../star-rating/star-rating';

type CardItemProps = {
  title: string;
  rating: number;
  ratingsAmount: number;
  price: string;
  imgSrc: string;
  imgSrcSet: string;
  sourceSrcSet: string;
}

function CardItem({
  title,
  rating,
  ratingsAmount,
  price,
  imgSrc,
  imgSrcSet,
  sourceSrcSet,
}: CardItemProps): JSX.Element {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet="img/content/img1.webp, img/content/img1@2x.webp 2x" />
          <img src={imgSrc}
            srcSet={imgSrcSet}
            width="280" height="240"
            alt={title}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <StarRating rating={rating}/>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{ratingsAmount}</p>
        </div>
        <p className="product-card__title">{title}</p>
        <p className="product-card__price"><span className="visually-hidden">Цена:</span>{price} ₽</p>
      </div>
      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить</button>
        <a className="btn btn--transparent" href="#">Подробнее</a>
      </div>
    </div>
  );
}

export default CardItem;
