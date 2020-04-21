import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI';
import ListBooks from './ListBooks';
import {DebounceInput} from 'react-debounce-input';
import PropTypes from 'prop-types';

class Search extends Component {
  state = {
    query: '',
    books: [],
    hasSearchError: false,
  }

  handleSearch = (e) => {
    const query = e.target.value;
    this.setState(() => ({
      query
    }), () => {
      BooksAPI.search(query)
        .then((books) => {
          typeof books === 'undefined' || books.hasOwnProperty('error') ?
            this.setState(() => ({
              books: [],
              hasSearchError: true,
            })) :
            this.setState(() => ({
              books: books || [],
              hasSearchError: false,
            }))
        });
    })
  }

  render() {
    const { query, books, hasSearchError } = this.state;
    const { shelfList, booksInShelf, onBookMove } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
          <div className="search-books-input-wrapper">
            <DebounceInput
              type="text"
              placeholder="Search by title or author"
              value={query}
              debounceTimeout={150}
              style={hasSearchError ? {color: '#ce4844'} : {}}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results">
          {!hasSearchError &&
            <ListBooks
              books={books}
              shelfList={shelfList}
              booksInShelf={booksInShelf}
              onBookMove={onBookMove}
            />
          }
        </div>
      </div>
    )
  }
}

Search.propTypes = {
  shelfList: PropTypes.array.isRequired,
  booksInShelf: PropTypes.object.isRequired,
  onBookMove: PropTypes.func.isRequired,
};

export default Search