import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { Promo } from '../../types/promo';
import { State } from '../../types/state';


export const getProducts = (state: State): Product[] => state[NameSpace.Catalog].products;
// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const getPromo = (state: State): Promo | null => state[NameSpace.Catalog].promo;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Catalog].isDataLoading;
