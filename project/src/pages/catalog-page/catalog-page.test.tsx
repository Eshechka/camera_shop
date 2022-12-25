import {render, screen} from '@testing-library/react';
import {Routes, Route, Router, Navigate} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import CatalogPage from './catalog-page';
import { makeFakeProducts } from '../../utils/mocks';
import ProductPage from '../product-page/product-page';

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mockProducts = makeFakeProducts(10);
const mockProduct = mockProducts[0];
const promo = mockProducts[5];

const store = mockStore({
  CATALOG: {
    products: mockProducts,
    searchingProducts: [],
    productsMinPrice: null,
    productsMaxPrice: null,
    productsLength: mockProducts.length,
    isDataLoading: false,
    promo: promo,
  },
  PRODUCT: {
    product: mockProduct,
    isDataLoading: false,
    isReviewAdded: null,
    similarProducts: mockProducts.slice(5),
    productReviews: [],
  },
  BASKET: {
    productIdsWAmount: [],
    clickedProduct: null,
    basketProducts: [],
    isOrderMade: null,
  },
});

const maxPages = 2;
let params = '';
const setParams = (cat: string | null) => {params = '&category=some_cat';};

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog);

    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route
              path={AppRoute.Catalog}
              element={<CatalogPage setParams={setParams} maxPages={maxPages} />}
            />
          </Routes>
        </Router>
      </Provider>);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

  it('should setParams work', () => {
    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}>
              <Route index element={<CatalogPage setParams={setParams} maxPages={maxPages} />} />
            </Route>
          </Routes>
        </Router>
      </Provider>);

    expect(params).toEqual('&category=some_cat');
  });

  it('should pagination work correctly', async () => {
    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}>
              <Route index element={<CatalogPage setParams={setParams} maxPages={maxPages} />} />
            </Route>
          </Routes>
        </Router>
      </Provider>);

    expect(screen.getAllByText(`${promo.name}`)[0]).toBeInTheDocument();
    // expect(screen.getByText(`${mockProducts[0].name}`)).toBeInTheDocument();
    expect(screen.getByText('Далее')).toBeInTheDocument();

    await userEvent.click(screen.getByText('Далее'));
    // expect(screen.getByText(`${mockProducts[9].name}`)).toBeInTheDocument();
  });

  it('should show modal when user clicked to button "Купить"', () => {
    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}>
              <Route index element={<CatalogPage setParams={setParams} maxPages={maxPages} />} />
            </Route>
          </Routes>
        </Router>
      </Provider>);

    expect(screen.queryByText('Товар успешно добавлен в корзину')).not.toBeInTheDocument();
  });

  it('should redirect to ProductPage when user clicked to button "Подробнее"', async () => {
    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}>
              <Route index element={<CatalogPage setParams={setParams} maxPages={maxPages} />} />
            </Route>
            <Route path={AppRoute.Product} >
              <Route index element={<Navigate to={AppRoute.Root} />} />
              <Route path=':id' element={<ProductPage />} />
            </Route>
          </Routes>
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Подробнее/i)[0]).toBeInTheDocument();
    await userEvent.click(screen.getAllByText(/Подробнее/i)[0]);
    // expect(screen.getByText(`${mockProduct.name}`)).toBeInTheDocument();
  });
});
