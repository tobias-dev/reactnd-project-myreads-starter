import React, { Component } from 'react';
import Book from './Book'

class Shelf extends Component {

  shouldComponentUpdate(nextProps) {
    // Only update if a book is added or removed
    return this.props.books.length !== nextProps.books.length;
  }

  render() {
    const { shelf, books, shelfList, onBookMove } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
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
        </div>
      </div>
    )
  }
}

export default Shelf