import { NameSpace } from '../../const';
import { Basket } from '../../types/basket';
import { Product } from '../../types/product';
import { State } from '../../types/state';


export const getBasketProductIdsWAmount = (state: State): Basket[] => state[NameSpace.Basket].productIdsWAmount;
export const getProductById = (state: State): Product|null => state[NameSpace.Basket].clickedProduct;
export const getBasketProducts = (state: State): Product[] => state[NameSpace.Basket].basketProducts;

