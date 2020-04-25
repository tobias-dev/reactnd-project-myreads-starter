import React, { Component } from 'react';
import Books from './Books';
import PropTypes from 'prop-types';

class Shelf extends Component {
  shouldComponentUpdate(nextProps) {
    // Only update if a book is added or removed
    return this.props.shelf.books.length !== nextProps.shelf.books.length;
  }

  render() {
    const { shelf, shelves, onBookMove } = this.props;

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.label}</h2>
        <div className="bookshelf-books">
          <Books
            books={shelf.books}
            shelves={shelves}
            onBookMove={onBookMove}
          />
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  shelves: PropTypes.array.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Shelf;
