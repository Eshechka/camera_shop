import React from 'react';
import { Review } from '../../types/review';
import ReviewItem from '../review-item/review-item';

type reviewsProps = {
  reviews: Review[];
  showMore: () => void;
  addReview: () => void;
  disableBtn: boolean;
}

function Reviews({
  reviews,
  showMore,
  addReview,
  disableBtn,
}: reviewsProps): JSX.Element {
  return (
    <React.Fragment>
      <div className="page-content__headed">
        <h2 className="title title--h3">Отзывы</h2>
        <button
          className="btn"
          type="button"
          onClick={addReview}
        >Оставить свой отзыв
        </button>
      </div>

      <ul className="review-block__list">
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}

      </ul>

      <div className="review-block__buttons">
        <button
          className="btn btn--purple"
          type="button"
          onClick={showMore}
          disabled={disableBtn}
        >Показать больше отзывов
        </button>
      </div>
    </React.Fragment>
  );
}

export default Reviews;
