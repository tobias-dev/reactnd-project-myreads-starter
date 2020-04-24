import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Search from './Search';
import './App.css';

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
    booksAnyShelf: {}, // Contains books that are assigned to any shelf
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      // Store books with IDs as keys, so that they can be easily accessed by ID
      const booksWithId = {};
      books.forEach((book) => {
        booksWithId[book.id] = book;
      });
      this.setState(() => ({
        booksAnyShelf: booksWithId,
      }));
    });
  }

  moveBook = (book, newShelfId) => {
    BooksAPI.update(book, newShelfId).then(() => {
      this.setState((prevState) => {
        const bookId = book.id;
        book.shelf = newShelfId; // Update shelf
        this.isShelf(newShelfId)
          ? (prevState.booksAnyShelf[bookId] = book) // Updated or new book
          : delete prevState.booksAnyShelf.bookId; // Delete book if not in shelf anymore
        return prevState;
      });
    });
  };

  getBooksByShelf = (shelfId) => {
    const { booksAnyShelf } = this.state;
    return Object.keys(booksAnyShelf)
      .map((bookId) => booksAnyShelf[bookId])
      .filter((book) => book.shelf === shelfId);
  };

  isShelf = (shelfId) => {
    return shelfList.map((shelf) => shelf.id).includes(shelfId);
  };

  render() {
    const { booksAnyShelf } = this.state;

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
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
                      booksAnyShelf={booksAnyShelf}
                      onBookMove={this.moveBook}
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
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search
              shelfList={shelfList}
              booksAnyShelf={booksAnyShelf}
              onBookMove={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
