import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types';

const ListBooks = (props) => {
  const { booksThisList, shelfList, booksAnyShelf, onBookMove } = props;
  
  return (
    <ol className="books-grid">
      {booksThisList.map((book) => (
        <li key={book.id}>
          <Book
            book={book}
            shelfList={shelfList}
            booksAnyShelf={booksAnyShelf}
            onBookMove={onBookMove}
          />
        </li>
      ))}
    </ol>
  )
}

ListBooks.propTypes = {
  booksThisList: PropTypes.array.isRequired,
  shelfList: PropTypes.array.isRequired,
  booksAnyShelf: PropTypes.object.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default ListBooks