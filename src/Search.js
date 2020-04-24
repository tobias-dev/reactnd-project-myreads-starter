import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Books from './Books';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    query: '',
    searchedBooks: [],
    hasSearchError: false,
  };

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState(
      () => ({
        query,
      }),
      () => {
        let newSearchState = {
          searchedBooks: [],
          hasSearchError: false,
        };
        query.length > 0 &&
          BooksAPI.search(query).then((books) => {
            const isValidSearch =
              typeof books !== 'undefined' && !books.hasOwnProperty('error');
            if (isValidSearch) {
              this.mapBooksToShelves(books); // Searched books don't contain shelf attributes, so map them
              newSearchState.searchedBooks = books || [];
            } else {
              newSearchState.hasSearchError = true;
            }
          });
        this.setState(() => newSearchState);
      }
    );
  };

  mapBooksToShelves = (books) => {
    const { booksInShelves } = this.props;
    booksInShelves.map((bookInShelf) =>
      books
        .filter((book) => book.id === bookInShelf.id)
        .map((book) => (book.shelf = bookInShelf.shelf))
    );
  };

  render() {
    const { query, searchedBooks, hasSearchError } = this.state;
    const { shelves, onBookMove } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button className="close-search">Close</button>
          </Link>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              placeholder="Search by title or author"
              value={query}
              debounceTimeout={150}
              className={hasSearchError ? 'error' : ''}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!hasSearchError && (
            <Books
              books={searchedBooks}
              shelves={shelves}
              onBookMove={onBookMove}
            />
          )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  shelves: PropTypes.array.isRequired,
  booksInShelves: PropTypes.object.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Search;
