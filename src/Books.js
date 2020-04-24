import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const Books = (props) => {
  const { books, shelves, onBookMove } = props;

  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book book={book} shelves={shelves} onBookMove={onBookMove} />
        </li>
      ))}
    </ol>
  );
};

Books.propTypes = {
  books: PropTypes.array.isRequired,
  shelves: PropTypes.array.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Books;
