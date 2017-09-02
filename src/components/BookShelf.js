import React from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

const BookShelf = ({ title, books, updateBook }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{title}</h2>
    <div className="bookshelf-books">
      <ol className="books-grid">
        {books.map((book) => (
          <li key={book.id}>
            <Book
              book={book}
              updateBook={updateBook}
            />
          </li>
        ))}
      </ol>
    </div>
  </div>
)

BookShelf.propTypes = {
  title: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired
  })).isRequired,
  updateBook: PropTypes.func.isRequired
}

export default BookShelf
