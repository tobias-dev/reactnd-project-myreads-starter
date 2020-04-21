import React, { Component } from 'react';
import ListBooks from './ListBooks';

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
          <ListBooks
            books={books}
            shelfList={shelfList}
            onBookMove={onBookMove}
          />
        </div>
      </div>
    )
  }
}

export default Shelf