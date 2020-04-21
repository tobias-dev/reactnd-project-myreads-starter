import React from 'react';
import Book from './Book'

const ListBooks = (props) => {
  const { books, shelfList, onBookMove } = props;
  
  return (
    <ol className="books-grid">
      {books.map((book) => (
        <li key={book.id}>
          <Book
            book={book}
            shelfList={shelfList}
            onBookMove={onBookMove}
          />
        </li>
      ))}
    </ol>
  )
}

export default ListBooks