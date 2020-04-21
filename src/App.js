import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import './App.css'

const shelfList = [
  {
    id: 'currentlyReading',
    label: 'Currently Reading',
  },
  {
    id: 'wantToRead',
    label: 'Want to Read',
  },
  {
    id: 'read',
    label: 'Read',
  },
];

class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    booksInShelf: {},
  }

  componentDidMount() {
    BooksAPI.getAll()
      .then((books) => {
        // Store books with IDs as keys, so that they can be easily accessed by ID
        const booksWithId = {};
        books.forEach((book) => {
          booksWithId[book.id] = book;
        })
        this.setState(() => ({
          booksInShelf: booksWithId
        }))
      })
  }

  moveBook = (book, newShelfId) => {
    BooksAPI.update(book, newShelfId)
      .then(() => {
        this.setState((prevState) => {
          const bookId = book.id;
          this.isShelf(newShelfId) ?
            prevState.booksInShelf[bookId].shelf = newShelfId : // Update shelf
            delete prevState.booksInShelf.bookId; // Delete book if not in shelf anymore
          return prevState;
        });
      })
  }

  getBooksByShelf = (shelfId) => {
    const { booksInShelf } = this.state;
    return Object.keys(booksInShelf)
      .map((bookId) => booksInShelf[bookId])
      .filter((book) => book.shelf === shelfId);
  }

  isShelf = (shelfId) => {
    return shelfList.map((shelf) => shelf.id).includes(shelfId);
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                <input type="text" placeholder="Search by title or author"/>

              </div>
            </div>
            <div className="search-books-results">
              <ol className="books-grid"></ol>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                {shelfList.map((shelf) => (
                    <Shelf
                      key={shelf.id}
                      shelf={shelf}
                      books={this.getBooksByShelf(shelf.id)}
                      shelfList={shelfList}
                      onBookMove={this.moveBook}
                    />
                  )
                )}
              </div>
            </div>
            <div className="open-search">
              <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
