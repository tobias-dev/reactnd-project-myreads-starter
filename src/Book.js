import React from 'react';
import ShelfChanger from './ShelfChanger'

const Book = (props) => {
  const { book, shelfList } = props;
  const { title, authors, imageLinks } = book;

  return (
    <div className="book">
      <div className="book-top">
        <div className="book-cover"
          style={{
            width: 128,
            height: 188,
            backgroundImage: `url("${imageLinks.thumbnail}")`
          }}
        />
        <ShelfChanger
          book={book}
          shelfList={shelfList}
        />
      </div>
      <div className="book-title">{title}</div>
      <div className="book-authors">{authors.join(', ')}</div>
    </div>
  )
}

export default Book