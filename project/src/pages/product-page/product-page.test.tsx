import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import userEvent from '@testing-library/user-event';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import App from '../../components/app/app';
import { makeFakeProductReviews, makeFakeProducts } from '../../utils/mocks';

const history = createMemoryHistory();

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);

const mockProducts = makeFakeProducts(5);
const mockProduct = mockProducts[0];
const mockProductReview = makeFakeProductReviews(mockProduct.id);

const store = mockStore({
  PRODUCT: {
    product: mockProduct,
    isDataLoading: false,
    isReviewAdded: null,
    similarProducts: mockProducts.slice(3),
    productReviews: mockProductReview,
  },
  CATALOG: {
    products: mockProducts,
    productsLength: null,
    isDataLoading: false,
    promo: null,
  },
});

describe('Component: ProductPage', () => {
  it('should render correctly', () => {
    history.push(`${AppRoute.Product}/${mockProduct.id}`);

    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Добавить в корзину/i)[0]).toBeInTheDocument();
    expect(screen.getByText(/Характеристики/i)).toBeInTheDocument();
    expect(screen.getByText(/Описание/i)).toBeInTheDocument();
    expect(screen.getByText(/Похожие товары/i)).toBeInTheDocument();
    expect(screen.getByText(/Отзывы/i)).toBeInTheDocument();
  });

  it('should show modal when user clicked to button "Оставить свой отзыв"', async () => {
    history.push(`${AppRoute.Product}/${mockProduct.id}`);

    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <App />
        </Router>
      </Provider>);


    expect(screen.getByText(/Оставить свой отзыв/i)).toBeInTheDocument();
    expect(screen.queryByText(`Оставить отзыв`)).not.toBeInTheDocument();
    await userEvent.click(screen.getByText(/Оставить свой отзыв/i));
    expect(screen.getByText(`Оставить отзыв`)).toBeInTheDocument();
  });

});
