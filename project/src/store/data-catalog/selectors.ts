import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { Promo } from '../../types/promo';
import { State } from '../../types/state';


export const getProducts = (state: State): Product[] => state[NameSpace.Catalog].products;
export const getSearchingProducts = (state: State): Product[] => state[NameSpace.Catalog].searchingProducts;
export const getProductsLength = (state: State): number | null => state[NameSpace.Catalog].productsLength;
export const getProductsMinPrice = (state: State): number | null => state[NameSpace.Catalog].productsMinPrice;
export const getProductsMaxPrice = (state: State): number | null => state[NameSpace.Catalog].productsMaxPrice;
export const getPromo = (state: State): Promo | null => state[NameSpace.Catalog].promo;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Catalog].isDataLoading;
