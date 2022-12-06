import { useEffect, useState } from 'react';
import { removeElemFromArray } from '../../const';
import { useAppDispatch, useAppSelector } from '../../hooks';
import useDebounce from '../../hooks/use-debounce/use-debounce';
import { clearProductsMinPrice } from '../../store/data-catalog/data-catalog';
import { getProductsMaxPrice, getProductsMinPrice } from '../../store/data-catalog/selectors';

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
  setNoProductsFound: (val: boolean) => void;
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
  setNoProductsFound,
}: asidePageProps): JSX.Element {
  const dispatch = useAppDispatch();
  const productsMinPrice = useAppSelector(getProductsMinPrice);
  const productsMaxPice = useAppSelector(getProductsMaxPrice);

  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [minPriceInput, setMinPriceInput] = useState<string>('');
  const [minPriceToDebounce, setMinPriceToDebounce] = useState<string>('');
  const [minPrice, setMinPrice] = useState<number|''|null>(null);
  const [replacementMinPrice, setReplacementMinPrice] = useState({status: false, value: ''});
  const [isResetClicked, setIsResetClicked] = useState(false);
  const [changeFilterParamsByClick, setChangeFilterParamsByClick] = useState(false);

  const debouncedMinPrice = useDebounce(minPriceToDebounce, 1500);

  useEffect(() => {
    if (fromUrlCategories && fromUrlCategories.length) {
      setCategories(fromUrlCategories);
      if (!changeFilterParamsByClick) {setChangeFilterParamsByClick(true);}
    }
    if (fromUrlLevels && fromUrlLevels.length) {
      setLevels(fromUrlLevels);
      if (!changeFilterParamsByClick) {setChangeFilterParamsByClick(true);}
    }
    if (fromUrlTypes && fromUrlTypes.length) {
      setTypes(fromUrlTypes);
      if (!changeFilterParamsByClick) {setChangeFilterParamsByClick(true);}
    }
    if (fromUrlMinPrice || fromUrlMinPrice === '') {
      setMinPrice(fromUrlMinPrice);
      if (minPrice === null) {
        console.log('minPrice === null setMinPriceInput fromUrlMinPrice', fromUrlMinPrice);// eslint-disable-line
        setMinPriceInput(`${fromUrlMinPrice}`);
      }
    }
  }, [fromUrlCategories, fromUrlLevels, fromUrlTypes, fromUrlMinPrice]);

  const changeCategory = (cameraCategory: string) => {
    setIsResetClicked(false);
    if (!changeFilterParamsByClick) {setChangeFilterParamsByClick(true);}
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
    if (!changeFilterParamsByClick) {setChangeFilterParamsByClick(true);}
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
    if (!changeFilterParamsByClick) {setChangeFilterParamsByClick(true);}
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
    if (!changeFilterParamsByClick) {
      setChangeFilterParamsByClick(true);
      if (replacementMinPrice.status) {
        setReplacementMinPrice({status: false, value: ''});
      }
    }
    setMinPriceInput(cameraMinPrice);
  };

  useEffect(() => {
    console.log('Изменилась дебаунс цена useEffect: debouncedMinPrice', debouncedMinPrice);// eslint-disable-line
    const normalizedPrice = debouncedMinPrice === '' ? '' : parseInt(debouncedMinPrice, 10);

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
    // Изменилась ТЕКУЩАЯ макс.цена фильтрованных продуктов. Просто меняем макс.цену в инпуте
    console.log('useEffect: change productsMaxPice', productsMaxPice);// eslint-disable-line
  }, [productsMaxPice]);

  useEffect(() => {
    console.log('Изменилась ТЕКУЩАЯ мин.цена useEffect: productsMinPrice', productsMinPrice);// eslint-disable-line
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
        } else {
          console.log('----------minPrice', minPrice);// eslint-disable-line
          console.log('----------changeFilterParamsByClick', changeFilterParamsByClick);// eslint-disable-line

          // смена не по резету
          // 1) перешли с другой страницы или только зашли перезагрузкой. НЕ КЛИКАЛИ
          //    Пришла мин цена по всему каталогу. подсовываем setMinPriceInput('');
          // 2) что-то вбили в инпут с минценой, дебаунс, запрос, пришла новая минцена. КЛИКАЛИ
          //    Меняем setMinPrice(productsMinPrice); подсовываем setMinPriceInput(`${productsMinPrice}`);
          if (changeFilterParamsByClick) {
            setMinPrice(productsMinPrice);
            setReplacementMinPrice({status: true, value: `${productsMinPrice}`});
          } else {
            setReplacementMinPrice({status: true, value: ''});
          }
        }
      }
    } else {
      // setNoProductsFound(false); ????
    }
  }, [productsMinPrice]);

  useEffect(() => {
    // Изменилась цена в инпуте. Тут решаем, надо ли дальше ее дебаунсить и запускать весь процесс ее обработки или мы просто принудительно ее сменили
    console.log('Ввод в инпут useeffect minPriceInput = ', minPriceInput);// eslint-disable-line
    if (replacementMinPrice.status === false) {
      console.log('Пошел дебаунс');// eslint-disable-line
      if (minPriceInput === debouncedMinPrice) {
        console.log('ИЛИ не пошел дебаунс');// eslint-disable-line
        console.log(`А чему равен productsMinPrice = ${productsMinPrice}`);// eslint-disable-line
      }
      if (minPriceInput === debouncedMinPrice && productsMinPrice && (parseInt(minPriceInput, 10) < productsMinPrice)) {
        console.log('Подсунем в инпут productsMinPrice = ', productsMinPrice);// eslint-disable-line
        setReplacementMinPrice({status: true, value: `${productsMinPrice}`});
      } else {
        setMinPriceToDebounce(minPriceInput);
      }
    } else {
      setReplacementMinPrice({status: false, value: ''});
    }
  }, [minPriceInput]);


  useEffect(() => {
    console.log('changeFilterParamsByClick', changeFilterParamsByClick);// eslint-disable-line
    if (changeFilterParamsByClick) {
      dispatch(clearProductsMinPrice());
    }
  }, [changeFilterParamsByClick]);

  useEffect(() => {
    console.log('useEffect: change replacementMinPrice', replacementMinPrice);// eslint-disable-line
    if (replacementMinPrice.status === true) {
      setMinPriceInput(replacementMinPrice.value);
    }
  }, [replacementMinPrice]);

  const resetFilters = () => {
    if (categories.length || levels.length || types.length || minPrice) {
      setCategories([]);
      setLevels([]);
      setTypes([]);
      setIsResetClicked(true);
      setReplacementMinPrice({status: true, value: ''});// вот тут вопросики - надо именно подменить цен при резете? ведь нет, надо сбросить все к херам
      dispatch(clearProductsMinPrice());
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
