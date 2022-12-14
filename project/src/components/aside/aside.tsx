import { useEffect, useState } from 'react';
import { removeElemFromArray, TIME_FOR_DEBOUNCE } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useDebounce from '../../hooks/use-debounce/use-debounce';
import { clearProductsMaxPrice, clearProductsMinPrice } from '../../store/data-catalog/data-catalog';
import { getProductsMaxPrice, getProductsMinPrice } from '../../store/data-catalog/selectors';

type asidePageProps = {
  fromUrlCategories: string[];
  fromUrlLevels: string[];
  fromUrlTypes: string[];
  fromUrlMinPrice: number|'';
  fromUrlMaxPrice: number|'';
  changeFilterCategory: (categories: string[]) => void;
  changeFilterLevel: (levels: string[]) => void;
  changeFilterType: (types: string[]) => void;
  changeFilterMinPrice: (minPrice: number|'') => void;
  changeFilterMaxPrice: (maxPrice: number|'') => void;
  resetFilterAll: () => void;
  setClearFilterMinPrice: () => void;
  setClearFilterMaxPrice: () => void;
  setNoProductsFound: (val: boolean) => void;
}

function Aside({
  fromUrlCategories,
  fromUrlLevels,
  fromUrlTypes,
  fromUrlMinPrice,
  fromUrlMaxPrice,
  changeFilterCategory,
  changeFilterLevel,
  changeFilterType,
  changeFilterMinPrice,
  changeFilterMaxPrice,
  resetFilterAll,
  setClearFilterMinPrice,
  setClearFilterMaxPrice,
  setNoProductsFound,
}: asidePageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const productsMinPrice = useAppSelector(getProductsMinPrice);
  const productsMaxPrice = useAppSelector(getProductsMaxPrice);

  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [maxPriceInput, setMaxPriceInput] = useState<string>('');
  const [minPriceToDebounce, setMinPriceToDebounce] = useState<string>('');
  const [maxPriceToDebounce, setMaxPriceToDebounce] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number|''|null>(null);
  const [maxPrice, setMaxPrice] = useState<number|''|null>(null);
  const [minPlaceholderPrice, setMinPlaceholderPrice] = useState<number|''|null>(null);
  const [maxPlaceholderPrice, setMaxPlaceholderPrice] = useState<number|''|null>(null);
  const [replacementMinPrice, setReplacementMinPrice] = useState({status: false, value: ''});
  const [replacementMaxPrice, setReplacementMaxPrice] = useState({status: false, value: ''});
  const [isResetClicked, setIsResetClicked] = useState(false);

  const debouncedMinPrice = useDebounce(minPriceToDebounce, TIME_FOR_DEBOUNCE);
  const debouncedMaxPrice = useDebounce(maxPriceToDebounce, TIME_FOR_DEBOUNCE);

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
    if (fromUrlMinPrice || fromUrlMinPrice === 0) {
      setMinPrice(fromUrlMinPrice);
      // тоько зашли. Ставим в инпут то, что пришло из урл
      if (minPrice === null) {
        setMinPriceInput(`${fromUrlMinPrice}`);
      }
    }
    if (fromUrlMaxPrice || fromUrlMaxPrice === 0) {
      setMaxPrice(fromUrlMaxPrice);
      if (maxPrice === null) {
        setMaxPriceInput(`${fromUrlMaxPrice}`);
      }
    }
  }, [fromUrlCategories, fromUrlLevels, fromUrlTypes, fromUrlMinPrice, fromUrlMaxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  const changeCategory = (cameraCategory: string) => {
    setIsResetClicked(false);
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
    setIsResetClicked(false);
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
    setIsResetClicked(false);
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
    setMinPriceInput(cameraMinPrice);
  };
  const changeMaxPrice = (cameraMaxPrice: string) => {
    setMaxPriceInput(cameraMaxPrice);
  };

  useEffect(() => {
    const normalizedPrice = debouncedMinPrice === '' ? '' : parseInt(debouncedMinPrice, 10);
    // если дебаунс мин цена больше чем макс цена в инпуте - меняем макс цену на такую же debouncedMinPrice
    if ((normalizedPrice || normalizedPrice === 0) && maxPriceInput && normalizedPrice > parseInt(maxPriceInput, 10)) {
      setMaxPriceInput(`${normalizedPrice}`);
    }

    if ((normalizedPrice || normalizedPrice === 0)) {
      setMinPriceInput(`${normalizedPrice}`);
      setMinPrice(normalizedPrice);
      // Очищаем предыдущую ТЕКУЩУЮ мин.цену
      dispatch(clearProductsMinPrice());
      // В запрос и в Url отправляем цену фильтра
      changeFilterMinPrice(normalizedPrice);
    }
  }, [debouncedMinPrice]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const normalizedPrice = debouncedMaxPrice === '' ? '' : parseInt(debouncedMaxPrice, 10);
    const changedPrice = (normalizedPrice || normalizedPrice === 0) && minPriceInput ? Math.max(normalizedPrice, parseInt(minPriceInput, 10)) : normalizedPrice;

    if ((changedPrice || changedPrice === 0)) {
      setMaxPriceInput(`${changedPrice}`);
      setMaxPrice(changedPrice);
      // Очищаем предыдущую ТЕКУЩУЮ мин.цену
      dispatch(clearProductsMaxPrice());
      // В запрос и в Url отправляем цену фильтра
      changeFilterMaxPrice(changedPrice);
    }
  }, [debouncedMaxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Изменилась ТЕКУЩАЯ мин.цена фильтрованных продуктов. Просто меняем мин.цену в инпуте
    if (productsMinPrice !== null) {
      if (productsMinPrice === '') {
        // пришел пустой список камер. Нет продуктов под текущие параметры. Показываем уведомление "не найдено"
        setNoProductsFound(true);
      } else {
        setNoProductsFound(false);
        if (isResetClicked) {
          // смена по резету
          // 1) minPriceInput была цена = "" - меняем setMinPrice(''); не меняем setMinPriceInput('');
          // 2) minPriceInput была цена отличная от "" - меняем setMinPrice(''); setMinPriceInput('');
          setIsResetClicked(false);
          setMinPrice('');
          if (minPriceInput !== '') {
            setMinPriceInput('');
          }
        } else if ((minPriceInput || parseInt(minPriceInput, 10) === 0) && parseInt(minPriceInput, 10) < productsMinPrice) {
          // Если в инпуте мин цены что-то есть (юзер вбил ручками) и эта цена меньше, чем ТЕКУЩАЯ минцена, то ставим эту цеу в setMinPrice(productsMinPrice); подсовываем setMinPriceInput(`${productsMinPrice}`);
          setMinPrice(productsMinPrice);
          setReplacementMinPrice({status: true, value: `${productsMinPrice}`});
        }
        setMinPlaceholderPrice(productsMinPrice);
      }
    }
  }, [productsMinPrice]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Изменилась ТЕКУЩАЯ макс.цена фильтрованных продуктов. Просто меняем макс.цену в инпуте
    if (productsMaxPrice !== null) {
      if (productsMaxPrice === '') {
        // пришел пустой список камер. Нет продуктов под текущие параметры. Показываем уведомление "не найдено"
        setNoProductsFound(true);
      } else {
        setNoProductsFound(false);
        if (isResetClicked) {
          // смена по резету
          // 1) maxPriceInput была цена = "" - меняем setMaxPrice(''); не меняем setMaxPriceInput('');
          // 2) maxPriceInput была цена отличная от "" - меняем setMaxPrice(''); setMaxPriceInput('');
          setIsResetClicked(false);
          setMaxPrice('');
          if (maxPriceInput !== '') {
            setMaxPriceInput('');
          }
        } else if ((maxPriceInput || parseInt(maxPriceInput, 10) === 0) && parseInt(maxPriceInput, 10) > productsMaxPrice) {
          // Если в инпуте макс цены что-то есть (юзер вбил ручками) и эта цена больше, чем ТЕКУЩАЯ максцена, то ставим эту цеу в setMaxPrice(productsMaxPrice); подсовываем setMaxPriceInput(`${productsMaxPrice}`);
          setMaxPrice(productsMaxPrice);
          setReplacementMaxPrice({status: true, value: `${productsMaxPrice}`});
        }
        setMaxPlaceholderPrice(productsMaxPrice);
      }
    }
  }, [productsMaxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // Изменилась MIN цена в инпуте. Тут решаем, надо ли дальше ее дебаунсить и запускать весь процесс ее обработки или мы просто принудительно ее сменили
    if (replacementMinPrice.status === false) {
      if (minPriceInput === debouncedMinPrice && productsMinPrice && (parseInt(minPriceInput, 10) < productsMinPrice)) {
        setReplacementMinPrice({status: true, value: `${productsMinPrice}`});
      } else if (minPriceInput === '') {
        setClearFilterMinPrice();
      } else {
        setMinPriceToDebounce(minPriceInput);
      }
    } else {
      setReplacementMinPrice({status: false, value: ''});
    }
  }, [minPriceInput]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // Изменилась MAX цена в инпуте. Тут решаем, надо ли дальше ее дебаунсить и запускать весь процесс ее обработки или мы просто принудительно ее сменили
    if (replacementMaxPrice.status === false) {
      if (maxPriceInput === debouncedMaxPrice && productsMaxPrice && (parseInt(maxPriceInput, 10) > productsMaxPrice)) {
        setReplacementMaxPrice({status: true, value: `${productsMaxPrice}`});
      } else if (maxPriceInput === '') {
        setClearFilterMaxPrice();
      } else {
        setMaxPriceToDebounce(maxPriceInput);
      }
    } else {
      setReplacementMaxPrice({status: false, value: ''});
    }
  }, [maxPriceInput]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (replacementMinPrice.status === true) {
      setMinPriceInput(replacementMinPrice.value);
    }
  }, [replacementMinPrice]);
  useEffect(() => {
    if (replacementMaxPrice.status === true) {
      setMaxPriceInput(replacementMaxPrice.value);
    }
  }, [replacementMaxPrice]);

  const resetFilters = () => {
    if (categories.length || levels.length || types.length || minPrice || maxPrice) {
      setCategories([]);
      setLevels([]);
      setTypes([]);
      setIsResetClicked(true);
      setReplacementMinPrice({status: true, value: ''});
      setReplacementMaxPrice({status: true, value: ''});
      dispatch(clearProductsMinPrice());
      dispatch(clearProductsMaxPrice());
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
                    placeholder={minPlaceholderPrice ? `${minPlaceholderPrice}` : 'от'}
                    value={minPriceInput}
                    onChange={(e) => changeMinPrice(e.target.value)}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number" name="priceUp"
                    placeholder={maxPlaceholderPrice ? `${maxPlaceholderPrice}` : 'до'}
                    value={maxPriceInput}
                    onChange={(e) => changeMaxPrice(e.target.value)}
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
                  disabled={types.includes('Плёночная') || types.includes('Моментальная')}
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
