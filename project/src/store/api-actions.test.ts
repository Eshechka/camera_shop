import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {addProductReviewAction, fetchProductAction, fetchProductReviewsAction, fetchProductsAction, fetchPromoAction, fetchSimilarProductsAction} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import { makeFakeProduct, makeFakeProductReview, makeFakeProductReviewFormData, makeFakeProducts, makeFakePromo } from '../utils/mocks';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
  >(middlewares);

  it('should dispatch fetchProductsAction when GET /cameras', async () => {
    const mockProducts = makeFakeProducts();
    mockAPI
      .onGet(APIRoute.Products)
      .reply(200, mockProducts);

    const store = mockStore();

    await store.dispatch(fetchProductsAction());

    const actions:string[] = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchProductsAction.pending.type,
      fetchProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoAction when GET /promo', async () => {
    const mockPromo = makeFakePromo();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockPromo);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions:string[] = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchProductAction when GET /cameras/id', async () => {
    const mockProduct = makeFakeProduct();

    mockAPI
      .onGet(`${APIRoute.Products}/${mockProduct.id}`)
      .reply(200, mockProduct);

    const store = mockStore();

    await store.dispatch(fetchProductAction(`${mockProduct.id}`));

    const actions:string[] = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchProductAction.pending.type,
      fetchProductAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarProductsAction when GET /cameras/id/similar', async () => {
    const mockSimilarProducts = makeFakeProducts();
    const mockProductId = makeFakeProduct().id;

    mockAPI
      .onGet(`${APIRoute.Products}/${mockProductId}${APIRoute.Similar}`)
      .reply(200, mockSimilarProducts);

    const store = mockStore();

    await store.dispatch(fetchSimilarProductsAction(`${mockProductId}`));

    const actions:string[] = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchSimilarProductsAction.pending.type,
      fetchSimilarProductsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchProductReviewsAction when GET /cameras/id/reviews', async () => {
    const mockProductReviews = makeFakeProducts();
    const mockProductId = makeFakeProduct().id;

    mockAPI
      .onGet(`${APIRoute.Products}/${mockProductId}${APIRoute.Reviews}`)
      .reply(200, mockProductReviews);

    const store = mockStore();

    await store.dispatch(fetchProductReviewsAction(`${mockProductId}`));

    const actions:string[] = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      fetchProductReviewsAction.pending.type,
      fetchProductReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch addProductReviewAction when POST /reviews', async () => {
    const mockNewProductReview = makeFakeProductReview();
    const mockProductReviewFormData = makeFakeProductReviewFormData(mockNewProductReview);

    mockAPI
      .onPost(APIRoute.Reviews, mockProductReviewFormData)
      .reply(200, mockNewProductReview);

    const store = mockStore();

    await store.dispatch(addProductReviewAction(mockProductReviewFormData));

    const actions:string[] = store.getActions().map(({type}) => type as string);

    expect(actions).toEqual([
      addProductReviewAction.pending.type,
      addProductReviewAction.fulfilled.type
    ]);
  });

});
