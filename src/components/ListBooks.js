import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'

/**
  * Class representing a ListBooks component
  * @extends Component
*/
export default class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      shelf: PropTypes.string.isRequired,
      imageLinks: PropTypes.object.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired),
    })).isRequired,
    updateBook: PropTypes.func.isRequired
  }

  render() {
    const shelfs = [
      {
        name: 'currentlyReading',
        title: 'Currently Reading'
      },
      {
        name: 'wantToRead',
        title: 'Want to Read'
      },
      {
        name: 'read',
        title: 'Read'
      }
    ]

    const books = this.props.books

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            {shelfs.map((shelf, index) => (
              <BookShelf
                title={shelf.title}
                key={index}
                books={books.filter((book) => book.shelf === shelf.name)}
                updateBook={this.props.updateBook}
              />
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link
            to="/search">
            Add a book
          </Link>
        </div>
      </div>
    )
  }
}
