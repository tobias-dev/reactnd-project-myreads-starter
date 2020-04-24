import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './Shelf';
import Search from './Search';
import './App.css';

const shelves = [
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
    booksInShelves: [], // Contains books that are assigned to any shelf
  };

  componentDidMount() {
    BooksAPI.getAll().then((booksInShelves) => {
      this.setState(() => ({
        booksInShelves,
      }));
    });
  }

  moveBook = (book, newShelfId) => {
    BooksAPI.update(book, newShelfId).then(() => {
      this.isShelf(newShelfId)
        ? this.putBookInShelf(book, newShelfId)
        : this.removeBookFromShelves(book);
    });
  };

  putBookInShelf = (book, newShelfId) => {
    this.setState((prevState) => {
      const updatedBook = { ...book }; // Clone book to not modify state directly
      updatedBook.shelf = newShelfId;
      return {
        booksInShelves: prevState.booksInShelves
          .filter((b) => b.id !== updatedBook.id)
          .concat(updatedBook),
      };
    });
  };

  removeBookFromShelves = (book) => {
    this.setState((prevState) => {
      return {
        booksInShelves: prevState.booksInShelves.filter(
          (b) => b.id !== book.id
        ),
      };
    });
  };

  getBooksByShelf = (shelfId) => {
    return this.state.booksInShelves.filter((b) => b.shelf === shelfId);
  };

  isShelf = (shelfId) => {
    return shelves.map((shelf) => shelf.id).includes(shelfId);
  };

  render() {
    const { booksInShelves } = this.state;

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
                  {shelves.map((shelf) => (
                    <Shelf
                      key={shelf.id}
                      shelf={shelf}
                      shelves={shelves}
                      books={this.getBooksByShelf(shelf.id)}
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
              shelves={shelves}
              booksInShelves={booksInShelves}
              onBookMove={this.moveBook}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
