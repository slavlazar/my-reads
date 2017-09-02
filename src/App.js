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

  componentDidMount() {
    this.fetchBooks()
  }

  fetchBooks = () => {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then(() => {
      this.fetchBooks()
    })
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
