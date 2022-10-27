import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { Review } from '../../types/review';
import { State } from '../../types/state';


export const getProduct = (state: State): Product | null => state[NameSpace.Product].product;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Product].isDataLoading;
export const getSimilarProducts = (state: State): Product[] => state[NameSpace.Product].similarProducts;
export const getProductReviews = (state: State): Review[] => state[NameSpace.Product].productReviews;
export const getIsReviewAdded = (state: State): boolean | null => state[NameSpace.Product].isReviewAdded;
