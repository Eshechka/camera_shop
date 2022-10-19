import cn from 'classnames';
import { useState } from 'react';

type paginationProps = {
  pages: number;
  changePage: () => void;
}

function Pagination({
  pages,
  changePage,
}: paginationProps): JSX.Element {

  const [currentPage, setCurrentPage] = useState(1);

  const nextClickHandle = () => {
    if (currentPage < pages) {
      setCurrentPage(currentPage + 1);
      changePage();// + 1
    }
  };

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {Array.from({ length: pages })
          .map((_, index) => {
            const key = index;
            return (
              <li key={key} className="pagination__item">
                <a
                  className={cn('pagination__link', {'pagination__link--active': currentPage === index + 1})}
                  href="1"
                >{index + 1}
                </a>
              </li>
            );
          })}
        <li className="pagination__item">
          <button
            disabled={currentPage === pages}
            className="pagination__link pagination__link--text"
            onClick={nextClickHandle}
          >Далее
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
