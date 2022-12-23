import { NameSpace } from '../../const';
import { Basket } from '../../types/basket';
import { Product } from '../../types/product';
import { State } from '../../types/state';


export const getBasketProducts = (state: State): Basket[] => state[NameSpace.Basket].products;
export const getProductById = (state: State): Product|null => state[NameSpace.Basket].clickedProduct;

