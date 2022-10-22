import React from 'react';

type starRatingProps = {
  rating: number;
}

function StarRating({
  rating
}: starRatingProps): JSX.Element {

  const MAX_RATE = 5;

  return (
    <React.Fragment>
      {Array
        .from({ length: rating })
        .map((_, index) => {
          const key = index;
          return (
            <svg key={key} width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-full-star"></use>
            </svg>);
        })}
      {Array
        .from({ length: MAX_RATE - rating })
        .map((_, index) => {
          const key = index;
          return (
            <svg key={key} width="17" height="16" aria-hidden="true">
              <use xlinkHref="#icon-star"></use>
            </svg>);
        })}
    </React.Fragment>
  );
}

export default StarRating;
