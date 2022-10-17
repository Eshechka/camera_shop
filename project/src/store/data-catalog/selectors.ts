import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { State } from '../../types/state';


export const getProducts = (state: State): Product[] => state[NameSpace.Catalog].products;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Catalog].isDataLoading;
