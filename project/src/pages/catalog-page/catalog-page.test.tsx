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
});

const maxPages = 2;

describe('Component: CatalogPage', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Catalog);

    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route
              path={AppRoute.Catalog}
              element={<CatalogPage maxPages={maxPages} />}
            />
          </Routes>
        </Router>
      </Provider>);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
    expect(screen.getByText(/Сбросить фильтры/i)).toBeInTheDocument();
    expect(screen.getByText(/Сортировать/i)).toBeInTheDocument();
  });

  it('should pagination work correctly', async () => {
    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}>
              <Route index element={<CatalogPage maxPages={maxPages} />} />
              <Route path=':page' element={<CatalogPage maxPages={maxPages} />} />
            </Route>
          </Routes>
        </Router>
      </Provider>);

    expect(screen.getAllByText(`${promo.name}`)[0]).toBeInTheDocument();
    expect(screen.getByText(`${mockProducts[0].name}`)).toBeInTheDocument();

    expect(screen.getByText('Назад')).toBeDisabled();

    await userEvent.click(screen.getByText('Далее'));
    expect(screen.getByText(`${mockProducts[9].name}`)).toBeInTheDocument();
  });

  it('should show modal when user clicked to button "Купить"', async () => {
    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}>
              <Route index element={<CatalogPage maxPages={maxPages} />} />
              <Route path=':page' element={<CatalogPage maxPages={maxPages} />} />
            </Route>
          </Routes>
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Купить/i)[0]).toBeInTheDocument();
    expect(screen.queryByText('Товар успешно добавлен в корзину')).not.toBeInTheDocument();
    await userEvent.click(screen.getAllByText(/Купить/i)[0]);
    expect(screen.getByText('Товар успешно добавлен в корзину')).toBeInTheDocument();
  });

  it('should redirect to ProductPage when user clicked to button "Подробнее"', async () => {
    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <Routes>
            <Route path={AppRoute.Catalog}>
              <Route index element={<CatalogPage maxPages={maxPages} />} />
              <Route path=':page' element={<CatalogPage maxPages={maxPages} />} />
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
    expect(screen.getByText(`${mockProduct.name}`)).toBeInTheDocument();
  });
});
