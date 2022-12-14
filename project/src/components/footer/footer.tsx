import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

function Footer(): JSX.Element {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__info">
          <NavLink className="footer__logo" to={AppRoute.Root} aria-label="Переход на главную">
            <svg width="100" height="36" aria-hidden="true">
              <use xlinkHref="#icon-logo-mono"></use>
            </svg>
          </NavLink>
          <p className="footer__description">Интернет-магазин фото- и видеотехники</p>
          <ul className="social">
            <li className="social__item">
              <a className="link" href="https://vk.com/" aria-label="Переход на страницу вконтатке">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-vk"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="https://pinterest.com/" aria-label="Переход на страницу pinterest">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-pinterest"></use>
                </svg>
              </a>
            </li>
            <li className="social__item">
              <a className="link" href="https://reddit.com/" aria-label="Переход на страницу reddit">
                <svg width="20" height="20" aria-hidden="true">
                  <use xlinkHref="#icon-reddit"></use>
                </svg>
              </a>
            </li>
          </ul>
        </div>
        <ul className="footer__nav">
          <li className="footer__nav-item">
            <p className="footer__title">Навигация</p>
            <ul className="footer__list">
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Root}>Каталог
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Warranty}>Гарантии
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Delivery}>Доставка
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.About}>О компании
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Ресурсы</p>
            <ul className="footer__list">
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Root}>Курсы операторов
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Root}>Блог
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Root}>Сообщество
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="footer__nav-item">
            <p className="footer__title">Поддержка</p>
            <ul className="footer__list">
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Root}>FAQ
                </NavLink>
              </li>
              <li className="footer__item">
                <NavLink className="link" to={AppRoute.Root}>Задать вопрос
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
