import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { State } from '../../types/state';


export const getProduct = (state: State): Product | null => state[NameSpace.Product].product;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Product].isDataLoading;
export const getSimilarProducts = (state: State): Product[] => state[NameSpace.Product].similarProducts;
