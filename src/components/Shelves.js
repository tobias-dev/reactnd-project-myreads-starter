import React from 'react';
import { Link } from 'react-router-dom';
import Shelf from './Shelf';
import PropTypes from 'prop-types';

const Shelves = (props) => {
  const { shelves, onBookMove } = props;

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {shelves.map((shelf) => (
            <Shelf
              key={shelf.id}
              shelf={shelf}
              shelves={shelves}
              onBookMove={onBookMove}
            />
          ))}
        </div>
      </div>
      <div className="open-search">
        <Link to="/search">
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

Shelves.propTypes = {
  shelves: PropTypes.array.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Shelves;
