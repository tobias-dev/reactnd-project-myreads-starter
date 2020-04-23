import React from 'react'
import * as BooksAPI from './BooksAPI'
import Shelf from './Shelf'
import Search from './Search'
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
    booksInShelf: {}, // Contains books that are assigned to any shelf
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
          book.shelf = newShelfId; // Update shelf
          this.isShelf(newShelfId) ?
            prevState.booksInShelf[bookId] = book : // Updated or new book
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
    const { booksInShelf } = this.state;

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <Search
            shelfList={shelfList}
            booksAnyShelf={booksInShelf}
            onBookMove={this.moveBook}
          />
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
                      shelfList={shelfList}
                      booksThisShelf={this.getBooksByShelf(shelf.id)}
                      booksAnyShelf={booksInShelf}
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
