import cn from 'classnames';

type paginationProps = {
  currentPage: number;
  pages: number;
  changePage: (currentPage: number) => void;
}

function Pagination({
  currentPage = 1,
  pages,
  changePage,
}: paginationProps): JSX.Element {

  const allPages = Array.from({ length: pages })
    .map((item, index) => ({item: item, key: `page${index}`}));

  const pageClickHandle = (page: number) => {
    if (page <= pages && page > 0) {
      changePage(page);
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        <li className="pagination__item">
          <button
            disabled={currentPage === 1}
            className="pagination__link pagination__link--text"
            onClick={() => pageClickHandle(currentPage - 1)}
          >Назад
          </button>
        </li>
        {allPages.map((page, index) => (
          <li key={page.key} className="pagination__item">
            <button
              className={cn('pagination__link', {'pagination__link--active': currentPage === index + 1})}
              onClick={() => pageClickHandle(index + 1)}
            >{index + 1}
            </button>
          </li>)
        )}
        <li className="pagination__item">
          <button
            disabled={currentPage === pages}
            className="pagination__link pagination__link--text"
            onClick={() => pageClickHandle(currentPage + 1)}
          >Далее
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
