import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { search } from '../utils/BooksAPI'
import Book from './Book'

/**
  * Class representing a Search component
  * @extends Component
*/
export default class Search extends Component {
  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query })

    search(query, 20).then((books) => {
      if (Array.isArray(books))
        this.setState({ books })
    })
  }

  render() {
    const { books, query } = this.state

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link
            to="/"
            className="close-search"
          >
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              autoFocus
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book
                  book={book}
                  updateBook={this.props.updateBook} />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}