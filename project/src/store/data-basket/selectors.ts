import { NameSpace } from '../../const';
import { Basket } from '../../types/basket';
import { State } from '../../types/state';


export const getBasketProducts = (state: State): Basket[] => state[NameSpace.Basket].products;

