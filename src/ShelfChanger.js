import React from 'react';

const noShelf = {
  id: 'none',
  label: 'None',
};

const ShelfChanger = (props) => {
  const { book, shelfList } = props;
  
  return (
    <div className="book-shelf-changer">
      <select value={book.shelf}>
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

export default ShelfChanger