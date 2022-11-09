import React from 'react';

type starRatingProps = {
  rating: number;
}

function StarRating({
  rating
}: starRatingProps): JSX.Element {

  const MAX_RATE = 5;
  const fullStars = Array.from({ length: rating })
    .map((item, index) => ({item: item, key: `full${index}`}));
  const emptyStars = Array.from({ length: MAX_RATE - rating })
    .map((item, index) => ({item: item, key: `empty${index}`}));

  return (
    <React.Fragment>
      {fullStars.map((star) => (
        <svg key={star.key} width="17" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>))}
      {emptyStars.map((star) => (
        <svg key={star.key} width="17" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg>))}
    </React.Fragment>
  );
}

export default StarRating;
