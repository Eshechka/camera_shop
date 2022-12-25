import { NameSpace } from '../../const';
import { Basket } from '../../types/basket';
import { Product } from '../../types/product';
import { State } from '../../types/state';


export const getProductById = (state: State): Product|null => state[NameSpace.Basket].clickedProduct;
export const getBasketProducts = (state: State): Product[] => state[NameSpace.Basket].basketProducts;
export const getIsOrderMade = (state: State): boolean | null => state[NameSpace.Basket].isOrderMade;
export const getBasketProductIdsWAmount = (state: State): Basket[] => state[NameSpace.Basket].productIdsWAmount;
export const getDiscount = (state: State): number | null => state[NameSpace.Basket].discount;
export const getIsDiscountApproved = (state: State): boolean | null => state[NameSpace.Basket].isDiscountApproved;

