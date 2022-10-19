import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';
import BasketPage from '../../pages/basket-page/basket-page';

import CatalogPage from '../../pages/catalog-page/catalog-page';
import NotFound from '../../pages/not-found/not-found';
import ProductPage from '../../pages/product-page/product-page';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<CatalogPage />}
        />
        <Route
          path={AppRoute.Basket}
          element={<BasketPage />}
        />
        <Route path={AppRoute.Product} >
          <Route index element={<Navigate to={AppRoute.Root} />} />
          <Route path=':id' element={<ProductPage />} />
        </Route>
        <Route
          path={AppRoute.NotFound}
          element={<NotFound />}
        />
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
