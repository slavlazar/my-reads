import React, { Component } from 'react'
import PropTypes from 'prop-types'

/**
  * Class component represeting a single book
  * @extends Component
*/
export default class Book extends Component {
  static propTypes = {
    book: PropTypes.shape({
      id: PropTypes.string.isRequired,
      imageLinks: PropTypes.shape({
        smallThumbnail: PropTypes.string,
        thumbnail: PropTypes.string
      }),
      shelf: PropTypes.string,
      title: PropTypes.string.isRequired,
      authors: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
    updateBook: PropTypes.func.isRequired,
    findShelf: PropTypes.func
  }

  state = {
    shelf: ''
  }

  /**
   * Component life cycle event to set the state shelf from either the book
   * object, or uses the findShelf method from props to locate the shelf
   * @override
   */
  componentDidMount() {
    const { book, findShelf } = this.props

    const shelf = book.shelf || findShelf(book.id)

    this.setState({ shelf })
  }

  render() {
    const { book, updateBook } = this.props
    const { shelf } = this.state

    return (
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
            <select value={shelf} onChange={(event) => updateBook(book, event.target.value)}>
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
  }
}
