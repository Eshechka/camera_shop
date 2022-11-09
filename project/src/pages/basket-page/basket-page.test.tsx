import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AppRoute} from '../../const';
import App from '../../components/app/app';

const history = createMemoryHistory();

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const store = mockStore({
  PRODUCT: {
    product: null,
    isDataLoading: false,
    isReviewAdded: null,
    similarProducts: [],
    productReviews: [],
  },
  CATALOG: {
    products: [],
    productsLength: null,
    isDataLoading: false,
    promo: null,
  },
});

describe('Component: BasketPage', () => {
  it('should render correctly', () => {
    history.push(AppRoute.Basket);

    render(
      <Provider store={store}>
        <Router navigator={history} location={history.location}>
          <App />
        </Router>
      </Provider>);

    expect(screen.getAllByText(/Корзина/i)[0]).toBeInTheDocument();
  });

});
