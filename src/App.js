import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './api/BooksAPI';
import Shelves from './components/Shelves';
import Search from './components/Search';
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
    BooksAPI.getAll().then((booksInShelves = []) => {
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
    const updatedBook = { ...book }; // Clone book to not modify directly
    updatedBook.shelf = newShelfId;
    this.setState((prevState) => ({
      booksInShelves: prevState.booksInShelves
        .filter((b) => b.id !== updatedBook.id)
        .concat(updatedBook),
    }));
  };

  removeBookFromShelves = (book) => {
    this.setState((prevState) => ({
      booksInShelves: prevState.booksInShelves.filter((b) => b.id !== book.id),
    }));
  };

  isShelf = (shelfId) => shelves.map((shelf) => shelf.id).includes(shelfId);

  getBooksByShelf = (shelf) =>
    this.state.booksInShelves.filter((b) => b.shelf === shelf.id);

  render() {
    const shelvesWithBooks = shelves.map((shelf) => ({
      ...shelf,
      ...{ books: this.getBooksByShelf(shelf) },
    })); // Map books to shelves to easily pass to components as one prop

    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <Shelves shelves={shelvesWithBooks} onBookMove={this.moveBook} />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <Search shelves={shelvesWithBooks} onBookMove={this.moveBook} />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
