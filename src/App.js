import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelves from './Shelves';
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
    booksInShelves: [], // Contains books that are assigned to a shelf
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
            <Shelves
              shelves={shelves}
              books={booksInShelves}
              onBookMove={this.moveBook}
            />
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
