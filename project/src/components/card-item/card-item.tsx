import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import StarRating from '../star-rating/star-rating';

type cardItemProps = {
  id: number;
  name: string;
  rating: number;
  reviewCount: number;
  price: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
  inBasket: boolean;
  classname?: string;
  onClickBuy: ((product: number) => void) | undefined;
}

function CardItem({
  id,
  name,
  rating,
  reviewCount,
  price,
  previewImg,
  previewImg2x,
  previewImgWebp,
  previewImgWebp2x,
  inBasket,
  classname,
  onClickBuy,
}: cardItemProps): JSX.Element {
  return (
    <div className={['product-card', classname].join(' ')}>
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
        {!inBasket &&
          <button
            className="btn btn--purple product-card__btn"
            type="button"
            onClick={onClickBuy ? () => onClickBuy(id) : undefined}
          >
            Купить
          </button>}
        {inBasket && <button className="btn btn--purple-border">В корзине</button>}
        <NavLink className="btn btn--transparent" to={`${AppRoute.Product}/${id}`}>Подробнее</NavLink>
      </div>
    </div>
  );
}

export default CardItem;
