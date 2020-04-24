import React from 'react';
import ShelfChanger from './ShelfChanger';
import PropTypes from 'prop-types';

const Book = (props) => {
  const { book, shelves, onBookMove } = props;
  const { title, authors, imageLinks } = book;

  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: imageLinks ? `url("${imageLinks.thumbnail}")` : '',
          }}
        />
        <ShelfChanger book={book} shelves={shelves} onBookMove={onBookMove} />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{(authors || []).join(', ')}</div>
    </div>
  );
};

Book.propTypes = {
  book: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Book;
