import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import { AppRoute, MAX_PAGINATION_ELEMS } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import BasketPage from '../../pages/basket-page/basket-page';

import CatalogPage from '../../pages/catalog-page/catalog-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import ProductPage from '../../pages/product-page/product-page';
import { fetchProductsMetaInfoAction } from '../../store/api-actions';
import { getProductsLength } from '../../store/data-catalog/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const productLength = useAppSelector(getProductsLength);

  const [maxPages, setMaxPages] = useState<number|null>(null);
  const [params, setParams] = useState<string|null>(null);

  useEffect(() => {
    if (params !== null) {
      dispatch(fetchProductsMetaInfoAction(params));
    }
  }, [params]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (productLength) {
      setMaxPages(Math.ceil(productLength / MAX_PAGINATION_ELEMS));
    }
  }, [productLength]);

  return (
    <Routes>
      <Route path={AppRoute.Root}>
        <Route index element={<Navigate to={AppRoute.Catalog} />} />
      </Route>
      <Route path={AppRoute.Catalog}>
        <Route index element={<CatalogPage setParams={setParams} maxPages={maxPages} />} />
        <Route path=':page' element={<CatalogPage setParams={setParams} maxPages={maxPages} />} />
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
        element={<NotFoundPage />}
      />
      <Route
        path="*"
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
