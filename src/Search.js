import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import { DebounceInput } from 'react-debounce-input';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    query: '',
    books: [],
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
          books: [],
          hasSearchError: false,
        };
        query.length > 0 &&
          BooksAPI.search(query).then((books) => {
            typeof books === 'undefined' || books.hasOwnProperty('error')
              ? (newSearchState.hasSearchError = true)
              : (newSearchState.books = books || []);
          });
        this.setState(() => newSearchState);
      }
    );
  };

  render() {
    const { query, books, hasSearchError } = this.state;
    const { shelfList, booksAnyShelf, onBookMove } = this.props;

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
            <ListBooks
              booksThisList={books}
              shelfList={shelfList}
              booksAnyShelf={booksAnyShelf}
              onBookMove={onBookMove}
            />
          )}
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  shelfList: PropTypes.array.isRequired,
  booksAnyShelf: PropTypes.object.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Search;
