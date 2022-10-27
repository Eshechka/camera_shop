import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch } from '../../hooks';
import { addProductReviewAction } from '../../store/api-actions';
import { ReviewFormData } from '../../types/reviewFormData';

type addReviewFormProps = {
  productId: number;
}

function AddReviewForm({
  productId,
}: addReviewFormProps): JSX.Element {
  const dispatch = useAppDispatch();

  const initialFormData:ReviewFormData = {
    cameraId: productId,
    userName: null,
    advantage: null,
    disadvantage: null,
    review: null,
    rating: 0,
  };
  const [formData, setFormData] = useState(initialFormData);

  const onSubmitAddReview = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addProductReviewAction(formData));
  };

  return (
    <form
      method="post"
      onSubmit={onSubmitAddReview}
    >
      <div className="form-review__rate">
        <fieldset className={cn('rate form-review__item', {'is-invalid': !formData.rating})}>
          <legend className="rate__caption">Рейтинг
            <svg width="9" height="9" aria-hidden="true">
              <use xlinkHref="#icon-snowflake"></use>
            </svg>
          </legend>
          <div className="rate__bar">
            <div className="rate__group">
              <input className="visually-hidden" name="rate" type="radio"
                value="5" id="star-5"
                onChange={(e) => setFormData({...formData, rating: 5})}
                checked={+formData.rating === 5}
              />
              <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
              <input className="visually-hidden" name="rate" type="radio"
                value="4" id="star-4"
                onChange={(e) => setFormData({...formData, rating: 4})}
                checked={+formData.rating === 4}
              />
              <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
              <input className="visually-hidden" name="rate" type="radio"
                value="3" id="star-3"
                onChange={(e) => setFormData({...formData, rating: 3})}
                checked={+formData.rating === 3}
              />
              <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
              <input className="visually-hidden" name="rate" type="radio"
                value="2" id="star-2"
                onChange={(e) => setFormData({...formData, rating: 2})}
                checked={+formData.rating === 2}
              />
              <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
              <input className="visually-hidden" name="rate" type="radio"
                value="1" id="star-1"
                onChange={(e) => setFormData({...formData, rating: 1})}
                checked={+formData.rating === 1}
              />
              <label className="rate__label" htmlFor="star-1" title="Ужасно"></label>
            </div>
            <div className="rate__progress"><span className="rate__stars">{formData.rating}</span> <span>/</span> <span className="rate__all-stars">5</span>
            </div>
          </div>
          <p className="rate__message">Нужно оценить товар</p>
        </fieldset>
        <div className={cn('custom-input form-review__item', {'is-invalid': formData.userName === ''})}>
          <label>
            <span className="custom-input__label">Ваше имя
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              type="text"
              name="user-name"
              placeholder="Введите ваше имя"
              value={formData.userName ? `${formData.userName}` : ''}
              onChange={(e) => setFormData({...formData, userName: e.target.value})}
            />
          </label>
          <p className="custom-input__error">Нужно указать имя</p>
        </div>
        <div className={cn('custom-input form-review__item', {'is-invalid': formData.advantage === ''})}>
          <label>
            <span className="custom-input__label">Достоинства
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              type="text"
              name="user-plus"
              placeholder="Основные преимущества товара"
              value={formData.advantage ? `${formData.advantage}` : ''}
              onChange={(e) => setFormData({...formData, advantage: e.target.value})}
            />
          </label>
          <p className="custom-input__error">Нужно указать достоинства</p>
        </div>
        <div className={cn('custom-input form-review__item', {'is-invalid': formData.disadvantage === ''})}>
          <label>
            <span className="custom-input__label">Недостатки
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <input
              type="text"
              name="user-minus"
              placeholder="Главные недостатки товара"
              value={formData.disadvantage ? `${formData.disadvantage}` : ''}
              onChange={(e) => setFormData({...formData, disadvantage: e.target.value})}
            />
          </label>
          <p className="custom-input__error">Нужно указать недостатки</p>
        </div>
        <div className={cn('custom-textarea form-review__item', {'is-invalid': formData.review === ''})}>
          <label>
            <span className="custom-textarea__label">Комментарий
              <svg width="9" height="9" aria-hidden="true">
                <use xlinkHref="#icon-snowflake"></use>
              </svg>
            </span>
            <textarea
              name="user-comment"
              minLength={5}
              placeholder="Поделитесь своим опытом покупки"
              value={formData.review ? `${formData.review}` : ''}
              onChange={(e) => setFormData({...formData, review: e.target.value})}
            >
            </textarea>
          </label>
          <div className="custom-textarea__error">Нужно добавить комментарий</div>
        </div>
      </div>
      <button className="btn btn--purple form-review__btn" type="submit">Отправить отзыв</button>
    </form>
  );
}

export default AddReviewForm;
