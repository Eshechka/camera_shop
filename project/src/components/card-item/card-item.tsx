import StarRating from '../star-rating/star-rating';

type CardItemProps = {
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
}

function CardItem({
  name,
  rating,
  reviewCount,
  price,
  previewImg,
  previewImg2x,
  previewImgWebp,
  previewImgWebp2x,
}: CardItemProps): JSX.Element {
  return (
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x} 2x`} />
          <img src={previewImg}
            srcSet={previewImg2x}
            width="280" height="240"
            alt={name}
          />
        </picture>
      </div>
      <div className="product-card__info">
        <div className="rate product-card__rate">
          <StarRating rating={rating}/>
          <p className="visually-hidden">Рейтинг: {rating}</p>
          <p className="rate__count"><span className="visually-hidden">Всего оценок:</span>{reviewCount}</p>
        </div>
        <p className="product-card__title">{name}</p>
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
