import { useEffect, useState } from 'react';
import { removeElemFromArray } from '../../const';
import { useAppSelector } from '../../hooks';
import useDebounce from '../../hooks/use-debounce/use-debounce';
import {
  // getProductsMaxPrice,
  getProductsMinPrice, getWholeCatalogMinPrice } from '../../store/data-catalog/selectors';

type asidePageProps = {
  fromUrlCategories: string[];
  fromUrlLevels: string[];
  fromUrlTypes: string[];
  fromUrlMinPrice: number|'';
  changeFilterCategory: (categories: string[]) => void;
  changeFilterLevel: (levels: string[]) => void;
  changeFilterType: (types: string[]) => void;
  changeFilterMinPrice: (minPrice: number|'') => void;
  resetFilterAll: () => void;
}

function Aside({
  fromUrlCategories,
  fromUrlLevels,
  fromUrlTypes,
  fromUrlMinPrice,
  changeFilterCategory,
  changeFilterLevel,
  changeFilterType,
  changeFilterMinPrice,
  resetFilterAll,
}: asidePageProps): JSX.Element {
  const productsMinPrice = useAppSelector(getProductsMinPrice);
  // const productsMaxPice = useAppSelector(getProductsMaxPrice);
  const wholeCatalogMinPrice = useAppSelector(getWholeCatalogMinPrice);

  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [minPriceToDebounce, setMinPriceToDebounce] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number|''>('');
  const [justSetMinPrice, setJustSetMinPrice] = useState(false);

  const debouncedMinPrice = useDebounce(minPriceToDebounce, 1500);

  useEffect(() => {
    if (fromUrlCategories && fromUrlCategories.length) {
      setCategories(fromUrlCategories);
    }
    if (fromUrlLevels && fromUrlLevels.length) {
      setLevels(fromUrlLevels);
    }
    if (fromUrlTypes && fromUrlTypes.length) {
      setTypes(fromUrlTypes);
    }
    if (fromUrlMinPrice || fromUrlMinPrice === '') {
      setMinPrice(fromUrlMinPrice);
    }
  }, [fromUrlCategories, fromUrlLevels, fromUrlTypes, fromUrlMinPrice]);

  const changeCategory = (cameraCategory: string) => {
    const copyCategories = [...categories];
    if (copyCategories.includes(cameraCategory)) {
      removeElemFromArray(copyCategories, cameraCategory);
    } else {
      copyCategories.push(cameraCategory);
    }
    setCategories(copyCategories);
    changeFilterCategory(copyCategories);
  };
  const changeLevel = (cameraLevel: string) => {
    const copyLevels = [...levels];
    if (copyLevels.includes(cameraLevel)) {
      removeElemFromArray(copyLevels, cameraLevel);
    } else {
      copyLevels.push(cameraLevel);
    }
    setLevels(copyLevels);
    changeFilterLevel(copyLevels);
  };
  const changeType = (cameraType: string) => {
    const copyTypes = [...types];
    if (copyTypes.includes(cameraType)) {
      removeElemFromArray(copyTypes, cameraType);
    } else {
      copyTypes.push(cameraType);
    }
    setTypes(copyTypes);
    changeFilterType(copyTypes);
  };

  const changeMinPrice = (cameraMinPrice: string) => {
    console.log('--changeMinPrice-- cameraMinPrice', cameraMinPrice);// eslint-disable-line
    setMinPriceInput(cameraMinPrice);
  };

  useEffect(() => {
    console.log('useEffect: change debouncedMinPrice. 1debouncedMinPrice', debouncedMinPrice);// eslint-disable-line

    const normalizedPrice = debouncedMinPrice === '' ? '' : parseInt(debouncedMinPrice, 10);
    console.log('2normalizedPrice', normalizedPrice);// eslint-disable-line
    console.log('3wholeCatalogMinPrice: ', wholeCatalogMinPrice);// eslint-disable-line
    if (normalizedPrice && wholeCatalogMinPrice) {
      if (normalizedPrice < wholeCatalogMinPrice) {
        // Введенная цена меньше минимальной во всем каталоге. Меняем цену в инпуте и дебаунсим по новой
        console.log('normalizedPrice < wholeCatalogMinPrice');// eslint-disable-line
        setJustSetMinPrice(true);
        setMinPriceInput(`${wholeCatalogMinPrice}`);
        setMinPrice(wholeCatalogMinPrice);
        changeFilterMinPrice(wholeCatalogMinPrice);
      } else {
        // setJustSetMinPrice(false);
        setMinPrice(normalizedPrice);
        changeFilterMinPrice(normalizedPrice);
      }
    }
  }, [debouncedMinPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Изменилась мин.цена фильтрованных продуктов. Просто меняем мин.цену в инпуте
    console.log('useEffect: change productsMinPrice', productsMinPrice);// eslint-disable-line

    if (productsMinPrice !== null) {
      setJustSetMinPrice(true);
      setMinPriceInput(`${productsMinPrice}`);
      setMinPrice(productsMinPrice);
    }
  }, [productsMinPrice]);

  useEffect(() => {
    // Изменилась цена в инпуте. Тут решаем, надо ли дальше ее дебаунсить и запускать весь процесс ее обработки или мы просто принудительно ее сменили
    console.log('useEffect: change minPriceInput', minPriceInput);// eslint-disable-line
    console.log('useEffect: change minPriceInput justSetMinPrice', justSetMinPrice);// eslint-disable-line
    if (!justSetMinPrice) {
      setMinPriceToDebounce(minPriceInput);
    } else {
      setJustSetMinPrice(false);
    }
  }, [minPriceInput]);

  useEffect(() => {
    console.log('useEffect: change justSetMinPrice', justSetMinPrice);// eslint-disable-line
  }, [justSetMinPrice]);

  //     if (priceInt || priceInt === 0) {
  //       price = Math.max(priceInt, 0);
  //     }
  //     // setPriceFrom(Math.max(price, 0));


  const resetFilters = () => {
    if (categories.length || levels.length || types.length || minPrice) {
      setCategories([]);
      setLevels([]);
      setTypes([]);
      setJustSetMinPrice(true);
      setMinPriceInput('');
      resetFilterAll();
    }
  };

  return (
    <div className="catalog__aside">
      <div className="catalog-filter">
        <form action="#">
          <h2 className="visually-hidden">Фильтр</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Цена, ₽</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number" name="price"
                    placeholder="от"
                    value={minPriceInput}
                    onChange={(e) => changeMinPrice(e.target.value)}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number" name="priceUp"
                    placeholder="до"
                    // value={priceTo}
                    // onChange={(e) => changePriceTo(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Категория</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="photocamera"
                  checked={categories.includes('Фотоаппарат')}
                  onChange={() => changeCategory('Фотоаппарат')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Фотокамера</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera"
                  checked={categories.includes('Видеокамера')}
                  onChange={() => changeCategory('Видеокамера')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Видеокамера</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Тип камеры</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital"
                  checked={types.includes('Цифровая')}
                  onChange={() => changeType('Цифровая')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Цифровая</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film"
                  disabled={categories.length === 1 && categories[0] === 'Видеокамера'}
                  checked={types.includes('Плёночная')}
                  onChange={() => changeType('Плёночная')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Плёночная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot"
                  disabled={categories.length === 1 && categories[0] === 'Видеокамера'}
                  checked={types.includes('Моментальная')}
                  onChange={() => changeType('Моментальная')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Моментальная</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection"
                  checked={types.includes('Коллекционная')}
                  onChange={() => changeType('Коллекционная')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Коллекционная</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">Уровень</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero"
                  checked={levels.includes('Нулевой')}
                  onChange={() => changeLevel('Нулевой')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Нулевой</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional"
                  checked={levels.includes('Любительский')}
                  onChange={() => changeLevel('Любительский')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Любительский</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional"
                  checked={levels.includes('Профессиональный')}
                  onChange={() => changeLevel('Профессиональный')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">Профессиональный</span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={resetFilters}
          >
            Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Aside;
