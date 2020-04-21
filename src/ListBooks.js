import React from 'react';
import Book from './Book'
import PropTypes from 'prop-types';

const ListBooks = (props) => {
  const { books, shelfList, booksInShelf, onBookMove } = props;
  
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book
            book={book}
            shelfList={shelfList}
            booksInShelf={booksInShelf}
            onBookMove={onBookMove}
          />
        </li>
      ))}
    </ol>
  )
}

ListBooks.propTypes = {
  books: PropTypes.array.isRequired,
  shelfList: PropTypes.array.isRequired,
  booksInShelf: PropTypes.object.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default ListBooks