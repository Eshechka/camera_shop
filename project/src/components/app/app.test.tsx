import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import thunk from 'redux-thunk'
import App from './app';
import { AppRoute } from '../../const';
import { makeFakeProducts } from '../../utils/mocks';

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

const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
      <App />
  </Provider>
);

describe('Application Routing', () => {
  it('should render "CatalogPage" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeApp);

    expect(screen.getByText(/Каталог фото- и видеотехники/i)).toBeInTheDocument();
  });
});
