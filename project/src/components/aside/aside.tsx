import { useEffect, useState } from 'react';
import { removeElemFromArray } from '../../const';

type asidePageProps = {
  defaultCategories: string[];
  defaultLevels: string[];
  defaultTypes: string[];
  changeFilterCategory: (categories: string[]) => void;
  changeFilterLevel: (levels: string[]) => void;
  changeFilterType: (types: string[]) => void;
}

function Aside({
  defaultCategories,
  defaultLevels,
  defaultTypes,
  changeFilterCategory,
  changeFilterLevel,
  changeFilterType,
}: asidePageProps): JSX.Element {
  const [categories, setCategories] = useState<string[]>([]);
  const [levels, setLevels] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);

  useEffect(() => {
    if (defaultCategories && defaultCategories.length) {
      setCategories(defaultCategories);
    }
    if (defaultLevels && defaultLevels.length) {
      setLevels(defaultLevels);
    }
    if (defaultTypes && defaultTypes.length) {
      setTypes(defaultTypes);
    }
  }, [defaultCategories, defaultLevels, defaultTypes]);

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
                  <input type="number" name="price" placeholder="от" />
                </label>
              </div>
              <div className="custom-input">
                <label>
                  <input type="number" name="priceUp" placeholder="до" />
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
          <button className="btn catalog-filter__reset-btn" type="reset">Сбросить фильтры
          </button>
        </form>
      </div>
    </div>
  );
}

export default Aside;
