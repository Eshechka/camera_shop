import { useEffect, useState } from 'react';
import { Route, Routes, BrowserRouter, Navigate } from 'react-router-dom';

import { AppRoute, MAX_PAGINATION_ELEMS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BasketPage from '../../pages/basket-page/basket-page';

import CatalogPage from '../../pages/catalog-page/catalog-page';
import NotFound from '../../pages/not-found/not-found';
import ProductPage from '../../pages/product-page/product-page';
import { fetchProductsLengthAction } from '../../store/api-actions';
import { getProductsLength } from '../../store/data-catalog/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const productLength = useAppSelector(getProductsLength);

  const [maxPages, setMaxPages] = useState<number|null>(null);

  useEffect(() => {
    dispatch(fetchProductsLengthAction());
  }, []);

  useEffect(() => {
    if (productLength) {
      setMaxPages(Math.ceil(productLength / MAX_PAGINATION_ELEMS));
    }
  }, [productLength]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.Root}>
          <Route index element={<CatalogPage maxPages={maxPages} />} />
          <Route path=':page' element={<CatalogPage maxPages={maxPages} />} />
        </Route>
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
