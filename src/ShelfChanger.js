import React from 'react';
import PropTypes from 'prop-types';

const noShelf = {
  id: 'none',
  label: 'None',
};

const ShelfChanger = (props) => {
  const { book, shelfList, booksAnyShelf, onBookMove } = props;

  const getShelf = (book) => {
    if (book.hasOwnProperty('shelf')) {
      return book.shelf;
    }
    if (Object.keys(booksAnyShelf).includes(book.id)) {
      return booksAnyShelf[book.id].shelf;
    }
    return noShelf.id;
  };

  const handleShelfChange = (e) => {
    const shelfId = e.target.value;
    onBookMove(book, shelfId);
  };

  return (
    <div className="book-shelf-changer">
      <select value={getShelf(book)} onChange={handleShelfChange}>
        {shelfList.map((shelf) => {
          return (
            <option key={shelf.id} value={shelf.id}>
              {shelf.label}
            </option>
          );
        })}
        <option value={noShelf.id}>{noShelf.label}</option>
      </select>
    </div>
  );
};

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  shelfList: PropTypes.array.isRequired,
  booksAnyShelf: PropTypes.array.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default ShelfChanger;
