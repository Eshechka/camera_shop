import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';
import { Promo } from '../../types/promo';

type bannerProps = {
  promo: Promo|null;
}

function Banner({
  promo,
}: bannerProps): JSX.Element {
  return (
    <div className="banner">
      {promo && (
        <React.Fragment>
          <picture>
            <source type="image/webp" srcSet={`${promo.previewImgWebp}, ${promo.previewImgWebp2x} 2x`} />
            <img
              src={promo.previewImg}
              srcSet={`${promo.previewImg} 2x`}
              width="1280" height="280" alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">{promo.name}</span>
            <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
            <NavLink className="btn" to={`${AppRoute.Product}/${promo.id}`}>Подробнее</NavLink>
          </p>
        </React.Fragment>)}
    </div>
  );
}

export default Banner;
