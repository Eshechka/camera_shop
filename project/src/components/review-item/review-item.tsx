import React from 'react';
import moment from 'moment';
import { Review } from '../../types/review';
import StarRating from '../star-rating/star-rating';

type reviewProps = {
  review: Review;
}

function ReviewItem({
  review,
}: reviewProps): JSX.Element {
  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{review.userName}</p>
        <time className="review-card__data" dateTime={moment(review.createAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('YYYY-MM-DD')}>
          {moment(review.createAt, 'YYYY-MM-DDTHH:mm:ss.SSSZ').format('DD MMMM')}
        </time>
      </div>
      <div className="rate review-card__rate">
        <StarRating rating={review.rating} />
        <p className="visually-hidden">Оценка: {review.rating}</p>
      </div>
      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{review.advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{review.disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{review.review}</p>
        </li>
      </ul>
    </li>
  );
}

export default ReviewItem;
