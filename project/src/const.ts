import { Review } from './types/review';

export enum AppRoute {
  Root = '/',
  Catalog = '/catalog',
  Basket = '/cart',
  Product = '/product',
  Warranty = '/warranty',
  Delivery = '/delivery',
  About = '/about',
  NotFound = '/404',
}

export enum APIRoute {
  Products = '/cameras',
  Reviews = '/reviews',
  Similar = '/similar',
  Promo = '/promo',
  Orders = '/orders',
  Coupons = '/coupons',
}

export enum NameSpace {
  Product = 'PRODUCT',
  Catalog = 'CATALOG',
  Basket = 'BASKET',
}

export enum SortTypes {
  Price = 'price',
  Popular = 'rating',
}

export enum SortOrders {
  Asc = 'asc',
  Desc = 'desc',
}

export const MAX_SLIDER_ELEMS = 3;
export const PLUS_REVIEW_ELEMS = 3;
export const MAX_PAGINATION_ELEMS = 9;
export const TIME_FOR_DEBOUNCE = 1000;

export const sortReviewsDesc = (reviewA: Review, reviewB: Review) => Date.parse(reviewB.createAt) - Date.parse(reviewA.createAt);

export const pageUrlText = '/?page=';
export const sortTypeUrlText = '&sort=';
export const sortOrderUrlText = '&order=';
export const filterCategoryText = '&category=';
export const filterLevelText = '&level=';
export const filterTypeText = '&type=';
export const filterMinPriceText = '&price_gte=';
export const filterMaxPriceText = '&price_lte=';

export const removeElemFromArray = (array: string[], elem: string) => {
  const index = array.indexOf(elem);
  if (index !== -1) {
    array.splice(index, 1);
  }
};

