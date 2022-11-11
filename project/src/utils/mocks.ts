import {image, name, random, datatype} from 'faker';
import { Product } from '../types/product';
import { Promo } from '../types/promo';
import { Review } from '../types/review';
import { ReviewFormData } from '../types/reviewFormData';


export const makeFakeProduct = (): Product => (
    {
      id: datatype.number(1000),
      name: name.title(),
      vendorCode: random.word(),
      type: random.word(),
      category: random.word(),
      description: random.words(5),
      level: random.word(),
      rating: datatype.number({min: 1, max: 5, precision: 1}),
      price: datatype.float({min: 100, max: 100000, precision: .1}),
      previewImg: image.imageUrl(),
      previewImg2x: image.imageUrl(),
      previewImgWebp: image.imageUrl(),
      previewImgWebp2x: image.imageUrl(),
      reviewCount: datatype.number(20),
    } as Product);

export const makeFakeProducts = (amount?: number): Product[] => {
  const productAmount = amount ? amount : 5;
  return new Array(productAmount).fill(null).map(() => makeFakeProduct());
};

export const makeFakePromo = (): Promo => (
  {
    id: datatype.string(),
    name: name.title(),
    previewImg: image.imageUrl(),
    previewImg2x: image.imageUrl(),
    previewImgWebp: image.imageUrl(),
    previewImgWebp2x: image.imageUrl(),
  } as Promo);

export const makeFakeProductReview = (): Review => ({
  id: datatype.number(1000),
  userName: name.firstName(),
  advantage: random.words(),
  disadvantage: random.words(),
  review: random.words(),
  rating: datatype.number({min: 1, max: 5, precision: 1}),
  cameraId: datatype.number(10),
  createAt: random.word(),
} as Review);

export const makeFakeProductReviews = (amount?: number): Review[] => {
  const productReviewAmount = amount ? amount : 10;
  return new Array(productReviewAmount).fill(null).map(() => makeFakeProductReview());
};

export const makeFakeProductReviewFormData = (reviewData?: Review): ReviewFormData => ({
  userName: reviewData?.userName || name.firstName(),
  advantage: reviewData?.advantage || random.words(),
  disadvantage: reviewData?.disadvantage || random.words(),
  review: reviewData?.review || random.words(),
  rating: reviewData?.rating || datatype.number({min: 1, max: 5, precision: 1}),
  cameraId: reviewData?.cameraId || datatype.number(10),
} as ReviewFormData);

