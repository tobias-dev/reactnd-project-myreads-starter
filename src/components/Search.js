import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../api/BooksAPI';
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
        query.length > 0
          ? this.performSearch(query)
          : this.setState(() => ({
              searchedBooks: [],
              hasSearchError: false,
            }));
      }
    );
  };

  performSearch = (query) => {
    BooksAPI.search(query).then((searchedBooks = []) => {
      if (!searchedBooks.hasOwnProperty('error')) {
        this.setState(() => ({
          searchedBooks: searchedBooks,
          hasSearchError: false,
        }));
      } else {
        this.setState(() => ({
          searchedBooks: [],
          hasSearchError: true,
        }));
      }
    });
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
              debounceTimeout={250}
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
  onBookMove: PropTypes.func.isRequired,
};

export default Search;
