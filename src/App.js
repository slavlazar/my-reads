import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './utils/BooksAPI'
import './styles/App.css'
import Search from './components/Search'
import ListBooks from './components/ListBooks'

/**
  * Base BookApp component
  * @extends Component
*/
export default class BookApp extends Component {
  state = {
    books: []
  }

  /**
   * Component life cycle event to call fetch books from API when component is mounted
   * @override
   */
  componentDidMount() {
    this.fetchBooks()
  }

  /**
   * Fetches a list of our books with corresponding book shelves.
   * Calls upon our BooksAPI getAll() method to call from the server
   */
  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  /**
   * Updates the shelf of a book. Calls upon our BooksAPI to update.
   * @param {Object} book The book object containing at least the id of the book
   * @param {string} shelf The new shelf we would like to move this book to
   */
  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks()
    })
  }

  /**
   * Finds a book's shelf (from our list of books in our state) based on the book id.
   * Returns 'none' if shelf or book no found
   * @param {string} id The id of the book we wish to locate the shelf of
   * @returns {string} The shelf of the book with the specified id, or 'none' if not found
   */
  findShelf = (id: string) => {
		const book = this.state.books.find(book => book.id === id)

    return book ? book.shelf : 'none'
	}

  render() {
    return (
      <div className="app">
        <Route exact path="/" render={() => (
          <ListBooks
            books={this.state.books}
            updateBook={this.updateBook}
          />
        )}/>
        <Route path="/search" render={({history}) => (
          <Search
            allBooks={this.state.books}
            findShelf={this.findShelf}
            updateBook={(book, shelf) => {
              this.updateBook(book, shelf)
              history.push('/')
            }}
          />
        )}/>
      </div>
    );
  }
}
