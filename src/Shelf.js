import React, { Component } from 'react';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class Shelf extends Component {

  shouldComponentUpdate(nextProps) {
    // Only update if a book is added or removed
    return this.props.books.length !== nextProps.books.length;
  }

  render() {
    const { shelf, books, shelfList, booksInShelf, onBookMove } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
          <ListBooks
            books={books}
            shelfList={shelfList}
            onBookMove={onBookMove}
            booksInShelf={booksInShelf}
          />
        </div>
      </div>
    )
  }
}

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  books: PropTypes.array.isRequired,
  shelfList: PropTypes.array.isRequired,
  booksInShelf: PropTypes.object.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Shelf