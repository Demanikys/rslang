import React, { useEffect, useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import PropTypes from 'prop-types';
import style from './pagination.module.scss';

const PaginationInTextBook = (props) => {
  const { setPageNumber, length } = props;
  const [item, setItem] = useState(0);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages(() => {
      const highPage = (item + 1) * 5;
      const lowPage = highPage - 4;
      const paginationItems = [];

      for (let i = lowPage; i <= highPage; i += 1) {
        paginationItems.push(
          <Pagination.Item
            key={i}
            onClick={() => {
              setPageNumber(i);
              window.scrollTo(0, 0);
            }}
            disabled={(length / 20) < i - 1}
          >
            {i}
          </Pagination.Item>,
        );
      }

      return paginationItems;
    });
  }, [item, length]);

  return (
    <Pagination size="md" className={style.pagination}>
      <Pagination.First onClick={() => setItem(0)} />
      <Pagination.Prev disabled={!item} onClick={() => setItem(item - 1)} />

      {pages}

      <Pagination.Next disabled={item === 5} onClick={() => setItem(item + 1)} />
      <Pagination.Last onClick={() => setItem(5)} />
    </Pagination>
  );
};

PaginationInTextBook.propTypes = {
  setPageNumber: PropTypes.func.isRequired,
  length: PropTypes.number.isRequired,
};

export default PaginationInTextBook;
