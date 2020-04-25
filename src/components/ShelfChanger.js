import React from 'react';
import PropTypes from 'prop-types';

const noShelf = {
  id: 'none',
  label: 'None',
};

const ShelfChanger = (props) => {
  const { book, shelves, onBookMove } = props;

  const handleShelfChange = (e) => {
    const shelfId = e.target.value;
    onBookMove(book, shelfId);
  };

  const getShelf = (book) => {
    const shelf = shelves.find((shelf) =>
      shelf.books.find((b) => b.id === book.id)
    );
    return (shelf && shelf.id) || noShelf.id;
  };

  return (
    <div className="book-shelf-changer">
      <select value={getShelf(book)} onChange={handleShelfChange}>
        {shelves.map((shelf) => {
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
  shelves: PropTypes.array.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default ShelfChanger;
