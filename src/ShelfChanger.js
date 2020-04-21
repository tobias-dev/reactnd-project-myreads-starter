import React from 'react';
import PropTypes from 'prop-types';

const noShelf = {
  id: 'none',
  label: 'None',
};

const ShelfChanger = (props) => {
  const { book, shelfList, onBookMove } = props;

  const handleShelfChange = (e) => {
    const shelfId = e.target.value;
    onBookMove(book, shelfId);
  };
  
  return (
    <div className="book-shelf-changer">
      <select value={book.shelf || noShelf.id} onChange={handleShelfChange}>
        {shelfList.map((shelf) => {
          return (
            <option
              key={shelf.id}
              value={shelf.id}>
                {shelf.label}
            </option>
          )
        })}
        <option value={noShelf.id}>
          {noShelf.label}
        </option>
      </select>
    </div>
  )
}

ShelfChanger.propTypes = {
  book: PropTypes.object.isRequired,
  shelfList: PropTypes.array.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default ShelfChanger