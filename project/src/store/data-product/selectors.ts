import { NameSpace } from '../../const';
import { Product } from '../../types/product';
import { State } from '../../types/state';


// eslint-disable-next-line @typescript-eslint/no-unsafe-return
export const getProduct = (state: State): Product | null => state[NameSpace.Product].product;
export const getLoadingDataStatus = (state: State): boolean => state[NameSpace.Product].isDataLoading;
