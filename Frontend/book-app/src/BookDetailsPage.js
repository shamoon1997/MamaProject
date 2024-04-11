import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BookDetailsPage = () => {
  const [book, setBook] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/books/${bookId}`
        );
        setBook(response.data);
      } catch (error) {
        console.error('Error fetching book:', error);
      }
    };

    const bookId = window.location.pathname.split('/').pop();
    fetchBook();
  }, []);

  if (!book) {
    return <div className="container mt-5">Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Book Details</h1>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">Title: {book.title}</h5>
          <p className="card-text">Author: {book.author}</p>
          <p className="card-text">Published Date: {book.publishedDate}</p>
          <Link to="/" className="btn btn-primary">
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
