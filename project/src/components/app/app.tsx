import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { AppRoute } from '../../const';
import Basket from '../../pages/basket/basket';

import Catalog from '../../pages/catalog/catalog';
import NotFound from '../../pages/not-found/not-found';
import Product from '../../pages/product/product';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Catalog />}
        />
        <Route
          path={AppRoute.Basket}
          element={<Basket />}
        />
        <Route path={AppRoute.Product} >
          <Route index element={<Navigate to={AppRoute.Root} />} />
          <Route path=':id' element={<Product />} />
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
