import React, { Component } from 'react';
import ListBooks from './ListBooks';
import PropTypes from 'prop-types';

class Shelf extends Component {
  shouldComponentUpdate(nextProps) {
    // Only update if a book is added or removed
    return this.props.booksThisShelf.length !== nextProps.booksThisShelf.length;
  }

  render() {
    const {
      shelf,
      shelfList,
      booksThisShelf,
      booksAnyShelf,
      onBookMove,
    } = this.props;

    return (
      <div className='bookshelf'>
        <h2 className='bookshelf-title'>{shelf.label}</h2>
        <div className='bookshelf-books'>
          <ListBooks
            booksThisList={booksThisShelf}
            shelfList={shelfList}
            booksAnyShelf={booksAnyShelf}
            onBookMove={onBookMove}
          />
        </div>
      </div>
    );
  }
}

Shelf.propTypes = {
  shelf: PropTypes.object.isRequired,
  shelfList: PropTypes.array.isRequired,
  booksThisShelf: PropTypes.array.isRequired,
  booksAnyShelf: PropTypes.object.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Shelf;
