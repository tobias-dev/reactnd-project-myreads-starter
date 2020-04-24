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
    booksInShelfs: [], // Contains books that are assigned to any shelf
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        booksInShelfs: books,
      }));
    });
  }

  moveBook = (book, newShelfId) => {
    BooksAPI.update(book, newShelfId).then(() => {
      this.isShelf(newShelfId)
        ? this.assignBookToShelf(book, newShelfId)
        : this.removeBookFromShelves(book);
    });
  };

  assignBookToShelf = (book, newShelfId) => {
    this.setState((prevState) => {
      const updatedBook = { ...book }; // Clone book to not modify state directly
      updatedBook.shelf = newShelfId;
      return prevState.booksInShelfs
        .filter((b) => b.id !== updatedBook.id)
        .concat(updatedBook);
    });
  };

  removeBookFromShelves = (book) => {
    this.setState((prevState) => {
      return prevState.booksInShelfs.filter((b) => b.id !== book.id);
    });
  };

  getBooksByShelf = (shelfId) => {
    const { booksInShelfs } = this.state;
    return booksInShelfs.filter((book) => book.shelf === shelfId);
  };

  isShelf = (shelfId) => {
    return shelfList.map((shelf) => shelf.id).includes(shelfId);
  };

  render() {
    const { booksInShelfs } = this.state;

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
                      booksAnyShelf={booksInShelfs}
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
              booksAnyShelf={booksInShelfs}
              onBookMove={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
