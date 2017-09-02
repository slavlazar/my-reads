import React from 'react'
import PropTypes from 'prop-types'

/**
  * Stateless functional compoenent represeting a single book
*/
const Book = ({ book, updateBook }) => (
  <div className="book">
    <div className="book-top">
      {book && book.imageLinks && (
        <div
          className="book-cover"
          style={{
            backgroundImage:
              `url(${book.imageLinks.thumbnail ? book.imageLinks.thumbnail : book.imageLinks.smallThumbnail})`
          }}
        />
      )}
      <div className="book-shelf-changer">
        <select onChange={(event) => updateBook(book, event.target.value)}>
          <option value="none" disabled>
            Move to...
          </option>
          <option value="currentlyReading">
            Currently Reading
          </option>
          <option value="wantToRead">
            Want to Read
          </option>
          <option value="read">Read</option>
          <option value="none">None</option>
        </select>
      </div>
    </div>
    <div className="book-title">{book.title}</div>
    <div className="book-authors">{book.authors && book.authors.map((author, i) => (
      author + (book.authors.length !== i + 1 ? ' & ' : '')
    ))}</div>
  </div>
)

Book.propTypes = {
  book: PropTypes.shape({
    imageLinks: PropTypes.shape({
      smallThumbnail: PropTypes.string,
      thumbnail: PropTypes.string
    }),
    title: PropTypes.string.isRequired,
    authors: PropTypes.arrayOf(PropTypes.string.isRequired)
  }).isRequired,
  updateBook: PropTypes.func.isRequired
}

export default Book
