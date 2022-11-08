import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk';
import App from './app';
import { AppRoute } from '../../const';
import { makeFakeProducts } from '../../utils/mocks';
import { MemoryRouter } from 'react-router-dom'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

const mockProducts = makeFakeProducts(5);
const mockProduct = mockProducts[0];

const store = mockStore({
  PRODUCT: {
    product: mockProduct,
    isDataLoading: false,
    isReviewAdded: null,
    similarProducts: [],
    productReviews: [],
  },
  CATALOG: {
    products: mockProducts,
    productsLength: mockProducts.length,
    isDataLoading: false,
    promo: null,
  },
});

describe('Application Routing', () => {
  it('should redirect and render "CatalogPage" when user navigate to "/"', () => {

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Root]}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" when user navigate to "/catalog"', () => {

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Catalog]}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });

  it('should render "CatalogPage" with notice text when user navigate to "/catalog/page_no_existing"', async () => {

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoute.Catalog}/page_100000`]}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(await screen.findByText(/Такой страницы не существует/i)).toBeInTheDocument();
  });

  it('should render "BasketPage" when user navigate to "/cart"', () => {

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[AppRoute.Basket]}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getAllByText(/Корзина/i)[0]).toBeInTheDocument();
  });

  it('should render "ProductPage" when user navigate to "/product/id"', () => {

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={[`${AppRoute.Product}/${mockProduct.id}`]}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText(/Добавить в корзину/i)).toBeInTheDocument();
  });

  it('should render "NotFound" when user navigate to non-existent route', () => {

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/non-existent-route']}>
          <App />
        </MemoryRouter>
      </Provider>,
    )

    expect(screen.getByText('PAGE NOT FOUND')).toBeInTheDocument();
  });
});
