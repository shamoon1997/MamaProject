import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    publishedDate: '',
  });
  const [editBook, setEditBook] = useState(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    axios
      .get('http://localhost:5000/api/books')
      .then((res) => setBooks(res.data))
      .catch((err) => console.log(err));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editBook) {
      setEditBook({ ...editBook, [name]: value });
    } else {
      setNewBook({ ...newBook, [name]: value });
    }
  };

  const addBook = () => {
    axios
      .post('http://localhost:5000/api/books', newBook)
      .then(() => {
        fetchBooks();
        setNewBook({ title: '', author: '', publishedDate: '' });
      })
      .catch((err) => console.log(err));
  };

  const deleteBook = (id) => {
    axios
      .delete(`http://localhost:5000/api/books/${id}`)
      .then(() => fetchBooks())
      .catch((err) => console.log(err));
  };

  const editClick = (book) => {
    setEditBook(book);
  };

  const updateBook = () => {
    axios
      .patch(`http://localhost:5000/api/books/${editBook._id}`, editBook)
      .then(() => {
        fetchBooks();
        setEditBook(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="row">
      <div className="col-md-4">
        <h2>{editBook ? 'Edit Book' : 'Add New Book'}</h2>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Title"
            name="title"
            value={editBook ? editBook.title : newBook.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Author"
            name="author"
            value={editBook ? editBook.author : newBook.author}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Published Date"
            name="publishedDate"
            value={editBook ? editBook.publishedDate : newBook.publishedDate}
            onChange={handleInputChange}
          />
        </div>
        <button
          className="btn btn-primary mr-2"
          onClick={editBook ? updateBook : addBook}
        >
          {editBook ? 'Update Book' : 'Add Book'}
        </button>
        {editBook && (
          <button
            className="btn btn-secondary"
            onClick={() => setEditBook(null)}
          >
            Cancel
          </button>
        )}
      </div>
      <div className="col-md-8">
        <h2>All Books</h2>
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <Link to={`/book/${book._id}`}>{book.title}</Link>
                </td>
                <td>{book.author}</td>
                <td>{book.publishedDate}</td>
                <td>
                  <button
                    className="btn btn-danger mr-2"
                    onClick={() => deleteBook(book._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning"
                    onClick={() => editClick(book)}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
