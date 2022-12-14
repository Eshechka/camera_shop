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
      // ?????????? ??????????. ???????????? ?? ?????????? ????, ?????? ???????????? ???? ??????
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
    // ???????? ?????????????? ?????? ???????? ???????????? ?????? ???????? ???????? ?? ???????????? - ???????????? ???????? ???????? ???? ?????????? ???? debouncedMinPrice
    if ((normalizedPrice || normalizedPrice === 0) && maxPriceInput && normalizedPrice > parseInt(maxPriceInput, 10)) {
      setMaxPriceInput(`${normalizedPrice}`);
    }

    if ((normalizedPrice || normalizedPrice === 0)) {
      setMinPriceInput(`${normalizedPrice}`);
      setMinPrice(normalizedPrice);
      // ?????????????? ???????????????????? ?????????????? ??????.????????
      dispatch(clearProductsMinPrice());
      // ?? ???????????? ?? ?? Url ???????????????????? ???????? ??????????????
      changeFilterMinPrice(normalizedPrice);
    }
  }, [debouncedMinPrice]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    const normalizedPrice = debouncedMaxPrice === '' ? '' : parseInt(debouncedMaxPrice, 10);
    const changedPrice = (normalizedPrice || normalizedPrice === 0) && minPriceInput ? Math.max(normalizedPrice, parseInt(minPriceInput, 10)) : normalizedPrice;

    if ((changedPrice || changedPrice === 0)) {
      setMaxPriceInput(`${changedPrice}`);
      setMaxPrice(changedPrice);
      // ?????????????? ???????????????????? ?????????????? ??????.????????
      dispatch(clearProductsMaxPrice());
      // ?? ???????????? ?? ?? Url ???????????????????? ???????? ??????????????
      changeFilterMaxPrice(changedPrice);
    }
  }, [debouncedMaxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // ???????????????????? ?????????????? ??????.???????? ?????????????????????????? ??????????????????. ???????????? ???????????? ??????.???????? ?? ????????????
    if (productsMinPrice !== null) {
      if (productsMinPrice === '') {
        // ???????????? ???????????? ???????????? ??????????. ?????? ?????????????????? ?????? ?????????????? ??????????????????. ???????????????????? ?????????????????????? "???? ??????????????"
        setNoProductsFound(true);
      } else {
        setNoProductsFound(false);
        if (isResetClicked) {
          // ?????????? ???? ????????????
          // 1) minPriceInput ???????? ???????? = "" - ???????????? setMinPrice(''); ???? ???????????? setMinPriceInput('');
          // 2) minPriceInput ???????? ???????? ???????????????? ???? "" - ???????????? setMinPrice(''); setMinPriceInput('');
          setIsResetClicked(false);
          setMinPrice('');
          if (minPriceInput !== '') {
            setMinPriceInput('');
          }
        } else if ((minPriceInput || parseInt(minPriceInput, 10) === 0) && parseInt(minPriceInput, 10) < productsMinPrice) {
          // ???????? ?? ???????????? ?????? ???????? ??????-???? ???????? (???????? ???????? ??????????????) ?? ?????? ???????? ????????????, ?????? ?????????????? ??????????????, ???? ???????????? ?????? ?????? ?? setMinPrice(productsMinPrice); ?????????????????????? setMinPriceInput(`${productsMinPrice}`);
          setMinPrice(productsMinPrice);
          setReplacementMinPrice({status: true, value: `${productsMinPrice}`});
        }
        setMinPlaceholderPrice(productsMinPrice);
      }
    }
  }, [productsMinPrice]); // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    // ???????????????????? ?????????????? ????????.???????? ?????????????????????????? ??????????????????. ???????????? ???????????? ????????.???????? ?? ????????????
    if (productsMaxPrice !== null) {
      if (productsMaxPrice === '') {
        // ???????????? ???????????? ???????????? ??????????. ?????? ?????????????????? ?????? ?????????????? ??????????????????. ???????????????????? ?????????????????????? "???? ??????????????"
        setNoProductsFound(true);
      } else {
        setNoProductsFound(false);
        if (isResetClicked) {
          // ?????????? ???? ????????????
          // 1) maxPriceInput ???????? ???????? = "" - ???????????? setMaxPrice(''); ???? ???????????? setMaxPriceInput('');
          // 2) maxPriceInput ???????? ???????? ???????????????? ???? "" - ???????????? setMaxPrice(''); setMaxPriceInput('');
          setIsResetClicked(false);
          setMaxPrice('');
          if (maxPriceInput !== '') {
            setMaxPriceInput('');
          }
        } else if ((maxPriceInput || parseInt(maxPriceInput, 10) === 0) && parseInt(maxPriceInput, 10) > productsMaxPrice) {
          // ???????? ?? ???????????? ???????? ???????? ??????-???? ???????? (???????? ???????? ??????????????) ?? ?????? ???????? ????????????, ?????? ?????????????? ????????????????, ???? ???????????? ?????? ?????? ?? setMaxPrice(productsMaxPrice); ?????????????????????? setMaxPriceInput(`${productsMaxPrice}`);
          setMaxPrice(productsMaxPrice);
          setReplacementMaxPrice({status: true, value: `${productsMaxPrice}`});
        }
        setMaxPlaceholderPrice(productsMaxPrice);
      }
    }
  }, [productsMaxPrice]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    // ???????????????????? MIN ???????? ?? ????????????. ?????? ????????????, ???????? ???? ???????????? ???? ???????????????????? ?? ?????????????????? ???????? ?????????????? ???? ?????????????????? ?????? ???? ???????????? ?????????????????????????? ???? ??????????????
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
    // ???????????????????? MAX ???????? ?? ????????????. ?????? ????????????, ???????? ???? ???????????? ???? ???????????????????? ?? ?????????????????? ???????? ?????????????? ???? ?????????????????? ?????? ???? ???????????? ?????????????????????????? ???? ??????????????
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
          <h2 className="visually-hidden">????????????</h2>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">????????, ???</legend>
            <div className="catalog-filter__price-range">
              <div className="custom-input">
                <label>
                  <input
                    type="number" name="price"
                    placeholder={minPlaceholderPrice ? `${minPlaceholderPrice}` : '????'}
                    value={minPriceInput}
                    onChange={(e) => changeMinPrice(e.target.value)}
                  />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input
                    type="number" name="priceUp"
                    placeholder={maxPlaceholderPrice ? `${maxPlaceholderPrice}` : '????'}
                    value={maxPriceInput}
                    onChange={(e) => changeMaxPrice(e.target.value)}
                  />
                </label>
              </div>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">??????????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="photocamera"
                  checked={categories.includes('??????????????????????')}
                  onChange={() => changeCategory('??????????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="videocamera"
                  disabled={types.includes('??????????????????') || types.includes('????????????????????????')}
                  checked={categories.includes('??????????????????????')}
                  onChange={() => changeCategory('??????????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">??????????????????????</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">?????? ????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="digital"
                  checked={types.includes('????????????????')}
                  onChange={() => changeType('????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="film"
                  disabled={categories.length === 1 && categories[0] === '??????????????????????'}
                  checked={types.includes('??????????????????')}
                  onChange={() => changeType('??????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">??????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="snapshot"
                  disabled={categories.length === 1 && categories[0] === '??????????????????????'}
                  checked={types.includes('????????????????????????')}
                  onChange={() => changeType('????????????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">????????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="collection"
                  checked={types.includes('??????????????????????????')}
                  onChange={() => changeType('??????????????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">??????????????????????????</span>
              </label>
            </div>
          </fieldset>
          <fieldset className="catalog-filter__block">
            <legend className="title title--h5">??????????????</legend>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="zero"
                  checked={levels.includes('??????????????')}
                  onChange={() => changeLevel('??????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">??????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="non-professional"
                  checked={levels.includes('????????????????????????')}
                  onChange={() => changeLevel('????????????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">????????????????????????</span>
              </label>
            </div>
            <div className="custom-checkbox catalog-filter__item">
              <label>
                <input type="checkbox" name="professional"
                  checked={levels.includes('????????????????????????????????')}
                  onChange={() => changeLevel('????????????????????????????????')}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">????????????????????????????????</span>
              </label>
            </div>
          </fieldset>
          <button
            className="btn catalog-filter__reset-btn"
            type="reset"
            onClick={resetFilters}
          >
            ???????????????? ??????????????
          </button>
        </form>
      </div>
    </div>
  );
}

export default Aside;
